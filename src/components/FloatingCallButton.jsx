import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { PhoneIcon } from "./HeroIcons";

const FloatingCallButton = ({ isHidden }) => {
  const [isHover, setIsHover] = useState(false);

  // ★追加：スクロールで隠す
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const lastY = lastYRef.current;

      const delta = y - lastY; // +: 下へ / -: 上へ
      lastYRef.current = y;

      // ページ最上部付近は常に表示（任意）
      if (y < 40) {
        setHideOnScroll(false);
        return;
      }

      // 閾値：小さい揺れは無視してチラつき防止
      if (Math.abs(delta) < 8) return;

      if (delta > 0) {
        // 下にスクロール → 隠す
        setHideOnScroll(true);
      } else {
        // 上にスクロール → 表示
        setHideOnScroll(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 既存の isHidden と合成（今までの挙動があっても壊さない）
  const hidden = Boolean(isHidden) || hideOnScroll;

  return (
    <a
      href={`tel:${siteConfig.phone}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`
        fixed bottom-0 left-0 right-0 z-40
        bottom-2 pb-[env(safe-area-inset-bottom)]
        flex items-center justify-center gap-4
        bg-gradient-to-r from-[#0ea5b7] to-[#38bdf8]
        px-5 py-4 sm:px-8 sm:py-5
        w-full md:w-[86%] md:left-1/2 md:right-auto md:-translate-x-1/2 md:bottom-4
        md:rounded-2xl lg:w-[72%] xl:w-[60%]
        text-white
        shadow-[0_15px_40px_rgba(14,165,183,0.35)]
        hover:md:scale-[1.02]
        transform-gpu
        transition-[transform,opacity]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${hidden ? "duration-300" : "duration-300"}
        ${
          hidden
            ? "translate-y-[120%] opacity-0 pointer-events-none scale-[0.99]"
            : "translate-y-0 opacity-100 scale-100"
        }
      `}
    >
      <PhoneIcon className="h-6 w-6 shrink-0" />

      {/* 📱 スマホ表示 */}
      <div className="flex flex-col leading-tight sm:hidden text-center">
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
      <div className="hidden sm:block font-bold text-lg text-center">
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