"use client";

import { useEffect, useState } from "react";
import LessonCard from "@/components/LessonCard";
import type { Lesson } from "@/lib/content";
import { loadProgress } from "@/lib/progress";

export default function LessonGrid({ lessons }: { lessons: Lesson[] }) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const progress = loadProgress();
    setCompleted(progress.completedLessons);
  }, []);

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.slug}
          lesson={lesson}
          completed={completed.includes(lesson.slug)}
        />
      ))}
    </div>
  );
}
