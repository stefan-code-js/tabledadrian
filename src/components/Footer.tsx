'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container" style={{ textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5 }}
                >
                    <p style={{ marginBottom: 8 }}>{site.name}</p>
                    <p style={{ opacity: 0.8, margin: 0 }}>
                        Côte d’Azur • private fine dining
                    </p>

                    <p style={{ marginTop: 16 }}>
                        <Link className="link" href="mailto:adrian@tabledadrian.com">
                            adrian@tabledadrian.com
                        </Link>
                        {site.socials.instagram ? (
                            <>
                                {' • '}
                                <Link className="link" href={site.socials.instagram}>
                                    instagram
                                </Link>
                            </>
                        ) : null}
                    </p>

                    <p style={{ marginTop: 16, opacity: 0.7 }}>
                        © {year} {site.shortName}. all rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
