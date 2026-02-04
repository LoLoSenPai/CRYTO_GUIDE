export type Badge = {
  id: string;
  title: string;
  description: string;
  tier: "bronze" | "silver" | "gold";
};

export const badges: Badge[] = [
  {
    id: "first-lesson",
    title: "Premier pas",
    description: "Terminer une première leçon.",
    tier: "bronze"
  },
  {
    id: "first-quiz",
    title: "Bonne réponse",
    description: "Valider un quiz.",
    tier: "bronze"
  },
  {
    id: "streak-3",
    title: "Série x3",
    description: "3 jours d'affilée.",
    tier: "silver"
  },
  {
    id: "streak-7",
    title: "Série x7",
    description: "7 jours d'affilée.",
    tier: "gold"
  },
  {
    id: "level-3",
    title: "Niveau 3",
    description: "Atteindre le niveau 3.",
    tier: "silver"
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Compléter 5 leçons.",
    tier: "gold"
  }
];
