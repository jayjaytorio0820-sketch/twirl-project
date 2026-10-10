// POST: i-save ang inquiry sa bookings table + email notification sa TWIRL.
import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { notifyNewInquiry } from '@/lib/notify';

const TYPES = ['wedding', 'debut', 'corporate', 'school', 'birthday', 'other'];
const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const b = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 30),
    email: clean(body.email, 160) || null,
    event_date: clean(body.event_date, 10),
    start_time: clean(body.start_time, 5),
    end_time: clean(body.end_time, 5),
    venue: clean(body.venue),
    event_type: clean(body.event_type, 20),
    package_id: clean(body.package_id, 40) || null,
    guests: body.guests ? Math.max(1, Math.min(5000, Number(body.guests) || 0)) || null : null,
    notes: clean(body.notes, 2000) || null,
  };

  if (b.name.length < 2 || b.phone.length < 7 || b.venue.length < 2) return NextResponse.json({ error: 'Kulang ang pangalan, mobile number o venue.' }, { status: 400 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.event_date)) return NextResponse.json({ error: 'Pumili ng date sa calendar.' }, { status: 400 });
  if (!/^\d{2}:\d{2}$/.test(b.start_time) || !/^\d{2}:\d{2}$/.test(b.end_time) || b.end_time <= b.start_time) return NextResponse.json({ error: 'Pakitingnan ulit ang oras ng booth.' }, { status: 400 });
  if (!TYPES.includes(b.event_type)) return NextResponse.json({ error: 'Pumili ng uri ng event.' }, { status: 400 });

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: true, demo: true });

  const { error } = await sb.from('bookings').insert(b);
  if (error) {
    console.error('booking insert', error.message);
    return NextResponse.json({ error: 'Hindi na-save ang inquiry.' }, { status: 500 });
  }
  await notifyNewInquiry(b).catch((e) => console.error('notify', e));
  return NextResponse.json({ ok: true });
}
