import { siteConfig } from "../data/siteConfig";
import { PhoneIcon } from "@heroicons/react/24/solid";


const FloatingCallButton = () => {
  return (
    <a
  href={`tel:${siteConfig.phone}`}
  className="fixed bottom-4 left-1/2
   -translate-x-1/2 flex items-center gap-2 
   bg-gradient-to-r from-black to-gray-700 text-white 
   px-6 py-4 rounded-full shadow-2xl font-bold text-lg transition hover:scale-105"

>
  <PhoneIcon className="h-6 w-6" />
  お急ぎの方はこちらまで  →  電話を掛ける
</a>

  );
};

export default FloatingCallButton;
