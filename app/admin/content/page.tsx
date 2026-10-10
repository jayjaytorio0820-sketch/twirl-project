'use client';
import { useEffect, useState } from 'react';
import { sb } from '@/lib/admin';
import { SITE } from '@/lib/placeholder';

const FIELDS: [keyof typeof SITE, string, boolean?][] = [
  ['business_name', 'Business name'], ['tagline', 'Tagline'], ['intro', 'Intro sa hero', true], ['award', 'Award'],
  ['phone', 'Phone'], ['email', 'Email'], ['facebook', 'Facebook page link'], ['messenger', 'Messenger link (m.me/…)'], ['service_area', 'Service area'],
];

export default function ContentAdmin() {
  const [vals, setVals] = useState<Record<string, string>>({ ...SITE });
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  useEffect(() => {
    sb().from('site_content').select('key,value').then(({ data }) => {
      if (data?.length) setVals((v) => ({ ...v, ...Object.fromEntries(data.map((r) => [r.key, r.value])) }));
    });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setState('saving');
    const rows = Object.entries(vals).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));
    const { error } = await sb().from('site_content').upsert(rows);
    setState(error ? 'error' : 'saved');
  }

  return (
    <>
      <h1>Site content</h1>
      <form className="panel form" onSubmit={save} style={{ maxWidth: 720 }}>
        {FIELDS.map(([k, label, long]) => (
          <div key={k} className="field">
            <label htmlFor={k}>{label}</label>
            {long
              ? <textarea id={k} className="input" value={vals[k] ?? ''} onChange={(e) => setVals({ ...vals, [k]: e.target.value })} />
              : <input id={k} className="input" value={vals[k] ?? ''} onChange={(e) => setVals({ ...vals, [k]: e.target.value })} />}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 'var(--s3)', alignItems: 'center' }}>
          <button className="btn btn-primary" disabled={state === 'saving'}>{state === 'saving' ? 'Sine-save…' : 'I-save ang content'}</button>
          {state === 'saved' && <span className="small" role="status">Na-save. Lalabas sa site sa loob ng ilang minuto.</span>}
          {state === 'error' && <span className="field-error" role="alert">Hindi na-save. Subukan ulit.</span>}
        </div>
      </form>
    </>
  );
}
