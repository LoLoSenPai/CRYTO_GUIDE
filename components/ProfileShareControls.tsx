"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { loadProgress } from "@/lib/progress";

const handleKey = "crypto-guide-handle";

type ShareStats = {
  level: number;
  xp: number;
  streak: number;
  lessons: number;
  badges: number;
};

export default function ProfileShareControls() {
  const t = useTranslations("profile");
  const locale = useLocale();
  const [handle, setHandle] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [tweet, setTweet] = useState("");
  const [stats, setStats] = useState<ShareStats>({
    level: 1,
    xp: 0,
    streak: 0,
    lessons: 0,
    badges: 0
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(handleKey) ?? "";
    setHandle(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const progress = loadProgress();
    const name = handle.trim() || t("anonymous");
    const params = new URLSearchParams({
      name,
      xp: String(progress.xp),
      level: String(progress.level),
      streak: String(progress.streak),
      lessons: String(progress.completedLessons.length),
      badges: progress.badges.join(",")
    });
    const origin = window.location.origin;
    const shareLink = `${origin}/${locale}/profile/share?${params.toString()}`;
    setLink(shareLink);
    const tweetText = t("tweet", {
      level: progress.level,
      lessons: progress.completedLessons.length
    });
    setTweet(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetText
      )}&url=${encodeURIComponent(shareLink)}`
    );
    setStats({
      level: progress.level,
      xp: progress.xp,
      streak: progress.streak,
      lessons: progress.completedLessons.length,
      badges: progress.badges.length
    });
  }, [handle, t]);

  const canShare = useMemo(() => link.length > 0, [link]);

  const handleCopy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleSave = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(handleKey, handle.trim());
    setCopied(false);
  };

  return (
    <div className="glass rounded-3xl p-6 shadow-glow">
      <h3 className="font-display text-xl text-sand-200">{t("shareTitle")}</h3>
      <p className="mt-2 text-sm text-sand-400">{t("shareDesc")}</p>

      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <input
          value={handle}
          onChange={(event) => setHandle(event.target.value)}
          placeholder={t("handlePlaceholder")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-sand-200 outline-none focus:border-teal-400"
        />
        <button
          onClick={handleSave}
          className="rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-night-900"
        >
          {t("save")}
        </button>
      </div>

      <div className="mt-5 signature-card rounded-[22px] p-[1px]">
        <div className="signature-inner rounded-[20px] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-sand-400">
            {t("preview")}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-semibold text-sand-200">
              {handle.trim() || t("anonymous")}
            </p>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-sand-300">
              Crypto Guide
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-sand-300">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              {t("stats.level")} <span className="font-semibold text-sand-200">{stats.level}</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              {t("stats.xp")} <span className="font-semibold text-sand-200">{stats.xp}</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              {t("stats.lessons")} <span className="font-semibold text-sand-200">{stats.lessons}</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              {t("stats.badges")} <span className="font-semibold text-sand-200">{stats.badges}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-sand-300">
        {link || t("linkPending")}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={handleCopy}
          disabled={!canShare}
          className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-night-900"
        >
          {t("copy")}
        </button>
        <a
          href={tweet}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-sand-200"
        >
          {t("shareX")}
        </a>
        {copied && <span className="text-xs text-teal-300">{t("shared")}</span>}
      </div>
    </div>
  );
}
