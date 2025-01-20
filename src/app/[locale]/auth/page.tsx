import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Logo from "@/components/Logo";
import OAuth from "@/components/OAuth";

export default function AuthPage() {
  const t = useTranslations();
  return (
    <div className="flex justify-center items-center h-full w-screen fixed overflow-y-auto bg-secondary">
      <div>
        <Card className="w-[400px] shadow-lg">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {t("Auth.title")}
            </CardTitle>
            <CardDescription className="text-center text-xs font-medium">
              {t("Auth.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" asChild>
              <Link href="/auth/login">{t("Auth.Login.label")}</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/auth/register">{t("Auth.Register.label")}</Link>
            </Button>
            <OAuth />
          </CardContent>
          <CardFooter className="flex justify-center text-xs gap-4 text-muted-foreground">
            <Link href="/resources/terms" className="hover:underline">
              {t("navLinks.terms")}
            </Link>
            <div>|</div>
            <Link href="/resources/privacy" className="hover:underline">
              {t("navLinks.privacy")}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
