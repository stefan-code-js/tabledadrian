// Use edge runtime for Cloudflare Workers. MailChannels (or other HTTPS email API) is used instead of Node's
// nodemailer because Workers do not support raw sockets. This handler sends form submissions to a
// destination email defined via environment variables. A honeypot field named `company` silently
// discards bot requests. Adapted for MailChannels default API. For other providers (Resend/SendGrid),
// adjust the fetch URL and payload accordingly.
export const runtime = 'edge';

function renderText(data: Record<string, string>) {
  const holdLink = process.env.CAL_HOLD_URL ? `\nHold: ${process.env.CAL_HOLD_URL}` : '';
  return `New dinner request:\n\nName: ${data.name}\nEmail: ${data.email}\nDate: ${data.date}\nLocation: ${data.location}\nGuests: ${data.guests}\nBudget: ${data.budget}\nDiet: ${data.diet || '-'}${holdLink}\n\n— Table d’Adrian site`;
}

/**
 * Builds a basic HTML email using inline styles. The layout mirrors the plain
 * text content but presented in a simple table format. This avoids needing
 * MJML compilation at build time and still results in a beautiful, minimal
 * email. If CAL_HOLD_URL is provided a hold link is included.
 */
function renderHtml(data: Record<string, string>) {
  const holdLinkRow = process.env.CAL_HOLD_URL
    ? `<tr><td style="padding:6px 8px;font-weight:600;">Hold link</td><td style="padding:6px 8px;"><a href="${process.env.CAL_HOLD_URL}">${process.env.CAL_HOLD_URL}</a></td></tr>`
    : '';
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>New dinner request</title></head><body style="font-family:Arial, sans-serif; background:#f7f7f7; padding:24px;">
    <table style="width:100%; max-width:600px; margin:auto; background:#ffffff; border-collapse:collapse; border:1px solid #eaeaea;">
      <tr><td colspan="2" style="background:#F5F2EF; padding:16px; border-bottom:1px solid #eaeaea;"><strong>New dinner request</strong></td></tr>
      <tr><td style="padding:6px 8px;font-weight:600;">Name</td><td style="padding:6px 8px;">${data.name}</td></tr>
      <tr><td style="padding:6px 8px;font-weight:600;">Email</td><td style="padding:6px 8px;">${data.email}</td></tr>
      <tr><td style="padding:6px 8px;font-weight:600;">Date</td><td style="padding:6px 8px;">${data.date}</td></tr>
      <tr><td style="padding:6px 8px;font-weight:600;">Location</td><td style="padding:6px 8px;">${data.location}</td></tr>
      <tr><td style="padding:6px 8px;font-weight:600;">Guests</td><td style="padding:6px 8px;">${data.guests}</td></tr>
      <tr><td style="padding:6px 8px;font-weight:600;">Budget</td><td style="padding:6px 8px;">${data.budget}</td></tr>
      <tr><td style="padding:6px 8px;font-weight:600;">Diet</td><td style="padding:6px 8px;">${data.diet || '-'}</td></tr>
      ${holdLinkRow}
      <tr><td colspan="2" style="padding:12px 8px; border-top:1px solid #eaeaea; font-size:12px;">— Table d’Adrian site</td></tr>
    </table>
  </body></html>`;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Honeypot: ignore bots silently
    if (data.company && data.company.trim() !== '') {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    const EMAIL_TO = process.env.EMAIL_TO || 'adrian@tabledadrian.com';
    const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@tabledadrian.com';
    const body = {
      personalizations: [
        { to: [{ email: EMAIL_TO, name: 'Adrian' }] },
      ],
      from: { email: EMAIL_FROM, name: 'Table d’Adrian' },
      subject: `New enquiry — ${data.name} — ${data.date || ''}`,
      content: [
        { type: 'text/plain', value: renderText(data) },
        { type: 'text/html', value: renderHtml(data) },
      ],
      reply_to: { email: data.email, name: data.name },
    };
    const resp = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      return new Response(JSON.stringify({ ok: false }), { status: 500 });
    }
    // Push to CRM webhook if configured
    if (process.env.CRM_WEBHOOK_URL) {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'inquiry', data }),
      });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}