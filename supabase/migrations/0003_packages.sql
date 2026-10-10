create table if not exists public.packages (
  id text primary key,
  name text not null,
  hours int not null default 2,
  summary text not null default '',
  inclusions text[] not null default '{}',
  price_label text not null default 'Rate on request',
  featured boolean not null default false,
  sort int not null default 0
);
alter table public.packages enable row level security;
drop policy if exists "public read packages" on public.packages;
create policy "public read packages" on public.packages for select using (true);
drop policy if exists "admin write packages" on public.packages;
create policy "admin write packages" on public.packages for all using (public.is_admin()) with check (public.is_admin());
