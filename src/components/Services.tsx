import Reveal from './Reveal';
import { FiClock, FiUsers, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

/**
 * Services section presents three fixed offerings with guest counts, duration and starting
 * price. Each card reveals as it scrolls into view.
 */
export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <h2>Services</h2>
        <p className="sub">Fixed offerings to keep things effortless.</p>
        <div className="grid-3" style={{ marginTop: 24 }}>
          <Reveal>
            <div className="card">
              <h3>Signature Tasting</h3>
              <p>
                <FiUsers /> 6–12 guests · <FiClock /> ~3 hours
              </p>
              <p>
                Six courses of plant‑based haute cuisine. Calm service, precise pacing.
              </p>
              <p>
                <strong>From €180 per guest</strong>
              </p>
              <Link href="#contact" className="button" style={{ marginTop: 12 }}>
                Enquire <FiChevronRight />
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="card">
              <h3>Performance Dinner</h3>
              <p>
                <FiUsers /> 6–10 guests · <FiClock /> ~2.5 hours
              </p>
              <p>
                Longevity‑minded design: low glycemic arcs, ferments, aromatic pairings.
              </p>
              <p>
                <strong>From €220 per guest</strong>
              </p>
              <Link href="#contact" className="button" style={{ marginTop: 12 }}>
                Enquire <FiChevronRight />
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="card">
              <h3>Salon Supper</h3>
              <p>
                <FiUsers /> 8–16 guests · <FiClock /> ~2 hours
              </p>
              <p>
                Refined family‑style platters for intimate gatherings. Highest margin.
              </p>
              <p>
                <strong>From €120 per guest</strong>
              </p>
              <Link href="#contact" className="button" style={{ marginTop: 12 }}>
                Enquire <FiChevronRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}