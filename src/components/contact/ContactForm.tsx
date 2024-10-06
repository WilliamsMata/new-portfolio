"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendMessageSchema } from "@/schema/send-message.schema";
import { sendMessage } from "@/actions/sendMessage";
import { motion } from "framer-motion";
import { Toaster } from "@/adapter/sonner.adapter";
import { useState } from "react";

export default function ContactForm() {
  const [disableByLimit, setDisableByLimit] = useState(false);

  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const buttonMessage = form.formState.isSubmitting
    ? "Sending..."
    : disableByLimit
      ? "You have reached the limit"
      : form.formState.isSubmitSuccessful
        ? "Message sent successfully"
        : "Send Message";

  async function onSubmit(values: z.infer<typeof sendMessageSchema>) {
    const { errors } = await sendMessage(values);

    if (errors) {
      const error =
        typeof errors === "string"
          ? errors
          : Object.values(errors)
              .flatMap((e) => e)
              .join(", ");

      Toaster.error(error, { position: "bottom-left" });

      if (error.includes("reached the limit")) {
        setDisableByLimit(true);
        setTimeout(
          () => {
            setDisableByLimit(false);
          },
          1000 * 60 * 5,
        );
      }

      return;
    }

    Toaster.success("Message sent successfully", { position: "bottom-left" });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <motion.div
                  animate={
                    fieldState.invalid ? { x: [-10, 10, -10, 10, 0] } : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Input placeholder="John Doe" {...field} />
                </motion.div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <motion.div
                  animate={
                    fieldState.invalid ? { x: [-10, 10, -10, 10, 0] } : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Input placeholder="john@example.com" {...field} />
                </motion.div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Your message</FormLabel>
              <FormControl>
                <motion.div
                  animate={
                    fieldState.invalid ? { x: [-10, 10, -10, 10, 0] } : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Textarea placeholder="Your message here..." {...field} />
                </motion.div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: form.formState.isSubmitting ? 0.95 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Button
            disabled={
              form.formState.isSubmitting ||
              form.formState.isSubmitSuccessful ||
              disableByLimit
            }
            className="w-full"
            type="submit"
            onClick={() => {
              form.clearErrors();
            }}
          >
            {buttonMessage}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
