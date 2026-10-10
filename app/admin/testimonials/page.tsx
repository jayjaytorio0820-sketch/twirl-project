'use client';
import { useEffect, useState } from 'react';
import { sb } from '@/lib/admin';

type T = { id: string; name: string; event: string; message: string; approved: boolean };

export default function TestimonialsAdmin() {
  const [rows, setRows] = useState<T[]>([]);
  const [err, setErr] = useState('');
  const load = () => sb().from('testimonials').select('*').order('created_at', { ascending: false }).then(({ data }) => setRows((data as T[]) ?? []));
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const { error } = await sb().from('testimonials').insert({ name: fd.get('name'), event: fd.get('event') || '', message: fd.get('message'), approved: true });
    if (error) setErr('Hindi naidagdag ang testimonial.'); else { setErr(''); form.reset(); load(); }
  }
  async function toggle(t: T) {
    const { error } = await sb().from('testimonials').update({ approved: !t.approved }).eq('id', t.id);
    if (error) setErr('Hindi na-update.'); else load();
  }
  async function remove(id: string) {
    if (!confirm('Tanggalin ang testimonial na ito?')) return;
    const { error } = await sb().from('testimonials').delete().eq('id', id);
    if (error) setErr('Hindi natanggal.'); else load();
  }

  return (
    <>
      <h1>Testimonials</h1>
      <form className="panel form" onSubmit={add} style={{ maxWidth: 640, marginBottom: 'var(--s6)' }}>
        <div className="row">
          <div className="field"><label htmlFor="name">Pangalan</label><input id="name" name="name" required className="input" /></div>
          <div className="field"><label htmlFor="event">Event</label><input id="event" name="event" className="input" placeholder="Wedding" /></div>
        </div>
        <div className="field"><label htmlFor="message">Testimonial</label><textarea id="message" name="message" required className="input" /></div>
        <button className="btn btn-primary">Idagdag</button>
      </form>
      {err && <p className="notice error">{err}</p>}
      {rows.length === 0 ? <p className="muted">Wala pang testimonial. Placeholder ang lumalabas sa site hanggang may idagdag ka.</p> : rows.map((t) => (
        <div key={t.id} className="list-row">
          <span style={{ flex: 1, minWidth: 220 }}><b>{t.name}</b>, {t.event}<br /><span className="muted">{t.message}</span></span>
          <span style={{ display: 'flex', gap: 'var(--s2)' }}>
            <button className="btn btn-sm" onClick={() => toggle(t)}>{t.approved ? 'Itago sa site' : 'Ipakita sa site'}</button>
            <button className="btn btn-sm" onClick={() => remove(t.id)}>Tanggalin</button>
          </span>
        </div>
      ))}
    </>
  );
}
