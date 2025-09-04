import Reveal from './Reveal';

/**
 * Testimonials section displays brief quotes from clients. Use italic styling
 * and include the initials and city for authenticity. Each quote reveals when
 * scrolled into view.
 */
export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <h2>Testimonials</h2>
        <div className="grid-3" style={{ marginTop: 18 }}>
          <Reveal>
            <p className="card testi">
              “A quiet symphony. We woke rested and clear.”
              <cite>— L. D., Cap d’Antibes</cite>
            </p>
          </Reveal>
          <Reveal>
            <p className="card testi">
              “Composed like chamber music — texture, aroma, light.”
              <cite>— M. R., Monaco</cite>
            </p>
          </Reveal>
          <Reveal>
            <p className="card testi">
              “The service disappeared; the memories remained.”
              <cite>— A. P., Cannes</cite>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}