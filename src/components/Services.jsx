import { siteConfig } from "../data/siteConfig";
import {
  ArrowPathIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "./HeroIcons";

const serviceIcons = [
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
];

const Services = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">対応サービス</h2>
        <div className="mb-10 h-1 w-20 rounded-full bg-blue-900" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <div
                key={service}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-900">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-lg font-semibold text-gray-900">{service}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">現地状況を確認し、最適な施工プランをご案内します。</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
