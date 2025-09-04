import Link from 'next/link';
import { FiInstagram, FiMail, FiMapPin } from 'react-icons/fi';

// Lazy-load cookie consent on the client to avoid hydration mismatches. The component
// displays a banner and handles analytics script injection once the user accepts.
// const CookieConsent = dynamic(() => import('./CookieConsent'), { ssr: false });

/**
 * Footer containing contact details, quick links and Instagram handle. It uses semantic
 * markup and ensures accessibility by providing descriptive icons.
 */
export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-grid">
        <div>
          <strong>Table d’Adrian</strong>
          <br />
          Private chef · plant‑based haute cuisine
          <br />
          <span>
            <FiMapPin style={{ marginRight: 6 }} /> Antibes · Cannes · Monaco
          </span>
        </div>
        <div>
          <div>
            <FiMail style={{ marginRight: 6 }} />{' '}
            <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>
          </div>
          <div style={{ marginTop: 8 }}>
            <FiInstagram style={{ marginRight: 6 }} />
            <a
              href="https://instagram.com/tabledadrian"
              target="_blank"
              rel="noreferrer"
            >
              @tabledadrian
            </a>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Link href="/journal">Journal</Link>
          <br />
          <Link href="#services">Services</Link>
          <br />
          <Link href="/press">Press</Link>
          <br />
          <Link href="/reserve">Reserve</Link>
        </div>
      </div>
      {/* Render cookie consent banner below the main footer content */}
      {/*<CookieConsent />*/}
    </footer>
  );
}