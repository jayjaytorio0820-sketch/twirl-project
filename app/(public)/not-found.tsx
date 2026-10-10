import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="section"><div className="wrap" style={{ textAlign: 'center' }}>
      <h1 style={{ maxWidth: 'none' }}>This page doesn't exist.</h1>
      <p className="muted" style={{ margin: 'var(--s4) 0 var(--s5)' }}>If you came from a QR code, check the link or ask the booth attendant.</p>
      <Link href="/" className="btn">Back to home</Link>
    </div></section>
  );
}
