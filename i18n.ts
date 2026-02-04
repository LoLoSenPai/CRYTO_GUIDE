import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "./i18n.config";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locales.includes(locale as any)
    ? (locale as string)
    : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
