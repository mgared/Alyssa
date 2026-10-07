-- Design by Labillois: database, photo storage and access rules.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run.

-- Who may edit the site. Only accounts listed here can change anything,
-- even if someone else manages to create a login.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;

drop policy if exists "Admins can see their own row" on public.admins;
create policy "Admins can see their own row" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

-- Portfolio projects.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(trim(name)) > 0),
  location text not null default '',
  scope text not null default '',
  description text not null default '',
  cover_url text,
  images text[] not null default '{}',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;

drop policy if exists "Anyone can read published projects" on public.projects;
create policy "Anyone can read published projects" on public.projects
  for select using (published or (select public.is_admin()));

drop policy if exists "Admins can add projects" on public.projects;
create policy "Admins can add projects" on public.projects
  for insert to authenticated with check ((select public.is_admin()));

drop policy if exists "Admins can edit projects" on public.projects;
create policy "Admins can edit projects" on public.projects
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects" on public.projects
  for delete to authenticated using ((select public.is_admin()));

-- Editable page content: home slideshow, About page, contact details.
create table if not exists public.site_content (
  key text primary key check (key in ('hero', 'about', 'contact')),
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

drop policy if exists "Anyone can read site content" on public.site_content;
create policy "Anyone can read site content" on public.site_content
  for select using (true);

drop policy if exists "Admins can add site content" on public.site_content;
create policy "Admins can add site content" on public.site_content
  for insert to authenticated with check ((select public.is_admin()));

drop policy if exists "Admins can edit site content" on public.site_content;
create policy "Admins can edit site content" on public.site_content
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- Photo storage. Public to view; only admins can upload, replace or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio', 'portfolio', true, 15728640, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can list portfolio photos" on storage.objects;
create policy "Admins can list portfolio photos" on storage.objects
  for select to authenticated using (bucket_id = 'portfolio' and (select public.is_admin()));

drop policy if exists "Admins can upload portfolio photos" on storage.objects;
create policy "Admins can upload portfolio photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio' and (select public.is_admin()));

drop policy if exists "Admins can replace portfolio photos" on storage.objects;
create policy "Admins can replace portfolio photos" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio' and (select public.is_admin()));

drop policy if exists "Admins can delete portfolio photos" on storage.objects;
create policy "Admins can delete portfolio photos" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio' and (select public.is_admin()));
