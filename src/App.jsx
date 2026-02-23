import { useEffect, useState } from "react";

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

  // スクロールでフローティングボタンを隠す（スマホのみ）
  const [hideFloating, setHideFloating] = useState(false);

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

        // 小さな揺れを無視する
        const threshold = 8;

        // md未満のみ（スマホ想定）
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (isMobile) {
          // 最上部付近は常に表示（好みで外してOK）
          if (y < 40) {
            setHideFloating(false);
          } else if (delta > threshold) {
            // 下へスクロール → 隠す
            setHideFloating(true);
          } else if (delta < -threshold) {
            // 上へスクロール → 出す
            setHideFloating(false);
          }
        } else {
          // PCは常に表示（好みで）
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
    <div className="bg-black pb-32 text-white">
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

      {/* メニュー開いてる時 or 下スクロール中は隠す */}
      <FloatingCallButton isHidden={isMenuOpen || hideFloating} />
    </div>
  );
}

export default App;