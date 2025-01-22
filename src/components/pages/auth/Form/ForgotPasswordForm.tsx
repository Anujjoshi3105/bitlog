"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/lib/validators/forgot-password";
import { forgotPassword } from "@/actions/auth/forgotPassword";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<ForgotPasswordFormData>({
    resolver: valibotResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = form;
  const t = useTranslations("Auth");

  const onSubmit = async (values: ForgotPasswordFormData) => {
    try {
      const res = await forgotPassword(values);
      if (res.success) {
        setIsSuccess(true);
        toast.success(t("ForgotPassword.Success.title"), {
          description: t("ForgotPassword.Success.description"),
        });
      } else {
        setError("root", {
          message: t(`ForgotPassword.Error.${res.statusCode}`),
        });
        toast.error(t("ForgotPassword.Error.title"), {
          description: t(`ForgotPassword.Error.${res.statusCode}`),
        });
      }
    } catch {
      setError("root", { message: t("ForgotPassword.Error.default") });
      toast.error(t("ForgotPassword.Error.title"), {
        description: t("ForgotPassword.Error.default"),
      });
    }
  };
  if (isSuccess) {
    return (
      <Alert variant="success" className="max-w-md mx-auto space-x-4">
        <CheckCircle className="h-5 w-5" />
        <AlertTitle className="font-semibold">
          {t("ForgotPassword.Success.title")}
        </AlertTitle>
        <AlertDescription className="mt-2">
          {t("ForgotPassword.Success.description")}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Email.label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("Email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              {t("ForgotPassword.btn.loading")}
            </>
          ) : (
            <>
              {t("ForgotPassword.btn.label")}
              <ArrowRight />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
