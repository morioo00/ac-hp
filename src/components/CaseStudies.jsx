import { useEffect, useState } from "react";
import { siteConfig } from "../data/siteConfig"; // いったん残してOK（後で消せる）

const CaseStudies = ({ items, loading, fetchError }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // いったん編集系は“表示だけ”にするためstateは残してもOK（不要なら削除）
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // パスワードモーダルも一旦はオフ運用（不要なら削除）
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const openItem = (item) => {
    setSelectedItem(item);
    setIsEditMode(false);
    setEditTitle(item.title ?? "");
    setEditDescription(item.description ?? "");
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsEditMode(false);
    setIsPasswordModalOpen(false);
    setPendingAction("");
    setAdminPasswordInput("");
    setPasswordError("");
  };

  useEffect(() => {
    // モーダルが閉じているときは何もしない
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

  // ここから下の「編集/削除」は Supabase UPDATE/DELETE 実装後に復活させる想定
  const openPasswordModal = (action) => {
    setPendingAction(action);
    setAdminPasswordInput("");
    setPasswordError("");
    setIsPasswordModalOpen(true);
  };

  const handlePasswordConfirm = (e) => {
    e.preventDefault();

    if (adminPasswordInput !== siteConfig.adminPassword) {
      setPasswordError("パスワードが違います。");
      return;
    }

    setIsPasswordModalOpen(false);
    setAdminPasswordInput("");
    setPasswordError("");

    if (pendingAction === "edit") setIsEditMode(true);
    // if (pendingAction === "delete") handleDelete(); // ★後でSupabase DELETEに差し替え

    setPendingAction("");
  };

  return (
    <section id="cases" className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          施工事例一覧
        </h2>
        <div className="mb-8 mt-2 h-[2px] w-full bg-[#d4af37]" />

        {loading ? (
          <p className="rounded-2xl border border-[#d4af37]/25 bg-black/40 p-8 text-center text-neutral-300">
            読み込み中...
          </p>
        ) : fetchError ? (
          <p className="rounded-2xl border border-red-500/25 bg-black/40 p-8 text-center text-red-300">
            取得エラー：{fetchError}
          </p>
        ) : items.length === 0 ? (
          <p className="rounded-2xl border border-[#d4af37]/25 bg-black/40 p-8 text-center text-neutral-300">
            まだ施工事例はありません。
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
                  <h3 className="text-lg font-semibold text-[#f0dd9b]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-300">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <a
          href="#top"
          className="mt-10 inline-block rounded-xl border border-[#d4af37]/60 px-5 py-3 font-semibold text-[#f0dd9b] transition hover:bg-[#d4af37]/10"
        >
          トップページに戻る
        </a>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          <button
            type="button"
            onClick={closeModal}
            aria-label="モーダルを閉じる"
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-4xl font-bold text-white transition hover:scale-110 hover:bg-black/70"
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

            {/* ★編集/削除は一旦オフ（UPDATE/DELETE＋RLS設計後に復活） */}
            {/* 
            <div className="fixed bottom-6 right-6 flex flex-col gap-2">
              {!isEditMode ? (
                <>
                  <button type="button" onClick={() => openPasswordModal("edit")} ...>編集</button>
                  <button type="button" onClick={() => openPasswordModal("delete")} ...>削除</button>
                </>
              ) : (
                ...
              )}
            </div>

            {isPasswordModalOpen && (
              ...
            )}
            */}
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudies;