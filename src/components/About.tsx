'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    label: 'Harga Grosir',
    desc: 'Tersedia harga spesial bertingkat untuk pembelian dalam jumlah besar, memastikan efisiensi pasokan bisnis atau acara Anda terjaga.',
  },
  {
    label: 'Buka Setiap Hari',
    desc: 'Melayani kebutuhan belanja harian Anda setiap saat. Kami memastikan ketersediaan barang tanpa mengenal hari libur.',
  },
  {
    label: 'Pesan WhatsApp',
    desc: 'Interaksi langsung dan personal untuk pemesanan cepat. Konsultasikan kebutuhan grosir Anda langsung dengan tim kami.',
  },
];

const listParentVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const listItemVars = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section ref={ref} id="layanan" className="bg-black pt-32 pb-40 w-full">
      <div className="w-full px-6">
        {/* Top Meta Data */}
        <div className="flex justify-between items-center text-text-muted font-heading font-bold text-[10px] uppercase tracking-widest mb-12 border-b border-border/30 pb-4">
          <span>© CAPABILITIES Layanan</span>
          <span className="hidden md:block">(WM™ — 02)</span>
          <span>GROSIR EXECUTION</span>
        </div>

        {/* Massive Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-heading font-medium text-[clamp(4rem,15vw,18rem)] leading-[0.8] tracking-tighter text-white flex items-start">
            Layanan{' '}
            <sup className="text-[clamp(1rem,4vw,4rem)] font-light mt-4 md:mt-12 ml-4">
              (3)
            </sup>
          </h2>
        </motion.div>

        {/* White Grid Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [1, 0, 0, 1] }}
          style={{ originX: 0 }}
          className="w-full bg-white text-black py-3 px-6 mb-24 md:mb-32 grid grid-cols-2 lg:grid-cols-4 font-heading font-black text-[10px] md:text-sm uppercase tracking-widest text-left md:text-center gap-4"
        >
          <span className="text-left">Precise</span>
          <span>Structured</span>
          <span className="hidden lg:block">Focused</span>
          <span className="hidden lg:block text-right">Visual Language</span>
        </motion.div>

        {/* Asymmetrical Right-Aligned List */}
        <motion.div
          variants={listParentVars}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row w-full"
        >
          {/* Left Empty Space (Crucial for the Palmer Look) */}
          <div className="hidden md:block md:w-5/12 lg:w-1/2"></div>

          {/* Right Content */}
          <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col gap-16 md:gap-24">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.label}
                variants={listItemVars}
                className="grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_1fr] gap-6 md:gap-12 lg:gap-16 items-start"
              >
                {/* Number */}
                <span className="font-heading font-bold text-sm md:text-base text-white tracking-tighter w-12">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <h3 className="font-heading font-medium text-xl md:text-2xl text-white tracking-tight leading-snug">
                  {feature.label}
                </h3>

                {/* Description */}
                <p className="font-serif text-sm md:text-base text-text-muted leading-relaxed lg:max-w-[300px]">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
