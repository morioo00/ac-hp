import { siteConfig } from "../data/siteConfig";
import { PhoneIcon } from "./HeroIcons";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-black via-neutral-950 to-neutral-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-24 sm:px-6">
        <p className="inline-block w-fit rounded-full border border-[#d4af37]/70 bg-[#d4af37]/10 px-4 py-2 text-xs font-semibold text-[#f0dd9b] sm:text-sm">
          京都府福知山市の空調トラブルに迅速対応
        </p>
        <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
          空間を支える、確かな技術。
        </h1>

        <div className="h-px w-32 bg-[#d4af37]" />
        <p className="max-w-3xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
          地域密着で迅速対応。
          <br />
          一件一件、丁寧な施工と誠実なご提案をお約束します。
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center justify-center gap-2 rounded-full border border-[#d4af37] bg-black px-8 py-4 text-base font-bold text-[#d4af37] shadow-xl transition duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-[#d4af37]/60 hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]"
          >
            <PhoneIcon className="h-5 w-5 text-[#d4af37]" />
            無料で相談する
          </a>

          <a
            href="#contact"
            className="rounded-full border border-neutral-600 bg-neutral-900 px-8 py-4 text-center text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:border-[#d4af37]"
          >
            お問い合わせフォーム
          </a>
        </div>
        <div className="space-y-1 text-xs text-neutral-400 sm:text-sm">
          <p>※見積無料</p>
          <p>※無理な営業は一切いたしません</p>
          <p>※最短即日対応</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
