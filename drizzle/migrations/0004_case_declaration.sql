ALTER TABLE public.cases ADD COLUMN IF NOT EXISTS declaration jsonb;
ALTER TABLE public.cases ADD COLUMN IF NOT EXISTS declaration_signed_at timestamptz;
CREATE OR REPLACE FUNCTION public.stamp_case_declaration()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NEW.declaration IS NOT NULL THEN NEW.declaration_signed_at := now(); END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER stamp_case_declaration BEFORE INSERT ON public.cases FOR EACH ROW EXECUTE FUNCTION public.stamp_case_declaration();