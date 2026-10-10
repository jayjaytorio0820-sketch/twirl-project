create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_type text not null check (event_type in ('wedding','debut','corporate','school','birthday','other')),
  venue text not null default '',
  media_url text,
  event_date date,
  created_at timestamptz not null default now()
);
alter table public.portfolio_items enable row level security;
drop policy if exists "public read portfolio" on public.portfolio_items;
create policy "public read portfolio" on public.portfolio_items for select using (true);
drop policy if exists "admin write portfolio" on public.portfolio_items;
create policy "admin write portfolio" on public.portfolio_items for all using (public.is_admin()) with check (public.is_admin());
