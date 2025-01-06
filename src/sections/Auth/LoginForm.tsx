"use client";

import { cn } from "@/lib/utils";
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
import { Password } from "@/components/ui/password";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Link, redirect } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import OAuth from "@/components/OAuth";
import Markdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { LoginFormData, loginSchema } from "@/lib/validators/login";
import { loginUser } from "@/actions/auth/login";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const t = useTranslations("Auth");
  const form = useForm<LoginFormData>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      const res = await loginUser(values);

      if (res.success) {
        toast.success(t("Login.Success.title"), {
          description: t("Login.Success.description"),
        });
        form.reset();
        redirect({ href: "/dashboard", locale: "en" });
      } else {
        form.setError("root", { message: t(`Login.Error.${res.statusCode}`) });
        toast.error(t("Login.Error.title"), {
          description: t(`Login.Error.${res.statusCode}`),
        });
      }
    } catch (error) {
      toast.error(t("Login.Error.title"), {
        description: t("Login.Error.default"),
      });
      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <header className="flex flex-col items-center text-center gap-1">
        <h1 className="text-2xl font-bold">{t("Login.title")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("Login.description")}
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>{t("Password.label")}</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs hover:underline">
                    {t("Login.Forgot")}
                  </Link>
                </div>
                <FormControl>
                  <Password
                    placeholder={t("Password.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                {t("Login.btn.loading")}
              </>
            ) : (
              t("Login.btn.label")
            )}
          </Button>
        </form>
      </Form>

      <OAuth />

      <div className="text-center text-sm">
        {t("Login.newAccount")}&nbsp;
        <Link href="/auth/register" className="underline underline-offset-4">
          {t("Register.label")}
        </Link>
      </div>

      <Markdown className="prose text-center text-xs text-muted-foreground">
        {t("privacy")}
      </Markdown>
    </div>
  );
}
