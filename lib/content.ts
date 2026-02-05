import type { Lesson, Track, QuizQuestion, ResourceSection } from "@/lib/content.fr";
import { getLesson as getLessonFr, getLessonsByTrack as getLessonsByTrackFr, lessons as lessonsFr, tracks as tracksFr, resources as resourcesFr } from "@/lib/content.fr";
import { getLesson as getLessonEn, getLessonsByTrack as getLessonsByTrackEn, lessons as lessonsEn, tracks as tracksEn, resources as resourcesEn } from "@/lib/content.en";
import type { Locale } from "@/i18n.config";

export type { Lesson, Track, QuizQuestion, ResourceSection };

const byLocale = (locale: Locale) => (locale === "en" ? {
  lessons: lessonsEn,
  tracks: tracksEn,
  resources: resourcesEn,
  getLesson: getLessonEn,
  getLessonsByTrack: getLessonsByTrackEn
} : {
  lessons: lessonsFr,
  tracks: tracksFr,
  resources: resourcesFr,
  getLesson: getLessonFr,
  getLessonsByTrack: getLessonsByTrackFr
});

export const getTracks = (locale: Locale) => byLocale(locale).tracks;
export const getLessons = (locale: Locale) => byLocale(locale).lessons;
export const getLesson = (locale: Locale, slug: string) =>
  byLocale(locale).getLesson(slug);
export const getLessonsByTrack = (locale: Locale, trackId: Track["id"]) =>
  byLocale(locale).getLessonsByTrack(trackId);
export const getResources = (locale: Locale) => byLocale(locale).resources;
