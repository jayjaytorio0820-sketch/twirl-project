'use client';
import { useEffect, useState } from 'react';
import { sb, shortDate } from '@/lib/admin';
import { EVENT_LABELS, type EventType, type PortfolioItem } from '@/lib/types';

export default function PortfolioAdmin() {
  const [rows, setRows] = useState<PortfolioItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const load = () => sb().from('portfolio_items').select('*').order('created_at', { ascending: false }).then(({ data }) => setRows((data as PortfolioItem[]) ?? []));
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setBusy(true); setErr('');
    let media_url: string | null = null;
    const file = fd.get('media') as File | null;
    if (file && file.size) {
      const path = `portfolio/${Date.now()}-${file.name.replace(/[^\w.-]+/g, '_')}`;
      const up = await sb().storage.from('event-videos').upload(path, file);
      if (up.error) { setErr("The video didn't upload."); setBusy(false); return; }
      media_url = sb().storage.from('event-videos').getPublicUrl(path).data.publicUrl;
    }
    const { error } = await sb().from('portfolio_items').insert({
      title: fd.get('title'), event_type: fd.get('event_type'), venue: fd.get('venue') || '', event_date: fd.get('event_date') || null, media_url,
    });
    setBusy(false);
    if (error) setErr("The item wasn't added."); else { form.reset(); load(); }
  }
  async function remove(id: string) {
    if (!confirm('Remove this item from the portfolio?')) return;
    const { error } = await sb().from('portfolio_items').delete().eq('id', id);
    if (error) setErr("The item wasn't removed."); else load();
  }

  return (
    <>
      <h1>Portfolio</h1>
      <form className="panel form" onSubmit={add} style={{ maxWidth: 640, marginBottom: 'var(--s6)' }}>
        <div className="row">
          <div className="field"><label htmlFor="title">Title</label><input id="title" name="title" required className="input" /></div>
          <div className="field"><label htmlFor="event_type">Event type</label>
            <select id="event_type" name="event_type" className="input">{(Object.keys(EVENT_LABELS) as EventType[]).map((k) => <option key={k} value={k}>{EVENT_LABELS[k]}</option>)}</select></div>
        </div>
        <div className="row">
          <div className="field"><label htmlFor="venue">Venue</label><input id="venue" name="venue" className="input" /></div>
          <div className="field"><label htmlFor="event_date">Date</label><input id="event_date" name="event_date" type="date" className="input" /></div>
        </div>
        <div className="field"><label htmlFor="media">Photo or 360 video</label><input id="media" name="media" type="file" accept="image/*,video/*" className="input" /></div>
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Uploading…' : 'Add to portfolio'}</button>
      </form>
      {err && <p className="notice error">{err}</p>}
      {rows.length === 0 ? <p className="muted">No portfolio items yet. The site shows the preview photos until you add some.</p> : rows.map((r) => (
        <div key={r.id} className="list-row">
          <span><b>{r.title}</b>, {EVENT_LABELS[r.event_type]}{r.event_date && <span className="muted">, {shortDate(r.event_date)}</span>}</span>
          <button className="btn btn-sm" onClick={() => remove(r.id)}>Remove</button>
        </div>
      ))}
    </>
  );
}
