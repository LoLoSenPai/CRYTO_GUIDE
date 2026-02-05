import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const OUT_DIR = path.resolve("public", "previews");
const PREVIEW_WIDTH = 1100;
const PREVIEW_HEIGHT = 650;
const CLIP_WIDTH = 900;
const CLIP_HEIGHT = 520;
const WEBP_QUALITY = 62;

const targets = [
  { id: "phantom", url: "https://phantom.app" },
  { id: "solflare", url: "https://solflare.com" },
  { id: "backpack", url: "https://backpack.app" },
  { id: "binance", url: "https://www.binance.com" },
  { id: "coinbase", url: "https://www.coinbase.com" },
  { id: "kraken", url: "https://www.kraken.com" },
  { id: "jupiter", url: "https://jup.ag" },
  { id: "raydium", url: "https://raydium.io" },
  { id: "solana-explorer", url: "https://explorer.solana.com" }
];

const ensureDir = async () => {
  await fs.mkdir(OUT_DIR, { recursive: true });
};

const dismissCommonBanners = async (page) => {
  const candidates = [
    "button:has-text('Accept')",
    "button:has-text('I agree')",
    "button:has-text('Agree')",
    "button:has-text('Tout accepter')",
    "button:has-text('J’accepte')",
    "button:has-text('J'accepte')",
    "button:has-text('Accepter')",
    "button:has-text('OK')"
  ];
  for (const selector of candidates) {
    try {
      const button = page.locator(selector).first();
      if (await button.isVisible({ timeout: 1000 })) {
        await button.click({ timeout: 1000 });
        break;
      }
    } catch {}
  }
};

const screenshotPage = async (page, target) => {
  try {
    await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 45000 });
  } catch {
    // Continue with whatever is loaded.
  }
  await page.waitForTimeout(1500);
  await dismissCommonBanners(page);
  await page.waitForTimeout(500);

  const clipX = Math.max(0, (PREVIEW_WIDTH - CLIP_WIDTH) / 2);
  const clipY = Math.max(0, (PREVIEW_HEIGHT - CLIP_HEIGHT) / 2);

  const tempPng = path.join(OUT_DIR, `${target.id}.png`);
  const outputPath = path.join(OUT_DIR, `${target.id}.webp`);
  await page.screenshot({
    path: tempPng,
    type: "png",
    clip: {
      x: clipX,
      y: clipY,
      width: CLIP_WIDTH,
      height: CLIP_HEIGHT
    }
  });
  await sharp(tempPng)
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);
  await fs.unlink(tempPng);
};

const main = async () => {
  await ensureDir();
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }
  });
  await page.route("**/*", (route) => {
    const type = route.request().resourceType();
    if (["font", "media"].includes(type)) {
      route.abort();
      return;
    }
    route.continue();
  });

  for (const target of targets) {
    console.log(`Capturing ${target.id}...`);
    try {
      const outputPath = path.join(OUT_DIR, `${target.id}.webp`);
      try {
        await fs.access(outputPath);
        console.log(`Skipping ${target.id} (already exists)`);
        continue;
      } catch {}
      await screenshotPage(page, target);
      console.log(`Saved ${target.id}.webp`);
    } catch (error) {
      console.error(`Failed ${target.id}:`, error?.message ?? error);
    }
  }

  await browser.close();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
