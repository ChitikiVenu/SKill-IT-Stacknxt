-- Skill IT Education: brochure download lead capture.
-- Run this migration in the Supabase SQL editor or with the Supabase CLI.
--
-- NOTE: an earlier version of this migration used CREATE TABLE IF NOT EXISTS with
-- columns full_name/phone_number. If that already ran against this project, simply
-- re-running a second CREATE TABLE IF NOT EXISTS with name/phone is a no-op — the
-- table exists, so Postgres skips it and the old column names silently stick around.
-- This version drops and recreates the table outright to guarantee the final schema
-- matches exactly. Safe to run: every prior insert attempt from the app failed
-- (that's the bug being fixed here), so there is no real lead data to lose. If you
-- have since captured real leads in this table, back them up before running this.

DROP TABLE IF EXISTS public.leads;

CREATE TABLE public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_interest TEXT
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts on leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Force PostgREST to pick up the new schema immediately instead of waiting for its
-- periodic auto-refresh (this is what a stale "Could not find the column" error means).
NOTIFY pgrst, 'reload schema';
