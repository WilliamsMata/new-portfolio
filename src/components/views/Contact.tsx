import type { FC } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import ContactForm from "../contact/ContactForm";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { BackgroundGradient } from "../ui/background-gradient";
import { GradientText } from "../common/GradientText";

interface ContactProps {
  dictionary: Dictionary["contact"];
}

export const Contact: FC<ContactProps> = ({ dictionary }) => {
  const { title, card, form } = dictionary;
  return (
    <section className="flex flex-col items-center">
      <BackgroundBeamsWithCollision>
        <GradientText as="h2" size="4xl" className="mb-12">
          {title}
        </GradientText>

        <div className="mx-4">
          <BackgroundGradient
            className="flex w-full flex-col gap-4 rounded-3xl bg-background p-8"
            containerClassName="w-full max-w-96"
          >
            <h2 className="text-3xl font-bold">{card.title}</h2>

            <p className="text-sm text-muted-foreground">{card.description}</p>

            <ContactForm dictionary={form} />
          </BackgroundGradient>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
};
