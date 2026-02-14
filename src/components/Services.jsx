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
    <section className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">対応サービス</h2>
        <div className="mb-10 h-px w-24 bg-[#d4af37]" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <div
                key={service}
                className="rounded-2xl border border-[#d4af37]/20 bg-neutral-800 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-black p-3 text-[#d4af37]">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-lg font-semibold text-white">{service}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">現地状況を確認し、最適な施工プランをご案内します。</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
