# TWIRL Project, 360 Video Booth website

Built by Stallion. Next.js 15 (App Router) + Supabase + Vercel.
Tier: Booking System (Simple) + Availability Calendar, QR Event Gallery, email notifications, FB integration, SEO, speed. Design: Premium.

## Pages
| Route | Ano |
|---|---|
| `/` | Hero (360 orbit), award, notable events, paano mag-book, packages, portfolio, testimonials |
| `/packages` | Packages + add-ons |
| `/portfolio` | Portfolio na may filter: wedding, debut, corporate, school |
| `/book` | Availability calendar + inquiry form |
| `/about` | Award, kilalang events, FAQ (may FAQ schema para sa SEO) |
| `/g/[code]` | QR event gallery: i-download o i-share ng guests ang 360 video nila (may TWIRL branding ang share) |
| `/admin/*` | Dashboard, bookings at status, calendar blocking, event galleries + video upload + QR, packages, portfolio, testimonials, site content |

## Preview mode
Kapag walang Supabase env vars, gumagana ang site gamit ang placeholder data (`lib/placeholder.ts`), demo booked dates, at `/g/demo`. Hindi nase-save ang inquiries sa preview mode.

## Setup
1. `npm install`
2. Supabase: i-apply ang `supabase/migrations/*.sql` nang sunod-sunod.
3. Gumawa ng user sa Supabase Auth, tapos: `insert into admins (user_id, role) values ('<user id>', 'owner');`
4. Kopyahin ang `.env.example` bilang `.env.local` at punuin.
5. `npm run dev`

## Security
- May RLS ang bawat table. Insert lang ang pwede sa `bookings` para sa public. Walang public read sa personal info.
- Petsa lang ang nakikita ng public calendar, sa pamamagitan ng `unavailable_dates()` RPC.
- Anon key lang ang nasa frontend. Huwag ilagay ang service role key sa Vercel public env.
