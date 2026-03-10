import AnimatedButton from '@/components/ui/AnimatedButton';

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full min-h-screen flex flex-col pt-32 pb-24 border-t border-border/30"
    >
      <div className="w-full px-6 flex-1 flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Left: Large Portrait Image */}
        <div className="w-full md:w-1/2 flex-1 relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-[var(--color-surface)] min-h-[50vh] md:min-h-full">
          {/* Portrait of Mbah Manto */}
          <img
            src="/mbahe.jpg"
            alt="Mbah Manto"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-60" />
        </div>

        {/* Right: Massive Typography & CTA */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
          <h2
            className="font-heading font-medium text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] tracking-tighter mb-12"
            style={{ textWrap: 'balance' }}
          >
            10+ tahun™ melayani ribuan pelanggan setia dengan harga jujur, stok
            lengkap, dan layanan sepenuh hati.
          </h2>

          <AnimatedButton
            as="a"
            href="https://wa.me/62882006706334"
            target="_blank"
            rel="noopener noreferrer"
            fillColor="bg-forest"
            iconRight={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            }
            className="group inline-flex items-center justify-center px-10 py-4 rounded-full border border-[var(--color-primary)] font-heading font-bold text-sm uppercase tracking-widest hover:border-[var(--color-primary)] hover:text-cream transition-colors duration-300"
          >
            Hubungi via WhatsApp
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
