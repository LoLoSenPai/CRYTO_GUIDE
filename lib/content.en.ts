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
