import { useEffect, useState } from "react";

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
  const [items, setItems] = useState(loadItems);

  useEffect(() => {
    const refreshItems = () => setItems(loadItems());

    window.addEventListener("storage", refreshItems);
    window.addEventListener("hashchange", refreshItems);

    return () => {
      window.removeEventListener("storage", refreshItems);
      window.removeEventListener("hashchange", refreshItems);
    };
  }, []);

  return (
    <section id="cases" className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">施工事例一覧</h2>
        <div className="mb-12 mt-2 h-[2px] w-full bg-[#d4af37]" />

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
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold text-[#f0dd9b]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-300">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;
