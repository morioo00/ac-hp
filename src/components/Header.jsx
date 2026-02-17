import { useEffect } from "react";
import { siteConfig } from "../data/siteConfig";

const menuItems = [
  { label: "電話連絡先", href: `tel:${siteConfig.phone}` },
  { label: "メール問い合わせ", href: `mailto:${siteConfig.email}` },
  { label: "施工事例一覧", href: "#works" },
  { label: "会社案内", href: "#about" },
];

// ✅ 親(App)から isMenuOpen / setIsMenuOpen を受け取る
const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-yellow-700/20 bg-black/95 leading-none backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
          <img
            src="/Logo1.png"
            alt="UPDRAFT"
            className="block w-[230px] sm:w-[320px]"
          />

          <button
            type="button"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="group relative z-50 ml-3 h-12 w-12 rounded-full border border-[#d4af37]/40 bg-black/60 transition hover:border-[#d4af37]"
          >
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-[#f0dd9b] transition-all duration-300 ${
                isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-[#f0dd9b] transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-[#f0dd9b] transition-all duration-300 ${
                isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 bg-black/90 backdrop-blur-sm transition-all duration-300 ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        // ✅ 背景タップでも閉じたいならON（いらなければ消してOK）
        onClick={() => setIsMenuOpen(false)}
      >
        <nav
          className={`mx-auto mt-24 flex w-[92%] max-w-3xl flex-col gap-4 rounded-2xl border border-[#d4af37]/30 bg-neutral-950/90 p-6 text-center transition-all duration-300 sm:p-8 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-8"
          }`}
          // ✅ nav内クリックは閉じないように止める
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl border border-[#d4af37]/20 bg-black/40 px-4 py-4 text-lg font-semibold text-[#f0dd9b] transition hover:border-[#d4af37]/70 hover:bg-[#d4af37]/10"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
