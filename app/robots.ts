import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://twirl-project.vercel.app';
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/g/'] }], sitemap: `${base}/sitemap.xml` };
}
