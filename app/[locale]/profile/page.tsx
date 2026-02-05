import { getTranslations, setRequestLocale } from "next-intl/server";
import ProfileClient from "@/components/ProfileClient";
import ProfileShareControls from "@/components/ProfileShareControls";
import { getLessons } from "@/lib/content";
import { getServerSession } from "@/lib/auth-server";
import type { Locale } from "@/i18n.config";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfilePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const session = await getServerSession();
  if (!session?.user) {
    redirect(`/${locale}/auth`);
  }
  const t = await getTranslations({ locale, namespace: "profile" });
  const lessons = getLessons(locale as Locale);

  return (
    <main>
      <section className="mx-auto mt-16 w-[92%] max-w-6xl">
        <h1 className="font-display text-3xl text-sand-200">{t("title")}</h1>
        <p className="mt-2 text-sand-300">{t("desc")}</p>
        <div className="mt-6">
          <ProfileShareControls />
        </div>
        <ProfileClient lessons={lessons} />
      </section>
    </main>
  );
}
