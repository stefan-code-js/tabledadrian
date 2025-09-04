import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Membership from '@/components/Membership';
import NewsletterSignup from '@/components/NewsletterSignup';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * The home page assembles all sections into a single cohesive layout. Each component
 * handles its own styling and animations. The header and footer are constant.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Testimonials />
        <Membership />
        {/* Email capture for our Journal and pop‑ups */}
        <NewsletterSignup />
        <Contact />
      </main>
      <Footer />
    </>
  );
}