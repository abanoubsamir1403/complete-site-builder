ALTER TABLE public.cases ADD COLUMN IF NOT EXISTS service_slug text;
ALTER TABLE public.cases ADD COLUMN IF NOT EXISTS intake_answers jsonb NOT NULL DEFAULT '{}'::jsonb;