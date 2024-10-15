import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/i18n-config";

export const useLocale = () => {
  const pathname = usePathname();

  const router = useRouter();

  const setLocale = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    const newSegment = segments.join("/");
    router.replace(newSegment);
  };

  return {
    locale: pathname?.split("/")[1] as Locale,
    setLocale,
  };
};
