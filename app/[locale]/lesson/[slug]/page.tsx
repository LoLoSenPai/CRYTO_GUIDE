import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Quiz from "@/components/Quiz";
import { getLesson, getLessonsByTrack } from "@/lib/content";
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
  const trackLessons = getLessonsByTrack(locale as Locale, lesson.track);
  const currentIndex = trackLessons.findIndex(
    (item) => item.slug === lesson.slug
  );
  const nextLesson =
    currentIndex >= 0 && currentIndex < trackLessons.length - 1
      ? trackLessons[currentIndex + 1]
      : null;

  return (
    <main>
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
        {lesson.learnSections?.length ? (
          <div className="mt-8 space-y-6">
            {lesson.learnSections.map((section, index) => (
              <article key={section.id} className="glass rounded-3xl p-6 shadow-glow">
                <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
                  {t("step")} {index + 1}
                </p>
                <h2 className="mt-2 font-display text-2xl text-sand-200">
                  {section.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-sand-200">
                  {section.body}
                </p>
                {!!section.bullets?.length && (
                  <ul className="mt-4 space-y-2 text-sm text-sand-300">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.media && (
                  <figure className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-night-900/60">
                    <div className="relative">
                    <img
                      src={section.media.src}
                      alt={section.media.alt}
                      className="h-56 w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-950/70 via-night-950/10 to-transparent" />
                    </div>
                    {section.media.caption && (
                      <figcaption className="border-t border-white/10 bg-night-950/40 px-4 py-3 text-xs text-sand-300">
                        {section.media.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {section.note && (
                  <div className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
                      {t("noteLabel")}
                    </p>
                    <p className="mt-2 text-sm text-amber-100">{section.note}</p>
                  </div>
                )}
              </article>
            ))}
            {lesson.cheatsheet && (
              <aside className="glass rounded-3xl border border-teal-300/30 bg-teal-400/10 p-6 shadow-glow">
                <h3 className="font-display text-2xl text-sand-100">
                  {lesson.cheatsheet.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-sand-100">
                  {lesson.cheatsheet.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sand-100" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        ) : (
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
        )}

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
          <Quiz
            lessonSlug={lesson.slug}
            questions={lesson.quiz}
            trackHref={`/track/${lesson.track}`}
            nextLesson={
              nextLesson
                ? {
                    title: nextLesson.title,
                    href: `/lesson/${nextLesson.slug}`
                  }
                : null
            }
          />
        </div>
      </section>
    </main>
  );
}
