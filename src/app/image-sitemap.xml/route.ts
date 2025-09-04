import fs from 'fs';
import path from 'path';

/**
 * Generates an image sitemap for the gallery. Search engines use this file to
 * index your dish photography. Accessible at /image-sitemap.xml. Reads images
 * from public/images/gallery and outputs <image:image> nodes.
 */
export const runtime = 'edge';

export async function GET() {
  const site = process.env.SITE_URL || 'https://www.tabledadrian.com';
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');
  let images: string[] = [];
  try {
    images = fs
      .readdirSync(galleryDir)
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  } catch {
    images = [];
  }
  const items = images
    .map((img) => {
      return `<url><loc>${site}/images/gallery/${img}</loc><image:image><image:loc>${site}/images/gallery/${img}</image:loc></image:image></url>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${items}</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}