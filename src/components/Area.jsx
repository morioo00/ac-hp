import { siteConfig } from "../data/siteConfig";

const Area = () => {
  return (
    <section id="about" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">対応エリア・営業時間</h2>
        <div className="mt-1 mb-6 h-[2px] w-full bg-[#d4af37]" />
        <div className="rounded-2xl border border-[#d4af37]/30 bg-neutral-900 p-8 shadow-xl">
          <p className="text-base text-neutral-200">対応エリア：{siteConfig.area}</p>
          <p className="mt-2 text-base text-neutral-200">営業時間：{siteConfig.businessHours}</p>
        </div>
      </div>
    </section>
  );
};

export default Area;
