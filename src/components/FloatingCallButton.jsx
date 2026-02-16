import { useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { PhoneIcon } from "./HeroIcons";

const FloatingCallButton = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <a
      href={`tel:${siteConfig.phone}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        flex items-center gap-4
        rounded-2xl
        bg-gradient-to-r from-[#d4af37] to-[#f0dd9b]
        px-10 py-5
        w-[92%] max-w-[480px]
        text-black
        shadow-[0_15px_40px_rgba(212,175,55,0.45)]
        transition duration-300 ease-out
        hover:scale-110
        sm:w-auto sm:max-w-none sm:rounded-full sm:px-8 sm:py-5
      "
    >
      <PhoneIcon className="h-6 w-6 shrink-0" />

      {/* 📱 スマホ表示（常時） */}
      <div className="flex flex-col leading-tight sm:hidden">
        <span className="text-base font-bold">
          電話番号：
          <span className="whitespace-nowrap">
            {String(siteConfig.phone).replaceAll("-", "\u2011")}
          </span>
        </span>
        <span className="text-sm opacity-80">
          お気軽にまずはお電話にてご相談くださいませ。
        </span>
      </div>

      {/* 🖥 PC表示 */}
      <div className="hidden sm:block font-bold text-lg">
        {isHover ? (
          <div className="flex flex-col leading-tight">
            <span>{siteConfig.phone}</span>
            <span className="text-xs opacity-80">
              お気軽にまずはお電話にてご相談くださいませ。
            </span>
          </div>
        ) : (
          "無料で相談する"
        )}
      </div>
    </a>
  );
};

export default FloatingCallButton;
