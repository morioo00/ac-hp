import { siteConfig } from "../data/siteConfig";

const Price = () => {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">料金目安</h2>
        <div className="mb-6 h-px w-24 bg-[#d4af37]" />
        <div className="overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-neutral-800 shadow-xl">
          <table className="w-full">
            <thead className="bg-[#d4af37] text-black">
              <tr>
                <th className="p-4 text-left text-sm font-semibold sm:text-base">項目</th>
                <th className="p-4 text-left text-sm font-semibold sm:text-base">目安料金</th>
              </tr>
            </thead>
            <tbody>
              {siteConfig.prices.map((p) => (
                <tr key={p.name} className="border-t border-[#d4af37]/20 bg-neutral-800">
                  <td className="p-4 text-sm text-neutral-200 sm:text-base">{p.name}</td>
                  <td className="p-4 text-sm font-semibold text-white sm:text-base">{p.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 space-y-2 text-sm text-neutral-300">
          <p>※事前に内容をご説明し、ご納得いただいてから作業いたします。</p>
          <p>※追加費用が発生する場合は必ずご説明いたします。</p>
        </div>
      </div>
    </section>
  );
};

export default Price;
