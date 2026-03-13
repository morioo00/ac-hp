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
      init[r.key] = { label: r.options[0].label, value: r.options[0].value };
    });
    return init;
  });

  const toggleRow = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const selectOption = (key, option) => {
  setSelected((prev) => {
    const next = { ...prev, [key]: { label: option.label, value: option.value } };

    // ✅ 診断費を変えたら、基本工賃も同じ機種に同期する
    if (key === "診断費") {
      const baseRow = rows.find((r) => r.key === "基本工賃");
      const matched = baseRow?.options?.find((opt) => opt.label === option.label);

      if (matched) {
        next["基本工賃"] = { label: matched.label, value: matched.value };
      }
    }

    // ✅ 基本工賃を変えたら、診断費も同じ機種に同期する
    if (key === "基本工賃") {
      const diagRow = rows.find((r) => r.key === "診断費");
      const matched = diagRow?.options?.find((opt) => opt.label === option.label);

      if (matched) {
        next["診断費"] = { label: matched.label, value: matched.value };
      }
    }

    return next;
  });

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

  return (
    <section className="bg-sky-50 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-slate-800 sm:text-4xl">
          料金目安
        </h2>

        <div className="mt-1 mb-6 h-[2px] w-full bg-[#0ea5b7]" />

        <div className="overflow-hidden rounded-2xl border border-[#0ea5b7]/30">
          {/* ヘッダー */}
          <div className="grid grid-cols-3 bg-[#0ea5b7] px-6 py-5 font-bold text-white">
            <div>項目</div>
            <div className="text-center">選択内容</div>
            <div className="text-center">目安料金</div>
          </div>

          {rows.map((row) => {
            const isOpen = openKey === row.key;

            return (
              <div key={row.key} className="border-t border-[#0ea5b7]/20">
                {/* 行 */}
                <button
                  type="button"
                  onClick={() => toggleRow(row.key)}
                  className="w-full grid grid-cols-3 px-6 py-6 bg-white text-left hover:bg-sky-100 transition"
                >
                  {/* 左：項目 */}
                  <div className="text-slate-800 font-semibold">{row.title}</div>

                  {/* 中：選択ラベル */}
                  <div className="text-center text-sm font-semibold text-[#38bdf8] opacity-90">
                    {selected[row.key]?.label}
                  </div>

                  {/* 右：金額 */}
                  <div className="justify-self-center text-slate-800 font-bold">
                    <span className="inline-flex items-center justify-center gap-2">
                      {selected[row.key]?.value}
                      <span
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
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
                  <div className="bg-sky-50 px-6 py-6">
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
                                ? "border-[#0ea5b7] bg-[#0ea5b7]/10 text-[#38bdf8]"
                                : "border-[#0ea5b7]/30 bg-white text-slate-700 hover:bg-sky-100"
                            }
                          `}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    {row.key === "出張費" && (
                      <p className="mt-4 text-xs text-slate-500">
                        ※距離に応じて出張費が変動します。
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ✅ 合計（列構造を揃えて、見切れを根本解決） */}
          <div className="border-t border-[#0ea5b7]/20 bg-sky-50/70">
            <div className="grid grid-cols-3 px-6 py-6 items-start">
              {/* 左 */}
              <div className="text-slate-800 font-bold">合計目安</div>

              {/* 中（空の列で揃える） */}
              <div />

              {/* 右：金額（右詰め・1行・自動縮小） */}
              <div className="min-w-0 justify-self-end text-right font-extrabold text-[#38bdf8] tracking-wide">
                <span className="whitespace-nowrap text-[clamp(14px,3.6vw,22px)]">
                  {total.minSum === total.maxSum
                    ? fmtYen(animatedMin)
                    : `${fmtYen(animatedMin)} 〜 ${fmtYen(animatedMax)}`}
                </span>

                {/* 要見積がある時だけ、( ) をスマホで改行 */}
                {total.hasUncertain && (
                  <span className="block sm:inline whitespace-nowrap text-xs font-semibold text-[#38bdf8]/90 mt-1 sm:mt-0 sm:ml-2">
                    （※要見積項目あり）
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-2 text-sm text-slate-600">
          <p>※事前に内容をご説明し、ご納得いただいてから作業いたします。</p>
          <p>※追加費用が発生する場合は必ずご説明いたします。</p>
        </div>
      </div>
    </section>
  );
};

export default Price;