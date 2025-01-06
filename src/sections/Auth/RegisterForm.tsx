"use client";

import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/routing";
import { Password } from "@/components/ui/password";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import OAuth from "@/components/OAuth";
import Markdown from "react-markdown";
import { registerUser } from "@/actions/auth/register";
import { RegisterFormData, registerSchema } from "@/lib/validators/register";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const PASSWORD_RULES = [
  { regex: /.{8,}/, key: "minLength" },
  { regex: /[0-9]/, key: "number" },
  { regex: /[a-z]/, key: "lowercase" },
  { regex: /[A-Z]/, key: "uppercase" },
] as const;

const STRENGTH_COLORS = [
  "bg-border",
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-500",
] as const;

export default function RegisterForm({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const t = useTranslations("Auth");
  const form = useForm<RegisterFormData>({
    resolver: valibotResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });
  const { handleSubmit, control, formState, watch } = form;
  const password = watch("password");
  const strengthScore = PASSWORD_RULES.reduce(
    (score, { regex }) => score + Number(regex.test(password || "")),
    0
  );

  const submit = async (data: RegisterFormData) => {
    const res = await registerUser(data);

    try {
      if (res.success) {
        toast.success(t("Register.Success.title"), {
          description: t("Register.Success.description"),
        });
        form.reset();
        location.href = "/";
      } else {
        form.setError("root", {
          message: t(`Register.Error.${res.statusCode}`),
        });
        toast.error(t("Login.Error.title"), {
          description: t(`Register.Error.${res.statusCode}`),
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
    <div className={cn("flex flex-col gap-48", className)} {...props}>
      <header className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">{t("Register.title")}</h1>
        <p className="text-balance text-xs font-medium text-muted-foreground">
          {t("Register.description")}
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={handleSubmit(submit)}>
          <div className="space-y-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder={t("Name.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Password.label")}</FormLabel>
                  <FormControl>
                    <Password
                      className="pe-9"
                      placeholder={t("Password.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {password && (
              <div>
                <div
                  className="mb-2 h-1 w-full overflow-hidden rounded-full bg-border"
                  role="progressbar"
                  aria-valuenow={strengthScore}
                  aria-valuemin={0}
                  aria-valuemax={4}>
                  <div
                    className={`h-full ${STRENGTH_COLORS[strengthScore]} transition-all duration-500 ease-out`}
                    style={{ width: `${(strengthScore / 4) * 100}%` }}
                  />
                </div>

                <ul className="space-y-1 text-xs font-medium">
                  {PASSWORD_RULES.map(({ regex, key }) => {
                    const met = regex.test(password);
                    return (
                      <li key={key} className="flex items-center gap-2">
                        {met ? (
                          <Check size={16} className="text-emerald-500" />
                        ) : (
                          <X size={16} className="text-muted-foreground/80" />
                        )}
                        <span
                          className={
                            met ? "text-emerald-600" : "text-muted-foreground"
                          }>
                          {t(
                            `Password.requirements.${key}`,
                            key === "minLength" ? { count: 8 } : undefined
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={formState.isSubmitting}>
              {formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  {t("Register.btn.loading")}
                </>
              ) : (
                t("Register.btn.label")
              )}
            </Button>
          </div>
        </form>
      </Form>

      <OAuth />

      <div className="text-center text-sm">
        {t("Register.already")}&nbsp;
        <Link href="/auth/login" className="underline underline-offset-4">
          {t("Login.label")}
        </Link>
      </div>

      <Markdown className="prose text-center text-xs text-muted-foreground">
        {t("privacy")}
      </Markdown>
    </div>
  );
}
