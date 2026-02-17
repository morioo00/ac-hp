import { useState } from "react";
import { siteConfig } from "../data/siteConfig";

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const saveItems = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  };

  const openItem = (item) => {
    setSelectedItem(item);
    setIsEditMode(false);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsEditMode(false);
    setIsPasswordModalOpen(false);
    setPendingAction("");
    setAdminPasswordInput("");
    setPasswordError("");
  };

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

    if (pendingAction === "edit") {
      setIsEditMode(true);
    }

    if (pendingAction === "delete") {
      handleDelete();
    }

    setPendingAction("");
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    const nextItems = items.filter((item) => item.id !== selectedItem.id);
    saveItems(nextItems);
    closeModal();
  };

  const handleEditSave = () => {
    if (!selectedItem || !editTitle || !editDescription) return;

    const nextItems = items.map((item) =>
      item.id === selectedItem.id
        ? {
            ...item,
            title: editTitle,
            description: editDescription,
          }
        : item,
    );

    const updatedItem = {
      ...selectedItem,
      title: editTitle,
      description: editDescription,
    };

    saveItems(nextItems);
    setSelectedItem(updatedItem);
    setIsEditMode(false);
  };

  const handleEditCancel = () => {
    if (selectedItem) {
      setEditTitle(selectedItem.title);
      setEditDescription(selectedItem.description);
    }
    setIsEditMode(false);
  };

  return (
    <section id="cases" className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">施工事例一覧</h2>
        <div className="mb-8 mt-2 h-[2px] w-full bg-[#d4af37]" />

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
                  onClick={() => openItem(item)}
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

        <a
          href="#top"
          className="mt-10 inline-block rounded-xl border border-[#d4af37]/60 px-5 py-3 font-semibold text-[#f0dd9b] transition hover:bg-[#d4af37]/10"
        >
          トップページに戻る
        </a>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closeModal}>
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-6 top-6 text-4xl font-bold text-white transition hover:scale-110"
            aria-label="拡大画像を閉じる"
          >
            ×
          </button>

          <div onClick={(e) => e.stopPropagation()} className="relative w-full">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="mx-auto max-h-[92vh] max-w-[92vw] rounded-xl shadow-2xl"
            />

            <div className="fixed bottom-6 right-6 flex flex-col gap-2">
              {!isEditMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => openPasswordModal("edit")}
                    className="rounded-lg border border-[#d4af37]/30 bg-black/55 px-4 py-2 text-sm font-medium text-[#f0dd9b]/75 transition hover:border-[#d4af37]/50 hover:text-[#f0dd9b]"
                  >
                    編集
                  </button>
                  <button
                    type="button"
                    onClick={() => openPasswordModal("delete")}
                    className="rounded-lg border border-[#d4af37]/30 bg-black/55 px-4 py-2 text-sm font-medium text-[#f0dd9b]/75 transition hover:border-[#d4af37]/50 hover:text-[#f0dd9b]"
                  >
                    削除
                  </button>
                </>
              ) : (
                <div className="w-[88vw] max-w-sm space-y-2 rounded-xl border border-[#d4af37]/35 bg-neutral-950/95 p-3">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="タイトル"
                    className="w-full rounded-md border border-[#d4af37]/30 bg-black px-3 py-2 text-sm text-white"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="説明"
                    rows={3}
                    className="w-full rounded-md border border-[#d4af37]/30 bg-black px-3 py-2 text-sm text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleEditSave}
                      className="flex-1 rounded-md bg-[#d4af37] px-3 py-2 text-sm font-semibold text-black"
                    >
                      編集を保存
                    </button>
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      className="flex-1 rounded-md bg-neutral-700 px-3 py-2 text-sm font-semibold text-white"
                    >
                      編集キャンセル
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isPasswordModalOpen && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handlePasswordConfirm}
                className="w-full max-w-sm space-y-3 rounded-xl border border-[#d4af37]/35 bg-neutral-950 p-4"
              >
                <p className="text-sm text-[#f0dd9b]">管理者パスワードを入力してください</p>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full rounded-md border border-[#d4af37]/30 bg-black px-3 py-2 text-white"
                  placeholder="パスワード"
                />
                {passwordError && <p className="text-xs text-red-400">{passwordError}</p>}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-[#d4af37] px-3 py-2 text-sm font-semibold text-black"
                  >
                    確認
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="flex-1 rounded-md bg-neutral-700 px-3 py-2 text-sm font-semibold text-white"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CaseStudies;
