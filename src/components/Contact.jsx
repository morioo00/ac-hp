import { siteConfig } from "../data/siteConfig";

const Contact = () => {
  return (
    <section id="contact" className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">お問い合わせ</h2>
        <div className="mb-8 h-px w-24 bg-[#d4af37]" />
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="rounded-2xl border border-[#d4af37]/30 bg-neutral-800 p-6 text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <p className="text-sm">お急ぎの方はお電話ください</p>
            <p className="mt-2 text-2xl font-bold text-[#f0dd9b]">{siteConfig.phone}</p>
          </a>
          <div className="rounded-2xl border border-[#d4af37]/20 bg-neutral-800 p-6 shadow-lg">
            <p className="text-sm text-neutral-400">メール</p>
            <a className="mt-2 block text-lg font-semibold text-white" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.googleFormUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-full border border-[#d4af37] px-4 py-2 text-sm font-semibold text-[#f0dd9b] transition hover:bg-[#d4af37]/10"
            >
              会社所在地 【GoogleMapが開きます】
            </a>
          </div>
        </div>
        <p className="mt-10 border-l-2 border-[#d4af37]/70 pl-4 text-base leading-relaxed text-neutral-200 sm:text-lg">
          まずはお気軽にご相談ください。
          <br />
          小さなお困りごとでも丁寧に対応いたします。
        </p>
      </div>
    </section>
  );
};

export default Contact;
