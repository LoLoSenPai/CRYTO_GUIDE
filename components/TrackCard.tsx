"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import type { Track } from "@/lib/content";

export default function TrackCard({ track }: { track: Track }) {
  const t = useTranslations("common");

  return (
    <div className="glass flex h-full flex-col justify-between rounded-3xl p-6 shadow-glow">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
          {track.tagline}
        </p>
        <h3 className="font-display text-2xl text-sand-200">{track.title}</h3>
        <p className="text-sm text-sand-300">{track.description}</p>
        <div className="flex flex-wrap gap-2">
          {track.lessons.slice(0, 3).map((lesson) => (
            <span
              key={lesson}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sand-300"
            >
              {lesson.replaceAll("-", " ")}
            </span>
          ))}
        </div>
      </div>
      <Link
        href={`/track/${track.id}`}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-night-900"
      >
        {t("viewTrack")}
      </Link>
    </div>
  );
}