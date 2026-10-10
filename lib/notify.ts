// Email notification sa TWIRL kapag may bagong inquiry (Resend REST API). Skip kung walang key.
type Inquiry = { name: string; phone: string; email: string | null; event_date: string; start_time: string; end_time: string; venue: string; event_type: string; package_id: string | null; guests: number | null; notes: string | null };

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

export async function notifyNewInquiry(b: Inquiry) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;
  const rows: [string, string][] = [
    ['Name', b.name], ['Mobile', b.phone], ['Email', b.email ?? '—'], ['Date', b.event_date],
    ['Time', `${b.start_time} to ${b.end_time}`], ['Venue', b.venue], ['Event', b.event_type],
    ['Package', b.package_id ?? 'Not sure yet'], ['Guests', b.guests ? String(b.guests) : '—'], ['Notes', b.notes ?? '—'],
  ];
  const html = `<h2>New inquiry: ${esc(b.event_date)}</h2><table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join('')}</table>`;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.NOTIFY_FROM || 'TWIRL Website <onboarding@resend.dev>', to: [to], subject: `New inquiry: ${b.event_type}, ${b.event_date}`, html }),
  });
}
