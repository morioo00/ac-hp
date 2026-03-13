import { siteConfig } from "../data/siteConfig";

const Area = () => {
  return (
    <section id="about" className="bg-sky-50 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-slate-800 sm:text-4xl">対応エリア・営業時間</h2>
        <div className="mt-1 mb-6 h-[2px] w-full bg-[#0ea5b7]" />
        <div className="rounded-2xl border border-[#0ea5b7]/30 bg-sky-50 p-8 shadow-xl">
          <div className="space-y-1">
            <p className="font-semibold">対応エリア</p>
            <p>{siteConfig.area}</p>
          </div>
          <p className="mt-2 text-base text-slate-700">営業時間：{siteConfig.businessHours}</p>
        </div>
      </div>
    </section>
  );
};

export default Area;
