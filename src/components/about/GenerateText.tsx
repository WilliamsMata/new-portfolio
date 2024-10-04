"use client";

import { useState } from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const text1 =
  "I am a full-stack developer specialized in creating integrated web and mobile applications that deliver optimized and efficient user experiences. With over 2 years of experience in software development, I have worked both on independent projects and in multidisciplinary teams. My approach ranges from conceiving intuitive interfaces on the frontend to implementing robust and scalable architectures on the backend. ";

const text2 =
  "I have a deep interest in emerging technologies and always seek to improve my skills through new challenges and continuous learning. My goal is to create innovative technological solutions that not only meet business requirements but exceed user expectations.";

export const GenerateText = () => {
  const [isFirstTextFinished, setIsFirstTextFinished] =
    useState<boolean>(false);

  return (
    <div className="mx-8 flex flex-col items-center justify-center gap-4 md:gap-12">
      <TextGenerateEffect
        words={text1}
        className="text-center text-lg md:text-2xl"
        onFinish={() => setIsFirstTextFinished(true)}
      />

      <TextGenerateEffect
        className="text-center text-lg md:text-2xl"
        words={isFirstTextFinished ? text2 : ""}
      />
    </div>
  );
};
