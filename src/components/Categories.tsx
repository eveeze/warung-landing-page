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
            className="font-heading font-medium text-[clamp(4rem,8vw,8rem)] text-text-primary transition-colors duration-700 leading-[0.9] tracking-tighter"
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

        {/* Categories Framer-Vibe Accordion Hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.2,
          }}
          className="flex flex-col md:flex-row gap-4 lg:gap-6 h-[700px] md:h-[600px] w-full"
        >
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/belanja?kategori=${cat.id}`}
              className="group relative flex-1 hover:flex-[3] md:hover:flex-[4] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-[2rem] border border-border/50 bg-surface block-layer outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-4 focus-visible:ring-offset-forest-deep min-w-0"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full bg-surface">
                <img
                  src={cat.image}
                  alt={`Kategori ${cat.name}`}
                  loading={idx > 1 ? 'lazy' : 'eager'}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-[filter,opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                {/* Gradient vignette for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent group-hover:from-text-primary/95 group-hover:via-text-primary/40 group-hover:to-transparent transition-colors duration-700 opacity-90" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex w-full items-end justify-between transition-transform duration-700 ease-[0.16,1,0.3,1] translate-y-2 group-hover:translate-y-0">
                  <div className="flex flex-col gap-3 relative z-10 w-full md:w-auto">
                    {/* Badge */}
                    <div className="w-fit">
                      <span className="inline-flex items-center px-4 py-1.5 bg-surface/95 rounded-full text-[10px] md:text-xs font-heading font-medium text-text-primary uppercase tracking-widest border border-border group-hover:bg-forest group-hover:text-cream group-hover:border-forest transition-colors duration-500 shadow-sm md:shadow-none">
                        {cat.count}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-none text-text-primary group-hover:text-surface transition-colors duration-500 whitespace-nowrap drop-shadow-sm min-w-max">
                      {cat.name}
                    </h3>
                  </div>

                  {/* Arrow Icon */}
                  <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full border border-forest/30 bg-surface/10 items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream group-hover:border-forest opacity-0 group-hover:opacity-100 transform origin-left -translate-x-8 group-hover:translate-x-0 transition-all duration-[600ms] ease-[0.16,1,0.3,1]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
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
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
