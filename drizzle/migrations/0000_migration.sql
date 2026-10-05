CREATE TYPE public.app_role AS ENUM ('admin','staff','client');
CREATE TYPE public.case_stage AS ENUM ('intake','documents','review','translation','assembly','complete');
CREATE TYPE public.doc_status AS ENUM ('requested','uploaded','under_review','accepted','needs_attention');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  phone text,
  preferred_lang text NOT NULL DEFAULT 'en',
  disclaimer_accepted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','staff'))
$$;

CREATE POLICY "own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE TABLE public.cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('MF-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  client_id uuid NOT NULL,
  service_title text NOT NULL,
  form_code text,
  stage public.case_stage NOT NULL DEFAULT 'intake',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cases TO authenticated;
GRANT ALL ON public.cases TO service_role;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client reads own cases" ON public.cases FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "client opens own case" ON public.cases FOR INSERT TO authenticated WITH CHECK (client_id = auth.uid() AND stage = 'intake');
CREATE POLICY "staff updates cases" ON public.cases FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff deletes cases" ON public.cases FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

CREATE TABLE public.case_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  label text NOT NULL,
  status public.doc_status NOT NULL DEFAULT 'requested',
  file_path text,
  file_name text,
  staff_note text,
  uploaded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_documents TO authenticated;
GRANT ALL ON public.case_documents TO service_role;
ALTER TABLE public.case_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read docs" ON public.case_documents FOR SELECT TO authenticated USING (
  public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND c.client_id = auth.uid()));
CREATE POLICY "client adds docs" ON public.case_documents FOR INSERT TO authenticated WITH CHECK (
  public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND c.client_id = auth.uid()));
CREATE POLICY "update docs" ON public.case_documents FOR UPDATE TO authenticated USING (
  public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND c.client_id = auth.uid()));
CREATE POLICY "staff deletes docs" ON public.case_documents FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

-- Clients may only set upload fields, never status beyond 'uploaded' or staff_note
CREATE OR REPLACE FUNCTION public.guard_doc_update() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_staff(auth.uid()) THEN
    IF NEW.staff_note IS DISTINCT FROM OLD.staff_note OR NEW.label IS DISTINCT FROM OLD.label OR NEW.case_id IS DISTINCT FROM OLD.case_id THEN
      RAISE EXCEPTION 'not allowed';
    END IF;
    IF NEW.status IS DISTINCT FROM OLD.status AND NEW.status <> 'uploaded' THEN
      RAISE EXCEPTION 'not allowed';
    END IF;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER guard_doc_update BEFORE UPDATE ON public.case_documents FOR EACH ROW EXECUTE FUNCTION public.guard_doc_update();

CREATE TABLE public.case_notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_notices TO authenticated;
GRANT ALL ON public.case_notices TO service_role;
ALTER TABLE public.case_notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read notices" ON public.case_notices FOR SELECT TO authenticated USING (
  public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND c.client_id = auth.uid()));
CREATE POLICY "staff writes notices" ON public.case_notices FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "mark read" ON public.case_notices FOR UPDATE TO authenticated USING (
  public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND c.client_id = auth.uid()));
CREATE POLICY "staff deletes notices" ON public.case_notices FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name) VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name') ON CONFLICT DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'client') ON CONFLICT DO NOTHING;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- When a client opens a case, seed the standard document checklist
CREATE OR REPLACE FUNCTION public.seed_case_docs() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.case_documents (case_id, label) VALUES
    (NEW.id, 'Passport (bio page)'),
    (NEW.id, 'Birth certificate'),
    (NEW.id, 'National ID'),
    (NEW.id, 'Passport-style photo');
  RETURN NEW;
END $$;
CREATE TRIGGER seed_case_docs AFTER INSERT ON public.cases FOR EACH ROW EXECUTE FUNCTION public.seed_case_docs();

-- Storage policies: path = <case_id>/<file>
CREATE POLICY "case files read" ON storage.objects FOR SELECT TO authenticated USING (
  bucket_id = 'case-files' AND (public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.cases c WHERE c.id::text = (storage.foldername(name))[1] AND c.client_id = auth.uid())));
CREATE POLICY "case files upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'case-files' AND (public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.cases c WHERE c.id::text = (storage.foldername(name))[1] AND c.client_id = auth.uid())));