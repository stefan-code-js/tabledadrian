'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: '/icons/instagram-icon.svg', href: 'https://instagram.com/tabledadrian' },
    { name: 'X', icon: '/icons/x_dark.svg', href: 'https://x.com/tabledadrian?s=21' },
    { name: 'Threads', icon: '/icons/threads.svg', href: 'https://www.threads.com/@tabledadrian?igshid=NTc4MTIwNjQ2YQ==' },
    { name: 'LinkedIn', icon: '/icons/linkedin.svg', href: 'https://www.linkedin.com/in/adrian-stefan-badea-82456131b/' },
    { name: 'GitHub', icon: '/icons/github_dark.svg', href: 'https://github.com/tabledadriandev' },
    { name: 'Truth Social', icon: '/icons/truthsocial.svg', href: 'https://truthsocial.com/@tabledadrian' },
    { name: 'Farcaster', icon: '/icons/Farcaster--Streamline-Simple-Icons (1).svg', href: 'https://farcaster.xyz/adrsteph.base.eth' },
    { name: 'Base', icon: '/icons/coinbase.svg', href: 'https://base.app/profile/adrsteph' },
    { name: 'Zora', icon: '/icons/zora.svg', href: 'https://zora.co/@adrianstefan' },
    { name: 'Gronda', icon: '/icons/Gronda.svg', href: 'https://chefadrianstefan.gronda.com' },
  ];

  return (
    <footer className="bg-accent-dark text-bg-primary py-16">
      <div className="container-custom">
        <div className="text-center">
          {/* Tagline */}
          <p className="text-bg-primary/80 mb-6 text-sm tracking-wide mt-8">
            Luxury Private Chef Services • Bespoke Culinary Experiences
          </p>
          
          {/* Coin Link */}
          <div className="mb-10">
            <Link
              href="/coin"
              className="text-bg-primary/90 hover:text-bg-primary text-sm font-semibold uppercase tracking-wide transition-colors duration-300"
            >
              Table d&apos;Adrian Coin →
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
                className="w-10 h-10 bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center hover:bg-white/20 hover:text-white/90 transition-colors duration-300 rounded-md"
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </a>
            ))}
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
