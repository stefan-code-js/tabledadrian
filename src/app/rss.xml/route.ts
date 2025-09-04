/**
 * Generates an RSS feed for your journal. Reads markdown files from the
 * content/posts directory and constructs a simple XML feed. The feed is
 * accessible at /rss.xml and is useful for press contacts or readers who
 * subscribe via RSS. Runs on the edge.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const runtime = 'edge';

export async function GET() {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  const site = process.env.SITE_URL || 'https://www.tabledadrian.com';
  const items = files
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const { data, content } = matter(raw);
      const title = (data as any).title || slug;
      const description = (data as any).excerpt || content.slice(0, 140) + '…';
      const date = (data as any).date || new Date().toISOString();
      return `<item><title><![CDATA[${title}]]></title><link>${site}/journal/${slug}</link><guid>${site}/journal/${slug}</guid><description><![CDATA[${description}]]></description><pubDate>${new Date(
        date,
      ).toUTCString()}</pubDate></item>`;
    })
    .join('');
  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Table d’Adrian Journal</title><link>${site}/journal</link><description>Essays on multi‑sensory dining, longevity and biotech.</description>${items}</channel></rss>`;
  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}