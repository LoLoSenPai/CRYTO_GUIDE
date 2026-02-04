"use client";

import { Link, usePathname } from "@/navigation";
import { useLocale } from "next-intl";

export default function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-sand-300">
      <Link
        href={pathname}
        locale="fr"
        className={`rounded-full px-2 py-1 ${
          locale === "fr" ? "bg-white/10 text-white" : "hover:text-white"
        }`}
      >
        FR
      </Link>
      <Link
        href={pathname}
        locale="en"
        className={`rounded-full px-2 py-1 ${
          locale === "en" ? "bg-white/10 text-white" : "hover:text-white"
        }`}
      >
        EN
      </Link>
    </div>
  );
}