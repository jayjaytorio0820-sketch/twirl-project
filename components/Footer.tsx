import Link from 'next/link';
import BrandMark from './BrandMark';
import type { SiteContent } from '@/lib/types';

export default function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <Link href="/" className="brand"><BrandMark /> {site.business_name}</Link>
          <p style={{ marginTop: 'var(--s3)', maxWidth: '40ch' }}>{site.award}. Serving {site.service_area}.</p>
        </div>
        <div>
          <h3>Site</h3>
          <ul>
            <li><Link href="/packages">Packages</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/book">Check availability</Link></li>
            <li><Link href="/about">About at FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a href={site.facebook} target="_blank" rel="noopener">Facebook page</a></li>
            <li><a href={site.messenger} target="_blank" rel="noopener">Message sa Messenger</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap small" style={{ marginTop: 'var(--s6)' }}>© {new Date().getFullYear()} {site.business_name}. Website by Stallion.</div>
    </footer>
  );
}
