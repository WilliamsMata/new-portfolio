import { GenerateText } from "../about/GenerateText";
import { LampContainer } from "../ui/lamp";

export const About = () => {
  return (
    <section className="flex h-full flex-col items-center">
      <h2 className="z-[100] translate-y-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        About Me
      </h2>

      <LampContainer>
        <GenerateText />
      </LampContainer>
    </section>
  );
};
