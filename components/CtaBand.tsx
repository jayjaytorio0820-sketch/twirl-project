import Link from 'next/link';
export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>Christmas party season books up fast. See if your date is still open.</h2>
        <Link href="/book" className="btn">Check availability</Link>
      </div>
    </section>
  );
}
