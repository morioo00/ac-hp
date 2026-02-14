import { siteConfig } from "../data/siteConfig";

const Works = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">施工実績</h2>
        <div className="mb-10 h-1 w-20 rounded-full bg-blue-900" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.works.map((w, index) => (
            <div key={`${w.comment}-${index}`} className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              {w.image ? (
                <img className="h-48 w-full object-cover" src={w.image} alt={w.comment} />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-gray-100 text-sm font-medium text-gray-500">
                  写真（後で追加）
                </div>
              )}
              <div className="p-4 text-sm text-gray-700">{w.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
