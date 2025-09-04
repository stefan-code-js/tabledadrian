"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

/**
 * Responsive header with logo, brand name and navigation links. On small screens a burger
 * toggles an overlay menu. The header is sticky and uses minimal design elements
 * to let your content shine.
 */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <nav className="container nav">
        {/* Brand with logo and wordmark */}
        <Link href="/" className="brand" aria-label="Table d’Adrian home">
          {/* Use a PNG logo for now; replace with an SVG when available */}
          <Image src="/images/logo.png" alt="Table d’Adrian logo" width={28} height={28} />
          <strong>Table d’Adrian</strong>
        </Link>
        {/* Mobile menu button */}
        <button
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
        {/* Desktop & mobile links */}
        <div
          className={`navlinks ${open ? 'open' : ''}`}
          onClick={() => setOpen(false)}
        >
          <Link href="#services">Services</Link>
          <Link href="#gallery">Gallery</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/press">Press</Link>
          <Link href="#about">About</Link>
          <Link href="/reserve" className="cta">
            Reserve
          </Link>
        </div>
      </nav>
    </header>
  );
}