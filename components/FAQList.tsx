import type { FAQ } from '@/lib/types';
export default function FAQList({ items }: { items: FAQ[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
      ))}
    </div>
  );
}
