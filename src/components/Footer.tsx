'use client';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-white pt-24 pb-0 overflow-hidden z-20">
      <div className="w-full px-6 flex flex-col items-center max-w-[1800px] mx-auto">
        {/* Centered Descriptive Text */}
        <div className="max-w-[700px] text-center mb-12">
          <p className="font-heading font-medium tracking-tight text-white/90 text-sm md:text-base leading-relaxed">
            Warung Mbah Manto hadir untuk menjadi mitra belanja harian Anda.
            Dari kebutuhan dapur hingga stok usaha, kami pastikan kualitas
            terbaik dengan harga yang selalu bersahabat.
          </p>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={handleScrollToTop}
          className="mb-32 px-6 py-2.5 rounded-full border border-border text-[10px] md:text-xs font-heading font-bold uppercase tracking-[0.1em] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        >
          Back To Top
        </button>

        {/* Links Grid */}
        <div className="w-full flex justify-between items-end border-b border-border/30 pb-4 mb-4 md:mb-8">
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-white text-[10px] md:text-xs uppercase tracking-widest mb-2">
              Quick Links
            </h4>
            <div className="flex gap-2">
              <a
                href="/#beranda"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Beranda,
              </a>
              <a
                href="/belanja"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Belanja,
              </a>
              <a
                href="/#layanan"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Layanan,
              </a>
              <a
                href="/#kategori"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Kategori,
              </a>
              <a
                href="/#works"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Koleksi,
              </a>
              <a
                href="/#contact"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Kontak
              </a>
            </div>
          </div>

          <div className="flex flex-col text-right">
            <h4 className="font-heading font-bold text-white text-[10px] md:text-xs uppercase tracking-widest mb-1">
              Networks
            </h4>
            <div className="flex gap-2 justify-end">
              <a
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                WhatsApp,
              </a>
              <a
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Instagram,
              </a>
              <a
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Tokopedia
              </a>
            </div>
          </div>
        </div>

        {/* Massive Copyright Text */}
        <div className="w-full flex justify-center -mb-[2%]">
          <h1 className="text-[clamp(6rem,26vw,32rem)] font-heading font-black tracking-tighter uppercase text-white leading-[0.75] text-center">
            ©2026
          </h1>
        </div>
      </div>
    </footer>
  );
}
