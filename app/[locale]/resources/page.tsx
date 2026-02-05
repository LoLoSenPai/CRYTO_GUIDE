import { getTranslations, setRequestLocale } from "next-intl/server";
import { HoverLinkPreview } from "@/components/ui/hover-link-preview";
import { getResources } from "@/lib/content";
import type { Locale } from "@/i18n.config";

export default async function ResourcesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "resources" });
  const sections = t.raw("sections") as {
    id: string;
    title: string;
    note: string;
  }[];
  const resources = getResources(locale as Locale);
  const resourcesById = Object.fromEntries(
    (resources ?? []).map((section) => [section.id, section.items])
  );

  return (
    <main>
      <section className="mx-auto mt-16 w-[92%] max-w-5xl">
        <h1 className="font-display text-3xl text-sand-200">{t("title")}</h1>
        <p className="mt-2 text-sand-300">{t("desc")}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="glass rounded-3xl p-7 shadow-glow">
              <h3 className="font-display text-xl text-sand-200">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-sand-300">
                {(resourcesById[section.id] ?? []).map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <HoverLinkPreview
                      href={item.linkWebsite}
                      previewImage={item.linkPreview || "/previews/placeholder.svg"}
                      imageAlt={item.label}
                    >
                      <span className="text-sand-200 hover:text-white">
                        {item.label}
                      </span>
                    </HoverLinkPreview>
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
