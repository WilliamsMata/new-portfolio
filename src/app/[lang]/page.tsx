import { TracingBeam } from "@/components/ui/tracing-beam";
import { About } from "@/components/views/About";
import { Contact } from "@/components/views/Contact";
import { Hero } from "@/components/views/Hero";
import { Projects } from "@/components/views/Projects";
import { Skills } from "@/components/views/Skills";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/i18n-config";

type Params = Promise<{ lang: Locale }>;

export default async function Home({ params }: { params: Params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center gap-8">
      <Hero dictionary={dictionary.hero} />

      <TracingBeam>
        <div className="flex flex-col gap-12">
          <About dictionary={dictionary.about} />

          <Skills dictionary={dictionary.skills} />

          <Projects dictionary={dictionary.projects} />

          <Contact dictionary={dictionary.contact} />
        </div>
      </TracingBeam>
    </main>
  );
}
