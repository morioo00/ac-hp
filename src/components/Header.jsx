import { siteConfig } from "../data/siteConfig";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm font-semibold text-gray-900 sm:text-base">{siteConfig.brand}</p>
        <a
          href={`tel:${siteConfig.phone}`}
          className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-blue-900"
        >
          今すぐ電話
        </a>
      </div>
    </header>
  );
};

export default Header;
