import { siteConfig } from "../data/siteConfig";

const Price = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">料金目安</h2>
        <div className="mb-6 h-1 w-20 rounded-full bg-blue-900" />
        <p className="mb-6 text-sm text-gray-600">※正確なお見積りは現地確認後にご案内します。※現地見積あり（追加費用は事前にご説明します）。</p>
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-4 text-left text-sm font-semibold sm:text-base">項目</th>
                <th className="p-4 text-left text-sm font-semibold sm:text-base">目安料金</th>
              </tr>
            </thead>
            <tbody>
              {siteConfig.prices.map((p) => (
                <tr key={p.name} className="border-t border-gray-200 bg-white">
                  <td className="p-4 text-sm text-gray-700 sm:text-base">{p.name}</td>
                  <td className="p-4 text-sm font-semibold text-gray-900 sm:text-base">{p.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Price;
