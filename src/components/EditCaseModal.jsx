import { useEffect, useState } from "react";

function EditCaseModal({
  open,
  initialData,
  loading = false,
  errorMessage = "",
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!initialData) {
      setTitle("");
      setDescription("");
      return;
    }

    setTitle(initialData.title ?? "");
    setDescription(initialData.description ?? "");
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      {/* ここ変更：追加モーダルと同じサイズ */}
      <div
        className="w-full max-w-xl rounded-[28px] border border-[#c8a63c] bg-black px-6 py-7 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-wide text-[#f3e3a2]">
            施工事例を編集
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#c8a63c] px-4 py-2 text-sm font-semibold text-[#f3e3a2] transition hover:bg-[#c8a63c] hover:text-black"
          >
            閉じる
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* タイトル */}
          <div>
            <label className="mb-2 block text-base font-semibold text-[#f3e3a2]">
              タイトル
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトル"
              className="w-full rounded-xl border border-[#c8a63c] bg-black px-4 py-4 text-base text-white placeholder:text-gray-400 outline-none"
              disabled={loading}
            />
          </div>

          {/* 説明 */}
          <div>
            <label className="mb-2 block text-base font-semibold text-[#f3e3a2]">
              説明
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明"
              rows={4}   // ここ変更（追加モーダルと同じ高さ感）
              className="w-full rounded-xl border border-[#c8a63c] bg-black px-4 py-4 text-base text-white placeholder:text-gray-400 outline-none"
              disabled={loading}
            />
          </div>

          {errorMessage && (
            <p className="text-sm font-semibold text-red-400">
              {errorMessage}
            </p>
          )}

          {/* ボタン */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#c8a63c] px-6 py-3 text-base font-semibold text-[#f3e3a2] transition hover:bg-[#c8a63c] hover:text-black"
              disabled={loading}
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#d4af37] px-6 py-3 text-base font-bold text-black transition hover:brightness-105"
              disabled={loading}
            >
              {loading ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCaseModal;