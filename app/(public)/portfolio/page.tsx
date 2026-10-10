import PortfolioGrid from '@/components/PortfolioGrid';
import CtaBand from '@/components/CtaBand';
import { getPortfolio } from '@/lib/data';

export const metadata = { title: 'Portfolio', description: 'Mga 360 video mula sa kasal, debut, corporate at school events ng TWIRL Project.' };
export const revalidate = 300;

export default async function PortfolioPage() {
  const items = await getPortfolio();
  return (
    <>
      <section className="page-head"><div className="wrap">
        <h1>Portfolio</h1>
        <p className="prose">Piliin ang uri ng event para makita ang mga ikot na ginawa namin.</p>
      </div></section>
      <section className="section" style={{ paddingTop: 'var(--s4)' }}><div className="wrap">
        <PortfolioGrid items={items} />
      </div></section>
      <CtaBand />
    </>
  );
}
