import FloatingDockComponent from "@/components/common/FloatingDockComponent";
import Header from "@/components/common/Header";
import { FlipWords } from "@/components/ui/flip-words";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { TracingBeam } from "@/components/ui/tracing-beam";

const words = ["Frontend", "Backend", "Mobile"];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <HeroHighlight containerClassName="h-screen">
          <div className="flex flex-col items-center justify-center px-4 text-4xl sm:text-5xl md:text-6xl">
            <h1 className="">Williams Mata R</h1>

            <div className="inset-x-06 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
            <div className="inset-x-06 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
            <div className="inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

            <div className="flex items-center">
              <FlipWords words={words} duration={1500} />
              <span>Developer</span>
            </div>
          </div>
        </HeroHighlight>
        <TracingBeam>
          <div>
            {/* <HoverBorderGradient>Hola mundo</HoverBorderGradient> */}
            <div className="h-[5000px]"></div>
          </div>
        </TracingBeam>
      </main>

      <FloatingDockComponent />
    </div>
  );
}
