// PLACEHOLDER logo mark (bilog na platform + arm). Papalitan ng totoong logo ng TWIRL.
export default function BrandMark({ className = 'brand-mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="4" fill="#D6336C" />
      <circle cx="27" cy="9" r="3.2" fill="#1FA6B3" />
    </svg>
  );
}
