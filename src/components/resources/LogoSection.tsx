import { LogoList, type Logo } from "./LogoList";

const logos: Logo[] = [
  {
    name: "wm-logo-dark-svg",
    src: "/resources/wm-dark.svg",
    size: "svg",
  },
  {
    name: "wm-logo-light-svg",
    src: "/resources/wm-light.svg",
    size: "svg",
  },
  {
    name: "wm-logo-dark",
    src: "/resources/wm-dark.png",
    size: "1920x1080, png",
  },
  {
    name: "wm-logo-light",
    src: "/resources/wm-light.png",
    size: "1920x1080, png",
  },
  {
    name: "wm-logo-dark-transparent",
    src: "/resources/wm-dark-transparent.png",
    size: "1108x821, png",
  },
  {
    name: "wm-logo-light-transparent",
    src: "/resources/wm-light-transparent.png",
    size: "1108x821, png",
  },
];

export function LogoSection() {
  return (
    <section className="flex flex-col items-center gap-12">
      <h2 className="text-4xl font-semibold">Logos</h2>

      <LogoList logos={logos} />
    </section>
  );
}
