'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Credentials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const credentials = [
    {
      institution: 'EHL Swiss',
      qualification: 'Culinary Diploma',
      description: 'Graduated from École hôtelière de Lausanne, one of the world\'s leading hospitality management schools',
    },
    {
      institution: 'Stanford University',
      qualification: 'Health Certificates',
      description: 'Certified in food safety, nutrition, and health standards from Stanford University',
    },
  ];

  return (
    <section className="py-20 bg-bg-primary border-t border-border-light" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-display text-text-primary mb-12 text-center">
            Professional Credentials
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {credentials.map((cred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="card p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center">
                      <span className="text-bg-primary text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {cred.qualification}
                    </h3>
                    <p className="text-accent-primary font-semibold mb-3">
                      {cred.institution}
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {cred.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Credentials;

