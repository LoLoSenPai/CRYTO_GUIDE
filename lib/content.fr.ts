export type QuizChoice = {
  id: string;
  label: string;
  correct?: boolean;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  difficulty?: "easy" | "medium" | "hard";
  kind?: "standard" | "boolean";
  trick?: boolean;
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
      "premiere-transaction",
    ],
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
      "risk-management",
    ],
  },
];

export const lessons: Lesson[] = [
  {
    slug: "pourquoi-blockchain",
    track: "basic",
    title: "Pourquoi la blockchain éxiste ?",
    summary:
      "Comprendre le problème que la blockchain résout et ce que cela change concrètement.",
    duration: "6 min",
    steps: [
      "Une blockchain est un registre partagé que personne ne peut modifier seul.",
      "Elle permet d'échanger de la valeur sans intermédiaire central.",
      "Les blockchains publiques sont transparentes : on peut vérifier les transactions.",
      "Les crypto-actifs sont des unités qui circulent sur ces registres.",
      "Le vrai gain : moins de friction, plus de vérifiabilité, nouveaux usages.",
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
            correct: true,
          },
          { id: "c", label: "Empêcher toute transaction d'avoir lieu." },
        ],
        explanation:
          "Le but d'une blockchain publique, c'est le registre partagé vérifiable par tous.",
      },
      {
        id: "q2",
        prompt: "Les blockchains publiques sont transparentes pour tous.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" },
        ],
        explanation:
          "Tout le monde peut vérifier les transactions sur une blockchain publique.",
      },
      {
        id: "q3",
        prompt: "Quel est le vrai gain d'une blockchain publique ?",
        choices: [
          { id: "a", label: "Plus d'intermédiaires." },
          {
            id: "b",
            label: "Moins de friction et plus de vérifiabilité.",
            correct: true,
          },
          { id: "c", label: "Plus de censure." },
        ],
        explanation:
          "Le gain est une meilleure vérifiabilité avec moins de friction.",
      },
      {
        id: "q4",
        prompt:
          "Qui peut vérifier les transactions sur une blockchain publique ?",
        choices: [
          { id: "a", label: "Seulement les banques." },
          { id: "b", label: "Tout le monde.", correct: true },
          { id: "c", label: "Seulement l'equipe du projet." },
        ],
        explanation: "Un registre public est vérifiable par tous.",
      },
    ],
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
      "Régle simple : petite somme en hot, grosse somme en cold.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quelle est la vraie différence entre hot et cold wallet ?",
        choices: [
          {
            id: "a",
            label: "Hot = en ligne, Cold = hors ligne.",
            correct: true,
          },
          { id: "b", label: "Hot = uniquement pour le trading." },
          { id: "c", label: "Il n'y en a pas." },
        ],
        explanation:
          "La connexion é Internet est la différence clé, avec un impact direct sur la sécurité.",
      },
      {
        id: "q2",
        prompt: "Un wallet stocke les cles privees.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" },
        ],
        explanation: "Un wallet garde les cles, pas les coins.",
      },
      {
        id: "q3",
        prompt: "Le choix le plus sur pour une grosse somme ?",
        choices: [
          { id: "a", label: "Hot wallet." },
          { id: "b", label: "Cold wallet.", correct: true },
          { id: "c", label: "Un wallet demo." },
        ],
        explanation: "Le cold wallet est hors ligne, donc plus sur.",
      },
      {
        id: "q4",
        prompt: "Qu'est-ce qu'un wallet custodial ?",
        choices: [
          { id: "a", label: "Tu gardes tes cles." },
          { id: "b", label: "Un tiers garde tes cles.", correct: true },
          { id: "c", label: "Un wallet sans mot de passe." },
        ],
        explanation: "Un wallet custodial est gere par un tiers (ex: CEX).",
      },
    ],
    mission: {
      title: "Mission : choisir un wallet",
      description:
        "Installe un wallet non-custodial (ex: Phantom) et note ta seed phrase offline.",
      ctaLabel: "Voir les wallets",
      ctaHref: "/resources",
    },
  },
  {
    slug: "cex-vs-dex",
    track: "basic",
    title: "CEX vs DEX",
    summary:
      "Comprendre la différence entre plateformes centralisées et échanges décentralisés.",
    duration: "6 min",
    steps: [
      "Un CEX (centralisé) ressemble é une banque : compte, support, KYC.",
      "Un DEX (décentralisé) fonctionne via smart contracts et votre wallet.",
      "CEX = simple, DEX = plus autonome et transparent.",
      "Toujours vérifier les frais et l'authenticité du site utilisé.",
      "Commencer par un CEX peut étre plus rassurant pour un débutant.",
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
            correct: true,
          },
          { id: "c", label: "Aucun frais sur les transactions." },
        ],
        explanation:
          "Les CEX sont plus guidés et proposent un support, utile au début.",
      },
      {
        id: "q2",
        prompt: "Sur un DEX, la plateforme garde tes cles.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux", correct: true },
        ],
        explanation: "Sur un DEX, tu gardes la garde via ton wallet.",
      },
      {
        id: "q3",
        prompt: "Quel reflexe est essentiel avant d'utiliser un CEX ou DEX ?",
        choices: [
          { id: "a", label: "Ignorer les frais." },
          { id: "b", label: "Verifier l'URL et les frais.", correct: true },
          { id: "c", label: "Signer sans lire." },
        ],
        explanation: "Toujours verifier l'URL et les frais.",
      },
      {
        id: "q4",
        prompt: "Quelle option donne le plus d'autonomie ?",
        choices: [
          { id: "a", label: "CEX." },
          { id: "b", label: "DEX.", correct: true },
          { id: "c", label: "Connexion email." },
        ],
        explanation: "Le DEX te laisse garder la garde de tes cles.",
      },
    ],
    mission: {
      title: "Mission : créer un compte CEX",
      description:
        "Ouvre un compte sur un exchange fiable pour accéder é l'achat/vente de crypto.",
      ctaLabel: "Créer un compte Binance",
      ctaHref: "https://www.binance.com/?ref=YOUR_REF",
      disclaimer:
        "Lien affilié possible. Rien d'obligatoire : choisis la plateforme qui te convient.",
    },
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
      "Ne jamais signer une transaction incomprise.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Que faire si un support demande ta seed phrase ?",
        choices: [
          { id: "a", label: "Lui donner vite." },
          { id: "b", label: "Ne jamais la donner.", correct: true },
          { id: "c", label: "Lui donner une photo floue." },
        ],
        explanation:
          "Une seed phrase ne se partage jamais. Un vrai support ne la demandera pas.",
      },
      {
        id: "q2",
        prompt: "Utiliser le 2FA reduit le risque sur un compte CEX.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" },
        ],
        explanation:
          "Le 2FA ajoute une couche de protection en plus du mot de passe.",
      },
      {
        id: "q3",
        prompt: "Que faut-il verifier avant de connecter un wallet ?",
        choices: [
          { id: "a", label: "L'URL du site.", correct: true },
          { id: "b", label: "Le fond d'écran." },
          { id: "c", label: "Les emojis." },
        ],
        explanation: "Verifier l'URL reduit les risques de phishing.",
      },
      {
        id: "q4",
        prompt: "Où conserver une seed phrase ?",
        choices: [
          { id: "a", label: "Dans un doc cloud public." },
          { id: "b", label: "Hors ligne, sur papier.", correct: true },
          { id: "c", label: "Dans un message privé." },
        ],
        explanation: "Le stockage hors ligne limite les risques de hack.",
      },
    ],
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
      "Conserver un historique de ses transactions.",
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
            correct: true,
          },
          { id: "c", label: "Parce que c'est obligatoire." },
        ],
        explanation:
          "Un test réduit drastiquement le risque d'erreur d'adresse ou de réseau.",
      },
      {
        id: "q2",
        prompt: "Il faut envoyer un gros montant pour tester d'abord.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux", correct: true },
        ],
        explanation: "Un petit test est plus prudent avant d'envoyer plus.",
      },
      {
        id: "q3",
        prompt: "Pourquoi les frais (gas) comptent ?",
        choices: [
          { id: "a", label: "Ils sont toujours a zero." },
          {
            id: "b",
            label: "Ils réduisent le montant reçu.",
            correct: true,
          },
          { id: "c", label: "Ils changent l'adresse." },
        ],
        explanation:
          "Les frais impactent le montant final et varient selon le réseau.",
      },
      {
        id: "q4",
        prompt: "Quel est un premier envoi raisonnable ?",
        choices: [
          { id: "a", label: "Un tout petit test.", correct: true },
          { id: "b", label: "Tous les fonds." },
          { id: "c", label: "Un montant aléatoire." },
        ],
        explanation: "Un test limite les erreurs coûteuses.",
      },
    ],
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
      "Suivre les annonces officielles pour rester à jour.",
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
            correct: true,
          },
          { id: "c", label: "Utiliser tous ses fonds d'un coup." },
        ],
        explanation:
          "Toujours vérifier la crédibilité avant d'engager son wallet.",
      },
      {
        id: "q2",
        prompt: "Un wallet Solana donne accès à l'écosystème.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" },
        ],
        explanation:
          "Le wallet est la porte d'entrée des apps et actifs Solana.",
      },
      {
        id: "q3",
        prompt: "Quelle catégorie fait partie de l'écosystème ?",
        choices: [
          { id: "a", label: "DeFi et NFTs.", correct: true },
          { id: "b", label: "Aucune, seulement les paiements." },
          { id: "c", label: "Uniquement reseaux sociaux." },
        ],
        explanation:
          "DeFi, NFTs, gaming, payments et infra sont des catégories clés.",
      },
      {
        id: "q4",
        prompt: "Pourquoi suivre les annonces officielles ?",
        choices: [
          {
            id: "a",
            label: "Eviter les arnaques et rester à jour.",
            correct: true,
          },
          { id: "b", label: "Pour sauter la sécurité." },
          { id: "c", label: "Parce que ça ne change rien." },
        ],
        explanation: "Les canaux officiels aident à vérifier les vraies infos.",
      },
    ],
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
      "Diversifier ses activités limite la casse en cas d'incident.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Un APY trés élevé signifie souvent...",
        choices: [
          { id: "a", label: "Aucun risque." },
          { id: "b", label: "Plus de risques.", correct: true },
          { id: "c", label: "Une garantie absolue." },
        ],
        explanation: "Rendement et risque sont liés, surtout en DeFi.",
      },
      {
        id: "q2",
        prompt: "Un APY tres eleve signifie toujours peu de risque.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux", correct: true },
        ],
        explanation: "Un APY élevé signale souvent plus de risque.",
      },
      {
        id: "q3",
        prompt: "Pourquoi lire les conditions d'un protocole ?",
        choices: [
          { id: "a", label: "Pour les couleurs." },
          {
            id: "b",
            label: "Pour comprendre risques et règles.",
            correct: true,
          },
          { id: "c", label: "Parce que ça garantit un profit." },
        ],
        explanation:
          "Les conditions expliquent les risques, frais et comportements.",
      },
      {
        id: "q4",
        prompt: "Qu'est-ce qu'un swap ?",
        choices: [
          { id: "a", label: "Un échange direct entre tokens.", correct: true },
          { id: "b", label: "Un prêt sans risque." },
          { id: "c", label: "Un profit garanti." },
        ],
        explanation:
          "Un swap est un échange simple d'un token contre un autre.",
      },
    ],
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
      "Utiliser un wallet dédié peut limiter les risques.",
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
            correct: true,
          },
          { id: "c", label: "Du nombre de pixels." },
        ],
        explanation:
          "L'utilité et la communauté sont les moteurs principaux de valeur.",
      },
      {
        id: "q2",
        prompt: "La valeur d'un NFT depend uniquement de l'image.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux", correct: true },
        ],
        explanation: "L'utilité et la communauté comptent le plus souvent.",
      },
      {
        id: "q3",
        prompt: "Les royalties sont-elles toujours garanties ?",
        choices: [
          { id: "a", label: "Oui, toujours." },
          {
            id: "b",
            label: "Non, cela dépend de la marketplace.",
            correct: true,
          },
          { id: "c", label: "Seulement le week-end." },
        ],
        explanation:
          "L'application des royalties varie selon les marketplaces.",
      },
      {
        id: "q4",
        prompt: "Que prouve un NFT ?",
        choices: [
          {
            id: "a",
            label: "La propriété d'un actif numérique unique.",
            correct: true,
          },
          { id: "b", label: "Un profit garanti." },
          { id: "c", label: "Une identité anonyme." },
        ],
        explanation: "Un NFT est une preuve de propriété on-chain.",
      },
    ],
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
      "Tenir un journal simple de ses actions aide à progresser.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est un bon réflexe pour limiter les erreurs ?",
        choices: [
          { id: "a", label: "Investir en urgence." },
          { id: "b", label: "Tenir un journal de décisions.", correct: true },
          { id: "c", label: "Changer d'avis chaque jour." },
        ],
        explanation:
          "Un journal aide à analyser ses choix et garder une vision claire.",
      },
      {
        id: "q2",
        prompt: "Définir un budget maximum aide à limiter le risque.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" },
        ],
        explanation: "Un budget maximum permet de contrôler l'exposition.",
      },
      {
        id: "q3",
        prompt: "Quelle règle de base pour gérer le risque ?",
        choices: [
          { id: "a", label: "Définir un budget maximum.", correct: true },
          { id: "b", label: "Tout miser." },
          { id: "c", label: "Ignorer son plan." },
        ],
        explanation: "Un budget maximum limite l'exposition.",
      },
      {
        id: "q4",
        prompt: "Que faire quand on ressent du FOMO ?",
        choices: [
          { id: "a", label: "Rester sur son plan.", correct: true },
          { id: "b", label: "Acheter tout de suite." },
          { id: "c", label: "Utiliser plus de levier." },
        ],
        explanation: "Un plan évite les décisions impulsives.",
      },
    ],
  },
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
        linkPreview: "/previews/phantom.webp",
      },
      {
        id: "solflare",
        label: "Solflare",
        linkWebsite: "https://solflare.com",
        linkPreview: "/previews/solflare.webp",
      },
      {
        id: "backpack",
        label: "Backpack",
        linkWebsite: "https://backpack.app",
        linkPreview: "/previews/backpack.webp",
      },
    ],
  },
  {
    id: "cex",
    items: [
      {
        id: "binance",
        label: "Binance",
        linkWebsite: "https://www.binance.com",
        linkPreview: "/previews/binance.webp",
      },
      {
        id: "coinbase",
        label: "Coinbase",
        linkWebsite: "https://www.coinbase.com",
        linkPreview: "/previews/coinbase.webp",
      },
      {
        id: "kraken",
        label: "Kraken",
        linkWebsite: "https://www.kraken.com",
        linkPreview: "/previews/kraken.webp",
      },
    ],
  },
  {
    id: "dex",
    items: [
      {
        id: "jupiter",
        label: "Jupiter",
        linkWebsite: "https://jup.ag",
        linkPreview: "/previews/jupiter.webp",
      },
      {
        id: "raydium",
        label: "Raydium",
        linkWebsite: "https://raydium.io",
        linkPreview: "/previews/raydium.webp",
      },
      {
        id: "solana-explorer",
        label: "Solana Explorer",
        linkWebsite: "https://explorer.solana.com",
        linkPreview: "/previews/solana-explorer.webp",
      },
    ],
  },
];
