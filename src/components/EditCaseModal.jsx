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

  // ここ追加: 編集対象が変わったらフォームに初期値を入れる
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
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 text-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-2xl font-bold">施工事例を編集</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold">タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              disabled={loading}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">説明</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明を入力"
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              disabled={loading}
            />
          </div>

          {errorMessage ? (
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold"
              disabled={loading}
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
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