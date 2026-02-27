export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full min-h-screen bg-black flex flex-col pt-32 pb-24 border-t border-border/30"
    >
      <div className="w-full px-6 flex-1 flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Left: Large Portrait Image */}
        <div className="w-full md:w-1/2 flex-1 relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#1a1a1a] min-h-[50vh] md:min-h-full">
          {/* Using a placeholder aesthetic image to match the reference look */}
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=1400&auto=format&fit=crop"
            alt="Warung Mbah Manto"
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Right: Massive Typography & CTA */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
          <h2 className="font-heading font-medium text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] tracking-tighter text-white mb-12">
            10+ tahun™ melayani kebutuhan harian dengan kualitas, konsistensi,
            dan dedikasi penuh di setiap langkah.
          </h2>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-white text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            Pesan WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
