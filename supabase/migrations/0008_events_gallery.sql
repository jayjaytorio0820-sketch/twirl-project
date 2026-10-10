create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  code text unique not null check (code ~ '^[a-z0-9-]{3,40}$'),
  title text not null,
  event_date date not null,
  venue text not null default '',
  created_at timestamptz not null default now()
);
create table if not exists public.event_videos (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  title text not null default '',
  storage_path text not null,
  thumb_path text,
  created_at timestamptz not null default now()
);
alter table public.events enable row level security;
alter table public.event_videos enable row level security;
drop policy if exists "public read events" on public.events;
create policy "public read events" on public.events for select using (true);
drop policy if exists "admin write events" on public.events;
create policy "admin write events" on public.events for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "public read videos" on public.event_videos;
create policy "public read videos" on public.event_videos for select using (true);
drop policy if exists "admin write videos" on public.event_videos;
create policy "admin write videos" on public.event_videos for all using (public.is_admin()) with check (public.is_admin());

-- Storage bucket para sa 360 videos (public read para ma-download ng guests).
insert into storage.buckets (id, name, public) values ('event-videos', 'event-videos', true)
on conflict (id) do nothing;
drop policy if exists "admin upload event videos" on storage.objects;
create policy "admin upload event videos" on storage.objects for insert to authenticated
  with check (bucket_id = 'event-videos' and public.is_admin());
drop policy if exists "admin delete event videos" on storage.objects;
create policy "admin delete event videos" on storage.objects for delete to authenticated
  using (bucket_id = 'event-videos' and public.is_admin());
