import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import Hero from "@/components/Hero";
import TopNav from "@/components/TopNav";

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const cards = t.raw("cards") as { title: string; desc: string }[];

  return (
    <main>
      <TopNav />
      <Hero />
      <section className="mx-auto mt-20 w-[92%] max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass rounded-3xl p-5 shadow-glow"
            >
              <h3 className="font-display text-lg text-sand-200">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-sand-300">{card.desc}</p>
            </div>
          ))}
        </div>
        <div className="glass mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl p-6 shadow-glow md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
              {t("ready")}
            </p>
            <h2 className="mt-2 font-display text-2xl text-sand-200">
              {t("readyDesc")}
            </h2>
          </div>
          <Link
            href="/tracks"
            className="rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-night-900"
          >
            {t("cta")}
          </Link>
        </div>
      </section>
      <footer className="mx-auto mt-20 w-[92%] max-w-6xl border-t border-white/10 pb-10 pt-8 text-xs text-sand-400">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>{t("footer")}</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white">
              {nav("manifesto")}
            </Link>
            <Link href="/resources" className="hover:text-white">
              {nav("tools")}
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
