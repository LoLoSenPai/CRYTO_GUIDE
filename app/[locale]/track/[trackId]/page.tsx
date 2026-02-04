import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import TopNav from "@/components/TopNav";
import LessonGrid from "@/components/LessonGrid";
import ProgressSummary from "@/components/ProgressSummary";
import GamificationPanel from "@/components/GamificationPanel";
import { getLessonsByTrack, getTracks } from "@/lib/content";
import type { Locale } from "@/i18n.config";

export default async function TrackPage({
  params
}: {
  params: Promise<{ locale: string; trackId: "basic" | "advanced" }>;
}) {
  const { locale, trackId } = await params;
  setRequestLocale(locale);
  const tracks = getTracks(locale as Locale);
  const track = tracks.find((item) => item.id === trackId);
  if (!track) {
    notFound();
  }
  const lessons = getLessonsByTrack(locale as Locale, track.id);

  return (
    <main>
      <TopNav />
      <section className="mx-auto mt-16 w-[92%] max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
              {track.tagline}
            </p>
            <h1 className="font-display text-3xl text-sand-200">
              {track.title}
            </h1>
            <p className="mt-2 text-sand-300">{track.description}</p>
          </div>
          <div className="flex w-full flex-col gap-4 md:w-[320px]">
            <ProgressSummary lessonSlugs={track.lessons} />
            <GamificationPanel />
          </div>
        </div>
        <LessonGrid lessons={lessons} />
      </section>
    </main>
  );
}
