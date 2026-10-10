'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sb, shortDate } from '@/lib/admin';
import type { Booking } from '@/lib/types';

export default function Dashboard() {
  const [rows, setRows] = useState<Booking[] | null>(null);
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    sb().from('bookings').select('*').gte('event_date', today).order('event_date').then(({ data }) => setRows((data as Booking[]) ?? []));
  }, []);
  if (!rows) return <p className="muted">Loading…</p>;
  const fresh = rows.filter((r) => r.status === 'new');
  const confirmed = rows.filter((r) => r.status === 'confirmed');
  return (
    <>
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat"><b>{fresh.length}</b>New inquiries</div>
        <div className="stat"><b>{confirmed.length}</b>Confirmed upcoming</div>
        <div className="stat"><b>{confirmed[0] ? shortDate(confirmed[0].event_date) : '—'}</b>Next event</div>
      </div>
      <h2 style={{ fontSize: '1.3rem', marginBottom: 'var(--s4)' }}>Needs a reply</h2>
      {fresh.length === 0 ? <p className="muted">No new inquiries. You're all caught up.</p> : (
        <div className="stack">
          {fresh.slice(0, 6).map((r) => (
            <div key={r.id} className="list-row">
              <span><b>{r.name}</b>, {r.event_type} at {r.venue}</span>
              <span>{shortDate(r.event_date)}</span>
            </div>
          ))}
          <Link href="/admin/bookings" className="btn btn-sm" style={{ justifySelf: 'start' }}>Open bookings</Link>
        </div>
      )}
    </>
  );
}
