'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import BrandMark from './BrandMark';

const NAV = [
  ['/admin/dashboard', 'Dashboard'], ['/admin/bookings', 'Bookings'], ['/admin/calendar', 'Calendar'],
  ['/admin/events', 'Event galleries'], ['/admin/packages', 'Packages'], ['/admin/portfolio', 'Portfolio'],
  ['/admin/testimonials', 'Testimonials'], ['/admin/content', 'Site content'],
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'ok' | 'denied'>('loading');
  const isLogin = path === '/admin/login';

  useEffect(() => {
    if (isLogin) return;
    const sb = getSupabase();
    if (!sb) return;
    sb.auth.getSession().then(async ({ data }) => {
      if (!data.session) { router.replace('/admin/login'); return; }
      const { data: adm } = await sb.from('admins').select('user_id').eq('user_id', data.session.user.id).maybeSingle();
      setStatus(adm ? 'ok' : 'denied');
    });
  }, [isLogin, router]);

  if (!isSupabaseConfigured) {
    return (
      <div className="wrap section" style={{ maxWidth: 640 }}>
        <h1 style={{ fontSize: '2rem' }}>Admin panel</h1>
        <p className="notice warn" style={{ marginTop: 'var(--s4)' }}>Supabase isn't connected yet, so this is preview mode. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel to turn on login and the admin panel.</p>
        <Link href="/" className="btn" style={{ marginTop: 'var(--s5)' }}>Back to site</Link>
      </div>
    );
  }
  if (isLogin) return <>{children}</>;
  if (status === 'loading') return <p className="wrap section muted">Checking your login…</p>;
  if (status === 'denied') {
    return (
      <div className="wrap section" style={{ maxWidth: 560 }}>
        <h1 style={{ fontSize: '2rem' }}>This account doesn't have admin access.</h1>
        <p className="muted" style={{ marginTop: 'var(--s3)' }}>Ask the owner to add you to the admins table.</p>
        <button className="btn" style={{ marginTop: 'var(--s5)' }} onClick={async () => { await getSupabase()!.auth.signOut(); router.replace('/admin/login'); }}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <Link href="/" className="brand"><BrandMark /></Link>
        <nav>{NAV.map(([h, l]) => <Link key={h} href={h} aria-current={path === h ? 'page' : undefined}>{l}</Link>)}</nav>
        <button className="btn btn-sm" style={{ borderColor: 'var(--mist)', color: 'var(--mist)', marginTop: 'auto' }}
          onClick={async () => { await getSupabase()!.auth.signOut(); router.replace('/admin/login'); }}>Sign out</button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
