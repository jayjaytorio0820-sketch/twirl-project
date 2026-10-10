import Link from 'next/link';
export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>Mabilis mapuno ang Christmas party season. Tingnan kung bakante pa ang date mo.</h2>
        <Link href="/book" className="btn">Check availability</Link>
      </div>
    </section>
  );
}
