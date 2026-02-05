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
      "Les fondamentaux pour saisir l'utilit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© de la crypto, choisir un wallet et �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©viter les pi�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨ges.",
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
    title: "Parcours Avanc�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©",
    tagline: "Aller plus loin, rester prudent",
    description:
      "Cas d'usages concrets, lecture d'un �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©cosyst�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨me et bonnes pratiques pour durer.",
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
      "Comprendre le probl�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨me que la blockchain r�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©sout et ce que cela change concr�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨tement.",
    duration: "6 min",
    steps: [
      "Une blockchain est un registre partag�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© que personne ne peut modifier seul.",
      "Elle permet d'�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©changer de la valeur sans interm�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©diaire central.",
      "Les blockchains publiques sont transparentes : on peut v�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifier les transactions.",
      "Les crypto-actifs sont des unit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©s qui circulent sur ces registres.",
      "Le vrai gain : moins de friction, plus de v�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifiabilit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©, nouveaux usages."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est l'objectif principal d'une blockchain publique ?",
        choices: [
          { id: "a", label: "Cr�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©er une base priv�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©e pour une entreprise." },
          {
            id: "b",
            label: "Permettre un registre partag�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© sans contr�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,´le unique.",
            correct: true
          },
          { id: "c", label: "Emp�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,ªcher toute transaction d'avoir lieu." }
        ],
        explanation:
          "Le c�f�'�?�?T�f¢â�?s¬�,¦�f�'�,¢�f¢â�,�š�,¬�f�?�â�,��"ur d'une blockchain publique, c'est le registre partag�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© v�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifiable par tous."
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
    summary: "Savoir o�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¹ sont stock�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©es les cl�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©s et pourquoi �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,§a change tout.",
    duration: "7 min",
    steps: [
      "Un wallet stocke des cl�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©s, pas des coins : c'est votre acc�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨s aux fonds.",
      "Hot wallet = connect�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©, pratique pour le quotidien.",
      "Cold wallet = hors ligne, plus s�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,»r pour le long terme.",
      "Custodial = un tiers garde les cl�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©s (ex: CEX).",
      "R�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨gle simple : petite somme en hot, grosse somme en cold."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quelle est la vraie diff�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rence entre hot et cold wallet ?",
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
          "La connexion �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,  Internet est la diff�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rence cl�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©, avec un impact direct sur la s�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©curit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©."
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
      "Comprendre la diff�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rence entre plateformes centralis�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©es et �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©changes d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©centralis�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©s.",
    duration: "6 min",
    steps: [
      "Un CEX (centralis�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©) ressemble �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,  une banque : compte, support, KYC.",
      "Un DEX (d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©centralis�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©) fonctionne via smart contracts et votre wallet.",
      "CEX = simple, DEX = plus autonome et transparent.",
      "Toujours v�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifier les frais et l'authenticit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© du site utilis�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©.",
      "Commencer par un CEX peut �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,ªtre plus rassurant pour un d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©butant."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est l'avantage principal d'un CEX pour un d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©butant ?",
        choices: [
          { id: "a", label: "Pas besoin de compte." },
          {
            id: "b",
            label: "Interface guid�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©e et support client.",
            correct: true
          },
          { id: "c", label: "Aucun frais sur les transactions." }
        ],
        explanation:
          "Les CEX sont plus guid�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©s et proposent un support, utile au d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©but."
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
      title: "Mission : cr�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©er un compte CEX",
      description:
        "Ouvre un compte sur un exchange fiable pour acc�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©der �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,  l'achat/vente de crypto.",
      ctaLabel: "Cr�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©er un compte Binance",
      ctaHref: "https://www.binance.com/?ref=YOUR_REF",
      disclaimer:
        "Lien affili�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© possible. Rien d'obligatoire : choisis la plateforme qui te convient."
    }
  },
  {
    slug: "securite",
    track: "basic",
    title: "S�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©curit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© de base",
    summary: "Les r�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨gles simples qui �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©vitent 90% des probl�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨mes.",
    duration: "5 min",
    steps: [
      "Ne partage jamais ta seed phrase, m�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,ªme avec un 'support'.",
      "Toujours v�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifier l'URL avant de connecter un wallet.",
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
    title: "Premi�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨re transaction",
    summary: "Faire une petite transaction test pour comprendre le workflow.",
    duration: "6 min",
    steps: [
      "Commencer par une petite somme symbolique.",
      "V�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifier le r�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©seau utilis�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© (ex: Solana) et l'adresse.",
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
            label: "Pour valider l'adresse et le r�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©seau.",
            correct: true
          },
          { id: "c", label: "Parce que c'est obligatoire." }
        ],
        explanation:
          "Un test r�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©duit drastiquement le risque d'erreur d'adresse ou de r�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©seau."
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
    title: "Explorer l'�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©cosyst�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨me Solana",
    summary: "Outils, wallets, et cat�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©gories d'apps utiles.",
    duration: "8 min",
    steps: [
      "Solana est optimis�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©e pour la vitesse et des frais bas.",
      "Un wallet Solana te donne acc�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨s �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,  tout l'�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©cosyst�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨me.",
      "Cat�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©gories: DeFi, NFT, gaming, payments, infra.",
      "V�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifier la r�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©putation d'une dApp avant d'interagir.",
      "Suivre les annonces officielles pour rester �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,  jour."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quelle est une bonne pratique avant d'utiliser une dApp ?",
        choices: [
          { id: "a", label: "Ignorer l'URL." },
          {
            id: "b",
            label: "V�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifier sa r�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©putation et ses avis.",
            correct: true
          },
          { id: "c", label: "Utiliser tous ses fonds d'un coup." }
        ],
        explanation:
          "Toujours v�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifier la cr�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©dibilit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© avant d'engager son wallet."
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
    summary: "Comprendre swaps, pools, et rendements sans se faire pi�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©ger.",
    duration: "9 min",
    steps: [
      "Un swap = �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©change direct entre tokens.",
      "Les pools de liquidit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© permettent les �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©changes mais comportent des risques.",
      "APY �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©lev�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© = risque �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©lev�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©. Toujours lire les conditions.",
      "Les smart contracts peuvent avoir des failles.",
      "Diversifier ses activit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©s limite la casse en cas d'incident."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Un APY tr�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¨s �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©lev�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© signifie souvent...",
        choices: [
          { id: "a", label: "Aucun risque." },
          { id: "b", label: "Plus de risques.", correct: true },
          { id: "c", label: "Une garantie absolue." }
        ],
        explanation:
          "Rendement et risque sont li�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©s, surtout en DeFi."
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
      "Un NFT prouve la propri�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©t�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© d'un actif num�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rique unique.",
      "La valeur d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©pend de l'utilit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©, pas seulement de l'image.",
      "Les royalties ne sont pas toujours garanties selon la marketplace.",
      "Toujours v�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rifier l'authenticit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© d'une collection.",
      "Utiliser un wallet d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©di�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© peut limiter les risques."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "La valeur d'un NFT d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©pend surtout...",
        choices: [
          { id: "a", label: "Du hasard." },
          {
            id: "b",
            label: "De l'utilit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© et de la communaut�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©.",
            correct: true
          },
          { id: "c", label: "Du nombre de pixels." }
        ],
        explanation:
          "L'utilit�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© et la communaut�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,© sont les moteurs principaux de valeur."
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
    title: "G�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©rer ses risques",
    summary: "Rester lucide et b�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,¢tir un plan long terme.",
    duration: "6 min",
    steps: [
      "Toujours d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©finir un budget maximum.",
      "�f�'�?�?T�f�?�â�,��"��f�'�,¢�f¢â�,�š�,¬�f�?s�,°viter l'effet FOMO en restant sur son plan.",
      "S�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©parer long terme et court terme.",
      "Ne pas tout mettre sur un seul actif.",
      "Tenir un journal simple de ses actions aide �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,  progresser."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Quel est un bon r�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©flexe pour limiter les erreurs ?",
        choices: [
          { id: "a", label: "Investir en urgence." },
          { id: "b", label: "Tenir un journal de d�f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,©cisions.", correct: true },
          { id: "c", label: "Changer d'avis chaque jour." }
        ],
        explanation:
          "Un journal aide �f�'�?�?T�f�?�â�,��"��f�'â�,�š�f�?s�,  analyser ses choix et garder une vision claire."
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
