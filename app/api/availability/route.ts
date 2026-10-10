// GET: booked/blocked dates para sa calendar (petsa lang, walang personal info).
import { NextResponse } from 'next/server';
import { getUnavailableDates } from '@/lib/data';
export const dynamic = 'force-dynamic';
export async function GET() {
  return NextResponse.json({ dates: await getUnavailableDates() });
}
