import { siteConfig } from "../data/siteConfig";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-4 text-sm text-gray-500 sm:px-6">
        <p>{siteConfig.brand}</p>
        <p className="mt-1">© {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
