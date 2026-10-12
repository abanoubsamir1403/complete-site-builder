-- 1. Add new enum values to case_stage
ALTER TYPE public.case_stage ADD VALUE IF NOT EXISTS 'pending_admin_review';
ALTER TYPE public.case_stage ADD VALUE IF NOT EXISTS 'pending_payment';
ALTER TYPE public.case_stage ADD VALUE IF NOT EXISTS 'payment_verification';
ALTER TYPE public.case_stage ADD VALUE IF NOT EXISTS 'rejected';

-- 2. Add columns to cases table
ALTER TABLE public.cases ADD COLUMN IF NOT EXISTS service_fee numeric;
ALTER TABLE public.cases ADD COLUMN IF NOT EXISTS payment_receipt_url text;

-- 3. Set default stage for new cases to pending_admin_review
ALTER TABLE public.cases ALTER COLUMN stage SET DEFAULT 'pending_admin_review';

-- 4. Update RLS policies to allow client insertion with pending_admin_review and updating payment receipt
DROP POLICY IF EXISTS "client opens own case" ON public.cases;
CREATE POLICY "client opens own case" ON public.cases FOR INSERT TO authenticated 
  WITH CHECK (client_id = auth.uid() AND stage IN ('intake', 'pending_admin_review'));

DROP POLICY IF EXISTS "client updates own case payment" ON public.cases;
CREATE POLICY "client updates own case payment" ON public.cases FOR UPDATE TO authenticated 
  USING (client_id = auth.uid()) 
  WITH CHECK (client_id = auth.uid());
