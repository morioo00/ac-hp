import { siteConfig } from "../data/siteConfig";

const Contact = () => {
  return (
    <section id="contact" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">お問い合わせ</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="rounded-2xl bg-black p-6 text-white shadow-lg transition hover:bg-gray-800"
          >
            <p className="text-sm">お急ぎの方はお電話ください</p>
            <p className="mt-2 text-2xl font-bold">{siteConfig.phone}</p>
          </a>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">メール</p>
            <a className="mt-2 block text-lg font-semibold text-gray-800" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.googleFormUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              Googleフォーム（URL貼り付け後に有効）
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
