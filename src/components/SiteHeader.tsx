"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { serif } from "@/lib/fonts";
import { useGsapFade } from "@/hooks/useGsapFade";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const brandRef = useGsapFade({ delay: 0.04, y: 10 });
  const navRef = useGsapFade({ delay: 0.12, y: 12 });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const groups = [
    {
      label: "Explore",
      copy: "Story, craft, and scenes",
      links: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/experiences", label: "Experiences" },
        { href: "/gallery", label: "Gallery" },
        { href: "/reviews", label: "Reviews" },
      ],
    },
    {
      label: "Services",
      copy: "Private programs and tools",
      links: [
        { href: "/products", label: "Products" },
        { href: "/consult", label: "Consult" },
        { href: "/membership", label: "Membership" },
        { href: "/pricing-calculator", label: "Pricing Calculator" },
      ],
    },
    {
      label: "Visit",
      copy: "Reserve and connect",
      links: [
        { href: "/book", label: "Book" },
        { href: "/contact", label: "Contact" },
        { href: "/menu", label: "Menu" },
        { href: "/press", label: "Press" },
      ],
    },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href="/"
          className={`site-header__brand ${serif.className}`}
          ref={(node) => {
            brandRef.current = node as HTMLAnchorElement | null;
          }}
        >
          Table d’Adrian
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          className={`site-nav__toggle${open ? " is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          aria-label="Primary"
          className={`site-nav${open ? " is-open" : ""}`}
          ref={(node) => {
            navRef.current = node as HTMLElement | null;
          }}
        >
          {groups.map((group) => (
            <div key={group.label} className="site-nav__group">
              <span className={`site-nav__group-link ${serif.className}`}>{group.label}</span>
              <p className="site-nav__group-copy">{group.copy}</p>
              <ul className="site-nav__sublinks">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
