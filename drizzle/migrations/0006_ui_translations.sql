CREATE TABLE public.ui_translations (
  locale text NOT NULL,
  source_hash text NOT NULL,
  source text NOT NULL,
  text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (locale, source_hash)
);
GRANT SELECT ON public.ui_translations TO anon, authenticated;
GRANT ALL ON public.ui_translations TO service_role;
ALTER TABLE public.ui_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads translations" ON public.ui_translations FOR SELECT TO anon, authenticated USING (true);