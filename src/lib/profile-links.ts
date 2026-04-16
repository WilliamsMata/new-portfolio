import type { Locale } from "@/i18n/i18n-config";

export type ProfileLinkKind =
  | "github"
  | "linkedin"
  | "telegram"
  | "instagram"
  | "resume";

export interface ProfileLink {
  kind: ProfileLinkKind;
  label: string;
  href: string;
}

export type DockProfileLink = Omit<ProfileLink, "kind"> & {
  kind: Exclude<ProfileLinkKind, "resume">;
};

export const dockProfileLinks: ReadonlyArray<DockProfileLink> = [
  {
    kind: "github",
    label: "GitHub",
    href: "https://github.com/WilliamsMata",
  },
  {
    kind: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/williams-mata",
  },
  {
    kind: "telegram",
    label: "Telegram",
    href: "https://t.me/williams_rm",
  },
  {
    kind: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/williams_rm/",
  },
];

export function getProfileLinks(locale: Locale): Array<ProfileLink> {
  return [
    ...dockProfileLinks,
    {
      kind: "resume",
      label: locale === "es" ? "Curriculum" : "Resume",
      href: locale === "es" ? "/files/curriculum.pdf" : "/files/resume.pdf",
    },
  ];
}
