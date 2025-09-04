/**
 * Stripe webhook endpoint. Captures checkout events and forwards them to
 * downstream services (e.g. CRM, welcome emails). In production you should
 * verify the signature using STRIPE_WEBHOOK_SECRET and crypto.subtle. For
 * simplicity this example does not verify; implement HMAC check if desired.
 */
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Raw body needed for signature verification, here we just parse JSON
    const event = await req.json();
    // Only handle checkout session completed events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Forward to CRM webhook if configured, include referral code if present
      if (process.env.CRM_WEBHOOK_URL) {
        await fetch(process.env.CRM_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'membership', session, referral: session.client_reference_id || null }),
        });
      }
      // Send welcome email with both text and simple HTML
      const email = session.customer_details?.email;
      if (email) {
        const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@tabledadrian.com';
        const site = process.env.SITE_URL || '';
        const text = `Thank you for joining Table d’Adrian. Your membership is now active. You can manage your subscription at ${site}/consult or via your dashboard.`;
        const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif; background:#f7f7f7; padding:20px;">
          <div style="max-width:600px;margin:auto;background:#ffffff;border:1px solid #eaeaea;padding:20px;">
            <h2 style="margin-top:0">Welcome to Table d’Adrian</h2>
            <p>Thank you for joining our membership. Your subscription is now active.</p>
            <p>You can manage your subscription via the customer portal or by contacting us. Use the link below to access your portal:</p>
            <p><a href="${site}/consult">Open your portal</a></p>
            <p style="margin-top:24px;font-size:12px;color:#666">&mdash; Table d’Adrian</p>
          </div>
        </body></html>`;
        await fetch('https://api.mailchannels.net/tx/v1/send', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            personalizations: [{ to: [{ email }] }],
            from: { email: EMAIL_FROM, name: 'Table d’Adrian' },
            subject: 'Welcome to Table d’Adrian',
            content: [
              { type: 'text/plain', value: text },
              { type: 'text/html', value: html },
            ],
          }),
        });
      }
    }
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Webhook error' }), { status: 500 });
  }
}