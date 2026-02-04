"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const stats = t.raw("stats") as { label: string; value: string }[];
  const previewList = t.raw("previewList") as string[];

  return (
    <section className="mx-auto mt-16 grid w-[92%] max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-sand-300">
          {t("pill")}
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight text-sand-200 md:text-6xl">
          {t("title")}
          <span className="text-teal-300"> {t("titleEmph")}</span>
        </h1>
        <p className="text-lg text-sand-300">{t("desc")}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tracks"
            className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-night-900 shadow-glow"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-sand-200"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-sand-400">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-semibold text-sand-300">{stat.label}</p>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="glass relative overflow-hidden rounded-3xl p-6 shadow-glow">
        <div className="absolute -right-10 top-8 h-48 w-48 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute -left-10 bottom-4 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
              {t("preview")}
            </p>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-sand-300">
              {t("track")}
            </span>
          </div>
          <h2 className="font-display text-2xl text-sand-200">
            {t("courseTitle")}
          </h2>
          <div className="space-y-4">
            {previewList.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm text-sand-200">{item}</p>
                  <p className="text-xs text-sand-400">{t("moduleHint")}</p>
                </div>
                <div className="h-8 w-8 rounded-full border border-teal-400/50 bg-teal-400/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}