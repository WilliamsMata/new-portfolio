import ContactForm from "../contact/ContactForm";
import { BackgroundGradient } from "../ui/background-gradient";

export const Contact = () => {
  return (
    <section className="flex flex-col items-center px-8">
      <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        Contact
      </h2>

      <BackgroundGradient
        className="flex w-full flex-col gap-4 rounded-3xl bg-background p-8"
        containerClassName="w-full max-w-96"
      >
        <h2 className="text-3xl font-bold">Get in Touch</h2>

        <p className="text-sm text-muted-foreground">
          Send me a message and I&apos;ll get back to you as soon as possible.
        </p>

        <ContactForm />
      </BackgroundGradient>
    </section>
  );
};
