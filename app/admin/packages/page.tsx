'use client';
import { useEffect, useState } from 'react';
import { sb } from '@/lib/admin';
import type { Package } from '@/lib/types';

export default function PackagesAdmin() {
  const [rows, setRows] = useState<Package[]>([]);
  const [saved, setSaved] = useState('');
  const [err, setErr] = useState('');
  useEffect(() => { sb().from('packages').select('*').order('sort').then(({ data }) => setRows((data as Package[]) ?? [])); }, []);

  async function save(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const patch = {
      name: String(fd.get('name')), hours: Number(fd.get('hours')), summary: String(fd.get('summary')),
      price_label: String(fd.get('price_label')), featured: fd.get('featured') === 'on',
      inclusions: String(fd.get('inclusions')).split('\n').map((s) => s.trim()).filter(Boolean),
    };
    const { error } = await sb().from('packages').update(patch).eq('id', id);
    if (error) { setErr("The package wasn't saved."); setSaved(''); } else { setErr(''); setSaved(id); }
  }

  return (
    <>
      <h1>Packages</h1>
      {err && <p className="notice error">{err}</p>}
      <div className="stack">
        {rows.map((p) => (
          <form key={p.id} className="panel form" onSubmit={(e) => save(e, p.id)}>
            <div className="row">
              <div className="field"><label>Name</label><input name="name" defaultValue={p.name} className="input" /></div>
              <div className="field"><label>Hours</label><input name="hours" type="number" min={1} defaultValue={p.hours} className="input" /></div>
            </div>
            <div className="field"><label>Short description</label><input name="summary" defaultValue={p.summary} className="input" /></div>
            <div className="field"><label>Inclusions <span className="hint">(one per line)</span></label><textarea name="inclusions" defaultValue={p.inclusions.join('\n')} className="input" /></div>
            <div className="row">
              <div className="field"><label>Price or label</label><input name="price_label" defaultValue={p.price_label} className="input" /></div>
              <label className="field" style={{ alignContent: 'end' }}><span><input type="checkbox" name="featured" defaultChecked={p.featured} /> Show as most booked</span></label>
            </div>
            <div style={{ display: 'flex', gap: 'var(--s3)', alignItems: 'center' }}>
              <button className="btn btn-primary btn-sm">Save {p.name}</button>
              {saved === p.id && <span className="small" role="status">Saved.</span>}
            </div>
          </form>
        ))}
      </div>
    </>
  );
}
