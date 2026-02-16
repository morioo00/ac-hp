import { useEffect, useMemo, useRef, useState } from "react";

// "約1,500円" / "1500円" / "1,500" みたいなのを数値化
const parseYen = (text) => {
  if (!text) return null;
  const n = Number(String(text).replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
};

// value から「最小」「最大」「見積/問合せフラグ」を返す
const parseValueToRange = (value) => {
  const v = String(value || "");

  // 見積・問合せ系
  if (v.includes("要見積") || v.includes("要問合せ") || v.includes("機種による")) {
    return { min: null, max: null, uncertain: true };
  }

  // 範囲 "3,000～8,000円" / "3000-8000" 等に対応
  if (v.includes("～") || v.includes("-") || v.includes("〜")) {
    const parts = v.split(/～|〜|-/).map((s) => parseYen(s));
    const nums = parts.filter((x) => x !== null);
    if (nums.length >= 2) {
      return { min: Math.min(...nums), max: Math.max(...nums), uncertain: false };
    }
  }

  // 単一金額
  const one = parseYen(v);
  if (one !== null) return { min: one, max: one, uncertain: false };

  return { min: null, max: null, uncertain: true };
};

const fmtYen = (n) => `約${n.toLocaleString("ja-JP")}円`;

// ✅ 数値をカウントアップさせる hooks
const useCountUp = (target, durationMs = 450) => {
  const [value, setValue] = useState(target ?? 0);
  const fromRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    if (target == null) return;

    const from = fromRef.current ?? 0;
    const to = target;
    if (from === to) {
      setValue(to);
      return;
    }

    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(t);
      const next = Math.round(from + (to - from) * eased);
      setValue(next);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  useEffect(() => {
    // 初期同期
    fromRef.current = target ?? 0;
    setValue(target ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
};

const Price = () => {
  const rows = useMemo(
    () => [
      {
        key: "出張費",
        title: "出張費",
        options: [
          { label: "10km以内", value: "約1,500円" },
          { label: "30km以内", value: "約2,000円" },
          { label: "50km以内", value: "約4,000円" },
        ],
      },
      {
        key: "診断費",
        title: "診断費",
        options: [
          { label: "ルームエアコン", value: "約2,000円" },
          { label: "エコキュート", value: "約2,000円" },
          { label: "業務用エアコン", value: "機種による(要問合せ)" },
        ],
      },
      {
        key: "基本工賃",
        title: "基本工賃",
        options: [
          { label: "ルームエアコン", value: "約3,000～8,000円" },
          { label: "エコキュート", value: "約3,000～8,000円" },
          { label: "業務用エアコン", value: "要見積" },
        ],
      },
    ],
    []
  );

  const [openKey, setOpenKey] = useState(null);

  // ✅ 選択状態は label/value 両方保持
  const [selected, setSelected] = useState(() => {
    const init = {};
    rows.forEach((r) => {
      init[r.key] = {
        label: r.options[0].label,
        value: r.options[0].value,
      };
    });
    return init;
  });

  const toggleRow = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const selectOption = (key, option) => {
    setSelected((prev) => ({
      ...prev,
      [key]: { label: option.label, value: option.value },
    }));
    setOpenKey(null);
  };

  // ✅ 合計（最小〜最大、見積含むか）
  const total = useMemo(() => {
    const ranges = rows.map((r) => parseValueToRange(selected[r.key]?.value));
    const hasUncertain = ranges.some((x) => x.uncertain);

    const mins = ranges.map((x) => x.min).filter((x) => x !== null);
    const maxs = ranges.map((x) => x.max).filter((x) => x !== null);

    const minSum = mins.reduce((a, b) => a + b, 0);
    const maxSum = maxs.reduce((a, b) => a + b, 0);

    const hasAny = mins.length > 0 || maxs.length > 0;

    return { hasUncertain, hasAny, minSum, maxSum };
  }, [rows, selected]);

  // ✅ カウントアップ用（min/max を別々に動かす）
  const animatedMin = useCountUp(total.hasAny ? total.minSum : null, 520);
  const animatedMax = useCountUp(total.hasAny ? total.maxSum : null, 520);

  const totalText = (() => {
    if (!total.hasAny) return "算出不可";

    // 単一金額
    if (total.minSum === total.maxSum) {
      return `${fmtYen(animatedMin)}${total.hasUncertain ? "（※要見積項目あり）" : ""}`;
    }

    // 範囲
    const rangeText = `${fmtYen(animatedMin)} 〜 ${fmtYen(animatedMax)}`;
    return total.hasUncertain ? `${rangeText}（※要見積項目あり）` : rangeText;
  })();

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
          料金目安
        </h2>

        <div className="mt-1 mb-6 h-[2px] w-full bg-[#d4af37]" />

        <div className="overflow-hidden rounded-2xl border border-[#d4af37]/30">
          {/* ヘッダー */}
          <div className="grid grid-cols-2 bg-[#d4af37] px-6 py-5 font-bold text-black">
            <div>項目</div>
            <div className="text-center">目安料金</div>
          </div>

          {rows.map((row) => {
            const isOpen = openKey === row.key;

            return (
              <div key={row.key} className="border-t border-[#d4af37]/20">
                {/* 行 */}
                <button
                  type="button"
                  onClick={() => toggleRow(row.key)}
                  className="w-full grid grid-cols-2 px-6 py-6 bg-neutral-800 text-left hover:bg-neutral-750 transition"
                >
                  <div className="text-white font-semibold">{row.title}</div>

                  <div className="text-center text-white font-bold flex items-center justify-center gap-2">
                    {selected[row.key].value}
                    <span
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </div>
                </button>

                {/* ヌルッと開く部分 */}
                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="bg-neutral-900 px-6 py-6">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {row.options.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => selectOption(row.key, opt)}
                          className={`
                            rounded-xl border px-4 py-3 text-sm font-semibold transition
                            ${
                              selected[row.key].label === opt.label
                                ? "border-[#d4af37] bg-[#d4af37]/10 text-[#f0dd9b]"
                                : "border-[#d4af37]/30 bg-neutral-800 text-neutral-200 hover:bg-neutral-750"
                            }
                          `}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    {row.key === "出張費" && (
                      <p className="mt-4 text-xs text-neutral-400">
                        ※距離に応じて出張費が変動します。
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ✅ 合計（背景をほんの少し変えて見やすく） */}
          <div className="border-t border-[#d4af37]/20 bg-neutral-900/70">
            <div className="grid grid-cols-2 px-6 py-6">
              <div className="text-white font-bold">合計目安</div>

              <div className="text-center font-extrabold text-[#f0dd9b] tracking-wide">
                {totalText}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-2 text-sm text-neutral-300">
          <p>※事前に内容をご説明し、ご納得いただいてから作業いたします。</p>
          <p>※追加費用が発生する場合は必ずご説明いたします。</p>
        </div>
      </div>
    </section>
  );
};

export default Price;
