import { useEffect, useState } from "react";
import { siteConfig } from "../data/siteConfig";

const Works = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // 画像が選ばれたらアニメ開始
  useEffect(() => {
    if (selectedImage) {
      // 次の描画タイミングでopenにする（フェードインが効く）
      requestAnimationFrame(() => setIsOpen(true));
    } else {
      setIsOpen(false);
    }
  }, [selectedImage]);

  const closeModal = () => {
    // フェードアウトしてから閉じる
    setIsOpen(false);
    setTimeout(() => setSelectedImage(null), 200);
  };

  return (
    <section id="works" className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl text-center">
          施工実績
        </h2>

        <div className="mt-2 mb-12 h-[2px] w-full bg-[#d4af37]" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.works.map((work, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(work.image)}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-neutral-800 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="overflow-hidden">
                <img
                  src={work.image}
                  alt={work.comment}
                  className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <p className="text-sm leading-relaxed text-neutral-300 text-center">
                  {work.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

{selectedImage && (
  <div
    onClick={closeModal}
    className={`
      fixed inset-0 z-50 flex items-center justify-center
      bg-black/90 backdrop-blur-sm
      transition-opacity duration-300
      ${isOpen ? "opacity-100" : "opacity-0"}
    `}
  >
    {/* ✖ 閉じるボタン */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
      className="absolute top-6 right-6 text-white text-4xl font-bold transition hover:scale-125"
    >
      ×
    </button>

    {/* 強めズーム */}
    <img
      onClick={(e) => e.stopPropagation()}
      src={selectedImage}
      alt=""
      className={`
        max-h-[92vh] max-w-[92vw] rounded-xl shadow-2xl
        transition duration-300 ease-out
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"}
      `}
    />
  </div>
)}

    </section>
  );
};

export default Works;
