export type Badge = {
  id: string;
  title: string;
  description: string;
  tier: "bronze" | "silver" | "gold";
};

export const badges: Badge[] = [
  {
    id: "first-lesson",
    title: "First step",
    description: "Complete your first lesson.",
    tier: "bronze"
  },
  {
    id: "first-quiz",
    title: "Correct answer",
    description: "Validate a quiz.",
    tier: "bronze"
  },
  {
    id: "streak-3",
    title: "Streak x3",
    description: "3 days in a row.",
    tier: "silver"
  },
  {
    id: "streak-7",
    title: "Streak x7",
    description: "7 days in a row.",
    tier: "gold"
  },
  {
    id: "level-3",
    title: "Level 3",
    description: "Reach level 3.",
    tier: "silver"
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Complete 5 lessons.",
    tier: "gold"
  }
];
