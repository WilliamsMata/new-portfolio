import Header from "@/components/common/Header";
import { FlipWords } from "@/components/ui/flip-words";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TracingBeam } from "@/components/ui/tracing-beam";

const words = ["beautiful", "fast", "responsive", "accessible"];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <HeroHighlight containerClassName="h-screen">
          <div className="flex items-center justify-center px-4">
            <div className="mx-auto text-4xl font-normal text-neutral-600 dark:text-neutral-400">
              Build
              <FlipWords words={words} /> <br />
              websites with Aceternity UI
            </div>
          </div>
        </HeroHighlight>
        <TracingBeam>
          <div>
            <HoverBorderGradient>Hola mundo</HoverBorderGradient>
            <div className="h-[5000px]"></div>
          </div>
        </TracingBeam>
      </main>
    </div>
  );
}
