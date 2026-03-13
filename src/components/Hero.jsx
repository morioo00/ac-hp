import { PhoneIcon } from "@heroicons/react/24/solid";
import { siteConfig } from "../data/siteConfig";

const Hero = () => {
  return (
    <section className="relative bg-sky-50 px-6 pt-20 pb-16 text-slate-800">
      <div className="mx-auto max-w-6xl">

        {/* キャッチコピー */}
        <h1 className="mb-6 text-2xl font-bold leading-relaxed sm:text-3xl md:text-4xl">
          地域密着で迅速対応。
          <br />
          一件一件、丁寧な施工と誠実な
          <br />
          ご提案をお約束します。
        </h1>

        {/* ============================= */}
        {/* ここがボタン + 注意書き 横並びブロック */}
        {/* ============================= */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">

          {/* 左：ボタン2つ */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 rounded-full border border-[#0ea5b7] bg-sky-50 px-8 py-4 text-base font-bold text-[#0ea5b7] shadow-xl transition duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-[#0ea5b7]/60 hover:shadow-[0_0_24px_rgba(14,165,183,0.35)]"
            >
              <PhoneIcon className="h-5 w-5 text-[#0ea5b7]" />
              無料で相談する
            </a>

            <a
              href="#contact"
              className="flex items-center justify-center gap-2 rounded-full border border-[#0ea5b7] bg-sky-50 px-8 py-4 text-base font-bold text-[#0ea5b7] shadow-xl transition duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-[#0ea5b7]/60 hover:shadow-[0_0_24px_rgba(14,165,183,0.35)]"
              >お問い合わせフォーム
            </a>
          </div>

          {/* 右：注意書き（PC時は右寄せ） */}
          <div className="space-y-1 text-xs text-slate-500 sm:text-sm">
            <p>※見積無料</p>
            <p>※無理な営業は一切いたしません</p>
            <p>※最短即日対応</p>
          </div>

        </div>

        {/* 区切り線 */}
        <div className="mt-8 mb-10 h-[2px] w-full bg-[#0ea5b7]" />

      </div>
    </section>
  );
};

export default Hero;