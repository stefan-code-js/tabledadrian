/**
 * Simple robots.txt generator. Allow all crawling and reference sitemap.
 */
export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: https://www.tabledadrian.com/sitemap.xml`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}