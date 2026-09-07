-- Skill IT Education: initial application data model and row-level security.
-- Run this migration in the Supabase SQL editor or with the Supabase CLI.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text unique,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'mentor', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  duration_months integer not null check (duration_months > 0),
  level text not null,
  original_price integer check (original_price >= 0),
  discounted_price integer check (discounted_price >= 0 and discounted_price <= original_price),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_questions (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  question text not null,
  expected_skills text[] not null default '{}',
  difficulty text not null default 'intermediate' check (difficulty in ('beginner', 'intermediate', 'advanced')),
  course_id uuid references public.courses(id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.phone)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- SECURITY DEFINER avoids policy recursion while keeping administrator checks in one place.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

alter table public.profiles enable row level security;
