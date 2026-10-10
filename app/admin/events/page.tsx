'use client';
import { useEffect, useState } from 'react';
import { sb, shortDate } from '@/lib/admin';
import { galleryUrl, qrDataUrl } from '@/lib/qr';

type Ev = { id: string; code: string; title: string; event_date: string; venue: string; event_videos: { count: number }[] };

export default function EventsAdmin() {
  const [events, setEvents] = useState<Ev[]>([]);
  const [active, setActive] = useState<Ev | null>(null);
  const [qr, setQr] = useState('');
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');
  const load = () => sb().from('events').select('*, event_videos(count)').order('event_date', { ascending: false }).then(({ data }) => setEvents((data as Ev[]) ?? []));
  useEffect(() => { load(); }, []);
  useEffect(() => { if (active) qrDataUrl(galleryUrl(active.code)).then(setQr); }, [active]);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const code = String(fd.get('code')).toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-');
    const { error } = await sb().from('events').insert({ code, title: fd.get('title'), event_date: fd.get('event_date'), venue: fd.get('venue') || '' });
    if (error) setErr(error.code === '23505' ? 'That code is taken. Pick another.' : "The event wasn't created. Use only a-z, 0-9 and hyphens in the code.");
    else { setErr(''); e.currentTarget.reset(); load(); }
  }

  async function upload(files: FileList | null) {
    if (!active || !files?.length) return;
    setErr('');
    for (const [i, f] of Array.from(files).entries()) {
      setBusy(`Uploading ${i + 1} of ${files.length}…`);
      const path = `${active.code}/${Date.now()}-${f.name.replace(/[^\w.-]+/g, '_')}`;
      const up = await sb().storage.from('event-videos').upload(path, f, { contentType: f.type || 'video/mp4' });
      if (up.error) { setErr(`${f.name} didn't upload.`); continue; }
      await sb().from('event_videos').insert({ event_id: active.id, title: f.name.replace(/\.\w+$/, ''), storage_path: path });
    }
    setBusy(''); load();
  }

  return (
    <>
      <h1>Event galleries</h1>
      <p className="muted" style={{ marginBottom: 'var(--s5)' }}>Create a gallery for each event, upload the 360 videos, and print the QR code for the booth and tables.</p>
      <form className="panel form" onSubmit={create} style={{ maxWidth: 640, marginBottom: 'var(--s6)' }}>
        <div className="row">
          <div className="field"><label htmlFor="title">Event name</label><input id="title" name="title" required className="input" placeholder="Bojo & Anna" /></div>
          <div className="field"><label htmlFor="code">Gallery code</label><input id="code" name="code" required className="input" placeholder="bojo-anna" pattern="[a-zA-Z0-9-]{3,40}" /><span className="hint">Appears in the link: /g/code</span></div>
        </div>
        <div className="row">
          <div className="field"><label htmlFor="event_date">Date</label><input id="event_date" name="event_date" type="date" required className="input" /></div>
          <div className="field"><label htmlFor="venue">Venue</label><input id="venue" name="venue" className="input" /></div>
        </div>
        <button className="btn btn-primary">Create gallery</button>
      </form>
      {err && <p className="notice error">{err}</p>}

      {active && (
        <div className="panel" style={{ marginBottom: 'var(--s6)' }}>
          <div className="qr-box">
            {qr ? <img src={qr} alt={`QR code for ${active.title}`} /> : <div style={{ width: 180, height: 180 }} />}
            <div className="stack">
              <h2 style={{ fontSize: '1.3rem' }}>{active.title}</h2>
              <a href={galleryUrl(active.code)} target="_blank" rel="noopener">{galleryUrl(active.code)}</a>
              <div style={{ display: 'flex', gap: 'var(--s2)', flexWrap: 'wrap' }}>
                {qr && <a className="btn btn-sm" href={qr} download={`TWIRL-QR-${active.code}.png`}>Download QR</a>}
                <label className="btn btn-sm btn-primary">Upload videos
                  <input type="file" accept="video/*" multiple className="sr-only" onChange={(e) => upload(e.target.files)} />
                </label>
              </div>
              {busy && <p className="small" role="status">{busy}</p>}
            </div>
          </div>
        </div>
      )}

      {events.length === 0 ? <p className="muted">No galleries yet. Create one for your next event.</p> : (
        <div className="table-wrap"><table>
          <thead><tr><th>Event</th><th>Date</th><th>Videos</th><th></th></tr></thead>
          <tbody>{events.map((ev) => (
            <tr key={ev.id}>
              <td><b>{ev.title}</b><br /><span className="small muted">/g/{ev.code}</span></td>
              <td>{shortDate(ev.event_date)}</td>
              <td>{ev.event_videos?.[0]?.count ?? 0}</td>
              <td><button className="btn btn-sm" onClick={() => setActive(ev)}>QR and upload</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
    </>
  );
}
