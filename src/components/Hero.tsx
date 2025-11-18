'use client';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading - No Animation */}
          <h1 className="text-5xl md:text-6xl font-serif text-text-primary mb-8 font-bold tracking-tight">
            Luxury Private Chef Services
            <br />
            <span className="text-accent-primary">
              Personalized Culinary Excellence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-text-secondary mb-12 leading-relaxed max-w-3xl mx-auto">
            Experience personalized culinary excellence with Table d&apos;Adrian.
            <br className="hidden md:block" />
            Professional private chef for exclusive events, dinner parties, and weekly meal preparation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              Book Your Private Chef
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
