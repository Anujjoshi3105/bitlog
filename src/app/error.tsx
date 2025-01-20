"use client";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ErrorPage() {
  const t = useTranslations();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center">
      <div className="py-16 select-none">
        <div className="mb-6">
          <AlertTriangle
            className="size-28 mx-auto text-destructive animate-pulse"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{t("error")}</h1>
        <p className="mb-12 max-w-md">{t("errorMsg")}</p>
        <Button asChild variant="default">
          <Link href="/" title={t("returnHome")}>
            {t("returnHome")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
