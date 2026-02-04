import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TopNav from "@/components/TopNav";
import Quiz from "@/components/Quiz";
import { getLesson } from "@/lib/content";
import type { Locale } from "@/i18n.config";

export default async function LessonPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "lesson" });
  const lesson = getLesson(locale as Locale, slug);
  if (!lesson) {
    notFound();
  }

  return (
    <main>
      <TopNav />
      <section className="mx-auto mt-14 w-[92%] max-w-4xl">
        <Link
          href={`/track/${lesson.track}`}
          className="text-xs uppercase tracking-[0.3em] text-sand-400"
        >
          {t("back")}
        </Link>
        <h1 className="mt-4 font-display text-3xl text-sand-200">
          {lesson.title}
        </h1>
        <p className="mt-2 text-sand-300">{lesson.summary}</p>
        <div className="mt-8 space-y-4">
          {lesson.steps.map((step, index) => (
            <div key={step} className="glass rounded-2xl p-4 shadow-glow">
              <p className="text-xs uppercase tracking-[0.2em] text-sand-400">
                {t("step")} {index + 1}
              </p>
              <p className="mt-2 text-sm text-sand-200">{step}</p>
            </div>
          ))}
        </div>

        {lesson.mission && (
          <div className="glass mt-8 rounded-3xl p-5 shadow-glow">
            <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
              {t("mission")}
            </p>
            <h3 className="mt-2 font-display text-xl text-sand-200">
              {lesson.mission.title}
            </h3>
            <p className="mt-2 text-sm text-sand-300">
              {lesson.mission.description}
            </p>
            <a
              href={lesson.mission.ctaHref}
              className="mt-4 inline-flex rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-night-900"
            >
              {lesson.mission.ctaLabel}
            </a>
            {lesson.mission.disclaimer && (
              <p className="mt-3 text-xs text-sand-400">
                {lesson.mission.disclaimer}
              </p>
            )}
          </div>
        )}

        <div className="mt-10">
          <Quiz lessonSlug={lesson.slug} questions={lesson.quiz} />
        </div>
      </section>
    </main>
  );
}
