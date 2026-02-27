'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { fetchProducts } from '@/lib/api';
import type { Product } from '@/lib/api';

function ProductCard3D({
  product,
  index,
  total,
  scrollYProgress,
}: {
  product: Product;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  // 1. Static 3D Placement on the Cylinder
  // index 0 -> -144deg (left), index 4 -> +144deg (right)
  const baseAngle = (index - 2) * (360 / total);
  // Statically staggered on Y so it keeps its exact diagonal stance 100% of the time
  const yOffset = (index - 2) * 110;

  // 2. Track the "world" angle of this specific card as the cylinder spins
  // The cylinder sweeps from 40 to -320.
  const worldAngle = useTransform(scrollYProgress, (progress) => {
    const globalRot = 40 - progress * 360;
    let angle = (baseAngle + globalRot) % 360;
    // Normalize to -180...180 range
    if (angle < -180) angle += 360;
    if (angle > 180) angle -= 360;
    return angle;
  });

  // 3. Silky smooth fade exactly when crossing the 90/-90 visual cylinder horizon
  // This physically hides backward cards so no mirrored texts ever appear.
  const opacity = useTransform(
    worldAngle,
    [-180, -90, -65, 0, 65, 90, 180],
    [0, 0, 1, 1, 1, 0, 0],
  );

  // 4. Smooth brightness falloff to emphasize depth
  const filter = useTransform(worldAngle, (w) => {
    // 100% bright at center (0deg), dropping to 40% at the sides
    const br = 1 - Math.min(Math.abs(w) / 90, 0.6);
    return `brightness(${br})`;
  });

  return (
    <motion.div
      style={{
        opacity,
        // Physically bolted to the 3D rotating pole.
        // Strict, compact radius (350px max), no container skewing per card.
        transform: `rotateY(${baseAngle}deg) translateZ(clamp(250px, 35vw, 350px)) translateY(${yOffset}px)`,
      }}
      className="absolute w-[240px] md:w-[320px] aspect-[4/3] bg-forest-mid rounded-xl md:rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-center items-center group cursor-pointer"
    >
      {product.image_url ? (
        <motion.img
          style={{ filter }}
          src={product.image_url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-forest-light via-black to-forest-mid" />
      )}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />

      {/* Editorial, center gravity typography */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <h3 className="font-heading font-black text-4xl md:text-6xl text-white tracking-tight leading-none mb-2 mix-blend-difference drop-shadow-md">
          {product.name}.
        </h3>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts({ perPage: 5 })
      .then((res) => setProducts(res.products.slice(0, 5)))
      .catch(() => {});
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // The central pole rotation mapped from 0 to 1 scroll
  // Starts angled right (+40), loops almost fully (-320 total offset)
  const rotateY = useTransform(scrollYProgress, [0, 1], [40, -320]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t border-border"
        style={{ perspective: '2500px', perspectiveOrigin: 'center center' }}
      >
        {/* Meta Header */}
        <div className="absolute top-0 w-full flex justify-between px-6 py-4 border-b border-border/30 text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-text-muted z-50">
          <span>© FINAL SECTION Kebutuhan</span>
          <span className="hidden md:block">(WM™ — 10)</span>
          <span>STUDIO MANTO</span>
        </div>

        {/* 3D Central Gravity Carousel */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {products.map((product, i) => (
            <ProductCard3D
              key={product.id}
              product={product}
              index={i}
              total={products.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Bottom indicator text area */}
        <div className="absolute bottom-12 text-center max-w-lg px-6 z-[100]">
          <p className="font-heading text-xs uppercase font-bold tracking-[0.2em] text-text-muted leading-relaxed">
            Temukan kebutuhan harian Anda. Kami merancang efisiensi rantai pasok
            dalam setiap produk.
          </p>
        </div>
      </div>
    </section>
  );
}
