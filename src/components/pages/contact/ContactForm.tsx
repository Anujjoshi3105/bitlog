"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Markdown from "react-markdown";
import { adminMail, userMail } from "@/lib/nodemailer";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ContactFormData, contactSchema } from "@/lib/validators/contact";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ContactForm() {
  const t = useTranslations("Contact");

  const form = useForm<ContactFormData>({
    resolver: valibotResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ContactFormData) => {
    try {
      await userMail("contact", data.email);
      await adminMail(data.email, data.name, data.message);
      toast.success(t("success"));
      reset();
    } catch (error) {
      console.error(error);
      toast.error(t("error"));
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("name.placeholder")}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t("email.placeholder")}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="subject"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("subject.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("subject.placeholder")}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("message.label")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("message.placeholder")}
                  className="min-h-[150px] resize-none"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <Checkbox id="privacy" required />
          <Label htmlFor="privacy" className="text-sm prose">
            <Markdown>{t("privacy")}</Markdown>
          </Label>
        </div>
        <Button
          className="w-full"
          size="lg"
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> {t("btn.loading")}
            </>
          ) : (
            t("btn.label")
          )}
        </Button>
      </form>
    </Form>
  );
}
