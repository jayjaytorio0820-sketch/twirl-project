'use client';
import { useEffect, useState } from 'react';
import { sb, shortDate } from '@/lib/admin';
import { EVENT_LABELS, type Booking } from '@/lib/types';

const STATUSES: Booking['status'][] = ['new', 'confirmed', 'done', 'cancelled'];
const LABEL = { new: 'Bago', confirmed: 'Confirmed', done: 'Tapos na', cancelled: 'Cancelled' };

export default function Bookings() {
  const [rows, setRows] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<Booking['status'] | 'all'>('all');
  const [err, setErr] = useState('');
  const load = () => sb().from('bookings').select('*').order('event_date').then(({ data }) => setRows((data as Booking[]) ?? []));
  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: Booking['status']) {
    setErr('');
    const { error } = await sb().from('bookings').update({ status }).eq('id', id);
    if (error) setErr('Hindi na-update ang status. Subukan ulit.');
    else setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  const shown = rows.filter((r) => filter === 'all' || r.status === filter);
  return (
    <>
      <h1>Bookings</h1>
      <div className="filters">
        {(['all', ...STATUSES] as const).map((s) => (
          <button key={s} className="chip" aria-pressed={filter === s} onClick={() => setFilter(s)}>{s === 'all' ? 'Lahat' : LABEL[s]}</button>
        ))}
      </div>
      {err && <p className="notice error">{err}</p>}
      {shown.length === 0 ? <p className="muted">Walang booking sa filter na ito.</p> : (
        <div className="table-wrap"><table>
          <thead><tr><th>Date</th><th>Client</th><th>Event</th><th>Oras</th><th>Package</th><th>Status</th></tr></thead>
          <tbody>{shown.map((r) => (
            <tr key={r.id}>
              <td>{shortDate(r.event_date)}</td>
              <td><b>{r.name}</b><br /><a href={`tel:${r.phone}`}>{r.phone}</a>{r.email && <><br /><a href={`mailto:${r.email}`}>{r.email}</a></>}</td>
              <td>{EVENT_LABELS[r.event_type]}<br /><span className="muted">{r.venue}</span>{r.notes && <><br /><span className="small muted">{r.notes}</span></>}</td>
              <td>{r.start_time.slice(0, 5)} to {r.end_time.slice(0, 5)}</td>
              <td>{r.package_id ?? '—'}{r.guests ? <><br /><span className="small muted">{r.guests} guests</span></> : null}</td>
              <td>
                <span className={`status ${r.status}`}>{LABEL[r.status]}</span>
                <select className="input" style={{ marginTop: 6, padding: '.35rem' }} value={r.status} aria-label="Palitan ang status" onChange={(e) => setStatus(r.id, e.target.value as Booking['status'])}>
                  {STATUSES.map((s) => <option key={s} value={s}>{LABEL[s]}</option>)}
                </select>
              </td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
    </>
  );
}
