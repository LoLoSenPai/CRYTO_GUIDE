"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getBadges } from "@/lib/gamification";
import { computeLevel, loadProgress } from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";

export default function GamificationPanel() {
  const t = useTranslations("profile");
  const locale = useLocale();
  const badges = getBadges(locale as "fr" | "en");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const progress = loadProgress();
    setXp(progress.xp);
    setLevel(progress.level);
    setStreak(progress.streak);
    setUnlocked(progress.badges);
  }, []);

  const levelData = useMemo(() => computeLevel(xp), [xp]);

  return (
    <div className="glass rounded-3xl p-5 shadow-glow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
            {t("progressTitle")}
          </p>
          <h3 className="mt-2 font-display text-2xl text-sand-200">
            {t("stats.level")} {level}
          </h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center">
          <p className="text-xs text-sand-400">{t("stats.streak")}</p>
          <p className="text-lg font-semibold text-amber-300">{streak}</p>
        </div>
      </div>
      <div className="mt-4">
        <ProgressBar value={Math.round((levelData.progress / levelData.next) * 100)} />
        <p className="mt-2 text-xs text-sand-400">
          {levelData.progress} / {levelData.next} XP
        </p>
      </div>
      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
          {t("badgesTitle")}
        </p>
        <div className="mt-3 grid gap-2">
          {badges.map((badge) => {
            const isUnlocked = unlocked.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`flex items-center justify-between rounded-2xl border px-3 py-2 text-xs ${
                  isUnlocked
                    ? "border-teal-400/40 bg-teal-400/10 text-teal-200"
                    : "border-white/10 bg-white/5 text-sand-400"
                }`}
              >
                <div>
                  <p className="font-semibold">{badge.title}</p>
                  <p className="text-[10px] opacity-80">{badge.description}</p>
                </div>
                <span className="uppercase tracking-[0.2em]">
                  {badge.tier}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}