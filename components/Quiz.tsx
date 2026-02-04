"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { QuizQuestion } from "@/lib/content";
import {
  awardXp,
  loadProgress,
  markLessonComplete,
  saveProgress,
  setQuizResult,
  touchActivity
} from "@/lib/progress";
import { applyBadgeRules, getBadges } from "@/lib/gamification";
import Celebration from "@/components/Celebration";
import type { ProgressState } from "@/lib/progress";

export default function Quiz({
  lessonSlug,
  questions
}: {
  lessonSlug: string;
  questions: QuizQuestion[];
}) {
  const t = useTranslations("quiz");
  const locale = useLocale();
  const badges = getBadges(locale as "fr" | "en");
  const badgeMap = useMemo(
    () => new Map(badges.map((badge) => [badge.id, badge])),
    [badges]
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [complete, setComplete] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState<string>("");

  useEffect(() => {
    const progress = loadProgress();
    const next: Record<string, boolean> = {};
    questions.forEach((question) => {
      const key = `${lessonSlug}:${question.id}`;
      if (progress.quizResults[key]) {
        next[question.id] = true;
      }
    });
    setSubmitted(next);
  }, [lessonSlug, questions]);

  const allCorrect = useMemo(() => {
    if (!questions.length) return false;
    return questions.every((question) => submitted[question.id]);
  }, [questions, submitted]);

  useEffect(() => {
    setComplete(allCorrect);
  }, [allCorrect]);

  const announceBadges = (prev: ProgressState, next: ProgressState) => {
    const newlyUnlocked = next.badges.filter(
      (badgeId) => !prev.badges.includes(badgeId)
    );
    if (!newlyUnlocked.length) return false;
    const badge = badgeMap.get(newlyUnlocked[0]);
    setCelebrationMessage(
      t("badgeUnlocked", { title: badge?.title ?? "Nouveau badge" })
    );
    setCelebrate(true);
    return true;
  };

  const handleSubmit = (question: QuizQuestion) => {
    const choice = answers[question.id];
    if (!choice) return;
    const isCorrect = !!question.choices.find(
      (item) => item.id === choice && item.correct
    );
    const progress = loadProgress();
    const key = `${lessonSlug}:${question.id}`;
    const alreadyCorrect = progress.quizResults[key];

    let updated = touchActivity(progress);
    updated = setQuizResult(updated, key, isCorrect);
    if (isCorrect && !alreadyCorrect) {
      updated = awardXp(updated, 10);
    }
    updated = applyBadgeRules(updated);
    saveProgress(updated);

    if (isCorrect && !alreadyCorrect) {
      const badgeShown = announceBadges(progress, updated);
      if (!badgeShown) {
        setCelebrationMessage(t("xpCorrect"));
        setCelebrate(true);
      }
    }
    setSubmitted((prev) => ({ ...prev, [question.id]: isCorrect }));
  };

  const handleComplete = () => {
    const progress = loadProgress();
    const alreadyDone = progress.completedLessons.includes(lessonSlug);
    let updated = touchActivity(progress);
    if (!alreadyDone) {
      updated = markLessonComplete(updated, lessonSlug);
      updated = awardXp(updated, 40);
    }
    updated = applyBadgeRules(updated);
    saveProgress(updated);

    if (!alreadyDone) {
      const badgeShown = announceBadges(progress, updated);
      if (!badgeShown) {
        setCelebrationMessage(t("xpLesson"));
        setCelebrate(true);
      }
    }
    setComplete(true);
  };

  return (
    <div className="space-y-6">
      <Celebration
        show={celebrate}
        message={celebrationMessage}
        onDone={() => setCelebrate(false)}
      />
      {questions.map((question) => {
        const status = submitted[question.id];
        const selected = answers[question.id];
        return (
          <div key={question.id} className="glass rounded-3xl p-5 shadow-glow">
            <p className="text-sm uppercase tracking-[0.2em] text-sand-400">
              {t("label")}
            </p>
            <h3 className="mt-2 font-display text-xl text-sand-200">
              {question.prompt}
            </h3>
            <div className="mt-4 space-y-2">
              {question.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: choice.id
                    }))
                  }
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    selected === choice.id
                      ? "border-teal-400 bg-teal-400/10 text-white"
                      : "border-white/10 bg-white/5 text-sand-300 hover:border-white/20"
                  }`}
                >
                  {choice.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleSubmit(question)}
                disabled={!answers[question.id]}
                className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-night-900"
              >
                {t("validate")}
              </button>
              {status !== undefined && (
                <p
                  className={`text-xs ${
                    status ? "text-teal-300" : "text-amber-400"
                  }`}
                >
                  {status ? t("correct") : t("retry")}
                </p>
              )}
            </div>
            {status && (
              <p className="mt-3 text-sm text-sand-300">
                {question.explanation}
              </p>
            )}
          </div>
        );
      })}
      <div className="glass flex items-center justify-between rounded-3xl px-6 py-4 shadow-glow">
        <div>
          <p className="text-sm text-sand-300">{t("progressTitle")}</p>
          <p className="text-xs text-sand-400">
            {allCorrect ? t("progressReady") : t("progressPending")}
          </p>
        </div>
        <button
          onClick={handleComplete}
          disabled={!allCorrect}
          className="rounded-full bg-teal-400 px-4 py-2 text-xs font-semibold text-night-900"
        >
          {t("finish")}
        </button>
      </div>
      {complete && (
        <p className="text-sm text-teal-300">{t("done")}</p>
      )}
    </div>
  );
}