import { Link } from "@/i18n/routing";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";
import ForgotPasswordForm from "@/components/pages/auth/Form/ForgotPasswordForm";

export default function Forgot() {
  const t = useTranslations("Auth.ForgotPassword");
  return (
    <main>
      <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
            <Lock className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
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
    </main>
  );
}
