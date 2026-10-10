import Link from 'next/link';
import BrandMark from './BrandMark';
import type { SiteContent } from '@/lib/types';

export default function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <Link href="/" className="brand"><BrandMark /></Link>
          <p style={{ marginTop: 'var(--s3)', maxWidth: '40ch' }}>360 video booth and photo booth. {site.award}. Serving {site.service_area}.</p>
        </div>
        <div>
          <h3>Site</h3>
          <ul>
            <li><Link href="/packages">Packages</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/book">Check availability</Link></li>
            <li><Link href="/about">About and FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
            {site.email && <li><a href={`mailto:${site.email}`}>{site.email}</a></li>}
            <li><a href={site.facebook} target="_blank" rel="noopener">Facebook page</a></li>
            <li><a href={site.messenger} target="_blank" rel="noopener">Message on Messenger</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap small" style={{ marginTop: 'var(--s6)' }}>© {new Date().getFullYear()} {site.business_name}. Website by Stallion.</div>
    </footer>
  );
}
