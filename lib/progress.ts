export type ProgressState = {
  completedLessons: string[];
  quizResults: Record<string, boolean>;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate?: string;
  badges: string[];
  seenBadges: string[];
};

const storageKey = "crypto-guide-progress";

const defaultState: ProgressState = {
  completedLessons: [],
  quizResults: {},
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: undefined,
  badges: [],
  seenBadges: []
};

export const loadProgress = (): ProgressState => {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      completedLessons: parsed.completedLessons ?? [],
      quizResults: parsed.quizResults ?? {},
      xp: parsed.xp ?? 0,
      level: parsed.level ?? 1,
      streak: parsed.streak ?? 0,
      lastActiveDate: parsed.lastActiveDate,
      badges: parsed.badges ?? [],
      seenBadges: parsed.seenBadges ?? []
    };
  } catch {
    return defaultState;
  }
};

export const saveProgress = (state: ProgressState) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(state));
};

export const markLessonComplete = (state: ProgressState, slug: string) => {
  if (state.completedLessons.includes(slug)) return state;
  return {
    ...state,
    completedLessons: [...state.completedLessons, slug]
  };
};

export const setQuizResult = (
  state: ProgressState,
  quizId: string,
  correct: boolean
) => ({
  ...state,
  quizResults: {
    ...state.quizResults,
    [quizId]: correct
  }
});

const levelThreshold = (level: number) => 80 + (level - 1) * 40;

export const computeLevel = (xp: number) => {
  let level = 1;
  let remaining = xp;
  while (remaining >= levelThreshold(level)) {
    remaining -= levelThreshold(level);
    level += 1;
  }
  return { level, progress: remaining, next: levelThreshold(level) };
};

const todayString = () => new Date().toISOString().slice(0, 10);

const isYesterday = (date: string, today: string) => {
  const current = new Date(today);
  const yesterday = new Date(current);
  yesterday.setDate(current.getDate() - 1);
  return date === yesterday.toISOString().slice(0, 10);
};

export const touchActivity = (state: ProgressState) => {
  const today = todayString();
  if (!state.lastActiveDate) {
    return { ...state, lastActiveDate: today, streak: 1 };
  }
  if (state.lastActiveDate === today) {
    return state;
  }
  if (isYesterday(state.lastActiveDate, today)) {
    return {
      ...state,
      lastActiveDate: today,
      streak: state.streak + 1
    };
  }
  return { ...state, lastActiveDate: today, streak: 1 };
};

export const awardXp = (state: ProgressState, amount: number) => {
  const nextXp = state.xp + amount;
  const { level } = computeLevel(nextXp);
  return { ...state, xp: nextXp, level };
};

export const awardBadge = (state: ProgressState, badgeId: string) => {
  if (state.badges.includes(badgeId)) return state;
  return { ...state, badges: [...state.badges, badgeId] };
};

export const markBadgesSeen = (state: ProgressState, badgeIds: string[]) => {
  if (!badgeIds.length) return state;
  const merged = new Set([...state.seenBadges, ...badgeIds]);
  return { ...state, seenBadges: Array.from(merged) };
};
