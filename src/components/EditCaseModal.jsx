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
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 px-4"
      onClick={onClose}
    >
      {/* ここ変更：追加モーダルと同じサイズ */}
      <div
        className="w-full max-w-xl rounded-[28px] border border-[#0ea5b7] bg-sky-50 px-6 py-7 text-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-wide text-[#38bdf8]">
            施工事例を編集
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#0ea5b7] px-4 py-2 text-sm font-semibold text-[#38bdf8] transition hover:bg-[#0ea5b7] hover:text-white"
          >
            閉じる
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* タイトル */}
          <div>
            <label className="mb-2 block text-base font-semibold text-[#38bdf8]">
              タイトル
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトル"
              className="w-full rounded-xl border border-[#0ea5b7] bg-sky-50 px-4 py-4 text-base text-slate-800 placeholder:text-gray-400 outline-none"
              disabled={loading}
            />
          </div>

          {/* 説明 */}
          <div>
            <label className="mb-2 block text-base font-semibold text-[#38bdf8]">
              説明
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明"
              rows={4}   // ここ変更（追加モーダルと同じ高さ感）
              className="w-full rounded-xl border border-[#0ea5b7] bg-sky-50 px-4 py-4 text-base text-slate-800 placeholder:text-gray-400 outline-none"
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
              className="rounded-xl border border-[#0ea5b7] px-6 py-3 text-base font-semibold text-[#38bdf8] transition hover:bg-[#0ea5b7] hover:text-white"
              disabled={loading}
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#0ea5b7] px-6 py-3 text-base font-bold text-white transition hover:brightness-105"
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