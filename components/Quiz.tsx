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
  questions,
  trackHref,
  nextLesson
}: {
  lessonSlug: string;
  questions: QuizQuestion[];
  trackHref?: string;
  nextLesson?: { title: string; href: string } | null;
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
  const [recapStats, setRecapStats] = useState<{
    xp: number;
    badges: number;
    streak: number;
  } | null>(null);
  const [recapBadges, setRecapBadges] = useState<string[]>([]);

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
  const correctCount = useMemo(
    () => questions.filter((question) => submitted[question.id]).length,
    [questions, submitted]
  );
  const totalCount = questions.length;

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

    setRecapStats({
      xp: updated.xp,
      badges: updated.badges.length,
      streak: updated.streak
    });
    const newlyUnlocked = updated.badges.filter(
      (badgeId) => !progress.badges.includes(badgeId)
    );
    setRecapBadges(
      newlyUnlocked.map((badgeId) => badgeMap.get(badgeId)?.title ?? badgeId)
    );

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
      {questions.map((question, index) => {
        const derivedDifficulty =
          question.difficulty ??
          (index === 0
            ? "easy"
            : index === questions.length - 1
              ? "hard"
              : "medium");
        const derivedKind =
          question.kind ??
          (question.choices.length === 2 ? "boolean" : "standard");
        const status = submitted[question.id];
        const selected = answers[question.id];
        return (
          <div key={question.id} className="glass rounded-3xl p-5 shadow-glow">
            <p className="text-sm uppercase tracking-[0.2em] text-sand-400">
              {t("label")}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-sand-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {t(`difficulty.${derivedDifficulty}`)}
              </span>
              {derivedKind === "boolean" && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {t("kind.boolean")}
                </span>
              )}
              {question.trick && (
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-amber-200">
                  {t("trick")}
                </span>
              )}
            </div>
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
        <div className="glass relative overflow-hidden rounded-3xl p-5 shadow-glow">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.18),transparent_55%)]" />
          <p className="text-sm uppercase tracking-[0.2em] text-sand-400">
            {t("recapTitle")}
          </p>
          <h4 className="mt-2 font-display text-xl text-sand-200">
            {t("recapScore", { correct: correctCount, total: totalCount })}
          </h4>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-400 via-sky-400 to-amber-300 transition-all"
              style={{
                width: `${totalCount ? Math.round((correctCount / totalCount) * 100) : 0}%`
              }}
            />
          </div>
          <div className="mt-4 grid gap-3 text-sm text-sand-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-sand-400">
                {t("recapStatXp")}
              </p>
              <p className="mt-1 flex items-center gap-2 text-base text-sand-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 text-amber-200 shadow-[0_0_0_rgba(251,191,36,0)] transition hover:shadow-[0_0_18px_rgba(251,191,36,0.45)]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M12 2l1.8 4.6L18 8.2l-4.2 1.6L12 14l-1.8-4.2L6 8.2l4.2-1.6L12 2z" />
                  </svg>
                </span>
                {recapStats?.xp ?? 0}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-sand-400">
                {t("recapStatBadges")}
              </p>
              <p className="mt-1 flex items-center gap-2 text-base text-sand-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-400/20 text-teal-200 shadow-[0_0_0_rgba(45,212,191,0)] transition hover:shadow-[0_0_18px_rgba(45,212,191,0.45)]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M12 2l2.2 4.9 5.3.5-4 3.6 1.2 5.2L12 13.9l-4.7 2.3 1.2-5.2-4-3.6 5.3-.5L12 2z" />
                  </svg>
                </span>
                {recapStats?.badges ?? 0}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-sand-400">
                {t("recapStatStreak")}
              </p>
              <p className="mt-1 flex items-center gap-2 text-base text-sand-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-400/20 text-rose-200 shadow-[0_0_0_rgba(244,114,182,0)] transition hover:shadow-[0_0_18px_rgba(244,114,182,0.45)]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z" />
                  </svg>
                </span>
                {recapStats?.streak ?? 0}
              </p>
            </div>
          </div>
          {!!recapBadges.length && (
            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-sand-400">
                {t("recapBadgesTitle")}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {recapBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
          <p className="mt-4 text-sm text-sand-300">{t("recapNext")}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {trackHref && (
              <a
                href={trackHref}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-sand-200"
              >
                {t("recapBackTrack")}
              </a>
            )}
            {nextLesson && (
              <a
                href={nextLesson.href}
                className="rounded-full bg-teal-400 px-4 py-2 text-xs font-semibold text-night-900"
              >
                {t("recapNextLesson", { title: nextLesson.title })}
              </a>
            )}
          </div>
          <p className="mt-3 text-sm text-teal-300">{t("done")}</p>
        </div>
      )}
    </div>
  );
}
