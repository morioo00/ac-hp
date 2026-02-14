import { siteConfig } from "../data/siteConfig";

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">お問い合わせ</h2>
        <div className="mb-8 h-1 w-20 rounded-full bg-blue-900" />
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="rounded-2xl bg-gray-900 p-6 text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-blue-900"
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
              会社所在地 【GoogleMapが開きます】
            
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
