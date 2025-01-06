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
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Loader2, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "@/i18n/routing";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Password } from "@/components/ui/password";
import { resetPasswordAction } from "@/actions/auth/resetPassword";
import {
  ResetPasswordFormData,
  ResetPasswordSchema,
} from "@/lib/validators/reset-password";
import { useTranslations } from "next-intl";

export default function ResetForm({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const t = useTranslations("Auth.ResetPassword");
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<ResetPasswordFormData>({
    resolver: valibotResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    setError,
  } = form;

  const onSubmit = async (values: ResetPasswordFormData) => {
    try {
      const res = await resetPasswordAction(email, token, values);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setError("root", {
          message: t(`Error.${res.statusCode}`),
        });
      }
    } catch {
      setError("root", {
        message: t("Error.default"),
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center">{t("title")}</h1>
        <p className="text-sm text-muted-foreground text-center">
          {t("description")}
        </p>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <AlertDescription className="text-green-800">
              {t("Success.description")}
            </AlertDescription>
          </Alert>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Form.NewPassword.label")}</FormLabel>
                    <FormControl>
                      <Password
                        placeholder={t("Form.NewPassword.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Form.ConfirmPassword.label")}</FormLabel>
                    <FormControl>
                      <Password
                        placeholder={t("Form.ConfirmPassword.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errors.root && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    {t("btn.loading")}
                  </>
                ) : (
                  <>
                    {t("btn.label")}
                    <ArrowRight />
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Separator className="my-4 w-full" />
        <div className="text-center text-sm">
          <Link
            href="/auth/login"
            className="text-primary hover:underline inline-flex items-center">
            {t("back")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
