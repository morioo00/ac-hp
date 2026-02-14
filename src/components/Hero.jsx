import { siteConfig } from "../data/siteConfig";

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 sm:py-20">
        <p className="inline-block w-fit rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 sm:text-sm">
          大阪府〇〇市の空調トラブルに迅速対応
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-5xl">{siteConfig.tagline}</h1>
        <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          家庭用エアコンから業務用空調まで、修理・取付・洗浄・点検をワンストップ対応。
          地域密着だからこそのスピードと丁寧な説明で、安心してご相談いただけます。
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone}`}
            className="rounded-full bg-black px-6 py-4 text-center text-base font-bold text-white transition hover:bg-gray-800"
          >
            📞 {siteConfig.phone}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-gray-300 bg-white px-6 py-4 text-center text-base font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            お問い合わせフォーム
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
