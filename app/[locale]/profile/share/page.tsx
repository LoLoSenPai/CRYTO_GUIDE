import { Link } from "@/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TopNav from "@/components/TopNav";
import { getBadges } from "@/lib/gamification";
import { getServerSession } from "@/lib/auth-server";
import type { Locale } from "@/i18n.config";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const parseNumber = (value: string | undefined, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default async function SharePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getServerSession();
  if (!session?.user) {
    redirect(`/${locale}/auth`);
  }
  const t = await getTranslations({ locale, namespace: "share" });
  const tp = await getTranslations({ locale, namespace: "profile" });
  const badges = getBadges(locale as Locale);
  const query = await searchParams;
  const name = typeof query.name === "string" ? query.name : t("anonymous");
  const xp = parseNumber(typeof query.xp === "string" ? query.xp : undefined);
  const level = parseNumber(
    typeof query.level === "string" ? query.level : undefined,
    1
  );
  const streak = parseNumber(
    typeof query.streak === "string" ? query.streak : undefined
  );
  const lessons = parseNumber(
    typeof query.lessons === "string" ? query.lessons : undefined
  );
  const badgeIds =
    typeof query.badges === "string"
      ? query.badges.split(",").filter(Boolean)
      : [];
  const badgeList = badges.filter((badge) => badgeIds.includes(badge.id));

  return (
    <main>
      <TopNav />
      <section className="mx-auto mt-16 w-[92%] max-w-4xl">
        <div className="signature-card rounded-[28px] p-[1px]">
          <div className="signature-inner rounded-[26px] px-6 py-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-sand-400">
                  {t("title")}
                </p>
                <h1 className="mt-2 font-display text-3xl text-sand-200">
                  {name}
                </h1>
                <p className="mt-2 text-sm text-sand-300">{t("desc")}</p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-sand-300">
                Crypto Guide
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                { label: tp("stats.level"), value: level },
                { label: tp("stats.xp"), value: xp },
                { label: tp("stats.streak"), value: streak },
                { label: tp("stats.lessons"), value: lessons }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-xs text-sand-400">{stat.label}</p>
                  <p className="text-xl font-semibold text-sand-200">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-sand-400">
              {t("highlight")} {badgeList.length ? badgeList[0].title : t("noBadge")}
            </div>
          </div>
        </div>

        <div className="mt-8 glass rounded-3xl p-6 shadow-glow">
          <h2 className="font-display text-xl text-sand-200">{tp("badgesTitle")}</h2>
          {badgeList.length === 0 ? (
            <p className="mt-3 text-sm text-sand-400">
              {t("noPublicBadges")}
            </p>
          ) : (
            <div className="mt-4 grid gap-3">
              {badgeList.map((badge) => (
                <div
                  key={badge.id}
                  className="rounded-2xl border border-teal-400/40 bg-teal-400/10 px-4 py-3 text-teal-100"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                    <span>{badge.tier}</span>
                    <span>{tp("badgeUnlocked")}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold">{badge.title}</p>
                  <p className="text-xs opacity-80">{badge.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-sand-400">{t("safe")}</p>
          <Link
            href="/"
            className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-night-900"
          >
            {t("cta")}
          </Link>
        </div>
      </section>
    </main>
  );
}
