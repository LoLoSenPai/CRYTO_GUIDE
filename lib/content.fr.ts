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
      "Les fondamentaux pour saisir l'utilitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© de la crypto, choisir un wallet et ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©viter les piÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨ges.",
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
    title: "Parcours AvancÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©",
    tagline: "Aller plus loin, rester prudent",
    description:
      "Cas d'usages concrets, lecture d'un ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©cosystÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me et bonnes pratiques pour durer.",
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
      "Comprendre le problÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me que la blockchain rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©sout et ce que cela change concrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨tement.",
    duration: "6 min",
    steps: [
      "Une blockchain est un registre partagÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© que personne ne peut modifier seul.",
      "Elle permet d'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©changer de la valeur sans intermÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©diaire central.",
      "Les blockchains publiques sont transparentes : on peut vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifier les transactions.",
      "Les crypto-actifs sont des unitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s qui circulent sur ces registres.",
      "Le vrai gain : moins de friction, plus de vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifiabilitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©, nouveaux usages."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est l'objectif principal d'une blockchain publique ?",
        choices: [
          { id: "a", label: "CrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©er une base privÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e pour une entreprise." },
          {
            id: "b",
            label: "Permettre un registre partagÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© sans contrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â´le unique.",
            correct: true
          },
          { id: "c", label: "EmpÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âªcher toute transaction d'avoir lieu." }
        ],
        explanation:
          "Le cÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œur d'une blockchain publique, c'est le registre partagÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifiable par tous."
      },
      {
        id: "q2",
        prompt: "Les blockchains publiques sont transparentes pour tous.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" }
        ],
        explanation:
          "Tout le monde peut verifier les transactions sur une blockchain publique."
      },
      {
        id: "q3",
        prompt: "Quel est le vrai gain d'une blockchain publique ?",
        choices: [
          { id: "a", label: "Plus d'intermediaires." },
          {
            id: "b",
            label: "Moins de friction et plus de verifiabilite.",
            correct: true
          },
          { id: "c", label: "Plus de censure." }
        ],
        explanation:
          "Le gain est une meilleure verifiabilite avec moins de friction."
      },
      {
        id: "q4",
        prompt: "Qui peut verifier les transactions sur une blockchain publique ?",
        choices: [
          { id: "a", label: "Seulement les banques." },
          { id: "b", label: "Tout le monde.", correct: true },
          { id: "c", label: "Seulement l'equipe du projet." }
        ],
        explanation:
          "Un registre public est verifiable par tous."
      }
    ]
  },
  {
    slug: "wallets-101",
    track: "basic",
    title: "Wallets : hot, cold, custodian",
    summary: "Savoir oÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¹ sont stockÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©es les clÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s et pourquoi ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§a change tout.",
    duration: "7 min",
    steps: [
      "Un wallet stocke des clÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s, pas des coins : c'est votre accÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨s aux fonds.",
      "Hot wallet = connectÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©, pratique pour le quotidien.",
      "Cold wallet = hors ligne, plus sÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â»r pour le long terme.",
      "Custodial = un tiers garde les clÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s (ex: CEX).",
      "RÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨gle simple : petite somme en hot, grosse somme en cold."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quelle est la vraie diffÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rence entre hot et cold wallet ?",
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
          "La connexion ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  Internet est la diffÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rence clÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©, avec un impact direct sur la sÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©curitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©."
      },
      {
        id: "q2",
        prompt: "Un wallet stocke les cles privees.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" }
        ],
        explanation:
          "Un wallet garde les cles, pas les coins."
      },
      {
        id: "q3",
        prompt: "Le choix le plus sur pour une grosse somme ?",
        choices: [
          { id: "a", label: "Hot wallet." },
          { id: "b", label: "Cold wallet.", correct: true },
          { id: "c", label: "Un wallet demo." }
        ],
        explanation:
          "Le cold wallet est hors ligne, donc plus sur."
      },
      {
        id: "q4",
        prompt: "Qu'est-ce qu'un wallet custodial ?",
        choices: [
          { id: "a", label: "Tu gardes tes cles." },
          { id: "b", label: "Un tiers garde tes cles.", correct: true },
          { id: "c", label: "Un wallet sans mot de passe." }
        ],
        explanation:
          "Un wallet custodial est gere par un tiers (ex: CEX)."
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
      "Comprendre la diffÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rence entre plateformes centralisÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©es et ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©changes dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©centralisÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s.",
    duration: "6 min",
    steps: [
      "Un CEX (centralisÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©) ressemble ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  une banque : compte, support, KYC.",
      "Un DEX (dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©centralisÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©) fonctionne via smart contracts et votre wallet.",
      "CEX = simple, DEX = plus autonome et transparent.",
      "Toujours vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifier les frais et l'authenticitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© du site utilisÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©.",
      "Commencer par un CEX peut ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âªtre plus rassurant pour un dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©butant."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est l'avantage principal d'un CEX pour un dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©butant ?",
        choices: [
          { id: "a", label: "Pas besoin de compte." },
          {
            id: "b",
            label: "Interface guidÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e et support client.",
            correct: true
          },
          { id: "c", label: "Aucun frais sur les transactions." }
        ],
        explanation:
          "Les CEX sont plus guidÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s et proposent un support, utile au dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©but."
      },
      {
        id: "q2",
        prompt: "Sur un DEX, la plateforme garde tes cles.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux", correct: true }
        ],
        explanation:
          "Sur un DEX, tu gardes la garde via ton wallet."
      },
      {
        id: "q3",
        prompt: "Quel reflexe est essentiel avant d'utiliser un CEX ou DEX ?",
        choices: [
          { id: "a", label: "Ignorer les frais." },
          { id: "b", label: "Verifier l'URL et les frais.", correct: true },
          { id: "c", label: "Signer sans lire." }
        ],
        explanation:
          "Toujours verifier l'URL et les frais."
      },
      {
        id: "q4",
        prompt: "Quelle option donne le plus d'autonomie ?",
        choices: [
          { id: "a", label: "CEX." },
          { id: "b", label: "DEX.", correct: true },
          { id: "c", label: "Connexion email." }
        ],
        explanation:
          "Le DEX te laisse garder la garde de tes cles."
      }
    ],
    mission: {
      title: "Mission : crÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©er un compte CEX",
      description:
        "Ouvre un compte sur un exchange fiable pour accÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©der ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  l'achat/vente de crypto.",
      ctaLabel: "CrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©er un compte Binance",
      ctaHref: "https://www.binance.com/?ref=YOUR_REF",
      disclaimer:
        "Lien affiliÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© possible. Rien d'obligatoire : choisis la plateforme qui te convient."
    }
  },
  {
    slug: "securite",
    track: "basic",
    title: "SÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©curitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© de base",
    summary: "Les rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨gles simples qui ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©vitent 90% des problÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨mes.",
    duration: "5 min",
    steps: [
      "Ne partage jamais ta seed phrase, mÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âªme avec un 'support'.",
      "Toujours vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifier l'URL avant de connecter un wallet.",
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
      },
      {
        id: "q2",
        prompt: "Utiliser le 2FA reduit le risque sur un compte CEX.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" }
        ],
        explanation:
          "Le 2FA ajoute une couche de protection en plus du mot de passe."
      },
      {
        id: "q3",
        prompt: "Que faut-il verifier avant de connecter un wallet ?",
        choices: [
          { id: "a", label: "L'URL du site.", correct: true },
          { id: "b", label: "Le fond d'ecran." },
          { id: "c", label: "Les emojis." }
        ],
        explanation:
          "Verifier l'URL reduit les risques de phishing."
      },
      {
        id: "q4",
        prompt: "Ou conserver une seed phrase ?",
        choices: [
          { id: "a", label: "Dans un doc cloud public." },
          { id: "b", label: "Hors ligne, sur papier.", correct: true },
          { id: "c", label: "Dans un message prive." }
        ],
        explanation:
          "Le stockage hors ligne limite les risques de hack."
      }
    ]
  },
  {
    slug: "premiere-transaction",
    track: "basic",
    title: "PremiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨re transaction",
    summary: "Faire une petite transaction test pour comprendre le workflow.",
    duration: "6 min",
    steps: [
      "Commencer par une petite somme symbolique.",
      "VÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifier le rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©seau utilisÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© (ex: Solana) et l'adresse.",
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
            label: "Pour valider l'adresse et le rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©seau.",
            correct: true
          },
          { id: "c", label: "Parce que c'est obligatoire." }
        ],
        explanation:
          "Un test rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©duit drastiquement le risque d'erreur d'adresse ou de rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©seau."
      },
      {
        id: "q2",
        prompt: "Il faut envoyer un gros montant pour tester d'abord.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux", correct: true }
        ],
        explanation:
          "Un petit test est plus prudent avant d'envoyer plus."
      },
      {
        id: "q3",
        prompt: "Pourquoi les frais (gas) comptent ?",
        choices: [
          { id: "a", label: "Ils sont toujours a zero." },
          {
            id: "b",
            label: "Ils reduisent le montant recu.",
            correct: true
          },
          { id: "c", label: "Ils changent l'adresse." }
        ],
        explanation:
          "Les frais impactent le montant final et varient selon le reseau."
      },
      {
        id: "q4",
        prompt: "Quel est un premier envoi raisonnable ?",
        choices: [
          { id: "a", label: "Un tout petit test.", correct: true },
          { id: "b", label: "Tous les fonds." },
          { id: "c", label: "Un montant aleatoire." }
        ],
        explanation:
          "Un test limite les erreurs couteuses."
      }
    ]
  },
  {
    slug: "solana-ecosystem",
    track: "advanced",
    title: "Explorer l'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©cosystÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me Solana",
    summary: "Outils, wallets, et catÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©gories d'apps utiles.",
    duration: "8 min",
    steps: [
      "Solana est optimisÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e pour la vitesse et des frais bas.",
      "Un wallet Solana te donne accÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨s ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  tout l'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©cosystÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me.",
      "CatÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©gories: DeFi, NFT, gaming, payments, infra.",
      "VÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifier la rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©putation d'une dApp avant d'interagir.",
      "Suivre les annonces officielles pour rester ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  jour."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quelle est une bonne pratique avant d'utiliser une dApp ?",
        choices: [
          { id: "a", label: "Ignorer l'URL." },
          {
            id: "b",
            label: "VÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifier sa rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©putation et ses avis.",
            correct: true
          },
          { id: "c", label: "Utiliser tous ses fonds d'un coup." }
        ],
        explanation:
          "Toujours vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifier la crÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©dibilitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© avant d'engager son wallet."
      },
      {
        id: "q2",
        prompt: "Un wallet Solana donne acces a l'ecosysteme.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" }
        ],
        explanation:
          "Le wallet est la porte d'entree des apps et actifs Solana."
      },
      {
        id: "q3",
        prompt: "Quelle categorie fait partie de l'ecosysteme ?",
        choices: [
          { id: "a", label: "DeFi et NFTs.", correct: true },
          { id: "b", label: "Aucune, seulement les paiements." },
          { id: "c", label: "Uniquement reseaux sociaux." }
        ],
        explanation:
          "DeFi, NFTs, gaming, payments et infra sont des categories cles."
      },
      {
        id: "q4",
        prompt: "Pourquoi suivre les annonces officielles ?",
        choices: [
          { id: "a", label: "Eviter les arnaques et rester a jour.", correct: true },
          { id: "b", label: "Pour sauter la securite." },
          { id: "c", label: "Parce que ca ne change rien." }
        ],
        explanation:
          "Les canaux officiels aident a verifier les vraies infos."
      }
    ]
  },
  {
    slug: "defi-essentials",
    track: "advanced",
    title: "DeFi essentials",
    summary: "Comprendre swaps, pools, et rendements sans se faire piÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ger.",
    duration: "9 min",
    steps: [
      "Un swap = ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©change direct entre tokens.",
      "Les pools de liquiditÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© permettent les ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©changes mais comportent des risques.",
      "APY ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©levÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© = risque ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©levÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©. Toujours lire les conditions.",
      "Les smart contracts peuvent avoir des failles.",
      "Diversifier ses activitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s limite la casse en cas d'incident."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Un APY trÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨s ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©levÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© signifie souvent...",
        choices: [
          { id: "a", label: "Aucun risque." },
          { id: "b", label: "Plus de risques.", correct: true },
          { id: "c", label: "Une garantie absolue." }
        ],
        explanation:
          "Rendement et risque sont liÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s, surtout en DeFi."
      },
      {
        id: "q2",
        prompt: "Un APY tres eleve signifie toujours peu de risque.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux", correct: true }
        ],
        explanation:
          "Un APY eleve signale souvent plus de risque."
      },
      {
        id: "q3",
        prompt: "Pourquoi lire les conditions d'un protocole ?",
        choices: [
          { id: "a", label: "Pour les couleurs." },
          { id: "b", label: "Pour comprendre risques et regles.", correct: true },
          { id: "c", label: "Parce que ca garantit un profit." }
        ],
        explanation:
          "Les conditions expliquent les risques, frais et comportements."
      },
      {
        id: "q4",
        prompt: "Qu'est-ce qu'un swap ?",
        choices: [
          { id: "a", label: "Un echange direct entre tokens.", correct: true },
          { id: "b", label: "Un pret sans risque." },
          { id: "c", label: "Un profit garanti." }
        ],
        explanation:
          "Un swap est un echange simple d'un token contre un autre."
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
      "Un NFT prouve la propriÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©tÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© d'un actif numÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rique unique.",
      "La valeur dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©pend de l'utilitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©, pas seulement de l'image.",
      "Les royalties ne sont pas toujours garanties selon la marketplace.",
      "Toujours vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rifier l'authenticitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© d'une collection.",
      "Utiliser un wallet dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©diÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© peut limiter les risques."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "La valeur d'un NFT dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©pend surtout...",
        choices: [
          { id: "a", label: "Du hasard." },
          {
            id: "b",
            label: "De l'utilitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© et de la communautÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©.",
            correct: true
          },
          { id: "c", label: "Du nombre de pixels." }
        ],
        explanation:
          "L'utilitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© et la communautÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© sont les moteurs principaux de valeur."
      },
      {
        id: "q2",
        prompt: "La valeur d'un NFT depend uniquement de l'image.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux", correct: true }
        ],
        explanation:
          "L'utilite et la communaute comptent le plus souvent."
      },
      {
        id: "q3",
        prompt: "Les royalties sont-elles toujours garanties ?",
        choices: [
          { id: "a", label: "Oui, toujours." },
          {
            id: "b",
            label: "Non, cela depend de la marketplace.",
            correct: true
          },
          { id: "c", label: "Seulement le week-end." }
        ],
        explanation:
          "L'application des royalties varie selon les marketplaces."
      },
      {
        id: "q4",
        prompt: "Que prouve un NFT ?",
        choices: [
          { id: "a", label: "La propriete d'un actif numerique unique.", correct: true },
          { id: "b", label: "Un profit garanti." },
          { id: "c", label: "Une identite anonyme." }
        ],
        explanation:
          "Un NFT est une preuve de propriete on-chain."
      }
    ]
  },
  {
    slug: "risk-management",
    track: "advanced",
    title: "GÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rer ses risques",
    summary: "Rester lucide et bÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢tir un plan long terme.",
    duration: "6 min",
    steps: [
      "Toujours dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©finir un budget maximum.",
      "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°viter l'effet FOMO en restant sur son plan.",
      "SÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©parer long terme et court terme.",
      "Ne pas tout mettre sur un seul actif.",
      "Tenir un journal simple de ses actions aide ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  progresser."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est un bon rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©flexe pour limiter les erreurs ?",
        choices: [
          { id: "a", label: "Investir en urgence." },
          { id: "b", label: "Tenir un journal de dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©cisions.", correct: true },
          { id: "c", label: "Changer d'avis chaque jour." }
        ],
        explanation:
          "Un journal aide ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  analyser ses choix et garder une vision claire."
      },
      {
        id: "q2",
        prompt: "Definir un budget maximum aide a limiter le risque.",
        kind: "boolean",
        choices: [
          { id: "a", label: "Vrai", correct: true },
          { id: "b", label: "Faux" }
        ],
        explanation:
          "Un budget maximum permet de controler l'exposition."
      },
      {
        id: "q3",
        prompt: "Quelle regle de base pour gerer le risque ?",
        choices: [
          { id: "a", label: "Definir un budget maximum.", correct: true },
          { id: "b", label: "Tout miser." },
          { id: "c", label: "Ignorer son plan." }
        ],
        explanation:
          "Un budget maximum limite l'exposition."
      },
      {
        id: "q4",
        prompt: "Que faire quand on ressent du FOMO ?",
        choices: [
          { id: "a", label: "Rester sur son plan.", correct: true },
          { id: "b", label: "Acheter tout de suite." },
          { id: "c", label: "Utiliser plus de levier." }
        ],
        explanation:
          "Un plan evite les decisions impulsives."
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
