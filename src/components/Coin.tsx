'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

const CONTRACT_ADDRESS = '0x9cb5254319f824a2393ecbf6adcf608867aa1b07';
const BASE_SCAN_URL = `https://basescan.org/token/${CONTRACT_ADDRESS}`;
const DEXSCREENER_URL = `https://dexscreener.com/base/${CONTRACT_ADDRESS}`;

const Coin = () => {
  const [priceData, setPriceData] = useState({
    price: '0.00',
    marketCap: '0',
    volume24h: '0',
    liquidity: '0',
    holders: '0',
    supply: '0',
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Fetch token data from DexScreener API
    const fetchTokenData = async () => {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`);
        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setPriceData({
            price: parseFloat(pair.priceUsd || '0').toFixed(6),
            marketCap: formatNumber(parseFloat(pair.marketCap || '0')),
            volume24h: formatNumber(parseFloat(pair.volume?.h24 || '0')),
            liquidity: formatNumber(parseFloat(pair.liquidity?.usd || '0')),
            holders: 'Loading...',
            supply: formatNumber(parseFloat(pair.liquidity?.base || '0')),
          });
        }
      } catch (error) {
        console.error('Error fetching token data:', error);
      }
    };

    fetchTokenData();
    const interval = setInterval(fetchTokenData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  const socialLinks = [
    { name: 'X', icon: '/icons/x_dark.svg', href: 'https://x.com/tabledadrian?s=21' },
    { name: 'Farcaster', icon: '/icons/Farcaster--Streamline-Simple-Icons (1).svg', href: 'https://farcaster.xyz/adrsteph.base.eth' },
    { name: 'Base', icon: '/icons/coinbase.svg', href: 'https://base.app/profile/adrsteph' },
    { name: 'Truth Social', icon: '/icons/truthsocial.svg', href: 'https://truthsocial.com/@tabledadrian' },
    { name: 'Threads', icon: '/icons/threads.svg', href: 'https://www.threads.com/@tabledadrian?igshid=NTc4MTIwNjQ2YQ==' },
    { name: 'Zora', icon: '/icons/zora.svg', href: 'https://zora.co/@adrianstefan' },
    { name: 'GitHub', icon: '/icons/github_dark.svg', href: 'https://github.com/tabledadriandev' },
    { name: 'Gronda', icon: '/icons/Gronda.svg', href: 'https://chefadrianstefan.gronda.com' },
  ];

  return (
    <div className="bg-bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center px-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-display text-text-primary mb-6 tracking-tight"
            >
              Table d&apos;Adrian Coin
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl sm:text-3xl text-accent-primary mb-4 font-display"
            >
              TDA
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto"
            >
              <p className="text-sm text-text-secondary mb-2">Verified Contract Address</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <code className="text-text-primary font-mono text-sm sm:text-base break-all">
                  {CONTRACT_ADDRESS}
                </code>
                <a
                  href={BASE_SCAN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-primary hover:text-accent-primary/80 text-sm underline"
                >
                  View on BaseScan
                </a>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg sm:text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              The official token of Table d&apos;Adrian, your gateway to luxury culinary experiences, 
              digital innovation, and exclusive community benefits.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Live Data Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center">
              Live Market Data
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { label: 'Price (USD)', value: `$${priceData.price}` },
                { label: 'Market Cap', value: `$${priceData.marketCap}` },
                { label: '24h Volume', value: `$${priceData.volume24h}` },
                { label: 'Liquidity', value: `$${priceData.liquidity}` },
                { label: 'Holders', value: priceData.holders },
                { label: 'Supply', value: priceData.supply },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 text-center"
                >
                  <p className="text-sm text-text-secondary mb-2">{metric.label}</p>
                  <p className="text-xl md:text-2xl font-semibold text-text-primary">{metric.value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={DEXSCREENER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                View Full Chart on DexScreener
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-8 text-center"
            >
              Vision & Story
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Table d&apos;Adrian Coin represents the evolution of luxury culinary experiences into the digital age. 
                Born from our successful NFT launches, exclusive private chef events, and strategic luxury partnerships, 
                this token bridges the gap between traditional fine dining and Web3 innovation.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Our vision extends beyond the kitchen. We are building a comprehensive ecosystem where token holders 
                gain access to exclusive dining experiences, priority booking for private chef services, NFT-based 
                memberships, and integrated event ticketing. As we expand globally, Table d&apos;Adrian Coin will 
                become the cornerstone of a community that values both exceptional cuisine and forward-thinking 
                digital innovation.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                The future holds exciting possibilities: partnerships with luxury brands, expansion into new markets, 
                and the creation of unique digital assets that enhance the real-world dining experience. Every token 
                holder becomes part of this journey, with governance rights and decision-making power in the 
                direction of the Table d&apos;Adrian brand.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                This is more than a token. It is a gateway to a world where culinary excellence meets digital 
                innovation, where community members are rewarded for their loyalty, and where the future of luxury 
                dining is being written today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Whitepaper Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-8"
            >
              Whitepaper
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-text-secondary mb-8 leading-relaxed"
            >
              Our comprehensive whitepaper details the Table d&apos;Adrian Coin&apos;s purpose, economic model, 
              technical architecture, community structure, and real-world business applications. This document 
              demonstrates our commitment to transparency and trust.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card p-8 max-w-2xl mx-auto"
            >
              <h3 className="text-xl font-display text-text-primary mb-4">Key Highlights</h3>
              <ul className="text-left text-text-secondary space-y-3 mb-6">
                <li>• Purpose-driven tokenomics aligned with business growth</li>
                <li>• Technical specifications and security measures</li>
                <li>• Community governance and decision-making framework</li>
                <li>• Real-world utility and business integration plans</li>
                <li>• Roadmap for global expansion and partnerships</li>
              </ul>
              <button className="btn-primary">
                Download Whitepaper (Coming Soon)
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Business Roadmap
            </motion.h2>
            <div className="space-y-8">
              {[
                {
                  quarter: 'Q1 2024',
                  title: 'Foundation & Launch',
                  items: [
                    'Token launch on Base network',
                    'Initial liquidity provision',
                    'Community building and engagement',
                    'Partnership development',
                  ],
                },
                {
                  quarter: 'Q2 2024',
                  title: 'Integration & Expansion',
                  items: [
                    'Token integration for booking system',
                    'Loyalty and rewards program launch',
                    'First NFT-based membership tier',
                    'Enhanced community governance',
                  ],
                },
                {
                  quarter: 'Q3 2024',
                  title: 'Digital Assets & Partnerships',
                  items: [
                    'Exclusive NFT collection launch',
                    'Luxury brand partnerships',
                    'Integrated event ticketing system',
                    'Global market expansion planning',
                  ],
                },
                {
                  quarter: 'Q4 2024',
                  title: 'Scale & Innovation',
                  items: [
                    'Regulatory compliance framework',
                    'Advanced governance features',
                    'International market entry',
                    'New utility integrations',
                  ],
                },
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.quarter}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:w-1/4">
                      <h3 className="text-xl font-display text-accent-primary mb-2">
                        {milestone.quarter}
                      </h3>
                      <h4 className="text-lg font-semibold text-text-primary">
                        {milestone.title}
                      </h4>
                    </div>
                    <ul className="md:w-3/4 space-y-2">
                      {milestone.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-text-secondary flex items-start">
                          <span className="text-accent-primary mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Tokenomics
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-6">Allocation</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Community & Rewards', value: 40, color: 'bg-accent-primary' },
                    { label: 'Liquidity Pool', value: 30, color: 'bg-accent-primary/80' },
                    { label: 'Business Operations', value: 20, color: 'bg-accent-primary/60' },
                    { label: 'Team & Advisors', value: 10, color: 'bg-accent-primary/40' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-text-secondary">{item.label}</span>
                        <span className="text-text-primary font-semibold">{item.value}%</span>
                      </div>
                      <div className="w-full bg-border-light rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className={`${item.color} h-3 rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-6">Utility & Value</h3>
                <ul className="space-y-4 text-text-secondary">
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Priority booking for private chef services and events</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Exclusive access to NFT-based memberships and digital assets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Governance rights for community decision-making</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Loyalty rewards and discounts on dining experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Early access to new partnerships and exclusive events</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Real business value creation through brand growth</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Library Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Document Library
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'How to Buy', description: 'Step-by-step guide for purchasing Table d\'Adrian Coin' },
                { title: 'Holder Benefits', description: 'Complete overview of rewards and privileges for token holders' },
                { title: 'Partner Integration', description: 'Information for businesses interested in partnerships' },
                { title: 'Governance Guide', description: 'How to participate in community decision-making' },
                { title: 'Security Best Practices', description: 'Protecting your tokens and wallet security' },
                { title: 'FAQ', description: 'Frequently asked questions about the token and ecosystem' },
              ].map((doc, index) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-xl font-display text-text-primary mb-3">{doc.title}</h3>
                  <p className="text-text-secondary mb-4">{doc.description}</p>
                  <button className="text-accent-primary hover:text-accent-primary/80 text-sm font-semibold">
                    View Document →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Meet the Team
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-4">Adrian Stefan Badea</h3>
                <p className="text-accent-primary mb-4 font-semibold">Founder & Executive Chef</p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Michelin-trained chef with extensive experience in luxury hospitality and private dining. 
                  Founder of Table d&apos;Adrian, leading the brand&apos;s expansion into digital innovation 
                  while maintaining the highest standards of culinary excellence.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Adrian brings deep industry knowledge, a commitment to innovation, and a vision for 
                  integrating Web3 technology with premium culinary experiences.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-4">Advisory Board</h3>
                <p className="text-accent-primary mb-4 font-semibold">Strategic Visionaries</p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Our advisory team consists of industry leaders in blockchain technology, luxury brand 
                  management, and culinary innovation. Together, they provide strategic guidance for 
                  responsible growth and ethical business practices.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  The advisory board ensures that Table d&apos;Adrian Coin maintains the highest standards 
                  of transparency, security, and real-world value creation while advancing the brand&apos;s 
                  mission of culinary excellence.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Trust & Security
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Compliance',
                  description: 'Adherence to regulatory standards and ethical business practices',
                },
                {
                  title: 'Security',
                  description: 'Robust security measures and smart contract audits',
                },
                {
                  title: 'Transparency',
                  description: 'Open communication and verifiable business operations',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 text-center"
                >
                  <h3 className="text-xl font-display text-text-primary mb-3">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card p-8"
            >
              <p className="text-text-secondary leading-relaxed text-center">
                Table d&apos;Adrian Coin is professionally managed with a commitment to responsible innovation. 
                We prioritize security, compliance, and ethical standards in all operations. Our transparent 
                business practices ensure that token holders can trust in the long-term value and growth of 
                the Table d&apos;Adrian ecosystem.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Connect & Engage Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Connect & Engage
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-6">Social Profiles</h3>
                <div className="grid grid-cols-4 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                      aria-label={`Follow on ${social.name}`}
                    >
                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={24}
                        height={24}
                        className="object-contain mb-2"
                      />
                      <span className="text-xs text-text-secondary text-center">{social.name}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-6">Business Inquiries</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  For investor relations, media inquiries, or business partnership opportunities, please 
                  contact us through our premium contact form.
                </p>
                <Link href="/#contact" className="btn-primary inline-block">
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coin;

