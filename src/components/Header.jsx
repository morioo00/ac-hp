import { useEffect } from "react";
import { siteConfig } from "../data/siteConfig";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "電話連絡先", href: `tel:${siteConfig.phone}` },
  { label: "メール問い合わせ", href: `mailto:${siteConfig.email}` },
  { label: "施工事例一覧", href: "#cases" },
  { label: "会社概要", href: "#company" },
];

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-14 md:h-20 border-b border-sky-300/40 bg-sky-50/95 backdrop-blur">
        <div className="flex w-full items-center justify-between px-0 py-0 md:py-2">
          {/* 左：ロゴ */}
          <Link
            to="/"
            className="md:ml-48"
            onClick={() => {
              window.location.hash = "";
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/Logo1.png"
              alt="UPDRAFT"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain cursor-pointer"
            />
          </Link>

          {/* 右：ハンバーガー */}
          <button
            type="button"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="
              group relative z-50 h-12 w-12
              rounded-full
              border border-[#0ea5b7]/40
              bg-sky-50/60
              transition
              hover:border-[#0ea5b7]
              md:mr-6 lg:mr-8
            "
          >
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-[#38bdf8] transition-all duration-300 ${
                isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-[#38bdf8] transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-[#38bdf8] transition-all duration-300 ${
                isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 bg-sky-50/90 backdrop-blur-sm transition-all duration-300 ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <nav
          className={`mx-auto mt-24 flex w-[92%] max-w-3xl flex-col gap-4 rounded-2xl border border-[#0ea5b7]/30 bg-sky-100/90 p-6 text-center transition-all duration-300 sm:p-8 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-8"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl border border-[#0ea5b7]/20 bg-sky-50/40 px-4 py-4 text-lg font-semibold text-[#38bdf8] transition hover:border-[#0ea5b7]/70 hover:bg-[#0ea5b7]/10"
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
