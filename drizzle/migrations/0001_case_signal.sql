CREATE TYPE public.case_signal AS ENUM ('green','yellow','red');
ALTER TABLE public.cases ADD COLUMN signal public.case_signal NOT NULL DEFAULT 'green';
ALTER TABLE public.cases ADD COLUMN internal_note text;