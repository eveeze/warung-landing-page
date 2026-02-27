'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Pilih Produk',
    desc: 'Jelajahi katalog digital kami. Temukan ribuan produk kebutuhan sehari-hari dengan harga transparan dan stok aktual.',
  },
  {
    num: '02',
    title: 'Kirim Pesanan',
    desc: 'Tambahkan ke keranjang, lalu sistem kami akan merangkum dan meneruskan pesanan Anda langsung ke admin via WhatsApp.',
  },
  {
    num: '03',
    title: 'Ambil atau Antar',
    desc: 'Pesanan akan segera kami siapkan. Anda bisa mengambilnya langsung di warung tanpa antre, atau gunakan layanan antar lokal kami.',
  },
];

const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVars = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HowToOrder() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

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
          {/* Left Side: Sticky Context (Hidden on mobile to act as standard header) */}
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
          </div>

          {/* Right Side: Scrollable Steps */}
          <div className="w-full lg:w-1/2 flex flex-col gap-24 lg:gap-40 lg:pt-32">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-20% 0px', once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.1,
                }}
                className="flex flex-col relative"
              >
                {/* Visual Line Decorator */}
                <div className="absolute -left-6 lg:-left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#333] to-transparent" />

                {/* Massive Faded Number */}
                <div className="font-heading font-black text-[7rem] md:text-[9rem] leading-none tracking-tighter text-white/[0.03] -ml-2 mb-4">
                  {step.num}
                </div>

                <div className="flex flex-col">
                  <h3 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-serif text-base md:text-xl text-gray-400 leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
