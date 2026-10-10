'use client';
import { useMemo, useState } from 'react';
import { EVENT_LABELS, type EventType, type Package } from '@/lib/types';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const pretty = (s: string) => { const [y, m, d] = s.split('-').map(Number); return `${MONTHS[m - 1]} ${d}, ${y}`; };

type Errors = Partial<Record<string, string>>;

export default function BookingForm({ unavailable, packages, initialPackage }: { unavailable: string[]; packages: Package[]; initialPackage?: string }) {
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const taken = useMemo(() => new Set(unavailable), [unavailable]);

  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const daysIn = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(first.getDay()).fill(null), ...Array.from({ length: daysIn }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1))];
  const atStart = cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Errors = {};
    if (!date) errs.date = 'Pick a date on the calendar first.';
    if (!data.name || data.name.trim().length < 2) errs.name = 'Enter your name.';
    if (!/^[0-9+\s-]{7,}$/.test(data.phone || '')) errs.phone = 'Enter a mobile number, e.g. 0917 123 4567.';
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errs.email = 'That email looks off. You can also leave it blank.';
    if (!data.venue || data.venue.trim().length < 2) errs.venue = 'Enter the venue or event location.';
    if (!data.start_time || !data.end_time) errs.time = 'Enter the booth start and end times.';
    else if (data.end_time <= data.start_time) errs.time = 'The end time must be after the start time.';
    setErrors(errs);
    if (Object.keys(errs).length) { setState('idle'); return; }

    setState('sending');
    try {
      const res = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, event_date: date }) });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Your inquiry wasn't sent.");
      setState('sent');
      setMsg(out.demo ? "This is preview mode, so it wasn't actually sent. Once live, it goes to TWIRL's admin panel and email." : '');
    } catch (err) {
      setState('error');
      setMsg(err instanceof Error ? err.message : "Your inquiry wasn't sent.");
    }
  }

  if (state === 'sent') {
    return (
      <div className="panel stack" role="status">
        <h2 style={{ fontSize: '1.8rem' }}>We got your inquiry.</h2>
        <p>We'll reply within a day to confirm the package and downpayment for <b>{date && pretty(date)}</b>.</p>
        {msg && <p className="notice warn">{msg}</p>}
        <button className="btn" onClick={() => { setState('idle'); setDate(null); }}>Send another inquiry</button>
      </div>
    );
  }

  return (
    <div className="book-grid">
      <div className="panel">
        <div className="cal-head">
          <h3>{MONTHS[cursor.getMonth()]} {cursor.getFullYear()}</h3>
          <div className="cal-nav">
            <button type="button" className="icon-btn" aria-label="Previous month" disabled={atStart} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>‹</button>
            <button type="button" className="icon-btn" aria-label="Next month" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>›</button>
          </div>
        </div>
        <div className="cal" role="grid" aria-label="Availability calendar">
          {DOW.map((d) => <div key={d} className="dow">{d}</div>)}
          {cells.map((c, i) => {
            if (!c) return <div key={`e${i}`} />;
            const k = iso(c);
            const past = c < today;
            const isTaken = taken.has(k);
            const cls = ['day', past ? 'past' : isTaken ? 'taken' : 'avail', date === k ? 'selected' : ''].join(' ');
            return (
              <button key={k} type="button" className={cls} disabled={past || isTaken} aria-pressed={date === k}
                aria-label={`${pretty(k)}${isTaken ? ', booked' : past ? '' : ', available'}`} onClick={() => setDate(k)}>
                {c.getDate()}
              </button>
            );
          })}
        </div>
        <div className="legend">
          <span><i style={{ background: 'var(--teal-soft)' }} /> Available</span>
          <span><i style={{ background: 'var(--mist)' }} /> Booked</span>
          <span><i style={{ background: 'var(--ink)' }} /> Your pick</span>
        </div>
        <p className="small muted" style={{ marginTop: 'var(--s3)' }}>If your date shows booked, message us anyway. Sometimes a second booth is free.</p>
      </div>

      <form className="panel form" onSubmit={submit} noValidate>
        <div>
          {date ? <span className="date-pill">{pretty(date)}</span> : <p className="muted">Pick a date on the calendar.</p>}
          {errors.date && <p className="field-error">{errors.date}</p>}
        </div>
        <div className="row">
          <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" className="input" autoComplete="name" />{errors.name && <span className="field-error">{errors.name}</span>}</div>
          <div className="field"><label htmlFor="phone">Mobile number</label><input id="phone" name="phone" className="input" inputMode="tel" autoComplete="tel" />{errors.phone && <span className="field-error">{errors.phone}</span>}</div>
        </div>
        <div className="field"><label htmlFor="email">Email <span className="hint">(optional)</span></label><input id="email" name="email" type="email" className="input" autoComplete="email" />{errors.email && <span className="field-error">{errors.email}</span>}</div>
        <div className="field"><label htmlFor="venue">Venue</label><input id="venue" name="venue" className="input" placeholder="Venue name and city" />{errors.venue && <span className="field-error">{errors.venue}</span>}</div>
        <div className="row">
          <div className="field"><label htmlFor="event_type">Event type</label>
            <select id="event_type" name="event_type" className="input" defaultValue="wedding">
              {(Object.keys(EVENT_LABELS) as EventType[]).map((k) => <option key={k} value={k}>{EVENT_LABELS[k]}</option>)}
            </select></div>
          <div className="field"><label htmlFor="package_id">Package</label>
            <select id="package_id" name="package_id" className="input" defaultValue={initialPackage ?? ''}>
              <option value="">Not sure yet</option>
              {packages.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.hours} hours)</option>)}
            </select></div>
        </div>
        <div className="row">
          <div className="field"><label htmlFor="start_time">Booth start</label><input id="start_time" name="start_time" type="time" className="input" /></div>
          <div className="field"><label htmlFor="end_time">Booth end</label><input id="end_time" name="end_time" type="time" className="input" /></div>
        </div>
        {errors.time && <p className="field-error">{errors.time}</p>}
        <div className="field"><label htmlFor="guests">Estimated guests <span className="hint">(optional)</span></label><input id="guests" name="guests" type="number" min={1} className="input" /></div>
        <div className="field"><label htmlFor="notes">Other details <span className="hint">(optional)</span></label><textarea id="notes" name="notes" className="input" placeholder="Theme, motif, overlay text you'd like…" /></div>
        {state === 'error' && <p className="notice error" role="alert">{msg} Try again, or message us on our Facebook page.</p>}
        <button className="btn btn-primary" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send inquiry'}</button>
      </form>
    </div>
  );
}
