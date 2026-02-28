'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Pilih Produk',
    desc: 'Jelajahi katalog digital kami. Temukan ribuan produk kebutuhan sehari-hari dengan harga transparan dan stok aktual.',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Kirim Pesanan',
    desc: 'Tambahkan ke keranjang, lalu sistem kami akan merangkum dan meneruskan pesanan Anda langsung ke admin via WhatsApp.',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Ambil atau Antar',
    desc: 'Pesanan akan segera kami siapkan. Anda bisa mengambilnya langsung di warung tanpa antre, atau gunakan layanan antar lokal kami.',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
];

export default function HowToOrder() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section ref={ref} id="cara-pesan" className="w-full bg-black pt-32 pb-40">
      <div className="w-full px-6 max-w-[1600px] mx-auto">
        {/* Meta Header */}
        <div className="flex justify-between items-center text-text-muted font-heading font-bold text-[10px] uppercase tracking-widest border-b border-border/30 mb-16 pb-4">
          <span>© CARA BERBELANJA</span>
          <span className="hidden md:block">(WM™ — 05)</span>
          <span>PROSES MUDAH</span>
        </div>

        {/* Sticky Side-by-Side Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start pb-32">
          {/* Left Side: Sticky Context */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-40 flex flex-col gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="font-heading font-medium text-[clamp(4.5rem,7vw,8rem)] leading-[0.9] tracking-tighter text-white mb-8"
                style={{ textWrap: 'balance' }}
              >
                Belanja <br className="hidden lg:block" /> Cepat,{' '}
                <br className="hidden lg:block" />
                <span className="text-gray-500">Tanpa Ribet.</span>
              </h2>
              <p className="font-serif text-lg md:text-xl text-gray-400 leading-relaxed max-w-md">
                Mulai dari memilih sembako hingga konfirmasi pesanan, semuanya
                dirancang untuk menghemat waktu Anda. Tidak perlu mengantre.
              </p>
            </motion.div>

            {/* Step Indicator Dots (Desktop only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:flex items-center gap-3 mt-4"
            >
              {steps.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: activeStep === idx ? 1 : 0.8,
                    backgroundColor:
                      activeStep === idx ? '#ffffff' : 'rgba(255,255,255,0.15)',
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-2.5 h-2.5 rounded-full"
                />
              ))}
            </motion.div>
          </div>

          {/* Right Side: Interactive Steps */}
          <div className="w-full lg:w-1/2 flex flex-col gap-0 lg:pt-32">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-15% 0px', once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.1,
                }}
                onViewportEnter={() => setActiveStep(idx)}
                className="group relative"
              >
                {/* Card Container */}
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative border-t border-border/20 py-12 md:py-16 cursor-default"
                >
                  {/* Hover Fill Background */}
                  <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top Row: Number + Icon */}
                  <div className="relative z-10 flex items-center justify-between mb-8">
                    {/* Step Number — Now Visible */}
                    <div className="flex items-center gap-4">
                      <span className="font-heading font-black text-5xl md:text-7xl tracking-tighter text-white/10 group-hover:text-white/30 transition-colors duration-500">
                        {step.num}
                      </span>
                      {/* Animated line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.2 + idx * 0.15,
                        }}
                        className="h-[1px] w-12 md:w-20 bg-white/20 origin-left"
                      />
                    </div>

                    {/* Icon Circle */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-white/40 group-hover:text-white/70 group-hover:scale-110 transition-all duration-500">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-heading font-bold text-2xl md:text-4xl text-white mb-4 tracking-tight group-hover:text-white transition-colors">
                      {step.title}
                    </h3>

                    {/* Description with animated reveal */}
                    <p className="font-serif text-base md:text-lg text-gray-500 leading-relaxed max-w-lg group-hover:text-gray-300 transition-colors duration-500">
                      {step.desc}
                    </p>
                  </div>

                  {/* Hover Arrow Indicator */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-white/30"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Bottom border */}
            <div className="border-t border-border/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
