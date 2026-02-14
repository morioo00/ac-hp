import { siteConfig } from "../data/siteConfig";

const Works = () => {
  return (
    <section className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">施工実績</h2>
        <div className="mb-10 h-px w-24 bg-[#d4af37]" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.works.map((w, index) => (
            <div key={`${w.comment}-${index}`} className="overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-neutral-800 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              {w.image ? (
                <img className="h-48 w-full object-cover" src={w.image} alt={w.comment} />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-neutral-950 text-sm font-medium text-neutral-400">
                  写真（後で追加）
                </div>
              )}
              <div className="p-4 text-sm text-neutral-200">{w.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
