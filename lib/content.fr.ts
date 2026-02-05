export type QuizChoice = {
  id: string;
  label: string;
  correct?: boolean;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: QuizChoice[];
  explanation: string;
};

export type Lesson = {
  slug: string;
  track: "basic" | "advanced";
  title: string;
  summary: string;
  duration: string;
  steps: string[];
  quiz: QuizQuestion[];
  mission?: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    disclaimer?: string;
  };
};

export type Track = {
  id: "basic" | "advanced";
  title: string;
  tagline: string;
  description: string;
  lessons: string[];
};

export type ResourceItem = {
  id: string;
  label: string;
  linkWebsite: string;
  linkPreview: string;
};

export type ResourceSection = {
  id: string;
  items: ResourceItem[];
};

export const tracks: Track[] = [
  {
    id: "basic",
    title: "Parcours Basique",
    tagline: "Comprendre avant d'agir",
    description:
      "Les fondamentaux pour saisir l'utilité de la crypto, choisir un wallet et éviter les pièges.",
    lessons: [
      "pourquoi-blockchain",
      "wallets-101",
      "cex-vs-dex",
      "securite",
      "premiere-transaction"
    ]
  },
  {
    id: "advanced",
    title: "Parcours Avancé",
    tagline: "Aller plus loin, rester prudent",
    description:
      "Cas d'usages concrets, lecture d'un écosystème et bonnes pratiques pour durer.",
    lessons: [
      "solana-ecosystem",
      "defi-essentials",
      "nfts-culture",
      "risk-management"
    ]
  }
];

export const lessons: Lesson[] = [
  {
    slug: "pourquoi-blockchain",
    track: "basic",
    title: "Pourquoi la blockchain existe ?",
    summary:
      "Comprendre le problème que la blockchain résout et ce que cela change concrètement.",
    duration: "6 min",
    steps: [
      "Une blockchain est un registre partagé que personne ne peut modifier seul.",
      "Elle permet d'échanger de la valeur sans intermédiaire central.",
      "Les blockchains publiques sont transparentes : on peut vérifier les transactions.",
      "Les crypto-actifs sont des unités qui circulent sur ces registres.",
      "Le vrai gain : moins de friction, plus de vérifiabilité, nouveaux usages."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est l'objectif principal d'une blockchain publique ?",
        choices: [
          { id: "a", label: "Créer une base privée pour une entreprise." },
          {
            id: "b",
            label: "Permettre un registre partagé sans contrôle unique.",
            correct: true
          },
          { id: "c", label: "Empêcher toute transaction d'avoir lieu." }
        ],
        explanation:
          "Le cœur d'une blockchain publique, c'est le registre partagé vérifiable par tous."
      }
    ]
  },
  {
    slug: "wallets-101",
    track: "basic",
    title: "Wallets : hot, cold, custodian",
    summary: "Savoir où sont stockées les clés et pourquoi ça change tout.",
    duration: "7 min",
    steps: [
      "Un wallet stocke des clés, pas des coins : c'est votre accès aux fonds.",
      "Hot wallet = connecté, pratique pour le quotidien.",
      "Cold wallet = hors ligne, plus sûr pour le long terme.",
      "Custodial = un tiers garde les clés (ex: CEX).",
      "Règle simple : petite somme en hot, grosse somme en cold."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quelle est la vraie différence entre hot et cold wallet ?",
        choices: [
          {
            id: "a",
            label: "Hot = en ligne, Cold = hors ligne.",
            correct: true
          },
          { id: "b", label: "Hot = uniquement pour le trading." },
          { id: "c", label: "Il n'y en a pas." }
        ],
        explanation:
          "La connexion à Internet est la différence clé, avec un impact direct sur la sécurité."
      }
    ],
    mission: {
      title: "Mission : choisir un wallet",
      description:
        "Installe un wallet non-custodial (ex: Phantom) et note ta seed phrase offline.",
      ctaLabel: "Voir les wallets",
      ctaHref: "/resources"
    }
  },
  {
    slug: "cex-vs-dex",
    track: "basic",
    title: "CEX vs DEX",
    summary:
      "Comprendre la différence entre plateformes centralisées et échanges décentralisés.",
    duration: "6 min",
    steps: [
      "Un CEX (centralisé) ressemble à une banque : compte, support, KYC.",
      "Un DEX (décentralisé) fonctionne via smart contracts et votre wallet.",
      "CEX = simple, DEX = plus autonome et transparent.",
      "Toujours vérifier les frais et l'authenticité du site utilisé.",
      "Commencer par un CEX peut être plus rassurant pour un débutant."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est l'avantage principal d'un CEX pour un débutant ?",
        choices: [
          { id: "a", label: "Pas besoin de compte." },
          {
            id: "b",
            label: "Interface guidée et support client.",
            correct: true
          },
          { id: "c", label: "Aucun frais sur les transactions." }
        ],
        explanation:
          "Les CEX sont plus guidés et proposent un support, utile au début."
      }
    ],
    mission: {
      title: "Mission : créer un compte CEX",
      description:
        "Ouvre un compte sur un exchange fiable pour accéder à l'achat/vente de crypto.",
      ctaLabel: "Créer un compte Binance",
      ctaHref: "https://www.binance.com/?ref=YOUR_REF",
      disclaimer:
        "Lien affilié possible. Rien d'obligatoire : choisis la plateforme qui te convient."
    }
  },
  {
    slug: "securite",
    track: "basic",
    title: "Sécurité de base",
    summary: "Les règles simples qui évitent 90% des problèmes.",
    duration: "5 min",
    steps: [
      "Ne partage jamais ta seed phrase, même avec un 'support'.",
      "Toujours vérifier l'URL avant de connecter un wallet.",
      "Utiliser 2FA pour les comptes CEX.",
      "Garder un carnet offline pour les infos sensibles.",
      "Ne jamais signer une transaction incomprise."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Que faire si un support demande ta seed phrase ?",
        choices: [
          { id: "a", label: "Lui donner vite." },
          { id: "b", label: "Ne jamais la donner.", correct: true },
          { id: "c", label: "Lui donner une photo floue." }
        ],
        explanation:
          "Une seed phrase ne se partage jamais. Un vrai support ne la demandera pas."
      }
    ]
  },
  {
    slug: "premiere-transaction",
    track: "basic",
    title: "Première transaction",
    summary: "Faire une petite transaction test pour comprendre le workflow.",
    duration: "6 min",
    steps: [
      "Commencer par une petite somme symbolique.",
      "Vérifier le réseau utilisé (ex: Solana) et l'adresse.",
      "Comprendre les frais (gas).",
      "Toujours faire un test avant d'envoyer plus.",
      "Conserver un historique de ses transactions."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Pourquoi faire un test avant un gros transfert ?",
        choices: [
          { id: "a", label: "Pour augmenter les frais." },
          {
            id: "b",
            label: "Pour valider l'adresse et le réseau.",
            correct: true
          },
          { id: "c", label: "Parce que c'est obligatoire." }
        ],
        explanation:
          "Un test réduit drastiquement le risque d'erreur d'adresse ou de réseau."
      }
    ]
  },
  {
    slug: "solana-ecosystem",
    track: "advanced",
    title: "Explorer l'écosystème Solana",
    summary: "Outils, wallets, et catégories d'apps utiles.",
    duration: "8 min",
    steps: [
      "Solana est optimisée pour la vitesse et des frais bas.",
      "Un wallet Solana te donne accès à tout l'écosystème.",
      "Catégories: DeFi, NFT, gaming, payments, infra.",
      "Vérifier la réputation d'une dApp avant d'interagir.",
      "Suivre les annonces officielles pour rester à jour."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quelle est une bonne pratique avant d'utiliser une dApp ?",
        choices: [
          { id: "a", label: "Ignorer l'URL." },
          {
            id: "b",
            label: "Vérifier sa réputation et ses avis.",
            correct: true
          },
          { id: "c", label: "Utiliser tous ses fonds d'un coup." }
        ],
        explanation:
          "Toujours vérifier la crédibilité avant d'engager son wallet."
      }
    ]
  },
  {
    slug: "defi-essentials",
    track: "advanced",
    title: "DeFi essentials",
    summary: "Comprendre swaps, pools, et rendements sans se faire piéger.",
    duration: "9 min",
    steps: [
      "Un swap = échange direct entre tokens.",
      "Les pools de liquidité permettent les échanges mais comportent des risques.",
      "APY élevé = risque élevé. Toujours lire les conditions.",
      "Les smart contracts peuvent avoir des failles.",
      "Diversifier ses activités limite la casse en cas d'incident."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Un APY très élevé signifie souvent...",
        choices: [
          { id: "a", label: "Aucun risque." },
          { id: "b", label: "Plus de risques.", correct: true },
          { id: "c", label: "Une garantie absolue." }
        ],
        explanation:
          "Rendement et risque sont liés, surtout en DeFi."
      }
    ]
  },
  {
    slug: "nfts-culture",
    track: "advanced",
    title: "NFTs et culture on-chain",
    summary: "Comprendre la valeur, l'usage et les limites des NFTs.",
    duration: "7 min",
    steps: [
      "Un NFT prouve la propriété d'un actif numérique unique.",
      "La valeur dépend de l'utilité, pas seulement de l'image.",
      "Les royalties ne sont pas toujours garanties selon la marketplace.",
      "Toujours vérifier l'authenticité d'une collection.",
      "Utiliser un wallet dédié peut limiter les risques."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "La valeur d'un NFT dépend surtout...",
        choices: [
          { id: "a", label: "Du hasard." },
          {
            id: "b",
            label: "De l'utilité et de la communauté.",
            correct: true
          },
          { id: "c", label: "Du nombre de pixels." }
        ],
        explanation:
          "L'utilité et la communauté sont les moteurs principaux de valeur."
      }
    ]
  },
  {
    slug: "risk-management",
    track: "advanced",
    title: "Gérer ses risques",
    summary: "Rester lucide et bâtir un plan long terme.",
    duration: "6 min",
    steps: [
      "Toujours définir un budget maximum.",
      "Éviter l'effet FOMO en restant sur son plan.",
      "Séparer long terme et court terme.",
      "Ne pas tout mettre sur un seul actif.",
      "Tenir un journal simple de ses actions aide à progresser."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est un bon réflexe pour limiter les erreurs ?",
        choices: [
          { id: "a", label: "Investir en urgence." },
          { id: "b", label: "Tenir un journal de décisions.", correct: true },
          { id: "c", label: "Changer d'avis chaque jour." }
        ],
        explanation:
          "Un journal aide à analyser ses choix et garder une vision claire."
      }
    ]
  }
];

export const getLesson = (slug: string) =>
  lessons.find((lesson) => lesson.slug === slug);

export const getLessonsByTrack = (trackId: Track["id"]) =>
  lessons.filter((lesson) => lesson.track === trackId);

export const resources: ResourceSection[] = [
  {
    id: "wallets",
    items: [
      {
        id: "phantom",
        label: "Phantom",
        linkWebsite: "https://phantom.app",
        linkPreview: "/previews/phantom.webp"
      },
      {
        id: "solflare",
        label: "Solflare",
        linkWebsite: "https://solflare.com",
        linkPreview: "/previews/solflare.webp"
      },
      {
        id: "backpack",
        label: "Backpack",
        linkWebsite: "https://backpack.app",
        linkPreview: "/previews/backpack.webp"
      }
    ]
  },
  {
    id: "cex",
    items: [
      {
        id: "binance",
        label: "Binance",
        linkWebsite: "https://www.binance.com",
        linkPreview: "/previews/binance.webp"
      },
      {
        id: "coinbase",
        label: "Coinbase",
        linkWebsite: "https://www.coinbase.com",
        linkPreview: "/previews/coinbase.webp"
      },
      {
        id: "kraken",
        label: "Kraken",
        linkWebsite: "https://www.kraken.com",
        linkPreview: "/previews/kraken.webp"
      }
    ]
  },
  {
    id: "dex",
    items: [
      {
        id: "jupiter",
        label: "Jupiter",
        linkWebsite: "https://jup.ag",
        linkPreview: "/previews/jupiter.webp"
      },
      {
        id: "raydium",
        label: "Raydium",
        linkWebsite: "https://raydium.io",
        linkPreview: "/previews/raydium.webp"
      },
      {
        id: "solana-explorer",
        label: "Solana Explorer",
        linkWebsite: "https://explorer.solana.com",
        linkPreview: "/previews/solana-explorer.webp"
      }
    ]
  }
];
