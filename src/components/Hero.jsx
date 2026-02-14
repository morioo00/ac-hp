import { siteConfig } from "../data/siteConfig";
import { PhoneIcon } from "./HeroIcons";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-black via-neutral-950 to-neutral-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-24 sm:px-6">
        <p className="inline-block w-fit rounded-full border border-[#d4af37]/70 bg-[#d4af37]/10 px-4 py-2 text-xs font-semibold text-[#f0dd9b] sm:text-sm">
          京都府福知山市の空調トラブルに迅速対応
        </p>
<h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
  空間を支える、確かな技術。
  <br />
  <span className="block text-[#d4af37] mt-2">
    信頼と品質で選ばれる空調設備。
  </span>
</h1>


        <div className="h-px w-32 bg-[#d4af37]" />
        <p className="max-w-3xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
          {siteConfig.tagline}。
          家庭用エアコンから業務用空調まで、修理・取付・洗浄・点検をワンストップ対応。
          地域密着だからこそのスピードと丁寧な説明で、技術力と安心感をお届けします。
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center justify-center gap-2 rounded-full border border-[#d4af37] bg-black px-8 py-4 text-base font-bold text-[#d4af37] shadow-xl transition duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-[#d4af37]/60 hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]"
          >
            <PhoneIcon className="h-5 w-5 text-[#d4af37]" />
            {siteConfig.phone}
          </a>

          <a
            href="#contact"
            className="rounded-full border border-neutral-600 bg-neutral-900 px-8 py-4 text-center text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:border-[#d4af37]"
          >
            お問い合わせフォーム
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
