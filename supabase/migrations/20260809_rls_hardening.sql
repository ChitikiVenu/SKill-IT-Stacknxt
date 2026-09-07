-- Skill IT Education: RLS hardening pass.
-- Run this migration in the Supabase SQL editor or with the Supabase CLI,
-- after the earlier migrations in this folder.
--
-- Gaps this closes, found during a security audit:
-- 1. public.profiles has RLS enabled but zero policies, so even the owning
--    user cannot read/update their own row (everything is default-denied).
-- 2. public.courses and public.company_questions have no RLS enabled at
--    all, so the anon key could in principle insert/update/delete rows.
-- 3. public.leads only checks WITH CHECK (true) on insert; add basic
--    format validation as defense-in-depth on top of client-side checks.
--
-- Safe to re-run: DROP POLICY IF EXISTS makes this idempotent.

-- 1. profiles: users can read/update their own row; admins can read all.
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

-- 2. courses: public can read published courses only; no public writes.
alter table public.courses enable row level security;

drop policy if exists "Anyone can view published courses" on public.courses;
create policy "Anyone can view published courses"
  on public.courses for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins can view all courses" on public.courses;
create policy "Admins can view all courses"
  on public.courses for select
  using (public.is_admin());

drop policy if exists "Admins can manage courses" on public.courses;
create policy "Admins can manage courses"
  on public.courses for all
  using (public.is_admin())
  with check (public.is_admin());

-- 3. company_questions: public can read; no public writes.
alter table public.company_questions enable row level security;

drop policy if exists "Anyone can view company questions" on public.company_questions;
create policy "Anyone can view company questions"
  on public.company_questions for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can manage company questions" on public.company_questions;
create policy "Admins can manage company questions"
  on public.company_questions for all
  using (public.is_admin())
  with check (public.is_admin());

-- 4. leads: tighten the public insert policy with basic format checks
-- (defense-in-depth; the client already validates name/email format).
drop policy if exists "Allow public inserts on leads" on public.leads;
create policy "Allow public inserts on leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (
    length(trim(name)) > 0
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'
    and length(regexp_replace(phone, '\D', '', 'g')) >= 10
  );

NOTIFY pgrst, 'reload schema';
