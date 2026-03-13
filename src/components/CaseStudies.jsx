import { useEffect, useState } from "react";

const CaseStudies = ({
  items,
  loading,
  fetchError,
  isAdmin,
  onRequestAdminAction,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const openItem = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // 編集ボタン押下時に親(App.jsx)へ通知
  const handleEditClick = () => {
    if (!selectedItem) return;
    onRequestAdminAction?.("edit", selectedItem);
  };

  // 削除ボタン押下時に親(App.jsx)へ通知
  const handleDeleteClick = () => {
    if (!selectedItem) return;
    onRequestAdminAction?.("delete", selectedItem);
  };

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

    // 一覧から選択中の施工事例が消えたら、拡大モーダルも閉じる
  useEffect(() => {
    if (!selectedItem) return;

    const stillExists = items.some((item) => item.id === selectedItem.id);

    if (!stillExists) {
      closeModal();
    }
  }, [items, selectedItem]);

  return (
    <section id="cases" className="bg-sky-50 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-slate-800 sm:text-4xl">
          施工事例一覧
        </h2>
        <div className="mb-8 mt-2 h-[2px] w-full bg-[#0ea5b7]" />

        {loading ? (
          <p className="rounded-2xl border border-[#0ea5b7]/25 bg-sky-50/40 p-8 text-center text-slate-600">
            読み込み中...
          </p>
        ) : fetchError ? (
          <p className="rounded-2xl border border-red-500/25 bg-sky-50/40 p-8 text-center text-red-300">
            取得エラー：{fetchError}
          </p>
        ) : items.length === 0 ? (
          <p className="rounded-2xl border border-[#0ea5b7]/25 bg-sky-50/40 p-8 text-center text-slate-600">
            まだ施工事例はありません。
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#0ea5b7]/25 bg-white shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => openItem(item)}
                  className="block w-full overflow-hidden"
                  aria-label={`${item.title}を拡大表示`}
                >
                  <img
                    src={item.image_url}
                    alt={item.title ?? "施工画像"}
                    className="h-56 w-full object-cover transition hover:scale-105"
                    loading="lazy"
                  />
                </button>

                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold text-[#38bdf8]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <a
          href="#top"
          className="mt-10 inline-block rounded-xl border border-[#0ea5b7]/60 px-5 py-3 font-semibold text-[#38bdf8] transition hover:bg-[#0ea5b7]/10"
        >
          トップページに戻る
        </a>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 p-4"
          onClick={closeModal}
        >
          <button
            type="button"
            onClick={closeModal}
            aria-label="モーダルを閉じる"
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/45 text-4xl font-bold text-white transition hover:scale-110 hover:bg-slate-900/70"
          >
            ×
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative inline-block max-w-[92vw]"
          >
            <img
              src={selectedItem.image_url}
              alt={selectedItem.title ?? "施工画像"}
              className="mx-auto max-h-[92vh] max-w-[92vw] rounded-xl shadow-2xl"
            />

            <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
              <button
                type="button"
                onClick={handleEditClick}
                className="rounded-xl bg-[#0ea5b7] px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:brightness-105"
              >
                {isAdmin ? "編集" : "編集"}
              </button>

              <button
                type="button"
                onClick={handleDeleteClick}
                className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-red-500"
              >
                {isAdmin ? "削除" : "削除"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudies;