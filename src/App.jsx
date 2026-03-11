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

  // 施工事例一覧を親で管理
  const [cases, setCases] = useState([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [casesFetchError, setCasesFetchError] = useState("");

  // 投稿成功した1件を一覧の先頭に追加
  const handleCaseCreated = (newCase) => {
    setCases((prev) => [newCase, ...prev]);
  };

  // ✅ hashchange監視
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      setIsMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // 施工事例一覧を初回取得
  useEffect(() => {
    const loadCases = async () => {
      setCasesLoading(true);
      setCasesFetchError("");

      const { data, error } = await supabase
        .from("cases")
        .select("id,title,description,image_url,created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setCasesFetchError(error.message ?? "取得に失敗しました");
        setCases([]);
      } else {
        setCases(Array.isArray(data) ? data : []);
      }

      setCasesLoading(false);
    };

    loadCases();
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
          <CaseStudies
            // App が持つ state を渡す
            items={cases}
            loading={casesLoading}
            fetchError={casesFetchError}
          />
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

      <Footer
        // 投稿成功した1件を受け取る関数を渡す
        onCaseCreated={handleCaseCreated}
      />

      <FloatingCallButton isHidden={isMenuOpen || hideFloating} />
    </div>
  );
}

export default App;