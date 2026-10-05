COMMENT ON COLUMN public.cases.internal_note IS 'DEPRECATED: client-readable; use case_internal_notes';
CREATE TABLE public.case_internal_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  author_id uuid NOT NULL DEFAULT auth.uid(),
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.case_internal_notes TO authenticated;
GRANT ALL ON public.case_internal_notes TO service_role;
ALTER TABLE public.case_internal_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff read internal" ON public.case_internal_notes FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff write internal" ON public.case_internal_notes FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "staff delete internal" ON public.case_internal_notes FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));