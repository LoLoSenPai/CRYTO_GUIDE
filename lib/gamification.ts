import type { ProgressState } from "@/lib/progress";
import { awardBadge } from "@/lib/progress";
import type { Locale } from "@/i18n.config";
import { badges as badgesFr } from "@/lib/gamification.fr";
import { badges as badgesEn } from "@/lib/gamification.en";
import type { Badge } from "@/lib/gamification.fr";

export type { Badge };

export const getBadges = (locale: Locale): Badge[] =>
  locale === "en" ? badgesEn : badgesFr;

export const applyBadgeRules = (state: ProgressState) => {
  let next = state;
  if (state.completedLessons.length >= 1) {
    next = awardBadge(next, "first-lesson");
  }
  if (Object.values(state.quizResults).some(Boolean)) {
    next = awardBadge(next, "first-quiz");
  }
  if (state.streak >= 3) {
    next = awardBadge(next, "streak-3");
  }
  if (state.streak >= 7) {
    next = awardBadge(next, "streak-7");
  }
  if (state.level >= 3) {
    next = awardBadge(next, "level-3");
  }
  if (state.completedLessons.length >= 5) {
    next = awardBadge(next, "explorer");
  }
  return next;
};
