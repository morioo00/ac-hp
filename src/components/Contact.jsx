import { siteConfig } from "../data/siteConfig";

const Contact = () => {
  return (
    <section id="contact" className="bg-sky-50 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-slate-800 sm:text-4xl">
          お問い合わせ
        </h2>

        <div className="mt-4 mb-10 h-[2px] w-full bg-[#0ea5b7]" />

        <div className="grid gap-4 sm:grid-cols-2">
          {/* 電話（カード全体タップ + 右に画像） */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="
              rounded-2xl border border-[#0ea5b7]/30
              bg-white
              text-slate-800 shadow-xl
              transition duration-300
              hover:-translate-y-1 hover:shadow-2xl
              overflow-hidden
            "
            aria-label={`電話する ${siteConfig.phone}`}
          >
            <div className="flex items-center p-6">
              {/* 左：テキスト */}
              <div className="min-w-0">
                <p className="text-sm">お急ぎの方はお電話ください</p>
                <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#38bdf8] tracking-wide">
                  {siteConfig.phone}
                </p>
              </div>

              <img
                src="/works/silhouette_lp_final.png"
                alt=""
                className="
                  ml-auto
                  h-16 w-16
                  sm:h-20 sm:w-20
                  lg:h-28 lg:w-28
                  object-contain
                  opacity-90
                  pointer-events-none
                  select-none
                "
              />
            </div>
          </a>

          {/* メール + 会社所在地（GoogleMap） */}
          <div className="rounded-2xl border border-[#0ea5b7]/30 bg-white p-6 shadow-lg transition duration-300
    hover:-translate-y-1 hover:shadow-2xl">
            <p className="text-sm text-slate-500">メール</p>

            <a
              className="mt-2 block text-lg font-semibold text-slate-800"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>

            <a
              href={siteConfig.googleFormUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block mx-auto rounded-full border border-[#0ea5b7] px-4 py-2 text-center text-sm font-semibold text-[#38bdf8] transition hover:bg-[#0ea5b7]/10"
            >
              <div className="font-semibold text-[#38bdf8]">会社所在地</div>
              <div className="text-xs text-[#38bdf8]/80">
                【GoogleMapが開きます】
              </div>
            </a>
          </div>
        </div>

        <p className="mt-10 border-l-2 border-[#0ea5b7]/70 pl-4 text-base leading-relaxed text-slate-700 sm:text-lg">
          まずはお気軽にご相談ください。
          <br />
          小さなお困りごとでも丁寧に対応いたします。
        </p>
      </div>
    </section>
  );
};

export default Contact;