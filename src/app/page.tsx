import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedWorks from '@/components/FeaturedWorks';
import Contact from '@/components/Contact';
import Categories from '@/components/Categories';
import HowToOrder from '@/components/HowToOrder';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Categories />
        <FeaturedWorks />
        <HowToOrder />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
