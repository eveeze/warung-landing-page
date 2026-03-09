'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';

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
    <section
      ref={ref}
      id="kategori"
      className="w-full pt-24 pb-32 transition-colors duration-700 bg-forest-deep"
    >
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
            className="font-heading font-medium text-[clamp(4rem,8vw,8rem)] text-text-primary transition-colors duration-700 leading-[0.9] tracking-tighter "
          >
            Penuhi Kebutuhan <br className="hidden md:block" />
            <span className="text-text-muted transition-colors duration-700">
              Harian Anda
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedButton
              href="/belanja"
              as="a"
              fillColor="bg-forest"
              iconRight={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transform transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              }
              className="group inline-flex items-center justify-center px-6 py-3 rounded-full border border-forest/30 font-heading font-bold text-xs uppercase tracking-widest text-text-primary hover:border-forest hover:text-cream transition-all duration-300"
            >
              Lihat Semua Kategori
            </AnimatedButton>
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
                className="group block relative w-full aspect-[4/3] md:aspect-[1/1] xl:aspect-[4/3] rounded-[2rem] overflow-hidden bg-surface p-2 border border-border/50 focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-4 focus-visible:ring-offset-forest-deep outline-none shadow-xl hover:shadow-[0_0_40px_rgba(30,58,138,0.15)] transition-all duration-700"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-700 group-hover:bg-text-primary/10" />

                  {/* Content Container */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="flex flex-col transform group-hover:-translate-y-2 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                      {/* Pill Badge */}
                      <div className="mb-4">
                        <span className="inline-flex items-center px-4 py-1.5 bg-surface/80 backdrop-blur-xl rounded-full text-[10px] md:text-xs font-heading font-medium text-text-primary uppercase tracking-widest border border-border group-hover:bg-forest group-hover:text-cream transition-all duration-500">
                          {cat.count}
                        </span>
                      </div>

                      {/* Category Name with Slide Arrow */}
                      <div className="flex items-end justify-between overflow-hidden">
                        <h3 className="font-heading font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-none mb-0 text-text-primary group-hover:text-forest transition-colors duration-500 drop-shadow-sm">
                          {cat.name}
                        </h3>
                        <div className="translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1] pb-2 md:pb-4 text-forest">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-8 h-8 md:w-12 md:h-12"
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
