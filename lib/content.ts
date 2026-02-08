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

type LessonMedia = {
  src: string;
  alt: { en: string; fr: string };
  caption?: { en: string; fr: string };
};

const mediaBySlug: Record<string, LessonMedia> = {
  "pourquoi-blockchain": {
    src: "/lesson-media/blockchain.svg",
    alt: {
      en: "Blockchain network and shared ledger visual",
      fr: "Visuel reseau blockchain et registre partage"
    },
    caption: {
      en: "A shared ledger exists to make transactions verifiable.",
      fr: "Un registre partage sert a rendre les transactions verifiables."
    }
  },
  "wallets-101": {
    src: "/lesson-media/wallets.svg",
    alt: {
      en: "Hot and cold wallet comparison visual",
      fr: "Visuel de comparaison hot wallet et cold wallet"
    },
    caption: {
      en: "Hot for convenience, cold for long-term safety.",
      fr: "Hot pour la simplicite, cold pour la securite long terme."
    }
  },
  "cex-vs-dex": {
    src: "/lesson-media/cex-dex.svg",
    alt: {
      en: "CEX and DEX comparison visual",
      fr: "Visuel comparatif CEX et DEX"
    },
    caption: {
      en: "The key distinction is custody of keys.",
      fr: "La difference centrale est la garde des cles."
    }
  },
  securite: {
    src: "/lesson-media/security.svg",
    alt: {
      en: "Security checklist and shield visual",
      fr: "Visuel bouclier et checklist securite"
    },
    caption: {
      en: "A small checklist blocks most beginner mistakes.",
      fr: "Une checklist simple evite la plupart des erreurs debutant."
    }
  },
  "premiere-transaction": {
    src: "/lesson-media/first-tx.svg",
    alt: {
      en: "First transaction flow visual",
      fr: "Visuel workflow premiere transaction"
    }
  },
  "solana-ecosystem": {
    src: "/lesson-media/solana.svg",
    alt: {
      en: "Solana ecosystem layers visual",
      fr: "Visuel couches ecosysteme Solana"
    }
  },
  "defi-essentials": {
    src: "/lesson-media/defi.svg",
    alt: {
      en: "DeFi pools and risk visual",
      fr: "Visuel DeFi pools et risque"
    },
    caption: {
      en: "Higher yield generally comes with higher risk.",
      fr: "Rendement eleve rime souvent avec risque eleve."
    }
  },
  "nfts-culture": {
    src: "/lesson-media/nft.svg",
    alt: {
      en: "NFT ownership and utility visual",
      fr: "Visuel propriete et utilite NFT"
    }
  },
  "risk-management": {
    src: "/lesson-media/risk.svg",
    alt: {
      en: "Risk management budget and plan visual",
      fr: "Visuel gestion du risque budget et plan"
    }
  }
};

const buildLearnSections = (lesson: Lesson, locale: Locale) => {
  const [s1 = "", s2 = "", s3 = "", s4 = "", s5 = ""] = lesson.steps;
  if (locale === "fr") {
    return {
      learnSections: [
        {
          id: "core",
          title: "Concept cle",
          body: s1,
          bullets: [s2, s3].filter(Boolean),
          note: "Commence par comprendre la logique avant de passer a l'action."
        },
        {
          id: "practical",
          title: "Vue pratique",
          body: s4 || s2,
          bullets: [s5].filter(Boolean),
          note: "La pratique compte, mais la verification reste prioritaire."
        }
      ],
      cheatsheet: {
        title: "Pense-bete",
        items: [s1, s2, s3].filter(Boolean)
      }
    };
  }
  return {
    learnSections: [
      {
        id: "core",
        title: "Core concept",
        body: s1,
        bullets: [s2, s3].filter(Boolean),
        note: "Understand the mechanism before taking action."
      },
      {
        id: "practical",
        title: "Practical view",
        body: s4 || s2,
        bullets: [s5].filter(Boolean),
        note: "Practice matters, but verification comes first."
      }
    ],
    cheatsheet: {
      title: "Quick cheat sheet",
      items: [s1, s2, s3].filter(Boolean)
    }
  };
};

const normalizeLesson = (lesson: Lesson, locale: Locale): Lesson => {
  const next: Lesson = { ...lesson };
  if (!next.learnSections?.length || !next.cheatsheet) {
    const generated = buildLearnSections(next, locale);
    next.learnSections = next.learnSections?.length
      ? next.learnSections
      : generated.learnSections;
    next.cheatsheet = next.cheatsheet ?? generated.cheatsheet;
  }
  const media = mediaBySlug[next.slug];
  if (media && next.learnSections?.length) {
    const localizedMedia = {
      src: media.src,
      alt: media.alt[locale],
      caption: media.caption?.[locale]
    };
    next.learnSections = next.learnSections.map((section, index) =>
      index === 0 && !section.media ? { ...section, media: localizedMedia } : section
    );
  }
  return next;
};

export const getLessons = (locale: Locale) =>
  byLocale(locale).lessons.map((lesson) => normalizeLesson(lesson, locale));
export const getLesson = (locale: Locale, slug: string) => {
  const lesson = byLocale(locale).getLesson(slug);
  return lesson ? normalizeLesson(lesson, locale) : lesson;
};
export const getLessonsByTrack = (locale: Locale, trackId: Track["id"]) =>
  byLocale(locale)
    .getLessonsByTrack(trackId)
    .map((lesson) => normalizeLesson(lesson, locale));
export const getResources = (locale: Locale) => byLocale(locale).resources;
