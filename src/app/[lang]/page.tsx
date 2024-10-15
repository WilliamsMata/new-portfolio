import FloatingDockComponent from "@/components/common/FloatingDockComponent";
import Header from "@/components/common/Header";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { About } from "@/components/views/About";
import { Contact } from "@/components/views/Contact";
import { Hero } from "@/components/views/Hero";
import { Projects } from "@/components/views/Projects";
import { Skills } from "@/components/views/Skills";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/i18n-config";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden font-[family-name:var(--font-geist-sans)]">
      <Header dictionary={dictionary.header} />

      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Hero dictionary={dictionary.hero} />

        <TracingBeam>
          <div className="flex flex-col gap-12">
            <About dictionary={dictionary.about} />

            <Skills dictionary={dictionary.skills} />

            <Projects dictionary={dictionary.projects} />

            <Contact />
          </div>
        </TracingBeam>
      </main>

      <FloatingDockComponent />
    </div>
  );
}
