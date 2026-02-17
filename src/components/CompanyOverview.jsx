import { siteConfig } from "../data/siteConfig";

const CompanyOverview = () => {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">会社概要</h1>
        <div className="mb-8 h-[2px] w-full bg-[#d4af37]" />

        <div className="rounded-2xl border border-[#d4af37]/30 bg-neutral-900 p-8 shadow-xl">
          <dl className="space-y-5 text-neutral-200">
            <div>
              <dt className="text-sm text-neutral-400">会社名</dt>
              <dd className="mt-1 text-base">アップドラフト</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral-400">事業内容</dt>
              <dd className="mt-1 text-base">空調設備の工事・修理・点検</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral-400">電話番号</dt>
              <dd className="mt-1 text-base">{siteConfig.phone}</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral-400">メールアドレス</dt>
              <dd className="mt-1 text-base break-all">{siteConfig.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral-400">対応エリア</dt>
              <dd className="mt-1 text-base">{siteConfig.area}</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral-400">営業時間</dt>
              <dd className="mt-1 text-base">{siteConfig.businessHours}</dd>
            </div>
          </dl>

          <a
            href="#top"
            className="mt-10 inline-block rounded-xl border border-[#d4af37]/60 px-5 py-3 font-semibold text-[#f0dd9b] transition hover:bg-[#d4af37]/10"
          >
            トップページに戻る
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
