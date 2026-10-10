import BookingForm from '@/components/BookingForm';
import { getPackages, getUnavailableDates } from '@/lib/data';

export const metadata = { title: 'Check availability', description: 'Tingnan ang bakanteng dates ng TWIRL Project 360 video booth at mag-send ng inquiry.' };
export const dynamic = 'force-dynamic';

export default async function BookPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const [{ package: pkg }, unavailable, packages] = await Promise.all([searchParams, getUnavailableDates(), getPackages()]);
  return (
    <>
      <section className="page-head"><div className="wrap">
        <h1>Check availability</h1>
        <p className="prose">Pumili ng date, ilagay ang detalye ng event, at sasagot kami sa loob ng isang araw.</p>
      </div></section>
      <section className="section" style={{ paddingTop: 'var(--s4)' }}><div className="wrap">
        <BookingForm unavailable={unavailable} packages={packages} initialPackage={pkg} />
      </div></section>
    </>
  );
}
