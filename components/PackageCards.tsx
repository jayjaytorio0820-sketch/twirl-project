import Link from 'next/link';
import type { Package } from '@/lib/types';

export default function PackageCards({ packages }: { packages: Package[] }) {
  return (
    <div className="packages">
      {packages.map((p) => (
        <article key={p.id} className={`pkg${p.featured ? ' featured' : ''}`}>
          {p.featured && <span className="tag">Pinakakinukuha</span>}
          <h3>{p.name}</h3>
          <div className="hours">{p.hours}<span>oras</span></div>
          <p className="muted">{p.summary}</p>
          <ul>{p.inclusions.map((i) => <li key={i}>{i}</li>)}</ul>
          <p className="price">{p.price_label}</p>
          <Link href={`/book?package=${p.id}`} className={`btn${p.featured ? ' btn-primary' : ''}`}>Piliin ang {p.name}</Link>
        </article>
      ))}
    </div>
  );
}
