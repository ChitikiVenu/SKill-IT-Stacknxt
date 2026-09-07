-- Skill IT Education: student enrollments.
-- Run this migration in the Supabase SQL editor or with the Supabase CLI,
-- after 20260805_initial_schema.sql.
-- Safe to re-run: DROP POLICY IF EXISTS makes this idempotent (CREATE POLICY has
-- no IF NOT EXISTS clause in Postgres, unlike CREATE TABLE).

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  status text not null default 'active' check (status in ('active', 'completed', 'cancelled')),
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_slug)
);

alter table public.enrollments enable row level security;

drop policy if exists "Users can view their own enrollments" on public.enrollments;
create policy "Users can view their own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own enrollments" on public.enrollments;
create policy "Users can create their own enrollments"
  on public.enrollments for insert
  with check (auth.uid() = user_id);
