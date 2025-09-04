import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Metadata } from 'next';
import ConsultCTA from '@/components/ConsultCTA';

interface PostPageProps {
  params: { slug: string };
}

/**
 * Renders an individual journal post. Uses marked to convert markdown to HTML. At
 * the bottom there’s a shareable link so you can copy it into your Instagram bio or stories.
 */
export default function PostPage({ params }: PostPageProps) {
  const file = path.join(process.cwd(), 'content', 'posts', `${params.slug}.md`);
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const html = marked.parse(content);
  return (
    <div className="container" style={{ padding: '96px 0' }}>
      <h1>{(data as any).title}</h1>
      <p className="sub">{(data as any).date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {/* Encourage readers to book a consult after engaging with this article */}
      <ConsultCTA />
      <hr style={{ margin: '32px 0', borderColor: '#e8e8e8' }} />
      <p>
        Copy link to share on Instagram bio/stories:{' '}
        <a href={`https://www.tabledadrian.com/journal/${params.slug}`}>
          tabledadrian.com/journal/{params.slug}
        </a>
      </p>
    </div>
  );
}

/**
 * Generate per-post metadata for SEO and social sharing. Reads the markdown
 * front matter to populate title and excerpt. The URL includes the slug.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const file = path.join(process.cwd(), 'content', 'posts', `${params.slug}.md`);
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const { data } = matter(raw);
    const title = (data as any).title || 'Journal entry';
    const description = (data as any).excerpt || 'Insights from Table d’Adrian';
    const url = `https://www.tabledadrian.com/journal/${params.slug}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: 'Table d’Adrian',
        images: [
          {
            url: '/images/og.jpg',
            width: 1200,
            height: 630,
          },
        ],
      },
    } as Metadata;
  } catch {
    return {};
  }
}