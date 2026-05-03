import type { FC } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { GradientText } from "../common/GradientText";

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

        <div className="inset-x-06 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-blue to-transparent blur-sm" />
        <div className="inset-x-06 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-blue to-transparent" />
        <div className="inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-cyan to-transparent blur-sm" />
        <div className="inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-cyan to-transparent" />

        <div
          className={cn(
            "flex items-center text-center text-3xl sm:text-5xl md:text-6xl",
            title.developer === "Desarrollador" && "flex-row-reverse",
          )}
        >
          {/* <FlipWords words={words} duration={1500} /> */}
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
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-2",
            )}
          >
            {resume.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
          </a>
        </div>
      </section>
    </HeroHighlight>
  );
};
