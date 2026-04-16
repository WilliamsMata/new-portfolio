import type { ReactNode } from "react";
import { FloatingDock } from "../ui/floating-dock";
import {
  GitHubLogoIcon,
  HomeIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { TelegramIcon } from "../icons";
import { dockProfileLinks, type ProfileLinkKind } from "@/lib/profile-links";

const iconByKind: Record<Exclude<ProfileLinkKind, "resume">, ReactNode> = {
  github: <GitHubLogoIcon className="h-full w-full text-foreground" />,
  instagram: <InstagramLogoIcon className="h-full w-full text-foreground" />,
  linkedin: <LinkedInLogoIcon className="h-full w-full text-foreground" />,
  telegram: <TelegramIcon className="h-full w-full text-foreground" />,
};

const links = [
  {
    title: "Home",
    icon: <HomeIcon className="h-full w-full text-foreground" />,
    href: "#",
  },
  ...dockProfileLinks.map((link) => ({
    title: link.label,
    icon: iconByKind[link.kind],
    href: link.href,
  })),
];

const FloatingDockComponent = () => {
  return (
    <FloatingDock
      mobileClassName="fixed bottom-4 right-4 z-[998] sm:bottom-6 sm:right-6"
      desktopClassName="fixed bottom-8 right-8 z-[998]"
      items={links}
    />
  );
};

export default FloatingDockComponent;
