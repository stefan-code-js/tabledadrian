import type { Metadata } from 'next';
import './globals.css';

// Define site-wide metadata. We preserve the key SEO phrasing for private chef + Côte d’Azur but allow
// easy edits later. The metadata is inserted into the head by Next.js. Feel free to adjust the
// description or keywords to fine‑tune ranking as you refine copy.
export const metadata: Metadata = {
  title: 'Table d’Adrian – Private Chef on the Côte d’Azur',
  description:
    'Michelin‑trained private chef crafting plant‑based haute cuisine in Antibes, Cannes and Monaco. Quiet luxury, longevity‑minded menus, by reservation.',
  keywords: [
    'private chef',
    'Côte d’Azur',
    'Antibes',
    'Cannes',
    'Monaco',
    'plant-based',
    'fine dining',
    'longevity cuisine',
  ],
  openGraph: {
    title: 'Table d’Adrian – Private Chef Côte d’Azur',
    description:
      'Plant‑based haute cuisine, Michelin‑trained. Antibes • Cannes • Monaco.',
    url: 'https://www.tabledadrian.com',
    siteName: 'Table d’Adrian',
    images: [
      {
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: '/images/favicon.ico',
  },
};

import dynamic from 'next/dynamic';

// Lazy-load exit-intent overlay client-side to avoid SSR mismatch. This overlay
// monitors mouse leave events and shows a consult invite to rescue inquiries.
// const ExitIntent = dynamic(() => import('@/components/ExitIntent'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Prepare structured data (JSON-LD). This defines Table d’Adrian as a local business and
  // restaurant offering plant-based fine dining in the Côte d’Azur. It aids search
  // engines in understanding your business, improving rich snippets and SEO.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Table d’Adrian',
    description:
      'Michelin‑trained private chef crafting plant‑based haute cuisine in Antibes, Cannes and Monaco. Quiet luxury, longevity‑minded menus, by reservation.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Antibes',
      addressRegion: 'Provence-Alpes-Côte d’Azur',
      addressCountry: 'France',
    },
    areaServed: ['Antibes', 'Cannes', 'Monaco', 'Côte d’Azur'],
    servesCuisine: ['Plant-based', 'Fine dining', 'Haute cuisine'],
    url: 'https://www.tabledadrian.com',
    email: 'mailto:adrian@tabledadrian.com',
    priceRange: '$$$$',
  };

  return (
    <html lang="en">
      <head>
        {/* Structured data inserted directly into the head */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* Cloudflare Turnstile loader. Only injected when a site key is present. */}
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
          <script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          />
        )}
      </head>
      <body>
        {children}
        {/* Show exit-intent overlay on all pages to rescue abandoned inquiries */}
        {/*<ExitIntent />*/}
      </body>
    </html>
  );
}