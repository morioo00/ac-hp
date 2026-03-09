import { useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { supabase } from "../lib/supabaseClient"; 

// ここはStorageのバケット名（Supabaseで作ったやつ）
const BUCKET = "cases-images"; // ←違う名前なら合わせる

const Footer = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ base64じゃなくFileを持つ
  const [imageFile, setImageFile] = useState(null);

  const closeLogin = () => {
    setIsLoginOpen(false);
    setPassword("");
    setError("");
  };

  const closeAdminPanel = () => {
    setIsAdmin(false);
    setTitle("");
    setDescription("");
    setImageFile(null);
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === siteConfig.adminPassword) {
      setIsAdmin(true);
      closeLogin();
      window.location.hash = "#cases";
      return;
    }
    setError("パスワードが違います。");
  };

  // ✅ Fileをそのまま保持
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file ?? null);
  };

  // ✅ 画像アップ→URL作成→DB insert
  const handlePost = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description || !imageFile) {
      setError("タイトル・説明・画像をすべて入力してください。");
      return;
    }

    try {
      // 1) Storageにアップロード（ファイル名は衝突しないように）
      const ext = imageFile.name.split(".").pop() || "png";
      const filePath = `cases/${Date.now()}-${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: imageFile.type || undefined,
        });

      if (uploadError) throw uploadError;

      // 2) 公開URLを取得（バケットが public 前提）
      const { data: publicData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

      const imageUrl = publicData?.publicUrl;
      if (!imageUrl) throw new Error("画像URLの生成に失敗しました");

      // 3) casesテーブルにINSERT
      const { error: insertError } = await supabase.from("cases").insert([
        {
          title,
          description,
          image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      // ✅ 成功したら閉じる
      closeAdminPanel();
      window.location.hash = "#cases";
    } catch (err) {
      console.error(err);
      setError(err?.message ?? "投稿に失敗しました。");
    }
  };

  return (
    <footer id="footer" className="relative border-t border-[#d4af37]/20 bg-black py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm text-neutral-400 sm:px-6">
        <p>{siteConfig.brand}</p>
        <p className="mt-1">© {new Date().getFullYear()}  UPDRAFT. All Rights Reserved.</p>
      </div>

      <button
        type="button"
        aria-label="管理者ログイン"
        onClick={() => {
          setError("");
          setIsLoginOpen(true);
        }}
        className="absolute bottom-3 right-4 h-7 w-7 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#d4af37]/35 transition hover:border-[#d4af37]/50 hover:text-[#d4af37]/80"
      >
        ●
      </button>

      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={closeLogin}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleLogin}
            className="w-full max-w-md space-y-4 rounded-2xl border border-[#d4af37]/35 bg-neutral-950 p-6"
          >
            <h3 className="text-xl font-semibold text-[#f0dd9b]">管理者ログイン</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワード"
              className="w-full rounded-lg border border-[#d4af37]/30 bg-black px-4 py-3 text-white outline-none"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#d4af37] px-4 py-3 font-bold text-black transition hover:bg-[#e5c85d]"
            >
              ログイン
            </button>
          </form>
        </div>
      )}

      {isAdmin && (
        <div className="fixed bottom-24 right-4 z-40 w-[92vw] max-w-md rounded-2xl border border-[#d4af37]/45 bg-neutral-950/95 p-4 shadow-2xl backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#f0dd9b]">施工事例を追加</h3>
            <button
              type="button"
              onClick={closeAdminPanel}
              className="rounded-md border border-[#d4af37]/30 px-2 py-1 text-xs text-[#f0dd9b] transition hover:border-[#d4af37]/70"
            >
              閉じる
            </button>
          </div>

          <form className="space-y-3" onSubmit={handlePost}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトル"
              className="w-full rounded-lg border border-[#d4af37]/25 bg-black px-3 py-2 text-white"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明"
              rows={3}
              className="w-full rounded-lg border border-[#d4af37]/25 bg-black px-3 py-2 text-white"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full rounded-lg border border-[#d4af37]/25 bg-black px-3 py-2 text-neutral-300"
            />

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#d4af37] px-3 py-2 font-semibold text-black transition hover:bg-[#e5c85d]"
            >
              投稿する
            </button>
          </form>
        </div>
      )}
    </footer>
  );
};

export default Footer;