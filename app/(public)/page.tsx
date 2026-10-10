import Link from 'next/link';
import Orbit from '@/components/Orbit';
import AwardIcon from '@/components/AwardIcon';
import PackageCards from '@/components/PackageCards';
import PortfolioGrid from '@/components/PortfolioGrid';
import CtaBand from '@/components/CtaBand';
import { getSite, getPackages, getPortfolio, getTestimonials } from '@/lib/data';
import { NOTABLE_EVENTS } from '@/lib/placeholder';

export const revalidate = 300;

export default async function Home() {
  const [site, packages, portfolio, testimonials] = await Promise.all([getSite(), getPackages(), getPortfolio(), getTestimonials()]);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <h1>Isang ikot, isang alaala.</h1>
            <p className="lede">{site.intro}</p>
            <div className="actions">
              <Link href="/book" className="btn btn-primary">Check availability</Link>
              <Link href="/packages" className="btn">Tingnan ang packages</Link>
            </div>
            <p className="award-line"><AwardIcon /> {site.award}</p>
          </div>
          <Orbit />
        </div>
      </section>

      <section className="band" aria-label="Mga event na napaglingkuran">
        <div className="wrap" style={{ paddingBlock: 'var(--s5)' }}>
          <div className="clients">
            <span className="muted">Kasama kami sa</span>
            {NOTABLE_EVENTS.map((e) => <strong key={e}>{e}</strong>)}
            <span className="muted">at marami pang kasal, debut at corporate night.</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Paano mag-book</h2>
            <p>Apat na hakbang mula inquiry hanggang sa unang ikot sa event ninyo.</p>
          </div>
          <ol className="steps">
            <li><h3>Pumili ng date</h3><p>Tingnan sa calendar kung bakante pa kami sa araw ng event.</p></li>
            <li><h3>Mag-send ng inquiry</h3><p>Ilagay ang venue, uri ng event at oras. Sasagot kami sa loob ng isang araw.</p></li>
            <li><h3>I-lock ang date</h3><p>Kapag bayad na ang downpayment, sa inyo na ang date na iyon.</p></li>
            <li><h3>Twirl sa event</h3><p>Dumarating kami nang maaga para mag-setup. Pagkatapos ng event, i-scan lang ng guests ang QR code para makuha ang videos nila.</p></li>
          </ol>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <h2>Packages</h2>
            <p>Lahat ng package ay may QR event gallery, kaya hindi na kailangang mag-AirDrop isa-isa.</p>
          </div>
          <PackageCards packages={packages} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Mula sa mga event namin</h2>
            <Link href="/portfolio" className="btn btn-sm">Buong portfolio</Link>
          </div>
          <PortfolioGrid items={portfolio} limit={4} />
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head"><h2>Sabi ng mga client</h2></div>
          <div className="quotes">
            {testimonials.map((t) => (
              <blockquote key={t.id}>
                <p>{t.message}</p>
                <footer>{t.name}, {t.event}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
