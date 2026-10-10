// PLACEHOLDER content para sa free preview. Papalitan ng totoong info ng TWIRL Project
// (o ie-edit sa /admin kapag naka-connect na ang Supabase).
import type { Package, PortfolioItem, Testimonial, FAQ, SiteContent, EventGallery } from './types';

export const SITE: SiteContent = {
  business_name: 'TWIRL Project',
  tagline: 'Isang ikot, isang alaala.',
  intro:
    '360 video booth para sa kasal, debut, corporate night at school events. Umiikot ang camera, kayo ang bida, at bago matapos ang gabi, nasa phone na ng guests ang video nila.',
  award: 'Most Outstanding 360 Video Booth Provider',
  phone: '0900 000 0000', // PLACEHOLDER
  email: 'hello@twirlproject.ph', // PLACEHOLDER
  facebook: 'https://www.facebook.com/share/1FBxmwisou/',
  messenger: 'https://m.me/', // PLACEHOLDER: ilagay ang m.me/<page>
  service_area: 'Metro Manila at kalapit na probinsya', // PLACEHOLDER
};

export const NOTABLE_EVENTS = ['Bojo & Anna Wedding', 'Aero Night sa Widus'];

export const PACKAGES: Package[] = [
  {
    id: 'classic', name: 'Classic Twirl', hours: 2, sort: 1,
    summary: 'Para sa intimate na celebration at maliliit na program.',
    inclusions: ['2 oras na unlimited 360 shots', 'Standard platform (hanggang 3 tao)', 'Branded video overlay', 'QR event gallery para sa guests', 'Basic props'],
    price_label: 'Rate on request', // PLACEHOLDER
  },
  {
    id: 'signature', name: 'Signature Twirl', hours: 3, sort: 2, featured: true,
    summary: 'Ang pinakakinukuha para sa kasal at debut.',
    inclusions: ['3 oras na unlimited 360 shots', 'Large platform (hanggang 5 tao)', 'Custom overlay na may pangalan at petsa', 'QR event gallery + instant sharing station', 'Themed props at LED lights', 'Booth attendant at host'],
    price_label: 'Rate on request', // PLACEHOLDER
  },
  {
    id: 'grand', name: 'Grand Twirl', hours: 4, sort: 3,
    summary: 'Para sa corporate events, Christmas parties at malalaking crowd.',
    inclusions: ['4 oras na unlimited 360 shots', 'Large platform + backdrop', 'Company-branded overlay at intro', 'QR event gallery na may company logo', 'Slow-mo at boomerang effects', '2 booth attendants', 'Lahat ng video sa isang download link'],
    price_label: 'Rate on request', // PLACEHOLDER
  },
];

export const ADDONS = ['Dagdag na oras', 'Custom backdrop', 'Red carpet at stanchions', 'Same-day highlight reel', 'Out-of-town setup']; // PLACEHOLDER

export const PORTFOLIO: PortfolioItem[] = [
  { id: 'p1', title: 'Bojo & Anna', event_type: 'wedding', venue: 'Venue (placeholder)', media_url: null, event_date: null },
  { id: 'p2', title: 'Aero Night', event_type: 'corporate', venue: 'Widus', media_url: null, event_date: null },
  { id: 'p3', title: 'Debut ni Sofia (sample)', event_type: 'debut', venue: 'Venue (placeholder)', media_url: null, event_date: null },
  { id: 'p4', title: 'Year-end Party (sample)', event_type: 'corporate', venue: 'Venue (placeholder)', media_url: null, event_date: null },
  { id: 'p5', title: 'Senior Prom (sample)', event_type: 'school', venue: 'Venue (placeholder)', media_url: null, event_date: null },
  { id: 'p6', title: 'Garden Wedding (sample)', event_type: 'wedding', venue: 'Venue (placeholder)', media_url: null, event_date: null },
  { id: 'p7', title: '18th Birthday (sample)', event_type: 'debut', venue: 'Venue (placeholder)', media_url: null, event_date: null },
  { id: 'p8', title: 'Foundation Day (sample)', event_type: 'school', venue: 'Venue (placeholder)', media_url: null, event_date: null },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Sample client', event: 'Wedding', message: 'Placeholder: dito ilalagay ang totoong review mula sa FB page ng TWIRL Project.' },
  { id: 't2', name: 'Sample client', event: 'Corporate party', message: 'Placeholder: maikling quote tungkol sa bilis ng setup at saya ng guests.' },
  { id: 't3', name: 'Sample client', event: 'Debut', message: 'Placeholder: quote tungkol sa QR gallery at pag-download ng videos.' },
];

export const FAQS: FAQ[] = [
  { q: 'Gaano kalaking space ang kailangan?', a: 'Mga 3m x 3m para sa platform at sa ikot ng arm, plus isang saksakan malapit sa booth. (Placeholder: kumpirmahin sa TWIRL.)' },
  { q: 'Ilang oras bago ang event kayo dumarating?', a: 'Isang oras bago ang call time para sa setup at test shots. (Placeholder)' },
  { q: 'Paano makukuha ng guests ang videos nila?', a: 'May QR code sa booth at sa tables. I-scan lang at lalabas ang event gallery kung saan pwedeng i-download o i-share ang video.' },
  { q: 'Nag-o-out-of-town ba kayo?', a: 'Oo, may dagdag na transportation fee depende sa lugar. (Placeholder)' },
  { q: 'Paano mag-reserve ng date?', a: 'Mag-send ng inquiry sa Book page. Sasagot kami para kumpirmahin ang package at downpayment. Kapag bayad na ang downpayment, naka-lock na ang date ninyo.' },
];

// Demo gallery para sa QR flow (/g/demo).
export const DEMO_GALLERY: EventGallery = {
  code: 'demo',
  title: 'Bojo & Anna',
  event_date: '2026-11-21',
  venue: 'Sample venue',
  videos: Array.from({ length: 9 }, (_, i) => ({
    id: `v${i + 1}`,
    title: `Twirl #${String(i + 1).padStart(3, '0')}`,
    url: '',
    thumb: null,
  })),
};

// Demo booked dates para makita ang calendar sa preview.
export function demoBookedDates(): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let m = 0; m < 3; m++) {
    const base = new Date(now.getFullYear(), now.getMonth() + m, 1);
    [6, 13, 14, 20, 27].forEach((d) => {
      const dt = new Date(base.getFullYear(), base.getMonth(), d);
      if (dt.getDay() === 5 || dt.getDay() === 6 || d % 7 === 6) out.push(toISO(dt));
    });
  }
  return out;
}

export function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
