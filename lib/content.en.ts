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
  learnSections?: {
    id: string;
    title: string;
    body: string;
    bullets?: string[];
    note?: string;
    media?: {
      src: string;
      alt: string;
      caption?: string;
    };
  }[];
  cheatsheet?: {
    title: string;
    items: string[];
  };
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
    title: "Basic Track",
    tagline: "Understand before acting",
    description:
      "The fundamentals to grasp crypto's utility, choose a wallet, and avoid common traps.",
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
    title: "Advanced Track",
    tagline: "Go further, stay prudent",
    description:
      "Concrete use cases, ecosystem literacy, and good practices to last.",
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
    title: "Why does blockchain exist?",
    summary:
      "Understand the problem blockchain solves and what that changes in practice.",
    duration: "6 min",
    steps: [
      "A blockchain is a shared ledger that no single party can alter alone.",
      "It enables value transfer without a central intermediary.",
      "Public blockchains are transparent: anyone can verify transactions.",
      "Crypto assets are units that move on these ledgers.",
      "The real gain: less friction, more verifiability, new use cases."
    ],
    learnSections: [
      {
        id: "problem",
        title: "The problem before blockchain",
        body: "On the internet, copying information is easy. Copying value safely without a central middleman was much harder.",
        bullets: [
          "Banks and payment processors were the default trust layer.",
          "Cross-border transfers were often slow and expensive.",
          "Users had little visibility into how settlement happened."
        ],
        note: "Blockchain is mainly a trust and verification infrastructure."
      },
      {
        id: "how-it-works",
        title: "What a blockchain changes",
        body: "A public blockchain provides a shared ledger that many participants verify together instead of one actor controlling it.",
        bullets: [
          "Transactions are visible and auditable.",
          "Rules are applied by protocol logic.",
          "Ownership can be moved programmatically."
        ],
        note: "Not everything should be on-chain. Use it where verifiability matters."
      },
      {
        id: "use-cases",
        title: "Concrete use cases",
        body: "Use cases are strongest when users need open access, verifiable records, and programmable transfers.",
        bullets: [
          "Global payments and remittances",
          "Digital ownership (tokens, NFTs)",
          "Open financial rails (DeFi)"
        ],
        note: "Speculation exists, but utility is the long-term foundation."
      }
    ],
    cheatsheet: {
      title: "Quick cheat sheet",
      items: [
        "Blockchain = shared ledger, not controlled by one party.",
        "Main value = verification + open access.",
        "Best fit = use cases needing transparent records."
      ]
    },
    quiz: [
      {
        id: "q1",
        prompt: "What is the main purpose of a public blockchain?",
        choices: [
          { id: "a", label: "Create a private database for a company." },
          {
            id: "b",
            label: "Enable a shared ledger without a single controller.",
            correct: true
          },
          { id: "c", label: "Prevent any transaction from happening." }
        ],
        explanation:
          "The core of a public blockchain is a shared ledger verifiable by anyone."
      },
      {
        id: "q2",
        prompt: "Public blockchains are transparent for everyone.",
        kind: "boolean",
        choices: [
          { id: "a", label: "True", correct: true },
          { id: "b", label: "False" }
        ],
        explanation:
          "Anyone can verify transactions on a public blockchain."
      },
      {
        id: "q3",
        prompt: "What is a practical benefit of a blockchain?",
        choices: [
          { id: "a", label: "More middlemen and higher friction." },
          {
            id: "b",
            label: "Less friction and better verifiability.",
            correct: true
          },
          { id: "c", label: "No need to verify anything." }
        ],
        explanation:
          "The real gain is lower friction and better verifiability."
      },
      {
        id: "q4",
        prompt: "Who can verify transactions on a public blockchain?",
        choices: [
          { id: "a", label: "Only banks." },
          { id: "b", label: "Anyone.", correct: true },
          { id: "c", label: "Only the project team." }
        ],
        explanation:
          "Public ledgers are open: anyone can verify transactions."
      }
    ]
  },
  {
    slug: "wallets-101",
    track: "basic",
    title: "Wallets: hot, cold, custodial",
    summary: "Know where keys are stored and why that matters.",
    duration: "7 min",
    steps: [
      "A wallet stores keys, not coins: it's your access to funds.",
      "Hot wallet = online, convenient for daily use.",
      "Cold wallet = offline, safer for long-term storage.",
      "Custodial = a third party holds the keys (e.g., a CEX).",
      "Simple rule: small amount in hot, large amount in cold."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What's the real difference between hot and cold wallets?",
        choices: [
          {
            id: "a",
            label: "Hot = online, Cold = offline.",
            correct: true
          },
          { id: "b", label: "Hot = only for trading." },
          { id: "c", label: "There is no difference." }
        ],
        explanation:
          "Connectivity to the internet is the key difference, with a direct impact on security."
      },
      {
        id: "q2",
        prompt: "A wallet stores your private keys.",
        kind: "boolean",
        choices: [
          { id: "a", label: "True", correct: true },
          { id: "b", label: "False" }
        ],
        explanation:
          "Wallets hold keys, not coins."
      },
      {
        id: "q3",
        prompt: "Which setup is safer for long-term storage?",
        choices: [
          { id: "a", label: "A hot wallet only." },
          { id: "b", label: "A cold wallet.", correct: true },
          { id: "c", label: "Sharing your seed phrase." }
        ],
        explanation:
          "Cold wallets are offline and reduce exposure to online attacks."
      },
      {
        id: "q4",
        prompt: "What is a custodial wallet?",
        choices: [
          { id: "a", label: "You hold the keys." },
          {
            id: "b",
            label: "A third party holds your keys.",
            correct: true
          },
          { id: "c", label: "A wallet with no password." }
        ],
        explanation:
          "Custodial wallets are managed by a provider (e.g., a CEX)."
      }
    ],
    mission: {
      title: "Mission: choose a wallet",
      description:
        "Install a non-custodial wallet (e.g., Phantom) and write your seed phrase offline.",
      ctaLabel: "See wallets",
      ctaHref: "/resources"
    }
  },
  {
    slug: "cex-vs-dex",
    track: "basic",
    title: "CEX vs DEX",
    summary:
      "Understand the difference between centralized and decentralized exchanges.",
    duration: "6 min",
    steps: [
      "A CEX (centralized) feels like a bank: account, support, KYC.",
      "A DEX (decentralized) runs through smart contracts and your wallet.",
      "CEX = simple, DEX = more autonomous and transparent.",
      "Always check fees and the authenticity of the site you use.",
      "Starting with a CEX can feel safer for beginners."
    ],
    learnSections: [
      {
        id: "difference",
        title: "Core difference",
        body: "CEX and DEX both let you trade, but custody and responsibility are not the same.",
        bullets: [
          "CEX: platform holds keys, account-based experience.",
          "DEX: you hold keys, wallet-based experience.",
          "Both can coexist in one user journey."
        ],
        note: "The key question is: who controls the keys?"
      },
      {
        id: "when-to-use",
        title: "When to use each",
        body: "Beginners usually start with CEX for onboarding, then use DEX as they gain confidence.",
        bullets: [
          "CEX: fiat on-ramp, support, easier first buy.",
          "DEX: self-custody, token access, on-chain transparency.",
          "Security habits are required in both cases."
        ],
        note: "Use CEX for convenience, DEX for autonomy."
      },
      {
        id: "risk-checklist",
        title: "Minimal risk checklist",
        body: "Before each action, run a short checklist to avoid common mistakes.",
        bullets: [
          "Verify URL and domain spelling.",
          "Check network and fees before confirming.",
          "Never share seed phrase or private key."
        ],
        note: "One minute of verification prevents most beginner losses."
      }
    ],
    cheatsheet: {
      title: "Quick cheat sheet",
      items: [
        "CEX = easier onboarding, platform custody.",
        "DEX = more autonomy, you hold keys.",
        "Always verify URL, network, and fees."
      ]
    },
    quiz: [
      {
        id: "q1",
        prompt: "What is the main advantage of a CEX for a beginner?",
        choices: [
          { id: "a", label: "No account required." },
          {
            id: "b",
            label: "Guided UI and customer support.",
            correct: true
          },
          { id: "c", label: "No transaction fees." }
        ],
        explanation:
          "CEXs are more guided and offer support, which helps at the beginning."
      },
      {
        id: "q2",
        prompt: "On a DEX, the exchange holds your keys.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "True" },
          { id: "b", label: "False", correct: true }
        ],
        explanation:
          "On a DEX, you keep custody through your wallet."
      },
      {
        id: "q3",
        prompt: "What should you always check before trading?",
        choices: [
          { id: "a", label: "That the URL is correct.", correct: true },
          { id: "b", label: "That the logo is pretty." },
          { id: "c", label: "That there are no fees." }
        ],
        explanation:
          "Fake sites are common. Always verify the URL and fees."
      },
      {
        id: "q4",
        prompt: "Which option gives you more autonomy?",
        choices: [
          { id: "a", label: "CEX." },
          { id: "b", label: "DEX.", correct: true },
          { id: "c", label: "Email login." }
        ],
        explanation:
          "DEXs let you keep custody and interact directly with contracts."
      }
    ],
    mission: {
      title: "Mission: create a CEX account",
      description:
        "Open an account on a reliable exchange to access crypto buying/selling.",
      ctaLabel: "Create a Binance account",
      ctaHref: "https://www.binance.com/?ref=YOUR_REF",
      disclaimer:
        "Affiliate link possible. Nothing is mandatory: choose the platform you prefer."
    }
  },
  {
    slug: "securite",
    track: "basic",
    title: "Basic security",
    summary: "Simple rules that avoid 90% of problems.",
    duration: "5 min",
    steps: [
      "Never share your seed phrase, even with 'support'.",
      "Always check the URL before connecting a wallet.",
      "Use 2FA for CEX accounts.",
      "Keep a paper notebook for sensitive info.",
      "Never sign a transaction you don't understand."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What should you do if support asks for your seed phrase?",
        choices: [
          { id: "a", label: "Give it quickly." },
          { id: "b", label: "Never give it.", correct: true },
          { id: "c", label: "Send a blurry photo." }
        ],
        explanation:
          "A seed phrase is never shared. Real support will not ask for it."
      },
      {
        id: "q2",
        prompt: "Using 2FA reduces the risk on a CEX account.",
        kind: "boolean",
        choices: [
          { id: "a", label: "True", correct: true },
          { id: "b", label: "False" }
        ],
        explanation:
          "2FA adds a protective layer beyond the password."
      },
      {
        id: "q3",
        prompt: "Why is checking the URL critical?",
        choices: [
          { id: "a", label: "To see cool animations." },
          {
            id: "b",
            label: "To avoid phishing sites.",
            correct: true
          },
          { id: "c", label: "Because it speeds up the network." }
        ],
        explanation:
          "Most wallet drains happen through fake websites."
      },
      {
        id: "q4",
        prompt: "Where should you store a seed phrase?",
        choices: [
          { id: "a", label: "In a public cloud doc." },
          { id: "b", label: "Offline, on paper.", correct: true },
          { id: "c", label: "In a DM." }
        ],
        explanation:
          "Offline storage reduces exposure to hacks."
      }
    ]
  },
  {
    slug: "premiere-transaction",
    track: "basic",
    title: "First transaction",
    summary: "Make a small test transfer to understand the flow.",
    duration: "6 min",
    steps: [
      "Start with a tiny symbolic amount.",
      "Verify the network used (e.g., Solana) and the address.",
      "Understand fees (gas).",
      "Always test before sending more.",
      "Keep a history of your transactions."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Why test before a large transfer?",
        choices: [
          { id: "a", label: "To increase fees." },
          {
            id: "b",
            label: "To validate the address and network.",
            correct: true
          },
          { id: "c", label: "Because it's mandatory." }
        ],
        explanation:
          "A test greatly reduces the risk of address or network errors."
      },
      {
        id: "q2",
        prompt: "You should send a large amount first to test.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "True" },
          { id: "b", label: "False", correct: true }
        ],
        explanation:
          "A small test is safer before larger transfers."
      },
      {
        id: "q3",
        prompt: "Why do fees (gas) matter?",
        choices: [
          { id: "a", label: "They are always zero." },
          {
            id: "b",
            label: "They affect how much you receive.",
            correct: true
          },
          { id: "c", label: "They replace the address." }
        ],
        explanation:
          "Fees reduce the final amount and can vary by network."
      },
      {
        id: "q4",
        prompt: "What is a safe first transfer?",
        choices: [
          { id: "a", label: "A very small test amount.", correct: true },
          { id: "b", label: "All funds at once." },
          { id: "c", label: "A random amount." }
        ],
        explanation:
          "Small tests reduce the risk of costly mistakes."
      }
    ]
  },
  {
    slug: "solana-ecosystem",
    track: "advanced",
    title: "Explore the Solana ecosystem",
    summary: "Tools, wallets, and app categories that matter.",
    duration: "8 min",
    steps: [
      "Solana is optimized for speed and low fees.",
      "A Solana wallet gives you access to the entire ecosystem.",
      "Categories: DeFi, NFT, gaming, payments, infra.",
      "Check a dApp's reputation before interacting.",
      "Follow official announcements to stay up to date."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What's a good practice before using a dApp?",
        choices: [
          { id: "a", label: "Ignore the URL." },
          {
            id: "b",
            label: "Check its reputation and reviews.",
            correct: true
          },
          { id: "c", label: "Use all your funds at once." }
        ],
        explanation:
          "Always verify credibility before engaging your wallet."
      },
      {
        id: "q2",
        prompt: "A Solana wallet gives access to the ecosystem.",
        kind: "boolean",
        choices: [
          { id: "a", label: "True", correct: true },
          { id: "b", label: "False" }
        ],
        explanation:
          "A wallet is the gateway to Solana apps and assets."
      },
      {
        id: "q3",
        prompt: "Which category is part of the Solana ecosystem?",
        choices: [
          { id: "a", label: "DeFi and NFTs.", correct: true },
          { id: "b", label: "None, it's only for payments." },
          { id: "c", label: "Only social media." }
        ],
        explanation:
          "DeFi, NFTs, gaming, payments, and infra are key categories."
      },
      {
        id: "q4",
        prompt: "Why follow official announcements?",
        choices: [
          { id: "a", label: "To avoid scams and stay updated.", correct: true },
          { id: "b", label: "To skip security checks." },
          { id: "c", label: "Because updates don't matter." }
        ],
        explanation:
          "Official channels help you verify real updates and avoid fakes."
      }
    ]
  },
  {
    slug: "defi-essentials",
    track: "advanced",
    title: "DeFi essentials",
    summary: "Understand swaps, pools, and yields without getting trapped.",
    duration: "9 min",
    steps: [
      "A swap = a direct exchange between tokens.",
      "Liquidity pools enable swaps but involve risks.",
      "High APY = high risk. Always read the conditions.",
      "Smart contracts can have vulnerabilities.",
      "Diversifying your activities limits damage in incidents."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "A very high APY often means...",
        choices: [
          { id: "a", label: "No risk." },
          { id: "b", label: "More risk.", correct: true },
          { id: "c", label: "A guaranteed outcome." }
        ],
        explanation:
          "Yield and risk are linked, especially in DeFi."
      },
      {
        id: "q2",
        prompt: "A very high APY always means low risk.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "True" },
          { id: "b", label: "False", correct: true }
        ],
        explanation:
          "High APY usually signals higher risk, especially in DeFi."
      },
      {
        id: "q3",
        prompt: "Why read smart contract conditions?",
        choices: [
          { id: "a", label: "To see the colors." },
          { id: "b", label: "To understand risks and rules.", correct: true },
          { id: "c", label: "Because it guarantees profit." }
        ],
        explanation:
          "Conditions explain risks, fees, and how a protocol behaves."
      },
      {
        id: "q4",
        prompt: "What is a swap?",
        choices: [
          { id: "a", label: "A direct exchange between tokens.", correct: true },
          { id: "b", label: "A loan with zero risk." },
          { id: "c", label: "A guaranteed profit." }
        ],
        explanation:
          "A swap simply exchanges one token for another."
      }
    ]
  },
  {
    slug: "nfts-culture",
    track: "advanced",
    title: "NFTs and on-chain culture",
    summary: "Understand value, use cases, and limits of NFTs.",
    duration: "7 min",
    steps: [
      "An NFT proves ownership of a unique digital asset.",
      "Value depends on utility, not just the image.",
      "Royalties are not always guaranteed depending on the marketplace.",
      "Always verify a collection's authenticity.",
      "Using a dedicated wallet can limit risks."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "The value of an NFT mostly depends on...",
        choices: [
          { id: "a", label: "Luck." },
          {
            id: "b",
            label: "Utility and community.",
            correct: true
          },
          { id: "c", label: "Number of pixels." }
        ],
        explanation:
          "Utility and community are the main drivers of value."
      },
      {
        id: "q2",
        prompt: "The value of an NFT depends only on the image.",
        kind: "boolean",
        trick: true,
        choices: [
          { id: "a", label: "True" },
          { id: "b", label: "False", correct: true }
        ],
        explanation:
          "Utility and community are usually the real drivers."
      },
      {
        id: "q3",
        prompt: "Are royalties always guaranteed?",
        choices: [
          { id: "a", label: "Yes, always." },
          { id: "b", label: "No, it depends on the marketplace.", correct: true },
          { id: "c", label: "Only on weekends." }
        ],
        explanation:
          "Royalty enforcement varies by marketplace and standards."
      },
      {
        id: "q4",
        prompt: "What does an NFT prove?",
        choices: [
          { id: "a", label: "Ownership of a unique digital asset.", correct: true },
          { id: "b", label: "Guaranteed profit." },
          { id: "c", label: "Anonymous identity." }
        ],
        explanation:
          "An NFT is a proof of ownership on-chain."
      }
    ]
  },
  {
    slug: "risk-management",
    track: "advanced",
    title: "Manage your risk",
    summary: "Stay lucid and build a long-term plan.",
    duration: "6 min",
    steps: [
      "Always define a maximum budget.",
      "Avoid FOMO by sticking to your plan.",
      "Separate long term and short term.",
      "Don't put everything into one asset.",
      "Keeping a simple journal helps you improve."
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is a good reflex to limit mistakes?",
        choices: [
          { id: "a", label: "Invest urgently." },
          { id: "b", label: "Keep a decision journal.", correct: true },
          { id: "c", label: "Change your mind every day." }
        ],
        explanation:
          "A journal helps analyze your decisions and keep a clear view."
      },
      {
        id: "q2",
        prompt: "Setting a maximum budget helps limit risk.",
        kind: "boolean",
        choices: [
          { id: "a", label: "True", correct: true },
          { id: "b", label: "False" }
        ],
        explanation:
          "A max budget keeps exposure under control."
      },
      {
        id: "q3",
        prompt: "What is a basic risk rule?",
        choices: [
          { id: "a", label: "Set a maximum budget.", correct: true },
          { id: "b", label: "Go all in." },
          { id: "c", label: "Ignore your plan." }
        ],
        explanation:
          "Defining a max budget keeps your exposure under control."
      },
      {
        id: "q4",
        prompt: "What should you do when feeling FOMO?",
        choices: [
          { id: "a", label: "Stick to your plan.", correct: true },
          { id: "b", label: "Buy immediately." },
          { id: "c", label: "Leverage more." }
        ],
        explanation:
          "A plan prevents impulsive decisions."
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
