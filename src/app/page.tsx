import FloatingDockComponent from "@/components/common/FloatingDockComponent";
import Header from "@/components/common/Header";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Hero } from "@/components/views/Hero";
import { Skills } from "@/components/views/Skills";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Hero />

        <TracingBeam>
          <Skills />
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
