import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Support");
  return (
    <main>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t("title")}</h2>
        <p className="text-muted-foreground mb-8">{t("description")}</p>
        <div className="flex justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/about-us">
              <Heart className="h-5 w-5" />
              {t("btn")}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
