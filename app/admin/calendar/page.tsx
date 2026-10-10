'use client';
import { useEffect, useState } from 'react';
import { sb, shortDate } from '@/lib/admin';

type Blocked = { d: string; reason: string };

export default function CalendarAdmin() {
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [booked, setBooked] = useState<{ event_date: string; name: string }[]>([]);
  const [err, setErr] = useState('');
  const today = new Date().toISOString().slice(0, 10);
  const load = async () => {
    const [{ data: b }, { data: c }] = await Promise.all([
      sb().from('blocked_dates').select('*').gte('d', today).order('d'),
      sb().from('bookings').select('event_date,name').eq('status', 'confirmed').gte('event_date', today).order('event_date'),
    ]);
    setBlocked((b as Blocked[]) ?? []); setBooked(c ?? []);
  };
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { error } = await sb().from('blocked_dates').upsert({ d: String(fd.get('d')), reason: String(fd.get('reason') || '') });
    if (error) setErr("The date wasn't blocked."); else { setErr(''); e.currentTarget.reset(); load(); }
  }
  async function unblock(d: string) {
    const { error } = await sb().from('blocked_dates').delete().eq('d', d);
    if (error) setErr("The date wasn't unblocked."); else load();
  }

  return (
    <>
      <h1>Calendar</h1>
      <p className="muted" style={{ marginBottom: 'var(--s5)' }}>Confirmed bookings show as booked on the public calendar automatically. Block any other days you're unavailable here.</p>
      <form className="panel form" onSubmit={add} style={{ maxWidth: 520, marginBottom: 'var(--s6)' }}>
        <div className="row">
          <div className="field"><label htmlFor="d">Date</label><input id="d" name="d" type="date" min={today} required className="input" /></div>
          <div className="field"><label htmlFor="reason">Reason <span className="hint">(private)</span></label><input id="reason" name="reason" className="input" placeholder="e.g. day off" /></div>
        </div>
        <button className="btn btn-primary">Block date</button>
      </form>
      {err && <p className="notice error">{err}</p>}
      <div style={{ display: 'grid', gap: 'var(--s6)', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <div><h2 style={{ fontSize: '1.2rem' }}>Blocked</h2>
          {blocked.length === 0 ? <p className="muted">No blocked dates.</p> : blocked.map((b) => (
            <div key={b.d} className="list-row"><span>{shortDate(b.d)}{b.reason && <span className="muted">, {b.reason}</span>}</span><button className="btn btn-sm" onClick={() => unblock(b.d)}>Unblock</button></div>
          ))}
        </div>
        <div><h2 style={{ fontSize: '1.2rem' }}>Confirmed bookings</h2>
          {booked.length === 0 ? <p className="muted">No confirmed upcoming events yet.</p> : booked.map((b, i) => (
            <div key={i} className="list-row"><span>{shortDate(b.event_date)}</span><span className="muted">{b.name}</span></div>
          ))}
        </div>
      </div>
    </>
  );
}
