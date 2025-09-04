import fs from 'node:fs';
import path from 'node:path';

/**
 * Generates a simple sitemap. It enumerates the home page, the journal listing,
 * each blog post, and the success page. The output is served as XML. This
 * route runs at build time (Node runtime) and is cached by the deployment.
 */
export async function GET() {
  const baseUrl = 'https://www.tabledadrian.com';
  const staticPaths = [
    '',
    '/journal',
    '/success',
    '/press',
    '/reserve',
    '/consult',
    '/membership'
  ];
  // Read markdown posts to create individual URLs
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  let postPaths: string[] = [];
  try {
    const files = fs.readdirSync(postsDir);
    postPaths = files
      .filter((f) => f.endsWith('.md'))
      .map((f) => '/journal/' + f.replace(/\.md$/, ''));
  } catch (err) {
    // ignore if posts directory missing
    postPaths = [];
  }
  const urls = [...staticPaths, ...postPaths].map((p) => {
    const loc = `${baseUrl}${p}`;
    return `<url><loc>${loc}</loc></url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    '\n'
  )}\n</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}