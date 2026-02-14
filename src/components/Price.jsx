import { siteConfig } from "../data/siteConfig";

const Price = () => {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">料金目安</h2>
        <p className="mb-5 text-sm text-gray-600">※正確なお見積りは現地確認後にご案内します。</p>
        <div className="overflow-hidden rounded-lg">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">項目</th>
                <th className="p-3 text-left">目安料金</th>
              </tr>
            </thead>
            <tbody>
              {siteConfig.prices.map((p) => (
                <tr key={p.name} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.value}</td>
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
