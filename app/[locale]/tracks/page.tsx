import { getTranslations, setRequestLocale } from "next-intl/server";
import TopNav from "@/components/TopNav";
import TrackCard from "@/components/TrackCard";
import { getTracks } from "@/lib/content";
import type { Locale } from "@/i18n.config";

export default async function TracksPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "tracks" });
  const tracks = getTracks(locale as Locale);

  return (
    <main>
      <TopNav />
      <section className="mx-auto mt-16 w-[92%] max-w-6xl">
        <h1 className="font-display text-3xl text-sand-200">{t("title")}</h1>
        <p className="mt-2 text-sand-300">{t("desc")}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </main>
  );
}
