import PackageCards from '@/components/PackageCards';
import CtaBand from '@/components/CtaBand';
import { getPackages } from '@/lib/data';
import { ADDONS } from '@/lib/placeholder';

export const metadata = { title: 'Packages', description: '360 video booth packages ng TWIRL Project para sa wedding, debut, corporate at school events.' };
export const revalidate = 300;

export default async function PackagesPage() {
  const packages = await getPackages();
  return (
    <>
      <section className="page-head"><div className="wrap">
        <h1>Packages</h1>
        <p className="prose">Pumili ayon sa haba ng program at dami ng guests. Kung hindi sigurado, ilagay sa inquiry ang detalye ng event at irerekomenda namin ang tama.</p>
      </div></section>
      <section className="section" style={{ paddingTop: 'var(--s5)' }}><div className="wrap">
        <PackageCards packages={packages} />
      </div></section>
      <section className="section band"><div className="wrap">
        <div className="section-head"><h2>Add-ons</h2><p>Pwedeng idagdag sa kahit anong package.</p></div>
        <div className="clients">{ADDONS.map((a) => <strong key={a} style={{ fontSize: '1.1rem' }}>{a}</strong>)}</div>
      </div></section>
      <CtaBand />
    </>
  );
}
