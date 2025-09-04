/**
 * Newsletter signup handler. Accepts an email and optionally a name. When a user
 * submits the signup form this route sends the details to your mailing list
 * provider via HTTP. If you don't configure a provider, the details are
 * emailed to EMAIL_TO as a fallback. The route also triggers your CRM
 * webhook if CRM_WEBHOOK_URL is set. Runs on the edge.
 */
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();
    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ ok: false, message: 'Email required' }), { status: 400 });
    }
    const provider = process.env.NEWSLETTER_PROVIDER || 'mail';
    // If using Buttondown, set BD_API_KEY. For Resend/MailChannels fallback
    if (provider === 'buttondown' && process.env.BD_API_KEY) {
      const resp = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          Authorization: `Token ${process.env.BD_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, metadata: { name } }),
      });
      if (!resp.ok) {
        console.error('Buttondown subscribe failed', await resp.text());
        // fallback to email below
      }
    }
    // Fallback: send an email to EMAIL_TO with subscriber details
    const EMAIL_TO = process.env.EMAIL_TO || 'adrian@tabledadrian.com';
    const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@tabledadrian.com';
    const text = `New newsletter signup:\n\nEmail: ${email}\nName: ${name || '-'}\n`;
    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: EMAIL_TO }] }],
        from: { email: EMAIL_FROM, name: 'Table d’Adrian' },
        subject: 'New newsletter signup',
        content: [{ type: 'text/plain', value: text }],
      }),
    });
    // CRM webhook
    if (process.env.CRM_WEBHOOK_URL) {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, name }),
      });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}