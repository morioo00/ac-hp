import { useEffect, useState } from "react";

import Area from "./components/Area";
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
  const [isCompanyPage, setIsCompanyPage] = useState(window.location.hash === "#company");

  useEffect(() => {
    const handleHashChange = () => {
      setIsCompanyPage(window.location.hash === "#company");
      setIsMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="bg-black pb-24 text-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main id="top">
        {isCompanyPage ? (
          <CompanyOverview />
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

      <FloatingCallButton isHidden={isMenuOpen} />
    </div>
  );
}

export default App;
