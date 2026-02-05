"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import LocaleSwitch from "@/components/LocaleSwitch";
import { useSession } from "@/lib/useSession";
import { useState } from "react";
import Image from "next/image";

export default function TopNav() {
  const t = useTranslations("nav");
  const { user, loading } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const avatarLabel =
    user?.name?.trim()?.[0]?.toUpperCase() ??
    user?.email?.trim()?.[0]?.toUpperCase() ??
    "U";

  return (
    <header className="glass sticky top-0 z-20 mx-auto mt-6 flex w-[92%] max-w-6xl items-center justify-between rounded-full px-6 shadow-glow">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
        <div>
          <p className="font-display text-sm uppercase tracking-[0.2em] text-sand-300">
            {t("brand")}
          </p>
          <p className="text-xs text-sand-400">{t("tagline")}</p>
        </div>
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-sand-300 md:flex">
        <Link className="transition hover:text-white" href="/tracks">
          {t("tracks")}
        </Link>
        <Link className="transition hover:text-white" href="/profile">
          {t("profile")}
        </Link>
        <Link className="transition hover:text-white" href="/resources">
          {t("tools")}
        </Link>
        <Link className="transition hover:text-white" href="/about">
          {t("manifesto")}
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <LocaleSwitch />
        {loading ? (
          <>
            <div className="hidden h-8 w-24 rounded-full border border-white/10 bg-white/5 md:block" />
            <div className="h-8 w-20 rounded-full bg-teal-400/40" />
          </>
        ) : user ? (
          <>
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sand-200 transition hover:border-teal-400/60"
              >
                {user.image && !imageFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name ?? "Avatar"}
                    className="h-6 w-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-400/20 text-teal-200">
                    {avatarLabel}
                  </span>
                )}
                <span className="max-w-[140px] truncate">
                  {user.name ?? user.email ?? t("signedIn")}
                </span>
              </button>
              {menuOpen ? (
                <div className="glass absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 p-2 text-xs text-sand-200 shadow-glow">
                  <div className="px-3 py-2 text-[11px] text-sand-400">
                    {user.email ?? t("signedIn")}
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2 transition hover:bg-white/5"
                  >
                    {t("account")}
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2 transition hover:bg-white/5"
                  >
                    {t("profile")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      fetch("/api/auth/sign-out", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({})
                      }).then(() => window.location.reload());
                    }}
                    className="mt-1 block w-full rounded-xl px-3 py-2 text-left text-sand-200 transition hover:bg-white/5"
                  >
                    {t("signOut")}
                  </button>
                </div>
              ) : null}
            </div>
            <Link
              href="/tracks"
              className="rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-night-900 shadow-glow transition hover:translate-y-[-1px]"
            >
              {t("cta")}
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-teal-400/60"
            >
              {t("authCta")}
            </Link>
            <Link
              href="/tracks"
              className="rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-night-900 shadow-glow transition hover:translate-y-[-1px]"
            >
              {t("cta")}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
