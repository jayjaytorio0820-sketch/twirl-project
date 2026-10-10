// PLACEHOLDER content para sa free preview. Papalitan ng totoong info ng TWIRL Project
// (o ie-edit sa /admin kapag naka-connect na ang Supabase).
import type { Package, PortfolioItem, Testimonial, FAQ, SiteContent, EventGallery } from './types';

export const SITE: SiteContent = {
  business_name: 'TWIRL Project',
  tagline: 'Isang ikot, isang alaala.',
  intro:
    '360 video booth at photo booth para sa kasal, debut, corporate night at school events sa Pampanga at kalapit na lugar. Umiikot ang camera, kayo ang bida, at bago matapos ang gabi, nasa phone na ng guests ang video nila.',
  award: 'Most Outstanding 360 Video Booth Provider',
  phone: '0935 780 2687',
  email: '', // Wala pang email sa FB page; nakatago sa site hangga't blangko
  facebook: 'https://www.facebook.com/share/1FBxmwisou/',
  messenger: 'https://www.facebook.com/share/1FBxmwisou/', // PLACEHOLDER: palitan ng m.me/<page username>
  service_area: 'Pampanga at kalapit na lugar',
};

export const YEARS = 4;

export const NOTABLE_EVENTS = ['Bojo & Anna Wedding', 'Aero Night 2026 sa Widus', 'SBITC Awards Night 2026', 'UAP Clark'];

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

// Mga photo mula sa FB page ng TWIRL Project. Placeholder ang ilang label ng event.
export const PORTFOLIO: PortfolioItem[] = [
  { id: 'p1', title: 'Bride sa TWIRL backdrop', event_type: 'wedding', venue: '', media_url: '/images/portfolio/bride-backdrop.jpg', event_date: null },
  { id: 'p2', title: 'Mr. & Mrs.', event_type: 'wedding', venue: '', media_url: '/images/portfolio/wedding-couple.jpg', event_date: null },
  { id: 'p3', title: 'Bridesmaids', event_type: 'wedding', venue: '', media_url: '/images/portfolio/bridesmaids.jpg', event_date: null },
  { id: 'p4', title: 'Photo booth prints', event_type: 'wedding', venue: '', media_url: '/images/portfolio/wedding-prints.jpg', event_date: null },
  { id: 'p5', title: 'Aero Night 2026', event_type: 'corporate', venue: 'Widus', media_url: '/images/portfolio/aero-night-ladies.jpg', event_date: null },
  { id: 'p6', title: 'Aero Night 2026', event_type: 'corporate', venue: 'Widus', media_url: '/images/portfolio/aero-night-gents.jpg', event_date: null },
  { id: 'p7', title: 'Formal night', event_type: 'corporate', venue: '', media_url: '/images/portfolio/barong-gents.jpg', event_date: null },
  { id: 'p8', title: 'Formal night', event_type: 'corporate', venue: '', media_url: '/images/portfolio/barong-ladies.jpg', event_date: null },
  { id: 'p9', title: '50th celebration', event_type: 'birthday', venue: '', media_url: '/images/portfolio/red-gown-led.jpg', event_date: null },
  { id: 'p10', title: 'Party night', event_type: 'birthday', venue: '', media_url: '/images/portfolio/couple-red-led.jpg', event_date: null },
  { id: 'p11', title: 'Debut', event_type: 'debut', venue: '', media_url: '/images/portfolio/debut-friends.jpg', event_date: null },
  { id: 'p12', title: 'Debut setup', event_type: 'debut', venue: '', media_url: '/images/portfolio/debut-venue.jpg', event_date: null },
  { id: 'p13', title: 'School event', event_type: 'school', venue: '', media_url: '/images/portfolio/school-crowd-booth.jpg', event_date: null },
  { id: 'p14', title: 'School event', event_type: 'school', venue: '', media_url: '/images/portfolio/school-pink.jpg', event_date: null },
  { id: 'p15', title: 'Team photo', event_type: 'school', venue: '', media_url: '/images/portfolio/purple-team.jpg', event_date: null },
  { id: 'p16', title: 'Teachers celebration', event_type: 'school', venue: '', media_url: '/images/portfolio/teachers-day.jpg', event_date: null },
  { id: 'p17', title: 'Photo booth prints', event_type: 'school', venue: '', media_url: '/images/portfolio/school-prints.jpg', event_date: null },
  { id: 'p18', title: 'LED 360 platform', event_type: 'other', venue: '', media_url: '/images/portfolio/booth-red-led.jpg', event_date: null },
  { id: 'p19', title: 'Outdoor setup', event_type: 'other', venue: '', media_url: '/images/portfolio/outdoor-setup.jpg', event_date: null },
  { id: 'p20', title: 'UAP Clark', event_type: 'corporate', venue: '', media_url: '/images/portfolio/uap-clark-phone.jpg', event_date: null },
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
  { q: 'Saan kayo nagse-serve?', a: 'Pampanga at mga kalapit na lugar. Para sa mas malayong venue, mag-message para sa transportation fee. (Placeholder: kumpirmahin ang fee sa TWIRL.)' },
  { q: 'May photo booth din ba kayo?', a: 'Oo. Bukod sa 360 video booth, may photo booth din na may printed strips, at pwedeng pagsabayin sa isang event.' },
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
