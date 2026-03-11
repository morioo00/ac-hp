import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { siteConfig } from "./data/siteConfig";

import Area from "./components/Area";
import CaseStudies from "./components/CaseStudies";
import CompanyOverview from "./components/CompanyOverview";
import Contact from "./components/Contact";
import FloatingCallButton from "./components/FloatingCallButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Price from "./components/Price";
import Services from "./components/Services";
import Works from "./components/Works";
import AdminLoginModal from "./components/AdminLoginModal";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [hideFloating, setHideFloating] = useState(false);

  // 施工事例一覧を親で管理
  const [cases, setCases] = useState([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [casesFetchError, setCasesFetchError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // 管理者ログインを App で管理
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState("");
  const [adminAction, setAdminAction] = useState({
    type: null,
    caseItem: null,
  });

  // 投稿成功した1件を一覧の先頭に追加
  const handleCaseCreated = (newCase) => {
    setCases((prev) => [newCase, ...prev]);
  };

  // Footer から管理者ログインを開く
  const openAdminLoginFromFooter = () => {
    setAdminAction({
      type: "footer-login",
      caseItem: null,
    });
    setAdminLoginError("");
    setAdminModalOpen(true);
  };

  // public URL から Storage 内のファイルパスを取り出す
  const getStoragePathFromImageUrl = (imageUrl) => {
    if (!imageUrl) return null;

    const marker = "/storage/v1/object/public/cases-images/";
    const index = imageUrl.indexOf(marker);

    if (index === -1) return null;

    return imageUrl.slice(index + marker.length);
  };

  // 削除処理本体
  // Database削除の前に Storage の画像も削除する
  const handleDeleteCase = async (caseItem) => {
    if (!caseItem?.id) return;

    const confirmed = window.confirm(
      `「${caseItem.title ?? "この施工事例"}」を削除しますか？`
    );
    if (!confirmed) return;

    // ここ追加:
    // image_url から Storage のパスを取り出す
    const storagePath = getStoragePathFromImageUrl(caseItem.image_url);

    // ここ追加:
    // 画像ファイルが特定できた場合は先に Storage から削除
    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from("cases-images")
        .remove([storagePath]);

      if (storageError) {
        alert(
          `画像ファイルの削除に失敗しました: ${
            storageError.message ?? "unknown error"
          }`
        );
        return;
      }
    }

    // ここは既存:
    // Database のレコード削除
    const { error: dbError } = await supabase
      .from("cases")
      .delete()
      .eq("id", caseItem.id);

    if (dbError) {
      alert(`削除に失敗しました: ${dbError.message ?? "unknown error"}`);
      return;
    }

    // React 一覧更新
    setCases((prev) => prev.filter((item) => item.id !== caseItem.id));

    alert("削除しました。");

    setAdminAction({
      type: null,
      caseItem: null,
    });
  };

  // CaseStudies から「編集したい / 削除したい」を受け取る
  const handleRequestAdminAction = async (type, caseItem) => {
    setAdminAction({
      type,
      caseItem,
    });
    setAdminLoginError("");

    // すでに管理者ログイン済みならログインモーダルをスキップ
    if (isAdmin) {
      if (type === "delete") {
        await handleDeleteCase(caseItem);
      }

      if (type === "edit") {
        console.log("編集対象", caseItem);
      }

      return;
    }

    setAdminModalOpen(true);
  };

  // 管理者ログイン成功時の処理
  const handleAdminLoginSuccess = async (password) => {
    if (password !== siteConfig.adminPassword) {
      setAdminLoginError("パスワードが違います。");
      return;
    }

    setAdminLoginError("");
    setAdminModalOpen(false);
    setIsAdmin(true);

    if (adminAction.type === "footer-login") {
      window.location.hash = "#cases";
      return;
    }

    // ログイン成功後、そのまま action 実行
    if (adminAction.type === "delete") {
      await handleDeleteCase(adminAction.caseItem);
      return;
    }

    if (adminAction.type === "edit") {
      console.log("編集対象", adminAction.caseItem);
      return;
    }
  };

  // 管理者パネルを閉じる
  const handleCloseAdminPanel = () => {
    setIsAdmin(false);
    setAdminAction({
      type: null,
      caseItem: null,
    });
  };

  // hashchange監視
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      setIsMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // 施工事例一覧を初回取得
  useEffect(() => {
    const loadCases = async () => {
      setCasesLoading(true);
      setCasesFetchError("");

      const { data, error } = await supabase
        .from("cases")
        .select("id,title,description,image_url,created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setCasesFetchError(error.message ?? "取得に失敗しました");
        setCases([]);
      } else {
        setCases(Array.isArray(data) ? data : []);
      }

      setCasesLoading(false);
    };

    loadCases();
  }, []);

  // スクロール方向検知：下スクロールで隠す / 上スクロールで表示（スマホのみ）
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        const threshold = 8;
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (isMobile) {
          if (y < 40) setHideFloating(false);
          else if (delta > threshold) setHideFloating(true);
          else if (delta < -threshold) setHideFloating(false);
        } else {
          setHideFloating(false);
        }

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-black text-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main id="top">
        {currentHash === "#company" ? (
          <CompanyOverview />
        ) : currentHash === "#cases" ? (
          <CaseStudies
            items={cases}
            loading={casesLoading}
            fetchError={casesFetchError}
            isAdmin={isAdmin}
            onRequestAdminAction={handleRequestAdminAction}
          />
        ) : (
          <>
            <Hero />
            <Services />
            <Price />
            <Works />
            <Area />
            <Contact />
          </>
        )}
      </main>

      <Footer
        onCaseCreated={handleCaseCreated}
        isAdmin={isAdmin}
        onOpenAdminLogin={openAdminLoginFromFooter}
        onCloseAdminPanel={handleCloseAdminPanel}
      />

      <FloatingCallButton isHidden={isMenuOpen || hideFloating} />

      <AdminLoginModal
        open={adminModalOpen}
        title="管理者ログイン"
        onClose={() => {
          setAdminModalOpen(false);
          setAdminLoginError("");
        }}
        onSuccess={handleAdminLoginSuccess}
        errorMessage={adminLoginError}
      />
    </div>
  );
}

export default App;