import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/i18n-config";
import { useMemo } from "react";

export const useLocale = () => {
  const pathname = usePathname();

  const router = useRouter();

  const locale: Locale = useMemo(
    () => (pathname?.split("/")[1] === "es" ? "es" : "en"),
    [pathname],
  );

  const setLocale = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    const newSegment = segments.join("/");
    router.replace(newSegment);
  };

  return {
    locale,
    setLocale,
  };
};
