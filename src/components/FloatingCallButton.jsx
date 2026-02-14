import { siteConfig } from "../data/siteConfig";
import { PhoneIcon } from "./HeroIcons";

const FloatingCallButton = () => {
  return (
    <a
      href={`tel:${siteConfig.phone}`}
      className="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-gray-900 to-blue-900 px-6 py-4 text-lg font-bold text-white shadow-2xl transition duration-300 hover:scale-105"
    >
      <PhoneIcon className="h-6 w-6" />
      お急ぎの方はこちらまで → 電話を掛ける
    </a>
  );
};

export default FloatingCallButton;
