import { useEffect, useState } from "react";

function AdminLoginModal({
  open,
  title = "管理者ログイン",
  onClose,
  onSuccess,
  errorMessage = "",
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ここ追加: モーダルを開くたびに入力状態を初期化
  useEffect(() => {
    if (open) {
      setPassword("");
      setShowPassword(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSuccess(password);
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[28px] border border-[#c8a63c] bg-black px-6 py-7 text-white shadow-2xl md:px-8 md:py-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ここ変更: 上部ヘッダーを投稿フォーム風に統一 */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-wide text-[#f3e3a2]">
            {title}
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
          <div>
            <label className="mb-2 block text-base font-semibold text-[#f3e3a2]">
              パスワード
            </label>

            {/* ここ変更: 黒背景 + 金枠の入力UI */}
            <div className="flex overflow-hidden rounded-xl border border-[#c8a63c] bg-black">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="管理者パスワードを入力"
                className="w-full bg-transparent px-4 py-4 text-base text-white placeholder:text-gray-400 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="shrink-0 px-4 text-sm font-semibold text-[#f3e3a2] transition hover:bg-[#c8a63c] hover:text-black"
              >
                {showPassword ? "非表示" : "表示"}
              </button>
            </div>
          </div>

          {errorMessage ? (
            <p className="text-sm font-semibold text-red-400">
              {errorMessage}
            </p>
          ) : null}

          {/* ここ変更: 下部ボタン配置を投稿フォーム寄りに統一 */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#c8a63c] px-6 py-3 text-base font-semibold text-[#f3e3a2] transition hover:bg-[#c8a63c] hover:text-black"
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#d4af37] px-6 py-3 text-base font-bold text-black transition hover:brightness-105"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginModal;