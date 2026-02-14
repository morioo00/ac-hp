import { siteConfig } from "../data/siteConfig";

const Area = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">対応エリア・営業時間</h2>
        <div className="mb-8 h-1 w-20 rounded-full bg-blue-900" />
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-lg">
          <p className="text-base text-gray-700">対応エリア：{siteConfig.area}</p>
          <p className="mt-2 text-base text-gray-700">営業時間：{siteConfig.businessHours}</p>
        </div>
      </div>
    </section>
  );
};

export default Area;
