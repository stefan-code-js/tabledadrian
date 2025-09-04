import Reveal from './Reveal';

/**
 * About section briefly recounts your training and service area. It reveals
 * as you scroll, using the same style for consistency. Keep this text
 * concise to maintain attention.
 */
export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2>About</h2>
        <Reveal>
          <p className="sub">
            Michelin‑trained private chef rooted in Provence. Plant‑based haute cuisine designed
            for memory and wellbeing. Based in Antibes, serving Cannes, Monaco and the
            French Riviera.
          </p>
        </Reveal>
      </div>
    </section>
  );
}