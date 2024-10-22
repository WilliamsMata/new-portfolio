import type { FC } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { FileIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { FlipWords } from "../ui/flip-words";
import { GradientText } from "../common/GradientText";

const words = ["Frontend", "Backend", "Mobile"];

interface HeroProps {
  dictionary: Dictionary["hero"];
}

export const Hero: FC<HeroProps> = ({ dictionary }) => {
  const { title, description, resume } = dictionary;

  return (
    <HeroHighlight containerClassName="h-screen">
      <section className="flex flex-col items-center justify-center px-4">
        <GradientText as="h1" size="4xl" className="sm:text-5xl md:text-6xl">
          Williams Mata R
        </GradientText>

        <div className="inset-x-06 via-blue top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent to-transparent blur-sm" />
        <div className="inset-x-06 via-blue top-0 h-px w-3/4 bg-gradient-to-r from-transparent to-transparent" />
        <div className="via-cyan inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent to-transparent blur-sm" />
        <div className="via-cyan inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent to-transparent" />

        <div
          className={cn(
            "flex items-center text-3xl sm:text-5xl md:text-6xl",
            title.developer === "Desarrollador" && "flex-row-reverse",
          )}
        >
          <FlipWords words={words} duration={1500} />
          <span>{title.developer}</span>
        </div>

        <div className="mt-4 max-w-[30rem] text-center">
          <p className="text-base md:text-lg lg:text-xl">
            {description.first} <Highlight>{description.highlight}</Highlight>{" "}
            {description.second}
          </p>
        </div>

        <div className="mt-4">
          <a
            href={resume.path}
            className="relative block p-[3px]"
            target="_blank"
          >
            <div className="from-blue to-purple absolute inset-0 rounded-lg bg-gradient-to-r" />
            <span className="group relative flex items-center rounded-[6px] bg-background px-8 py-2 text-base transition duration-200 hover:bg-transparent">
              {resume.title}
              <FileIcon className="ml-2 h-5 w-5" />
            </span>
          </a>
        </div>
      </section>
    </HeroHighlight>
  );
};
