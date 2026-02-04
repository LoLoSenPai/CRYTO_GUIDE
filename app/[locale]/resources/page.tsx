import { getTranslations, setRequestLocale } from "next-intl/server";
import TopNav from "@/components/TopNav";

export default async function ResourcesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "resources" });
  const sections = t.raw("sections") as {
    title: string;
    items: string[];
    note: string;
  }[];

  return (
    <main>
      <TopNav />
      <section className="mx-auto mt-16 w-[92%] max-w-5xl">
        <h1 className="font-display text-3xl text-sand-200">{t("title")}</h1>
        <p className="mt-2 text-sand-300">{t("desc")}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="glass rounded-3xl p-5 shadow-glow">
              <h3 className="font-display text-xl text-sand-200">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-sand-300">
                {section.items.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-sand-400">{section.note}</p>
            </div>
          ))}
        </div>
        <div className="glass mt-8 rounded-3xl p-5 text-xs text-sand-400 shadow-glow">
          {t("footer")}
        </div>
      </section>
    </main>
  );
}
