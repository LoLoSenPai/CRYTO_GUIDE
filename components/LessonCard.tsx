"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import type { Lesson } from "@/lib/content";

export default function LessonCard({
  lesson,
  completed
}: {
  lesson: Lesson;
  completed: boolean;
}) {
  const t = useTranslations("common");

  return (
    <Link
      href={`/lesson/${lesson.slug}`}
      className="glass group flex h-full flex-col justify-between rounded-3xl p-5 shadow-glow transition hover:-translate-y-1"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-sand-400">
          <span>{lesson.duration}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
            {lesson.track === "basic" ? t("basic") : t("advanced")}
          </span>
        </div>
        <h4 className="font-display text-lg text-sand-200 group-hover:text-white">
          {lesson.title}
        </h4>
        <p className="text-sm text-sand-300">{lesson.summary}</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-sand-400">
        <span>{t("quizCount", { count: lesson.quiz.length })}</span>
        <span className={completed ? "text-teal-300" : "text-sand-400"}>
          {completed ? t("completed") : t("todo")}
        </span>
      </div>
    </Link>
  );
}