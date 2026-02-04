import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import TopNav from "@/components/TopNav";
import { getServerSession, getUserAccounts } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export default async function AccountPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getServerSession();
  if (!session?.user) {
    redirect(`/${locale}/auth`);
  }

  const t = await getTranslations({ locale, namespace: "account" });
  const user = session.user;
  const accounts = await getUserAccounts();
  const providers = accounts
    .map((account) => account.providerId)
    .filter(Boolean) as string[];
  const providerLabel = providers.length
    ? providers
        .map((provider) => {
          if (provider === "google") return "Google";
          if (provider === "email" || provider === "magic-link") return "Email";
          return provider;
        })
        .join(", ")
    : t("providerUnknown");

  return (
    <main>
      <TopNav />
      <section className="mx-auto mt-16 w-[92%] max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-sand-400">
          {t("eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl text-sand-200">
          {t("title")}
        </h1>
        <p className="mt-2 text-sand-300">{t("desc")}</p>

        <div className="glass mt-8 rounded-3xl border border-white/10 p-6 shadow-glow">
          <div className="flex items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name ?? "Avatar"}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-400/20 text-teal-200">
                {user.name?.trim()?.[0]?.toUpperCase() ??
                  user.email?.trim()?.[0]?.toUpperCase() ??
                  "U"}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-sand-200">
                {user.name ?? t("anonymous")}
              </p>
              <p className="text-sm text-sand-400">{user.email ?? t("noEmail")}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-sand-300">
              <span className="text-xs uppercase tracking-[0.2em] text-sand-400">
                {t("provider")}
              </span>
              <p className="mt-2 text-sand-200">{providerLabel}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-sand-300">
              <span className="text-xs uppercase tracking-[0.2em] text-sand-400">
                {t("status")}
              </span>
              <p className="mt-2 text-sand-200">{t("statusValue")}</p>
            </div>
          </div>

          <form
            action="/api/auth/sign-out"
            method="POST"
            className="mt-6"
          >
            <button
              type="submit"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-400/60"
            >
              {t("signOut")}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
