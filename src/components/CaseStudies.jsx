import { useState } from "react";

const STORAGE_KEY = "adminCaseStudies";

const loadItems = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const CaseStudies = () => {
  const [items] = useState(loadItems);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="cases" className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">施工事例一覧</h2>
        <div className="mb-8 mt-2 h-[2px] w-full bg-[#d4af37]" />

        <a
          href="#top"
          className="mb-8 inline-block rounded-xl border border-[#d4af37]/60 px-5 py-3 font-semibold text-[#f0dd9b] transition hover:bg-[#d4af37]/10"
        >
          トップページに戻る
        </a>

        {items.length === 0 ? (
          <p className="rounded-2xl border border-[#d4af37]/25 bg-black/40 p-8 text-center text-neutral-300">
            まだ施工事例はありません。管理者ログイン後に追加できます。
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#d4af37]/25 bg-neutral-800 shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="block w-full overflow-hidden"
                  aria-label={`${item.title}を拡大表示`}
                >
                  <img src={item.image} alt={item.title} className="h-56 w-full object-cover transition hover:scale-105" />
                </button>
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold text-[#f0dd9b]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-300">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            className="absolute right-6 top-6 text-4xl font-bold text-white transition hover:scale-110"
            aria-label="拡大画像を閉じる"
          >
            ×
          </button>
          <img
            src={selectedItem.image}
            alt={selectedItem.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[92vw] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};

export default CaseStudies;
