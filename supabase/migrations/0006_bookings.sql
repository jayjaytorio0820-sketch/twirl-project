-- Inquiries/bookings. Public: insert lang. Admin: lahat. Walang public read (may personal info).
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 30),
  email text,
  event_date date not null,
  start_time time not null,
  end_time time not null,
  venue text not null check (char_length(venue) between 2 and 200),
  event_type text not null check (event_type in ('wedding','debut','corporate','school','birthday','other')),
  package_id text references public.packages(id) on delete set null,
  guests int check (guests is null or guests between 1 and 5000),
  notes text check (notes is null or char_length(notes) <= 2000),
  status text not null default 'new' check (status in ('new','confirmed','done','cancelled'))
);
create index if not exists bookings_event_date_idx on public.bookings (event_date);
alter table public.bookings enable row level security;
drop policy if exists "public submit inquiry" on public.bookings;
create policy "public submit inquiry" on public.bookings for insert with check (status = 'new' and event_date >= current_date);
drop policy if exists "admin manage bookings" on public.bookings;
create policy "admin manage bookings" on public.bookings for all using (public.is_admin()) with check (public.is_admin());
