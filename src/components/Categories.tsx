'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const categories = [
  {
    id: 'bumbu',
    name: 'Bumbu Dapur',
    count: '150+ Produk',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
    color: 'from-orange-900/40',
  },
  {
    id: 'sembako',
    name: 'Sembako Dasar',
    count: '80+ Produk',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
    color: 'from-amber-900/40',
  },
  {
    id: 'minuman',
    name: 'Minuman Segar',
    count: '120+ Produk',
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop',
    color: 'from-blue-900/40',
  },
  {
    id: 'rumah-tangga',
    name: 'Rumah Tangga',
    count: '200+ Produk',
    image:
      'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?q=80&w=800&auto=format&fit=crop',
    color: 'from-teal-900/40',
  },
];

const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVars = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Categories() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section ref={ref} id="kategori" className="w-full bg-black pt-24 pb-32">
      <div className="w-full px-6">
        {/* Meta Header */}
        <div className="flex justify-between items-center text-text-muted font-heading font-bold text-[10px] uppercase tracking-widest border-b border-border/30 mb-16 pb-4">
          <span>© KATEGORI PRODUK</span>
          <span className="hidden md:block">(WM™ — 04)</span>
          <span>PILIHAN LENGKAP</span>
        </div>

        {/* Title Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-heading font-medium text-[clamp(4rem,8vw,8rem)] leading-[0.9] tracking-tighter text-white"
          >
            Penuhi Kebutuhan <br className="hidden md:block" />
            <span className="text-text-muted">Harian Anda</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/belanja"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border/50 text-white font-heading font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
            >
              Lihat Semua Kategori →
            </Link>
          </motion.div>
        </div>

        {/* Categories Premium 2x2 Grid */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {categories.map((cat, idx) => (
            <motion.div key={cat.id} variants={itemVars}>
              <Link
                href={`/belanja?kategori=${cat.id}`}
                className="group block relative w-full aspect-[4/3] md:aspect-[1/1] xl:aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#050505] p-2 border border-white/5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black outline-none shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-shadow duration-700"
              >
                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    src={cat.image}
                    alt={`Kategori ${cat.name}`}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
                    loading={idx > 1 ? 'lazy' : 'eager'}
                  />

                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />

                  {/* Content Container */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="flex flex-col transform group-hover:-translate-y-2 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                      {/* Pill Badge */}
                      <div className="mb-4">
                        <span className="inline-flex items-center px-4 py-1.5 bg-black/40 backdrop-blur-xl rounded-full text-[10px] md:text-xs font-heading font-medium text-white/80 uppercase tracking-widest border border-white/10 group-hover:bg-white/10 group-hover:text-white transition-colors duration-500">
                          {cat.count}
                        </span>
                      </div>

                      {/* Category Name with Slide Arrow */}
                      <div className="flex items-end justify-between overflow-hidden">
                        <h3 className="font-heading font-black text-4xl md:text-5xl lg:text-7xl text-white tracking-tighter leading-none mb-0">
                          {cat.name}
                        </h3>
                        <div className="translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1] pb-2 md:pb-4">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-white w-8 h-8 md:w-12 md:h-12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
