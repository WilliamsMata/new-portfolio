import { GradientText } from "@/components/common/GradientText";
import { ColorSection } from "@/components/resources/ColorSection";
import { LogoSection } from "@/components/resources/LogoSection";
import { Separator } from "@/components/ui/separator";

export default async function ResourcePage() {
  return (
    <main className="container mt-20 flex flex-col items-center justify-center">
      <GradientText as="h1" size="5xl">
        Resources
      </GradientText>

      <Separator className="my-12" />

      <LogoSection />

      <Separator className="my-12" />

      <ColorSection />
    </main>
  );
}
