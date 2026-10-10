import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="section"><div className="wrap" style={{ textAlign: 'center' }}>
      <h1 style={{ maxWidth: 'none' }}>Walang page dito.</h1>
      <p className="muted" style={{ margin: 'var(--s4) 0 var(--s5)' }}>Kung galing ka sa QR code, i-check kung tama ang link o tanungin ang booth attendant.</p>
      <Link href="/" className="btn">Bumalik sa home</Link>
    </div></section>
  );
}
