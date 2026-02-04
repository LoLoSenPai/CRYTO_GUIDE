"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getAuthClient } from "@/lib/auth-client";
import { useSession } from "@/lib/useSession";

export default function AuthForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const { user, loading } = useSession();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const callbackURL = `/${locale}/profile`;

  const handleMagicLink = () => {
    setStatus(null);
    startTransition(async () => {
      const authClient = getAuthClient();
      const { error } = await authClient.signIn.magicLink({
        email,
        callbackURL
      });
      if (error) {
        setStatus(t("errors.magic"));
        return;
      }
      setStatus(t("sent"));
    });
  };

  const handleGoogle = () => {
    setStatus(null);
    startTransition(async () => {
      const authClient = getAuthClient();
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL
      });
      if (error) {
        setStatus(t("errors.google"));
      }
    });
  };

  const handleSignOut = () => {
    setStatus(null);
    startTransition(async () => {
      await fetch("/api/auth/sign-out", {
        method: "POST",
        credentials: "include"
      });
      window.location.reload();
    });
  };

  if (loading) {
    return (
      <div className="glass rounded-3xl border border-white/10 p-6 text-sm text-sand-300">
        {t("loading")}
      </div>
    );
  }

  if (user) {
    return (
      <div className="glass rounded-3xl border border-white/10 p-6 shadow-glow">
        <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
          {t("signedIn")}
        </p>
        <h2 className="mt-3 font-display text-2xl text-white">
          {user.name ?? user.email ?? t("anonymous")}
        </h2>
        {user.email ? (
          <p className="mt-2 text-sm text-sand-300">{user.email}</p>
        ) : null}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isPending}
          className="mt-6 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-400/60 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("signOut")}
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="glass rounded-3xl border border-white/10 p-6 shadow-glow">
        <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
          {t("magicLabel")}
        </p>
        <h2 className="mt-2 font-display text-2xl text-white">
          {t("magicTitle")}
        </h2>
        <p className="mt-2 text-sm text-sand-300">{t("magicDesc")}</p>
        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("emailPlaceholder")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-sand-500 focus:border-teal-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleMagicLink}
            disabled={!email || isPending}
            className="rounded-2xl bg-teal-400 px-5 py-3 text-sm font-semibold text-night-900 shadow-glow transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t("magicCta")}
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
          {t("socialLabel")}
        </p>
        <h2 className="mt-2 font-display text-2xl text-white">
          {t("socialTitle")}
        </h2>
        <p className="mt-2 text-sm text-sand-300">{t("socialDesc")}</p>
        <button
          type="button"
          onClick={handleGoogle}
          disabled={isPending}
          className="mt-5 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-400/60 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("googleCta")}
        </button>
      </div>

      {status ? (
        <p className="text-sm text-sand-300">{status}</p>
      ) : (
        <p className="text-sm text-sand-400">{t("tip")}</p>
      )}
    </div>
  );
}
