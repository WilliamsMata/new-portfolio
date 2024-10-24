import { GradientText } from "@/components/common/GradientText";
import { ColorSection } from "@/components/resources/ColorSection";
import { LogoSection } from "@/components/resources/LogoSection";
import { Separator } from "@/components/ui/separator";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/i18n-config";

export default async function ResourcePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const { title, logos, colors } = dictionary.resources;

  return (
    <main className="container mt-20 flex flex-col items-center justify-center">
      <GradientText as="h1" size="5xl">
        {title}
      </GradientText>

      <Separator className="my-12" />

      <LogoSection dictionary={logos} />

      <Separator className="my-12" />

      <ColorSection dictionary={colors} />
    </main>
  );
}
