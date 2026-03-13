import { useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { supabase } from "../lib/supabaseClient";

// ここはStorageのバケット名（Supabaseで作ったやつ）
const BUCKET = "cases-images";

// App.jsx から状態と関数を受け取る
const Footer = ({
  onCaseCreated,
  isAdmin,
  onOpenAdminLogin,
  onCloseAdminPanel,
}) => {

  // 投稿エラー専用にする
  const [postError, setPostError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // base64じゃなくFileを持つ
  const [imageFile, setImageFile] = useState(null);

  // 投稿フォームを閉じる処理
  const closeAdminPanel = () => {
    onCloseAdminPanel?.();
    setTitle("");
    setDescription("");
    setImageFile(null);
    setPostError("");
  };

  // Fileをそのまま保持
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file ?? null);
  };

  // 画像アップ→URL作成→DB insert
  const handlePost = async (e) => {
    e.preventDefault();
    setPostError("");

    if (!title || !description || !imageFile) {
      setPostError("タイトル・説明・画像をすべて入力してください。");
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
      const { data: insertedCase, error: insertError } = await supabase
        .from("cases")
        .insert([
          {
            title: title.trim(),
            description: description.trim(),
            image_url: imageUrl,
          },
        ])
        .select("id, title, description, image_url, created_at")
        .single();

      if (insertError) throw insertError;

      if (insertedCase && onCaseCreated) {
        onCaseCreated(insertedCase);
      }

      // 成功したら閉じる
      closeAdminPanel();
      window.location.hash = "#cases";
    } catch (err) {
      console.error(err);
      setPostError(err?.message ?? "投稿に失敗しました。"); // ここ変更
    }
  };

  return (
    <footer
      id="footer"
      className="relative border-t border-[#0ea5b7]/20 bg-sky-50 py-10"
    >
      <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500 sm:px-6">
        <p>{siteConfig.brand}</p>
        <p className="mt-1">
          © {new Date().getFullYear()} UPDRAFT. All Rights Reserved.
        </p>
      </div>

      <button
        type="button"
        aria-label="管理者ログイン"
        onClick={() => {
          onOpenAdminLogin?.();
        }}
        className="absolute bottom-3 right-4 h-7 w-7 rounded-full border border-[#0ea5b7]/20 bg-[#0ea5b7]/5 text-[10px] text-[#0ea5b7]/35 transition hover:border-[#0ea5b7]/50 hover:text-[#0ea5b7]/80"
      >
        ●
      </button>

      {isAdmin && (
        <div className="fixed bottom-24 right-4 z-40 w-[92vw] max-w-md rounded-2xl border border-[#0ea5b7]/45 bg-sky-100/95 p-4 shadow-2xl backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#38bdf8]">
              施工事例を追加
            </h3>
            <button
              type="button"
              onClick={closeAdminPanel}
              className="rounded-md border border-[#0ea5b7]/30 px-2 py-1 text-xs text-[#38bdf8] transition hover:border-[#0ea5b7]/70"
            >
              閉じる
            </button>
          </div>

          <form className="space-y-3" onSubmit={handlePost}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトル"
              className="w-full rounded-lg border border-[#0ea5b7]/25 bg-sky-50 px-3 py-2 text-slate-800"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明"
              rows={3}
              className="w-full rounded-lg border border-[#0ea5b7]/25 bg-sky-50 px-3 py-2 text-slate-800"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full rounded-lg border border-[#0ea5b7]/25 bg-sky-50 px-3 py-2 text-slate-600"
            />

            {postError && <p className="text-xs text-red-400">{postError}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#0ea5b7] px-3 py-2 font-semibold text-white transition hover:bg-[#0284c7]"
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