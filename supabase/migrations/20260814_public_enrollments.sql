-- Skill IT Education: open up course enrollment to unauthenticated leads.
-- Run this migration in the Supabase SQL editor or with the Supabase CLI,
-- after the earlier migrations in this folder.
--
-- Context: enrollments previously required a signed-in Supabase user
-- (user_id not null, insert policy checked auth.uid() = user_id). The
-- "Enroll Now" flow no longer requires login, so submissions now carry
-- their own contact details, same shape as public.leads. This makes
-- user_id optional (kept only for the rare case a signed-in user enrolls)
-- and adds the contact + delivery-mode columns the new enrollment form
-- collects directly.
--
-- Safe to re-run: DROP POLICY IF EXISTS makes this idempotent.

alter table public.enrollments alter column user_id drop not null;
alter table public.enrollments drop constraint if exists enrollments_user_id_course_slug_key;

alter table public.enrollments add column if not exists name text;
alter table public.enrollments add column if not exists email text;
alter table public.enrollments add column if not exists phone text;
alter table public.enrollments add column if not exists class_type text;
alter table public.enrollments add column if not exists course_title text;

drop policy if exists "Users can create their own enrollments" on public.enrollments;

drop policy if exists "Allow public enrollments" on public.enrollments;
create policy "Allow public enrollments"
  on public.enrollments for insert
  to anon, authenticated
  with check (
    length(trim(name)) > 0
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'
    and length(regexp_replace(phone, '\D', '', 'g')) >= 10
    and length(trim(course_slug)) > 0
  );

drop policy if exists "Users can view their own enrollments" on public.enrollments;
create policy "Users can view their own enrollments"
  on public.enrollments for select
  to authenticated
  using (auth.uid() = user_id);

NOTIFY pgrst, 'reload schema';
