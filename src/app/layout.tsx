import type { Metadata, Viewport } from 'next'
import { Inter, Notable } from 'next/font/google'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgress from '@/components/ScrollProgress'
import SkipLink from '@/components/SkipLink'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const notable = Notable({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: "Table d'Adrian - Luxury Private Chef Services | Personal Chef London",
  description: "Luxury private chef services by Table d'Adrian. Professional personal chef for private events, dinner parties, weekly meal prep. Michelin-trained chef serving London & Europe.",
  keywords: "private chef, personal chef, luxury chef services, private chef london, private chef for events, private chef cost, hire private chef, bespoke culinary experiences, private chef meal planning, corporate chef services",
  authors: [{ name: 'Table d\'Adrian' }],
  creator: 'Table d\'Adrian',
  publisher: 'Table d\'Adrian',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tabledadrian.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Table d'Adrian - Luxury Private Chef Services",
    description: "Bespoke culinary experiences by professional private chef. Personal dining, events, weekly meal prep. Book your luxury chef experience today.",
    url: 'https://tabledadrian.com',
    siteName: 'Table d\'Adrian',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Table d\'Adrian - Luxury Private Chef Services',
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Table d'Adrian - Private Chef Services",
    description: "Luxury private chef for exclusive events & personal dining",
    creator: '@tabledadrian',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.ico', type: 'image/x-icon' },
      { url: '/icon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/icon.ico', sizes: '180x180', type: 'image/x-icon' },
    ],
  },
  other: {
    'link:preconnect:https://fonts.gstatic.com': '',
    'link:preconnect:https://fonts.googleapis.com': '',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notable.variable}`}>
      <body className="font-sans bg-bg-primary text-text-primary antialiased">
        <SkipLink />
        <ScrollProgress />
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
