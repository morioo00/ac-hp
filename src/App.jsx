import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

import Area from "./components/Area";
import CaseStudies from "./components/CaseStudies";
import CompanyOverview from "./components/CompanyOverview";
import Contact from "./components/Contact";
import FloatingCallButton from "./components/FloatingCallButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Price from "./components/Price";
import Services from "./components/Services";
import Works from "./components/Works";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [hideFloating, setHideFloating] = useState(false);


  // ✅ hashchange監視（これも単独のuseEffect）
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      setIsMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // スクロール方向検知：下スクロールで隠す / 上スクロールで表示（スマホのみ）
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        const threshold = 8;
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (isMobile) {
          if (y < 40) setHideFloating(false);
          else if (delta > threshold) setHideFloating(true);
          else if (delta < -threshold) setHideFloating(false);
        } else {
          setHideFloating(false);
        }

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-black text-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main id="top">
        {currentHash === "#company" ? (
          <CompanyOverview />
        ) : currentHash === "#cases" ? (
          <CaseStudies />
        ) : (
          <>
            <Hero />
            <Services />
            <Price />
            <Works />
            <Area />
            <Contact />
          </>
        )}
      </main>

      <Footer />
      <FloatingCallButton isHidden={isMenuOpen || hideFloating} />
    </div>
  );
}

export default App;