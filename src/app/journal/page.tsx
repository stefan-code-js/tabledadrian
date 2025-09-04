import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

/**
 * JournalPage reads Markdown files from the /content/posts directory at build time and
 * generates a grid of post previews. Each preview links to its detailed page.
 */
export default function JournalPage() {
  const dir = path.join(process.cwd(), 'content', 'posts');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const posts: Post[] = files
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: (data as any).title || slug,
        date: (data as any).date || '',
        excerpt:
          (data as any).excerpt ||
          content
            .replace(/\n+/g, ' ')
            .slice(0, 160)
            .trim() + '…',
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return (
    <div className="container" style={{ padding: '96px 0' }}>
      <h1>Journal</h1>
      <p className="sub">
        Essays on multi‑sensory dining, biotech and longevity. Shareable to Instagram via
        your link in bio.
      </p>
      <div className="grid-3" style={{ marginTop: 24 }}>
        {posts.map((p) => (
          <article key={p.slug} className="card">
            <h3 style={{ marginBottom: 6 }}>{p.title}</h3>
            <div style={{ color: '#666', fontSize: '.95rem' }}>{p.date}</div>
            <p style={{ margin: '10px 0 12px' }}>{p.excerpt}</p>
            <Link href={`/journal/${p.slug}`} className="button">
              Read
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}