create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event text not null default '',
  message text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
drop policy if exists "public read approved" on public.testimonials;
create policy "public read approved" on public.testimonials for select using (approved or public.is_admin());
drop policy if exists "admin write testimonials" on public.testimonials;
create policy "admin write testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
