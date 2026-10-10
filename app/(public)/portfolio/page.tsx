import PortfolioGrid from '@/components/PortfolioGrid';
import CtaBand from '@/components/CtaBand';
import { getPortfolio } from '@/lib/data';

export const metadata = { title: 'Portfolio', description: 'Photos and 360 videos from TWIRL Project weddings, debuts, corporate and school events.' };
export const revalidate = 300;

export default async function PortfolioPage() {
  const items = await getPortfolio();
  return (
    <>
      <section className="page-head"><div className="wrap">
        <h1>Portfolio</h1>
        <p className="prose">Pick an event type to see what we've shot.</p>
      </div></section>
      <section className="section" style={{ paddingTop: 'var(--s4)' }}><div className="wrap">
        <PortfolioGrid items={items} />
      </div></section>
      <CtaBand />
    </>
  );
}
