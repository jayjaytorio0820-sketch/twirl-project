import type { Metadata, Viewport } from 'next';
import './globals.css';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://twirl-project.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: 'TWIRL Project | 360 Video Booth', template: '%s | TWIRL Project' },
  description: '360 video booth at photo booth sa Pampanga at kalapit na lugar. Most Outstanding 360 Video Booth Provider. Tingnan ang bakanteng dates at mag-inquire online.',
  keywords: ['360 video booth', '360 booth Pampanga', 'photo booth Pampanga', '360 booth Clark', '360 booth wedding', 'Christmas party booth', 'TWIRL Project'],
  openGraph: { type: 'website', siteName: 'TWIRL Project', locale: 'en_PH', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
  icons: { icon: [{ url: '/favicon-32.png', sizes: '32x32' }, { url: '/icon-192.png', sizes: '192x192' }], apple: '/apple-icon.png' },
};

export const viewport: Viewport = { themeColor: '#0D0B08', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fil">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Marcellus&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
