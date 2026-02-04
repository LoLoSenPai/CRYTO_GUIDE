"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { loadProgress } from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";

export default function ProgressSummary({
  lessonSlugs
}: {
  lessonSlugs: string[];
}) {
  const t = useTranslations("progress");
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const progress = loadProgress();
    setCompleted(progress.completedLessons);
  }, []);

  const completedCount = useMemo(
    () => lessonSlugs.filter((slug) => completed.includes(slug)).length,
    [lessonSlugs, completed]
  );

  const percent = lessonSlugs.length
    ? Math.round((completedCount / lessonSlugs.length) * 100)
    : 0;

  return (
    <div className="glass rounded-3xl p-5 shadow-glow">
      <div className="flex items-center justify-between">
        <p className="text-sm text-sand-200">{t("title")}</p>
        <span className="text-xs text-sand-400">
          {t("completed", { count: completedCount, total: lessonSlugs.length })}
        </span>
      </div>
      <div className="mt-3">
        <ProgressBar value={percent} />
      </div>
      <p className="mt-2 text-xs text-sand-400">
        {t("percent", { percent })}
      </p>
    </div>
  );
}