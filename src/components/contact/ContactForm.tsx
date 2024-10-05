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

export default function ContactForm() {
  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof sendMessageSchema>) {
    const { errors } = await sendMessage(values);

    if (errors) {
      console.log(errors);
      return;
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
          onClick={() => {
            form.clearErrors();
          }}
        >
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
