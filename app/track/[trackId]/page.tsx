import { redirect } from "next/navigation";

export default async function TrackRedirect({
  params
}: {
  params: Promise<{ trackId: string }>;
}) {
  const { trackId } = await params;
  redirect(`/fr/track/${trackId}`);
}
