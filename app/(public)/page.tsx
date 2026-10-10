import Link from 'next/link';
import Orbit from '@/components/Orbit';
import AwardIcon from '@/components/AwardIcon';
import PackageCards from '@/components/PackageCards';
import PortfolioGrid from '@/components/PortfolioGrid';
import CtaBand from '@/components/CtaBand';
import { getSite, getPackages, getPortfolio, getTestimonials } from '@/lib/data';
import { NOTABLE_EVENTS, YEARS } from '@/lib/placeholder';

export const revalidate = 300;

export default async function Home() {
  const [site, packages, portfolio, testimonials] = await Promise.all([getSite(), getPackages(), getPortfolio(), getTestimonials()]);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <h1>Every spin, a memory.</h1>
            <p className="lede">{site.intro}</p>
            <div className="actions">
              <Link href="/book" className="btn btn-primary">Check availability</Link>
              <Link href="/packages" className="btn">See packages</Link>
            </div>
            <p className="award-line"><AwardIcon /> {site.award}</p>
            <p className="muted small" style={{ marginTop: 'var(--s2)' }}>{YEARS} years of spinning at events across {site.service_area}.</p>
          </div>
          <Orbit />
        </div>
      </section>

      <section className="band night" aria-label="Events we have worked">
        <div className="wrap" style={{ paddingBlock: 'var(--s5)' }}>
          <div className="clients">
            <span className="muted">We've been part of</span>
            {NOTABLE_EVENTS.map((e) => <strong key={e}>{e}</strong>)}
            <span className="muted">and many more weddings, debuts and corporate nights.</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>How booking works</h2>
            <p>Four steps from inquiry to the first spin at your event.</p>
          </div>
          <ol className="steps">
            <li><h3>Pick a date</h3><p>Check the calendar to see if we're free on your event day.</p></li>
            <li><h3>Send an inquiry</h3><p>Tell us the venue, event type and time. We reply within a day.</p></li>
            <li><h3>Lock in your date</h3><p>Once the downpayment is in, the date is yours.</p></li>
            <li><h3>Twirl at the event</h3><p>We arrive early to set up. Guests scan the QR code to get their videos.</p></li>
          </ol>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <h2>Packages</h2>
            <p>Every package includes a QR event gallery, so no more AirDropping videos one by one.</p>
          </div>
          <PackageCards packages={packages} />
        </div>
      </section>

      <section className="section">
        <div className="wrap services">
          <figure className="feature-photo" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/portfolio/booth-red-led.jpg" alt="TWIRL 360 platform with red LED lights" loading="lazy" />
          </figure>
          <div>
            <h2>360 video booth</h2>
            <p className="muted" style={{ marginTop: 'var(--s3)' }}>Guests stand on the platform while the camera circles them. Slow-mo, an overlay with your event details, and ready to grab by QR.</p>
          </div>
          <figure className="feature-photo" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/portfolio/wedding-prints.jpg" alt="Printed photo booth strips from a wedding" loading="lazy" />
          </figure>
          <div>
            <h2>Photo booth</h2>
            <p className="muted" style={{ marginTop: 'var(--s3)' }}>Printed strips designed for your event, so every guest takes home a souvenir. Book it together with the 360 booth.</p>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <h2>From our events</h2>
            <Link href="/portfolio" className="btn btn-sm">Full portfolio</Link>
          </div>
          <PortfolioGrid items={portfolio} limit={10} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>What clients say</h2></div>
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
