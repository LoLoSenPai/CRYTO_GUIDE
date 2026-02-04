import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Crypto Guide | Apprendre sans bruit",
  description:
    "Un guide clair et gamifié pour comprendre la crypto, choisir ses outils et progresser en sécurité."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="fixed inset-0 -z-10 grid-overlay opacity-25" />
        {children}
      </body>
    </html>
  );
}
