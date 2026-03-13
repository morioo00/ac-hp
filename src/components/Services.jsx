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

const serviceMessages = {
  修理: "急な故障にも迅速に対応し、安心して使える状態へ丁寧に復旧します。",
  "設置（新規取付）": "設置場所やご予算に合わせて、使いやすさまで考えたご提案を行います。",
  "入替（交換）": "古い機器の状態を確認し、業務用・家庭用を問わず最適な入替をご案内します。",
  "洗浄（クリーニング）": "においや汚れの原因を見極め、衛生面に配慮した洗浄を実施します。",
  点検: "トラブルを未然に防ぐため、細かな部分まで確認し分かりやすくご説明します。",
  業務用対応: "店舗・事業所の運用を止めないよう、状況に合わせた段取りで対応します。",
};

const Services = () => {
  return (
    <section className="bg-sky-50 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-slate-800 sm:text-4xl">対応サービス</h2>
        <div className="mt-1 h-[2px] w-full bg-[#0ea5b7]" />



        <p className="mb-10 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          急な故障にも迅速に対応いたします。業務用・家庭用問わず、最適な修理・入替をご提案いたします。
          まずは現地状況を丁寧に確認し、お客様にとって無理のない進め方を一緒に考えます。
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <div
                key={service}
                className="rounded-2xl border border-[#0ea5b7]/20 bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-sky-50 p-3 text-[#0ea5b7]">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-lg font-semibold text-slate-800">{service}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {serviceMessages[service] || "現地状況を確認し、最適な施工プランをご案内します。"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
