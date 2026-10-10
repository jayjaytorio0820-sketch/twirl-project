import BookingForm from '@/components/BookingForm';
import { getPackages, getUnavailableDates } from '@/lib/data';

export const metadata = { title: 'Check availability', description: 'See open dates for the TWIRL Project 360 video booth and send an inquiry.' };
export const dynamic = 'force-dynamic';

export default async function BookPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const [{ package: pkg }, unavailable, packages] = await Promise.all([searchParams, getUnavailableDates(), getPackages()]);
  return (
    <>
      <section className="page-head"><div className="wrap">
        <h1>Check availability</h1>
        <p className="prose">Pick a date, add your event details, and we'll reply within a day.</p>
      </div></section>
      <section className="section" style={{ paddingTop: 'var(--s4)' }}><div className="wrap">
        <BookingForm unavailable={unavailable} packages={packages} initialPackage={pkg} />
      </div></section>
    </>
  );
}
