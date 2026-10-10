export type EventType = 'wedding' | 'debut' | 'corporate' | 'school' | 'birthday' | 'other';

export const EVENT_LABELS: Record<EventType, string> = {
  wedding: 'Wedding',
  debut: 'Debut',
  corporate: 'Corporate',
  school: 'School event',
  birthday: 'Birthday',
  other: 'Other',
};

export type Package = {
  id: string;
  name: string;
  hours: number;
  summary: string;
  inclusions: string[];
  price_label: string;
  featured?: boolean;
  sort: number;
};

export type PortfolioItem = {
  id: string;
  title: string;
  event_type: EventType;
  venue: string;
  media_url: string | null;
  event_date: string | null;
};

export type Testimonial = { id: string; name: string; event: string; message: string };

export type FAQ = { q: string; a: string };

export type EventVideo = { id: string; title: string; url: string; thumb: string | null };

export type EventGallery = {
  code: string;
  title: string;
  event_date: string;
  venue: string;
  videos: EventVideo[];
};

export type Booking = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  event_type: EventType;
  package_id: string | null;
  guests: number | null;
  notes: string | null;
  status: 'new' | 'confirmed' | 'done' | 'cancelled';
};

export type SiteContent = {
  business_name: string;
  tagline: string;
  intro: string;
  award: string;
  phone: string;
  email: string;
  facebook: string;
  messenger: string;
  service_area: string;
};
