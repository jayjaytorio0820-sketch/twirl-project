import AwardIcon from '@/components/AwardIcon';
import FAQList from '@/components/FAQList';
import CtaBand from '@/components/CtaBand';
import { getSite } from '@/lib/data';
import { FAQS, NOTABLE_EVENTS } from '@/lib/placeholder';

export const revalidate = 300;
export const metadata = { title: 'About and FAQ', description: 'Meet TWIRL Project, Most Outstanding 360 Video Booth Provider.' };

export default async function AboutPage() {
  const site = await getSite();
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <section className="page-head"><div className="wrap">
        <h1>About TWIRL</h1>
        <p className="prose">{/* PLACEHOLDER: kuwento ng TWIRL Project */}For four years, TWIRL Project has been spinning at weddings, debuts, reunions, awards nights and school events across Pampanga and nearby areas. A 360 video booth and photo booth, run by a team that loves what they do.</p>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <figure className="feature-photo" style={{ margin: 0, aspectRatio: '16 / 9' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero/wedding-arch.jpg" alt="Floral arch entrance with the TWIRL Project backdrop at the end of the venue" />
        </figure>
      </div></section>

      <section className="section band"><div className="wrap" style={{ display: 'grid', gap: 'var(--s6)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div>
          <p className="award-line" style={{ marginTop: 0 }}><AwardIcon /> Award</p>
          <h2 style={{ marginTop: 'var(--s3)' }}>{site.award}</h2>
          <p className="muted" style={{ marginTop: 'var(--s3)' }}>Placeholder: who gave the award and when, with a photo of the certificate.</p>
        </div>
        <div>
          <h3>Some of our events</h3>
          <ul style={{ paddingLeft: '1.1rem', marginTop: 'var(--s3)' }}>
            {NOTABLE_EVENTS.map((e) => <li key={e}>{e}</li>)}
          </ul>
          <h3 style={{ marginTop: 'var(--s5)' }}>Service area</h3>
          <p className="muted" style={{ marginTop: 'var(--s2)' }}>{site.service_area}</p>
        </div>
      </div></section>

      <section className="section"><div className="wrap" style={{ maxWidth: 820 }}>
        <h2 style={{ marginBottom: 'var(--s5)' }}>Frequently asked questions</h2>
        <FAQList items={FAQS} />
      </div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <CtaBand />
    </>
  );
}
