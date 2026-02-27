'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote:
      'Sistem harga grosirnya sangat menguntungkan. Semakin banyak beli, dapat potongan lebih murah. Cocok untuk stok bulanan rutinan warung saya.',
    author: 'Bapak Budi',
    role: 'Pemilik Rumah Makan',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    quote:
      'Pesan lewat WA sangat praktis. Tinggal kirim list belanjaan, admin langsung rekap dan pesanan langsung siap diambil. Efisien dan hemat waktu!',
    author: 'Ibu Siti',
    role: 'Ibu Rumah Tangga',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    quote:
      'Sudah langganan lebih dari 5 tahun. Harga selalu transparan dan barang dijamin kualitasnya. Sangat membantu usaha warung saya sehari-hari.',
    author: 'Mas Anton',
    role: 'Reseller Lokal',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    quote:
      'Pelayanan sangat cepat dan responsif. Barang yang dikirim selalu dalam kondisi baik dan segar. Sangat direkomendasikan!',
    author: 'Mbak Rini',
    role: 'Pengusaha Katering',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  },
  {
    id: 5,
    quote:
      'Harga kompetitif dan proses order yang tidak ribet membuat saya bisa fokus mengurus bisnis utama saya tanpa pusing mikir stok.',
    author: 'Pak Joko',
    role: 'Pemilik Kedai Kopi',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
  },
  {
    id: 6,
    quote:
      'Sangat membantu ibu rumah tangga seperti saya. Tinggal WA, bayar, besoknya barang sudah sampai di depan pintu rumah.',
    author: 'Ibu Desy',
    role: 'Ibu Rumah Tangga',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  },
];

function TestimonialCard({ data }: { data: (typeof testimonials)[0] }) {
  return (
    <div className="w-[320px] md:w-[400px] bg-[#0a0a0a] border border-[#222] rounded-xl p-6 md:p-8 flex flex-col shadow-2xl">
      <p className="font-serif text-sm md:text-base text-gray-300 leading-relaxed max-w-[90%] mb-12">
        "{data.quote}"
      </p>

      <div className="flex items-center gap-4 pt-6 border-t border-[#222]">
        <img
          src={data.image}
          alt={data.author}
          className="w-10 h-10 rounded-md object-cover grayscale brightness-75"
        />
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-1.5">
            <h4 className="font-heading font-medium text-white text-sm">
              {data.author}
            </h4>
            {/* Verified Badge Icon */}
            <svg
              className="w-4 h-4 text-blue-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
            </svg>
          </div>
          <p className="font-sans text-[10px] md:text-xs text-gray-500 mt-0.5">
            {data.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Adjusted Parallax values for 6 cards: left, right, center staggered
  const y1 = useTransform(scrollYProgress, [0, 1], ['100vh', '-100vh']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['140vh', '-120vh']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['180vh', '-150vh']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['220vh', '-100vh']);
  const y5 = useTransform(scrollYProgress, [0, 1], ['260vh', '-120vh']);
  const y6 = useTransform(scrollYProgress, [0, 1], ['300vh', '-150vh']);

  return (
    <section
      ref={containerRef}
      id="ulasan"
      className="relative h-auto md:h-[350vh] bg-black z-10 border-t border-border/30"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Infinite Looping Background Text (Reduced Size) */}
        <div className="absolute inset-0 flex items-center overflow-hidden whitespace-nowrap pointer-events-none select-none">
          <div className="flex flex-shrink-0 animate-marquee-slow font-heading font-black text-[clamp(4rem,10vw,12rem)] leading-[0.8] tracking-tighter text-white opacity-80">
            <span className="pr-16">© — Reviews in Testimonial</span>
            <span className="pr-16">© — Reviews in Testimonial</span>
            <span className="pr-16">© — Reviews in Testimonial</span>
            <span className="pr-16">© — Reviews in Testimonial</span>
          </div>
          <div className="flex flex-shrink-0 animate-marquee-slow font-heading font-black text-[clamp(4rem,10vw,12rem)] leading-[0.8] tracking-tighter text-white opacity-80">
            <span className="pr-16">© — Reviews in Testimonial</span>
            <span className="pr-16">© — Reviews in Testimonial</span>
            <span className="pr-16">© — Reviews in Testimonial</span>
            <span className="pr-16">© — Reviews in Testimonial</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-16 md:translate-y-20 z-20">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 md:px-8 py-2 md:py-3 rounded-full border-2 border-white text-white font-heading font-bold text-[10px] md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            Hubungi Kami
          </a>
        </div>

        {/* Desktop: Floating Cards Container (Parallax) */}
        <div className="hidden md:block absolute inset-0 z-30 pointer-events-none h-[350vh]">
          {/* Card 1: Left Edge */}
          <motion.div
            style={{ y: y1 }}
            className="absolute left-[5%] top-0 pointer-events-auto"
          >
            <TestimonialCard data={testimonials[0]} />
          </motion.div>

          {/* Card 2: Right Edge */}
          <motion.div
            style={{ y: y2 }}
            className="absolute right-[5%] top-0 pointer-events-auto"
          >
            <TestimonialCard data={testimonials[1]} />
          </motion.div>

          {/* Card 3: Center */}
          <motion.div
            style={{ y: y3 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto"
          >
            <TestimonialCard data={testimonials[2]} />
          </motion.div>

          {/* Card 4: Left Offset */}
          <motion.div
            style={{ y: y4 }}
            className="absolute left-[15%] top-0 pointer-events-auto"
          >
            <TestimonialCard data={testimonials[3]} />
          </motion.div>

          {/* Card 5: Right Offset */}
          <motion.div
            style={{ y: y5 }}
            className="absolute right-[15%] top-0 pointer-events-auto"
          >
            <TestimonialCard data={testimonials[4]} />
          </motion.div>

          {/* Card 6: Center */}
          <motion.div
            style={{ y: y6 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto"
          >
            <TestimonialCard data={testimonials[5]} />
          </motion.div>
        </div>
      </div>

      {/* Mobile: Stacked Cards */}
      <div className="md:hidden relative z-30 flex flex-col items-center gap-6 py-24 px-4 -mt-[80vh] pb-32">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} data={t} />
        ))}
      </div>
    </section>
  );
}
