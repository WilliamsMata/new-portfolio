import { GradientText } from "@/components/common/GradientText";
import { LogoSection } from "@/components/resources/LogoSection";

export default async function ResourcePage() {
  return (
    <main className="container mt-20 flex flex-col items-center justify-center">
      <GradientText as="h1" size="5xl">
        Resources
      </GradientText>

      <LogoSection />
    </main>
  );
}
