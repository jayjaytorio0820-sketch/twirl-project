create table if not exists public.site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "public read site" on public.site_content;
create policy "public read site" on public.site_content for select using (true);
drop policy if exists "admin write site" on public.site_content;
create policy "admin write site" on public.site_content for all using (public.is_admin()) with check (public.is_admin());
