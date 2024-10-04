import { GenerateText } from "../about/GenerateText";

export const About = () => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        About Me
      </h2>

      <GenerateText />
    </section>
  );
};
