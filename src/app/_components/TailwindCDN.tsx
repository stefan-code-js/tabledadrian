'use client';
import Script from 'next/script';
export default function TailwindCDN() {
  return <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />;
}
