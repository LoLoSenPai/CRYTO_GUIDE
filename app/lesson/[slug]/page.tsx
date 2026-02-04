import { redirect } from "next/navigation";

export default async function LessonRedirect({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/fr/lesson/${slug}`);
}
