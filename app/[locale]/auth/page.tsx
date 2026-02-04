import { getTranslations, setRequestLocale } from "next-intl/server";
import AuthForm from "@/components/AuthForm";
import TopNav from "@/components/TopNav";

export default async function AuthPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <main>
      <TopNav />
      <div className="mx-auto w-[92%] max-w-6xl pb-20 pt-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-sand-400">
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-4xl text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="text-lg text-sand-300">{t("desc")}</p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-sand-300">
            {t("privacy")}
          </div>
        </div>
        <AuthForm />
        </div>
      </div>
    </main>
  );
}
