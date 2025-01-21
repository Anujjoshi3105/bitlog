import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  const t = useTranslations("Support");
  return (
    <main>
      <Card className="max-w-5xl mx-auto">
        <CardContent className="px-6 py-12 sm:px-12 sm:py-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
          <p className="mt-4 mb-8">{t("description")}</p>
          <Button asChild size="lg">
            <Link href="/about-us">
              <Heart />
              {t("btn")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
