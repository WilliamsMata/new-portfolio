"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Toaster } from "@/adapter/sonner.adapter";
import type { Dictionary } from "@/i18n/getDictionary";

interface ContactFormProps {
  dictionary: Dictionary["contact"]["form"];
}

export default function ContactForm({ dictionary }: ContactFormProps) {
  const [disableByLimit, setDisableByLimit] = useState(false);

  const { button: dictionaryButton, form: dictionaryForm, action } = dictionary;

  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const buttonMessage = form.formState.isSubmitting
    ? dictionaryButton.sending
    : disableByLimit
      ? dictionaryButton.limitReached
      : form.formState.isSubmitSuccessful
        ? dictionaryButton.submitted
        : dictionaryButton.submit;

  async function onSubmit(values: z.infer<typeof sendMessageSchema>) {
    const { error, getLimit } = await sendMessage(values);

    if (!error) {
      Toaster.success(dictionaryButton.submitted);
      return form.reset();
    }

    if (getLimit) {
      Toaster.error(action.errors.limitReached);
      setDisableByLimit(true);
      setTimeout(() => setDisableByLimit(false), 1000 * 60 * 5);
      return;
    }

    Toaster.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{dictionaryForm.name.label}</FormLabel>
              <FormControl>
                <motion.div
                  animate={
                    fieldState.invalid ? { x: [-10, 10, -10, 10, 0] } : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Input
                    placeholder={dictionaryForm.name.placeholder}
                    {...field}
                  />
                </motion.div>
              </FormControl>
              {fieldState.error && (
                <FormMessage>
                  {
                    dictionaryForm.name.errors[
                      fieldState.error.type === "too_small"
                        ? "tooSmall"
                        : "tooBig"
                    ]
                  }
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{dictionaryForm.email.label}</FormLabel>
              <FormControl>
                <motion.div
                  animate={
                    fieldState.invalid ? { x: [-10, 10, -10, 10, 0] } : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Input
                    placeholder={dictionaryForm.email.placeholder}
                    {...field}
                  />
                </motion.div>
              </FormControl>
              {fieldState.error && (
                <FormMessage>{dictionaryForm.email.errors.invalid}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{dictionaryForm.message.label}</FormLabel>
              <FormControl>
                <motion.div
                  animate={
                    fieldState.invalid ? { x: [-10, 10, -10, 10, 0] } : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Textarea
                    placeholder={dictionaryForm.message.placeholder}
                    {...field}
                  />
                </motion.div>
              </FormControl>
              {fieldState.error && (
                <FormMessage>
                  {
                    dictionaryForm.message.errors[
                      fieldState.error.type === "too_small"
                        ? "tooSmall"
                        : "tooBig"
                    ]
                  }
                </FormMessage>
              )}
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
