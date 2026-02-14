import { siteConfig } from "../data/siteConfig";

const FloatingCallButton = () => {
  return (
    <a
      href={`tel:${siteConfig.phone}`}
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black px-6 py-4 text-lg font-bold text-white shadow-xl"
    >
      📞 電話する
    </a>
  );
};

export default FloatingCallButton;
