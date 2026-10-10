import PackageCards from '@/components/PackageCards';
import CtaBand from '@/components/CtaBand';
import { getPackages } from '@/lib/data';
import { ADDONS } from '@/lib/placeholder';

export const metadata = { title: 'Packages', description: 'TWIRL Project 360 video booth packages for weddings, debuts, corporate and school events.' };
export const revalidate = 300;

export default async function PackagesPage() {
  const packages = await getPackages();
  return (
    <>
      <section className="page-head"><div className="wrap">
        <h1>Packages</h1>
        <p className="prose">Choose by program length and guest count. Not sure? Add your event details to the inquiry and we'll recommend the right one.</p>
      </div></section>
      <section className="section" style={{ paddingTop: 'var(--s5)' }}><div className="wrap">
        <PackageCards packages={packages} />
      </div></section>
      <section className="section band"><div className="wrap">
        <div className="section-head"><h2>Add-ons</h2><p>Add these to any package.</p></div>
        <div className="clients">{ADDONS.map((a) => <strong key={a} style={{ fontSize: '1.1rem' }}>{a}</strong>)}</div>
      </div></section>
      <CtaBand />
    </>
  );
}
