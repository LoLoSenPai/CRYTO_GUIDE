import { Resend } from "resend";

type MagicLinkPayload = {
  email: string;
  url: string;
};

export async function sendMagicLinkEmail({
  email,
  url
}: MagicLinkPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  await resend.emails.send({
    from,
    to: email,
    subject: "Your Crypto Guide sign-in link",
    html: `<p>Click this link to sign in:</p><p><a href="${url}">${url}</a></p>`
  });
}
