import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Portfolio from "./components/Portfolio";
import MarketTable from "./components/MarketTable";
import Pricing from "./components/Pricing";
import Calculator from "./components/Calculator";
import JoinSection from "./components/JoinSection";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500 selection:text-white">
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Features />
      <Portfolio />
      <MarketTable />
      <Pricing />
      <Calculator />
      <FAQ />
      <JoinSection />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
