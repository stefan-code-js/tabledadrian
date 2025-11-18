'use client';

import Image from 'next/image';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', Icon: Instagram, href: 'https://instagram.com/tabledadrian' },
    { name: 'Twitter', Icon: Twitter, href: 'https://twitter.com/tabledadrian' },
    { name: 'LinkedIn', Icon: Linkedin, href: 'https://linkedin.com/company/tabledadrian' },
  ];

  return (
    <footer className="bg-accent-dark text-bg-primary py-16">
      <div className="container-custom">
        <div className="text-center">
          {/* Logo */}
          <div className="relative h-12 w-48 mx-auto mb-8 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Table d'Adrian"
              width={192}
              height={48}
              className="object-contain h-full w-auto brightness-0 invert"
              style={{ maxHeight: '48px' }}
            />
          </div>

          {/* Tagline */}
          <p className="text-bg-primary/80 mb-10 text-sm tracking-wide">
            Luxury Private Chef Services • Bespoke Culinary Experiences
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-10">
            {socialLinks.map((social) => {
              const IconComponent = social.Icon;
              return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
                className="w-10 h-10 bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center hover:bg-accent-primary transition-colors duration-300 rounded-md"
              >
                <IconComponent 
                  size={20} 
                  className="text-bg-primary" 
                  strokeWidth={1.5}
                />
              </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-accent-primary/30 mx-auto mb-8" />

          {/* Copyright */}
          <p className="text-sm text-bg-primary/60">
            © {currentYear} Table d&apos;Adrian. All rights reserved.
          </p>

          {/* SEO Footer Links */}
          <div className="mt-6 text-xs text-bg-primary/40">
            <span>Private Chef London</span>
            <span className="mx-2">•</span>
            <span>Luxury Chef Services</span>
            <span className="mx-2">•</span>
            <span>Personal Chef UK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
