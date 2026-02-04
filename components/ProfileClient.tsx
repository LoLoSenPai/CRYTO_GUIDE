"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Lesson } from "@/lib/content";
import { getBadges } from "@/lib/gamification";
import {
  computeLevel,
  loadProgress,
  markBadgesSeen,
  saveProgress
} from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";

export default function ProfileClient({ lessons }: { lessons: Lesson[] }) {
  const t = useTranslations("profile");
  const locale = useLocale();
  const badges = getBadges(locale as "fr" | "en");
  const [completed, setCompleted] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  useEffect(() => {
    const progress = loadProgress();
    setCompleted(progress.completedLessons);
    setXp(progress.xp);
    setLevel(progress.level);
    setStreak(progress.streak);
    setUnlocked(progress.badges);

    const freshlyUnlocked = progress.badges.filter(
      (badgeId) => !progress.seenBadges.includes(badgeId)
    );
    setNewBadges(freshlyUnlocked);
    if (freshlyUnlocked.length) {
      const updated = markBadgesSeen(progress, freshlyUnlocked);
      saveProgress(updated);
    }
  }, []);

  const levelData = useMemo(() => computeLevel(xp), [xp]);
  const completedLessons = lessons.filter((lesson) =>
    completed.includes(lesson.slug)
  );

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="glass rounded-3xl p-6 shadow-glow">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
                {t("progressTitle")}
              </p>
              <h2 className="mt-2 font-display text-3xl text-sand-200">
                {t("stats.level")} {level}
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <p className="text-xs text-sand-400">{t("xpTotal")}</p>
                <p className="text-xl font-semibold text-sand-200">{xp}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <p className="text-xs text-sand-400">{t("stats.streak")}</p>
                <p className="text-xl font-semibold text-amber-300">
                  {streak}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar
              value={Math.round((levelData.progress / levelData.next) * 100)}
            />
            <p className="mt-2 text-xs text-sand-400">
              {levelData.progress} / {levelData.next} XP
            </p>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 shadow-glow">
          <h3 className="font-display text-xl text-sand-200">
            {t("lessonsDone")} ({completedLessons.length})
          </h3>
          {completedLessons.length === 0 ? (
            <p className="mt-3 text-sm text-sand-400">{t("noLessons")}</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {completedLessons.map((lesson) => (
                <div
                  key={lesson.slug}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-sm text-sand-200">{lesson.title}</p>
                  <p className="text-xs text-sand-400">{lesson.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass rounded-3xl p-6 shadow-glow">
          <h3 className="font-display text-xl text-sand-200">{t("badgesTitle")}</h3>
          <p className="mt-2 text-sm text-sand-400">{t("badgesDesc")}</p>
          <div className="mt-4 grid gap-3">
            {badges.map((badge) => {
              const isUnlocked = unlocked.includes(badge.id);
              const isNew = newBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl border px-4 py-3 ${
                    isNew ? "badge-pop" : ""
                  } ${
                    isUnlocked
                      ? "border-teal-400/40 bg-teal-400/10 text-teal-200"
                      : "border-white/10 bg-white/5 text-sand-400"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                    <span>{badge.tier}</span>
                    <span>
                      {isUnlocked ? t("badgeUnlocked") : t("badgeLocked")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold">{badge.title}</p>
                  <p className="text-xs opacity-80">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 text-xs text-sand-400 shadow-glow">
          {t("tip")}
        </div>
      </div>
    </div>
  );
}