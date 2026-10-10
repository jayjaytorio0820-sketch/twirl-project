// PLACEHOLDER content para sa free preview. Papalitan ng totoong info ng TWIRL Project
// (o ie-edit sa /admin kapag naka-connect na ang Supabase).
import type { Package, PortfolioItem, Testimonial, FAQ, SiteContent, EventGallery } from './types';

export const SITE: SiteContent = {
  business_name: 'TWIRL Project',
  tagline: 'Every spin, a memory.',
  intro:
    '360 video booth and photo booth for weddings, debuts, corporate nights and school events in Pampanga and nearby areas. The camera spins, you take center stage, and before the night ends your guests already have their videos on their phones.',
  award: 'Most Outstanding 360 Video Booth Provider',
  phone: '0935 780 2687',
  email: '', // Wala pang email sa FB page; nakatago sa site hangga't blangko
  facebook: 'https://www.facebook.com/share/1FBxmwisou/',
  messenger: 'https://www.facebook.com/share/1FBxmwisou/', // PLACEHOLDER: palitan ng m.me/<page username>
  service_area: 'Pampanga and nearby areas',
};

export const YEARS = 4;

export const NOTABLE_EVENTS = ['Bojo & Anna Wedding', 'Aero Night 2026 at Widus', 'SBITC Awards Night 2026', 'UAP Clark'];

export const PACKAGES: Package[] = [
  {
    id: 'classic', name: 'Classic Twirl', hours: 2, sort: 1,
    summary: 'For intimate celebrations and short programs.',
    inclusions: ['2 hours of unlimited 360 shots', 'Standard platform (up to 3 people)', 'Branded video overlay', 'QR event gallery for guests', 'Basic props'],
    price_label: 'Rate on request', // PLACEHOLDER
  },
  {
    id: 'signature', name: 'Signature Twirl', hours: 3, sort: 2, featured: true,
    summary: 'The go-to package for weddings and debuts.',
    inclusions: ['3 hours of unlimited 360 shots', 'Large platform (up to 5 people)', 'Custom overlay with your names and date', 'QR event gallery + instant sharing station', 'Themed props and LED lights', 'Booth attendant and host'],
    price_label: 'Rate on request', // PLACEHOLDER
  },
  {
    id: 'grand', name: 'Grand Twirl', hours: 4, sort: 3,
    summary: 'For corporate events, Christmas parties and big crowds.',
    inclusions: ['4 hours of unlimited 360 shots', 'Large platform + backdrop', 'Company-branded overlay and intro', 'QR event gallery with your company logo', 'Slow-mo and boomerang effects', '2 booth attendants', 'Every video in one download link'],
    price_label: 'Rate on request', // PLACEHOLDER
  },
];

export const ADDONS = ['Extra hour', 'Custom backdrop', 'Red carpet and stanchions', 'Same-day highlight reel', 'Out-of-town setup']; // PLACEHOLDER

// Mga photo mula sa FB page ng TWIRL Project. Placeholder ang ilang label ng event.
export const PORTFOLIO: PortfolioItem[] = [
  { id: 'p1', title: 'Bride at the TWIRL backdrop', event_type: 'wedding', venue: '', media_url: '/images/portfolio/bride-backdrop.jpg', event_date: null },
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
  { id: 't1', name: 'Sample client', event: 'Wedding', message: 'Placeholder: a real review from the TWIRL Project Facebook page goes here.' },
  { id: 't2', name: 'Sample client', event: 'Corporate party', message: 'Placeholder: a short quote about the quick setup and how much the guests enjoyed it.' },
  { id: 't3', name: 'Sample client', event: 'Debut', message: 'Placeholder: a quote about the QR gallery and downloading videos.' },
];

export const FAQS: FAQ[] = [
  { q: 'How much space do you need?', a: 'About 3m x 3m for the platform and the arm swing, plus a power outlet near the booth. (Placeholder: confirm with TWIRL.)' },
  { q: 'How early do you arrive?', a: 'One hour before call time for setup and test shots. (Placeholder)' },
  { q: 'How do guests get their videos?', a: 'There is a QR code at the booth and on the tables. Guests scan it to open the event gallery, where they can download or share their video.' },
  { q: 'Where do you serve?', a: 'Pampanga and nearby areas. For venues farther away, message us for the transportation fee. (Placeholder: confirm the fee with TWIRL.)' },
  { q: 'Do you also have a photo booth?', a: 'Yes. Besides the 360 video booth, we have a photo booth with printed strips, and you can book both for the same event.' },
  { q: 'How do I reserve a date?', a: 'Send an inquiry from the Book page. We reply to confirm the package and downpayment. Once the downpayment is paid, your date is locked in.' },
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
