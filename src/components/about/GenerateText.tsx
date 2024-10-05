import { TextGenerateEffect } from "../ui/text-generate-effect";

const text1 =
  "I am a full-stack developer specialized in creating integrated web and mobile applications that deliver optimized and efficient user experiences. With over 2 years of experience in software development, I have worked both on independent projects and in multidisciplinary teams. My approach ranges from conceiving intuitive interfaces on the frontend to implementing robust and scalable architectures on the backend. \n I have a deep interest in emerging technologies and always seek to improve my skills through new challenges and continuous learning. My goal is to create innovative technological solutions that not only meet business requirements but exceed user expectations.";

export const GenerateText = () => {
  return (
    <div className="mx-8 flex flex-col items-center justify-center gap-4">
      <TextGenerateEffect
        words={text1}
        className="text-center text-lg font-normal md:text-2xl"
        stagerDuration={0.15}
      />
    </div>
  );
};
