import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedWorks from '@/components/FeaturedWorks';
import Contact from '@/components/Contact';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedWorks />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
