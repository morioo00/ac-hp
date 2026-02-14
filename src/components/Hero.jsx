import { siteConfig } from "../data/siteConfig";
import { PhoneIcon } from "./HeroIcons";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-24">
        <p className="inline-block w-fit rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-blue-900 sm:text-sm">
          京都府福知山市の空調トラブルに迅速対応
        </p>
        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-gray-900 sm:text-6xl">
          快適な空間を守る、
          <span className="block text-blue-900">信頼の空調パートナー。</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
          {siteConfig.tagline}。
          家庭用エアコンから業務用空調まで、修理・取付・洗浄・点検をワンストップ対応。
          地域密着だからこそのスピードと丁寧な説明で、安心してご相談いただけます。
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center justify-center gap-2 rounded-full bg-blue-900 px-8 py-4 text-base font-bold text-white shadow-xl transition duration-300 hover:scale-[1.02] hover:shadow-2xl"
          >
            <PhoneIcon className="h-5 w-5 text-blue-200" />
            {siteConfig.phone}
          </a>

          <a
            href="#contact"
            className="rounded-full border border-gray-300 bg-white px-8 py-4 text-center text-base font-semibold text-gray-700 shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            お問い合わせフォーム
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
