import FloatingDockComponent from "@/components/common/FloatingDockComponent";
import Header from "@/components/common/Header";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Hero } from "@/components/views/Hero";
import { Projects } from "@/components/views/Projects";
import { Skills } from "@/components/views/Skills";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Hero />

        <TracingBeam>
          <div className="flex flex-col md:gap-0">
            <Skills />

            <Projects />
          </div>
        </TracingBeam>
      </main>

      <FloatingDockComponent />
    </div>
  );
}
