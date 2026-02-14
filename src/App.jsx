import Area from "./components/Area";
import Contact from "./components/Contact";
import FloatingCallButton from "./components/FloatingCallButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Price from "./components/Price";
import Services from "./components/Services";
import Works from "./components/Works";

function App() {
  return (
    <div className="bg-black pb-24 text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Price />
        <Works />
        <Area />
        <Contact />
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
}

export default App;
