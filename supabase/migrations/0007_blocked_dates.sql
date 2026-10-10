create table if not exists public.blocked_dates (
  d date primary key,
  reason text not null default ''
);
alter table public.blocked_dates enable row level security;
drop policy if exists "admin manage blocked" on public.blocked_dates;
create policy "admin manage blocked" on public.blocked_dates for all using (public.is_admin()) with check (public.is_admin());

-- Public calendar: petsa lang ang lumalabas (walang pangalan o detalye ng booking).
create or replace function public.unavailable_dates()
returns table (d date) language sql stable security definer set search_path = public as $$
  select event_date from public.bookings where status = 'confirmed' and event_date >= current_date
  union
  select d from public.blocked_dates where d >= current_date;
$$;
grant execute on function public.unavailable_dates() to anon, authenticated;
