import { siteConfig } from "../data/siteConfig";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-[#d4af37]/30 bg-black/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm font-semibold text-white sm:text-base">{siteConfig.brand}</p>
        <a
          href={`tel:${siteConfig.phone}`}
          className="rounded-full border border-[#d4af37] bg-black px-4 py-2 text-sm font-semibold text-[#d4af37] shadow-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
        >
          無料で相談する
        </a>
      </div>
    </header>
  );
};

export default Header;
