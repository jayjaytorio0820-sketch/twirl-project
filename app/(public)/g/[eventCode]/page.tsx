// QR destination: dito napupunta ang guests pag-scan ng QR sa event.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import VideoCard from '@/components/VideoCard';
import { getGallery } from '@/lib/data';

export const dynamic = 'force-dynamic';
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export async function generateMetadata({ params }: { params: Promise<{ eventCode: string }> }) {
  const { eventCode } = await params;
  const g = await getGallery(eventCode);
  return { title: g ? `${g.title} 360 videos` : 'Event gallery', robots: { index: false } };
}

export default async function GalleryPage({ params }: { params: Promise<{ eventCode: string }> }) {
  const { eventCode } = await params;
  const g = await getGallery(eventCode);
  if (!g) notFound();
  const [y, m, d] = g.event_date.split('-').map(Number);
  const base = process.env.NEXT_PUBLIC_SITE_URL || '';
  const url = `${base}/g/${g.code}`;
  return (
    <>
      <section className="gal-head"><div className="wrap">
        <p className="muted">360 videos from</p>
        <h1>{g.title}</h1>
        <p className="muted">{MONTHS[m - 1]} {d}, {y}, {g.venue}</p>
        {g.code === 'demo' && <p className="notice warn" style={{ marginTop: 'var(--s4)', display: 'inline-block' }}>This is a sample gallery. At a real event, guests' videos appear here.</p>}
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        {g.videos.length === 0
          ? <p className="muted" style={{ textAlign: 'center' }}>Videos are still uploading. Check back on this page later.</p>
          : <div className="vgrid">{g.videos.map((v) => <VideoCard key={v.id} video={v} eventTitle={g.title} galleryUrl={url} />)}</div>}
        <div className="panel" style={{ marginTop: 'var(--s7)', textAlign: 'center' }}>
          <h3>Planning your own event?</h3>
          <p className="muted" style={{ margin: 'var(--s2) 0 var(--s4)' }}>Get a 360 booth for your own celebration.</p>
          <Link href="/book" className="btn btn-primary">Check availability</Link>
        </div>
      </div></section>
    </>
  );
}
