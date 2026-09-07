-- Skill IT Education: RLS hardening pass 2.
-- Run this migration in the Supabase SQL editor or with the Supabase CLI,
-- after the earlier migrations in this folder.
--
-- Gaps this closes, found during a security audit:
-- 1. CRITICAL: "Users can update their own profile" (20260809) restricts
--    which ROW a user can update, but not which COLUMNS. Since profiles.role
--    is a plain user-writable column, any authenticated user could call
--    `supabase.from('profiles').update({ role: 'admin' })` directly against
--    the anon/authenticated REST API (bypassing the backend entirely) and
--    grant themselves admin, unlocking "Admins can view all profiles" and
--    full course/company_questions management. A BEFORE UPDATE trigger now
--    rejects any role change attempted by a non-admin.
-- 2. MEDIUM: "Allow public enrollments" (20260814) validates contact-field
--    format but places no constraint on user_id, so an authenticated caller
--    could insert an enrollment row with an arbitrary user_id (e.g. a real
--    victim's UUID), and it would then surface under that victim's "own
--    enrollments" (auth.uid() = user_id). Tightened so a supplied user_id
--    must match the caller's own auth.uid().
--
-- Safe to re-run: DROP POLICY/TRIGGER IF EXISTS makes this idempotent.

-- 1. profiles: block role self-escalation via a BEFORE UPDATE trigger.
-- (RLS `with check` alone can't compare NEW vs OLD on the same row, so this
-- needs a trigger rather than a policy tweak.)
create or replace function public.prevent_role_self_escalation()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Not authorized to change role';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_role_self_escalation on public.profiles;
create trigger trg_prevent_role_self_escalation
  before update on public.profiles
  for each row execute procedure public.prevent_role_self_escalation();

-- 2. enrollments: a supplied user_id must be the caller's own.
drop policy if exists "Allow public enrollments" on public.enrollments;
create policy "Allow public enrollments"
  on public.enrollments for insert
  to anon, authenticated
  with check (
    length(trim(name)) > 0
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'
    and length(regexp_replace(phone, '\D', '', 'g')) >= 10
    and length(trim(course_slug)) > 0
    and (user_id is null or user_id = auth.uid())
  );

NOTIFY pgrst, 'reload schema';
