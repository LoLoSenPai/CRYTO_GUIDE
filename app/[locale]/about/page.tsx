import { getTranslations, setRequestLocale } from "next-intl/server";
import TopNav from "@/components/TopNav";

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const points = t.raw("points") as string[];

  return (
    <main>
      <TopNav />
      <section className="mx-auto mt-16 w-[92%] max-w-4xl">
        <h1 className="font-display text-3xl text-sand-200">{t("title")}</h1>
        <p className="mt-4 text-sand-300">{t("intro")}</p>
        <div className="mt-8 grid gap-4">
          {points.map((point, index) => (
            <div key={point} className="glass rounded-2xl p-4 shadow-glow">
              <p className="text-xs uppercase tracking-[0.2em] text-sand-400">
                {t("principle")} {index + 1}
              </p>
              <p className="mt-2 text-sm text-sand-200">{point}</p>
            </div>
          ))}
        </div>
        <div className="glass mt-8 rounded-3xl p-5 text-xs text-sand-400 shadow-glow">
          {t("transparency")}
        </div>
      </section>
    </main>
  );
}
