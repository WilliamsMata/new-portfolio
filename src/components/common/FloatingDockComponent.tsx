import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import {
  GitHubLogoIcon,
  HomeIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

const links = [
  {
    title: "Home",
    icon: (
      <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "Twitter",
    icon: (
      <TwitterLogoIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "GitHub",
    icon: (
      <GitHubLogoIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
];

const FloatingDockComponent = () => {
  return (
    <FloatingDock
      mobileClassName="fixed bottom-8 right-8"
      desktopClassName="fixed bottom-8 right-8"
      items={links}
    />
  );
};

export default FloatingDockComponent;
