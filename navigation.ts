import { createNavigation } from "next-intl/navigation";
import { defaultLocale, locales } from "@/i18n.config";

export const { Link, usePathname, useRouter, redirect, getPathname } =
  createNavigation({
    locales,
    defaultLocale
  });
