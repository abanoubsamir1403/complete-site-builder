CREATE TABLE public.site_stats (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  extra_completed int NOT NULL DEFAULT 0,
  extra_clients int NOT NULL DEFAULT 0,
  years_experience int NOT NULL DEFAULT 0,
  show_on_home boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_stats TO anon, authenticated;
GRANT UPDATE, INSERT ON public.site_stats TO authenticated;
GRANT ALL ON public.site_stats TO service_role;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads stats" ON public.site_stats FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin updates stats" ON public.site_stats FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin inserts stats" ON public.site_stats FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
INSERT INTO public.site_stats (id) VALUES (1);

CREATE TABLE public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid DEFAULT auth.uid(),
  action text NOT NULL,
  target text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.activity_log TO authenticated;
GRANT ALL ON public.activity_log TO service_role;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin reads log" ON public.activity_log FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "staff writes log" ON public.activity_log FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()) AND actor_id = auth.uid());

CREATE OR REPLACE FUNCTION public.public_stats()
RETURNS json LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT json_build_object(
    'completed', (SELECT count(*) FROM cases WHERE stage = 'complete') + s.extra_completed,
    'clients', (SELECT count(DISTINCT client_id) FROM cases) + s.extra_clients,
    'active', (SELECT count(*) FROM cases WHERE stage <> 'complete'),
    'years', s.years_experience,
    'show', s.show_on_home
  ) FROM site_stats s WHERE s.id = 1
$$;
GRANT EXECUTE ON FUNCTION public.public_stats() TO anon, authenticated;