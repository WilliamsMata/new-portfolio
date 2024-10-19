import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import {
  GitHubLogoIcon,
  HomeIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { XIcon } from "../icons/social/XIcon";
import { TelegramIcon } from "../icons";

const links = [
  {
    title: "Home",
    icon: <HomeIcon className="h-full w-full text-foreground" />,
    href: "#",
  },
  {
    title: "GitHub",
    icon: <GitHubLogoIcon className="h-full w-full text-foreground" />,
    href: "https://github.com/WilliamsMata",
  },
  {
    title: "LinkedIn",
    icon: <LinkedInLogoIcon className="h-full w-full text-foreground" />,
    href: "https://www.linkedin.com/in/williams-mata",
  },
  {
    title: "Telegram",
    icon: <TelegramIcon className="h-full w-full text-foreground" />,
    href: "https://t.me/williams_rm",
  },
  {
    title: "Instagram",
    icon: <InstagramLogoIcon className="h-full w-full text-foreground" />,
    href: "https://www.instagram.com/williams_rm/",
  },
  {
    title: "X",
    icon: <XIcon className="h-full w-full text-foreground" />,
    href: "https://x.com/williamsmata99",
  },
];

const FloatingDockComponent = () => {
  return (
    <FloatingDock
      mobileClassName="fixed bottom-8 right-8 z-[998]"
      desktopClassName="fixed bottom-8 right-8 z-[998]"
      items={links}
    />
  );
};

export default FloatingDockComponent;
