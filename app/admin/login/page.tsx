'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import BrandMark from '@/components/BrandMark';

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true); setErr('');
    const { error } = await getSupabase()!.auth.signInWithPassword({ email: String(fd.get('email')), password: String(fd.get('password')) });
    setBusy(false);
    if (error) setErr('Mali ang email o password.');
    else router.replace('/admin/dashboard');
  }
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 'var(--s4)' }}>
      <form className="panel form" style={{ width: 'min(100%, 380px)' }} onSubmit={submit}>
        <div style={{ background: 'var(--night)', borderRadius: 8, padding: 12, display: 'flex', justifyContent: 'center' }}><BrandMark className="brand-logo" /></div><p className="muted" style={{ textAlign: 'center' }}>Admin login</p>
        <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" className="input" required autoComplete="username" /></div>
        <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" className="input" required autoComplete="current-password" /></div>
        {err && <p className="notice error" role="alert">{err}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Nagla-log in…' : 'Mag-log in'}</button>
      </form>
    </div>
  );
}
