// Data access: Supabase kapag naka-configure, placeholder kapag hindi pa (preview mode).
import { getSupabase } from './supabase';
import * as P from './placeholder';
import type { Package, PortfolioItem, Testimonial, SiteContent, EventGallery } from './types';

export async function getSite(): Promise<SiteContent> {
  const sb = getSupabase();
  if (!sb) return P.SITE;
  const { data } = await sb.from('site_content').select('key,value');
  if (!data?.length) return P.SITE;
  const map = Object.fromEntries(data.map((r: { key: string; value: string }) => [r.key, r.value]));
  return { ...P.SITE, ...map };
}

export async function getPackages(): Promise<Package[]> {
  const sb = getSupabase();
  if (!sb) return P.PACKAGES;
  const { data } = await sb.from('packages').select('*').order('sort');
  return data?.length ? (data as Package[]) : P.PACKAGES;
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const sb = getSupabase();
  if (!sb) return P.PORTFOLIO;
  const { data } = await sb.from('portfolio_items').select('*').order('event_date', { ascending: false });
  return data?.length ? (data as PortfolioItem[]) : P.PORTFOLIO;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const sb = getSupabase();
  if (!sb) return P.TESTIMONIALS;
  const { data } = await sb.from('testimonials').select('id,name,event,message').eq('approved', true);
  return data?.length ? (data as Testimonial[]) : P.TESTIMONIALS;
}

export async function getGallery(code: string): Promise<EventGallery | null> {
  const sb = getSupabase();
  if (!sb) return code === 'demo' ? P.DEMO_GALLERY : null;
  const { data: ev } = await sb.from('events').select('id,code,title,event_date,venue').eq('code', code).maybeSingle();
  if (!ev) return code === 'demo' ? P.DEMO_GALLERY : null;
  const { data: vids } = await sb.from('event_videos').select('id,title,storage_path,thumb_path').eq('event_id', ev.id).order('created_at');
  const pub = (p: string | null) => (p ? sb.storage.from('event-videos').getPublicUrl(p).data.publicUrl : null);
  return {
    code: ev.code, title: ev.title, event_date: ev.event_date, venue: ev.venue,
    videos: (vids ?? []).map((v: { id: string; title: string; storage_path: string; thumb_path: string | null }) => ({
      id: v.id, title: v.title, url: pub(v.storage_path)!, thumb: pub(v.thumb_path),
    })),
  };
}

export async function getUnavailableDates(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return P.demoBookedDates();
  const { data } = await sb.rpc('unavailable_dates');
  return (data ?? []).map((r: { d: string }) => r.d);
}
