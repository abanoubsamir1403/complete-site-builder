CREATE TABLE IF NOT EXISTS public.interview_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('IV-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  client_id uuid,
  client_name text NOT NULL,
  client_email text NOT NULL,
  communication_method text NOT NULL,
  custom_method_name text,
  contact_detail text NOT NULL,
  scheduled_at timestamptz NOT NULL,
  us_timezone text NOT NULL DEFAULT 'America/New_York',
  us_time_slot text NOT NULL,
  topic text NOT NULL DEFAULT 'general_consultation',
  notes text,
  case_reference text,
  status text NOT NULL DEFAULT 'upcoming',
  video_link text,
  staff_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.interview_appointments TO anon, authenticated;
GRANT ALL ON public.interview_appointments TO service_role;
ALTER TABLE public.interview_appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow insert appointments" ON public.interview_appointments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "allow read appointments" ON public.interview_appointments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "staff update appointments" ON public.interview_appointments FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff delete appointments" ON public.interview_appointments FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));
