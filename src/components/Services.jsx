import { siteConfig } from "../data/siteConfig";

const Services = () => {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">対応サービス</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service) => (
            <div key={service} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-base font-semibold text-gray-800">{service}</p>
              <p className="mt-2 text-sm text-gray-600">現地状況を確認し、最適な施工プランをご案内します。</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
