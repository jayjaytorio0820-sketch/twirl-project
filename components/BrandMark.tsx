// Logo ng TWIRL Project (galing sa FB page nila).
/* eslint-disable @next/next/no-img-element */
export default function BrandMark({ className = 'brand-logo' }: { className?: string }) {
  return <img className={className} src="/images/logo/twirl-wordmark.jpg" alt="TWIRL Project" width={640} height={301} />;
}
