import { siteConfig } from "../data/siteConfig";

const Area = () => {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">対応エリア・営業時間</h2>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-base text-gray-700">対応エリア：{siteConfig.area}</p>
          <p className="mt-2 text-base text-gray-700">営業時間：{siteConfig.businessHours}</p>
        </div>
      </div>
    </section>
  );
};

export default Area;
