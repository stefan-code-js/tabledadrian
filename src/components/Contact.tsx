'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Check, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';
import { XIcon, ThreadsIcon, TruthSocialIcon, FarcasterIcon, BaseIcon, ZoraIcon, GrondaIcon } from './SocialIcons';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    service: 'private-event',
    dietary: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage('Sending your inquiry...');
    
    try {
      // Check if EmailJS is configured
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email service is not configured. Please set up EmailJS environment variables.');
      }

      // Format service type for display
      const serviceTypes: { [key: string]: string } = {
        'private-event': 'Private Event / Dinner Party',
        'meal-prep': 'Weekly Meal Preparation',
        'corporate': 'Corporate Event',
        'special-occasion': 'Special Occasion',
      };

      const serviceTypeDisplay = serviceTypes[formData.service] || formData.service;

      // Prepare template parameters
      // Note: Make sure your EmailJS template has "To Email" set to adrian@tabledadrian.com
      // OR use a template parameter like {{to_email}} if your template supports it
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        event_date: formData.date || 'Not specified',
        guests: formData.guests || 'Not specified',
        service_type: serviceTypeDisplay,
        dietary: formData.dietary || 'None',
        message: formData.message || 'No additional information',
        to_email: 'adrian@tabledadrian.com',
        reply_to: formData.email,
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (result.status === 200) {
        setStatusMessage('Thank you! Your inquiry has been sent. We will get back to you shortly.');
        setFormData({
          name: '', email: '', phone: '', date: '', guests: '', service: 'private-event', dietary: '', message: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err: any) {
      console.error('Error sending email:', err);
      
      // Provide more specific error messages
      let errorMessage = 'Sorry, something went wrong. Please try again later.';
      
      if (err.message?.includes('not configured')) {
        errorMessage = 'Email service is not configured. Please contact the website administrator.';
      } else if (err.text) {
        errorMessage = `Error: ${err.text}. Please check your EmailJS configuration.`;
      } else if (err.message) {
        errorMessage = `Error: ${err.message}`;
      }
      
      setStatusMessage(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="contact" className="section-padding bg-bg-primary">
      <div className="container-custom" ref={ref as any}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display text-text-primary mb-6">
            Book Your Private Chef Experience
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Ready to elevate your next event? Contact us to discuss your culinary needs 
            and let us create an unforgettable dining experience for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="bg-white border border-border-light p-8 md:p-10 rounded-md"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-display text-text-primary mb-6"
            >
              How to Book Your Private Chef
            </motion.h3>

            <form onSubmit={handleSubmit} className="space-y-6" aria-describedby="form-status">
              {/* Live status region */}
              <div id="form-status" aria-live="polite" className="sr-only">
                {statusMessage}
              </div>

              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="form-input"
                      placeholder="John Smith"
                    />
                    <motion.div
                      animate={{
                        scale: focusedField === 'name' ? 1 : 0,
                        opacity: focusedField === 'name' ? 1 : 0,
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Check size={20} className="text-accent-primary" strokeWidth={2} />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="form-input"
                      placeholder="john@example.com"
                    />
                    <motion.div
                      animate={{
                        scale: focusedField === 'email' ? 1 : 0,
                        opacity: focusedField === 'email' ? 1 : 0,
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Mail size={20} className="text-accent-primary" strokeWidth={2} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Phone & Date Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="form-input"
                      placeholder="+33615963046"
                    />
                    <motion.div
                      animate={{
                        scale: focusedField === 'phone' ? 1 : 0,
                        opacity: focusedField === 'phone' ? 1 : 0,
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Phone size={20} className="text-accent-primary" strokeWidth={2} />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Event Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('date')}
                      onBlur={() => setFocusedField(null)}
                      className="form-input"
                    />
                    <motion.div
                      animate={{
                        scale: focusedField === 'date' ? 1 : 0,
                        opacity: focusedField === 'date' ? 1 : 0,
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Calendar size={20} className="text-accent-primary" strokeWidth={2} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Service Type & Guests Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Service Type *
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="private-event">Private Event / Dinner Party</option>
                    <option value="meal-prep">Weekly Meal Preparation</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="special-occasion">Special Occasion</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    value={formData.guests}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="8"
                  />
                </motion.div>
              </div>

              {/* Dietary Requirements */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Dietary Requirements or Preferences
                </label>
                <input
                  type="text"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Vegetarian, Gluten-free, Allergies"
                />
              </motion.div>

              {/* Message */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Additional Information
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input resize-none"
                  placeholder="Tell us about your event, menu preferences, or any special requests..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: submitting ? 1 : 1.05 }}
                  whileTap={{ scale: submitting ? 1 : 0.95 }}
                  disabled={submitting}
                  className={`btn-primary w-full ${submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {submitting ? 'Sending…' : 'Send Booking Inquiry'}
                </motion.button>
                {statusMessage && (
                  <p className="mt-3 text-sm text-text-secondary" aria-live="polite">{statusMessage}</p>
                )}
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info & FAQ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-border-light p-8 rounded-md"
            >
              <h3 className="text-2xl font-serif text-text-primary mb-6">
                Get in Touch Directly
              </h3>
              
              <div className="space-y-4">
                <a
                  href="tel:+33615963046"
                  className="flex items-center gap-4 text-text-primary hover:text-white/80 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center rounded-md">
                    <Phone size={24} className="text-accent-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <p className="text-sm text-text-secondary">+33615963046</p>
                  </div>
                </a>

                <a
                  href="mailto:adrian@tabledadrian.com"
                  className="flex items-center gap-4 text-text-primary hover:text-white/80 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center rounded-md">
                    <Mail size={24} className="text-accent-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p className="text-sm text-text-secondary">adrian@tabledadrian.com</p>
                  </div>
                </a>

                <div
                  className="flex items-center gap-4 text-text-primary"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center rounded-md">
                    <MapPin size={24} className="text-accent-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold">Service Areas</p>
                    <p className="text-sm text-text-secondary">London, UK & Europe</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-border-light">
                <p className="text-sm font-semibold text-text-primary mb-4">Follow Our Culinary Journey</p>
                <div className="flex gap-4">
                  {[
                    { name: 'instagram', Icon: Instagram, href: 'https://instagram.com/tabledadrian' },
                    { name: 'x', Icon: XIcon, href: 'https://x.com/tabledadrian?s=21' },
                    { name: 'threads', Icon: ThreadsIcon, href: 'https://www.threads.com/@tabledadrian?igshid=NTc4MTIwNjQ2YQ==' },
                    { name: 'linkedin', Icon: Linkedin, href: 'https://www.linkedin.com/in/adrian-stefan-badea-82456131b/' },
                    { name: 'github', Icon: Github, href: 'https://github.com/tabledadriandev' },
                    { name: 'truth-social', Icon: TruthSocialIcon, href: 'https://truthsocial.com/@tabledadrian' },
                    { name: 'farcaster', Icon: FarcasterIcon, href: 'https://farcaster.xyz/adrsteph.base.eth' },
                    { name: 'base', Icon: BaseIcon, href: 'https://base.app/profile/adrsteph' },
                    { name: 'zora', Icon: ZoraIcon, href: 'https://zora.co/@adrianstefan' },
                    { name: 'gronda', Icon: GrondaIcon, href: 'https://chefadrianstefan.gronda.com' }
                  ].map(({ name, Icon, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${name}`}
                      className="w-10 h-10 bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center hover:bg-white/20 hover:text-white/90 transition-colors duration-300 rounded-md"
                    >
                      <Icon size={20} className="text-accent-primary" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Booking Process - OPUS style, no bullets */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-border-light p-8 rounded-md"
            >
              <h3 className="text-2xl font-serif text-text-primary mb-6">
                The Booking Process
              </h3>
              
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Initial Consultation', desc: 'Discuss your event details and culinary preferences' },
                  { step: '2', title: 'Menu Proposal', desc: 'Receive a customized menu tailored to your needs' },
                  { step: '3', title: 'Confirmation', desc: 'Finalize details and secure your booking' },
                  { step: '4', title: 'Preparation', desc: 'Our chef handles all shopping and preparation' },
                  { step: '5', title: 'Service', desc: 'Enjoy your private chef experience' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center text-bg-primary font-semibold">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{item.title}</p>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
