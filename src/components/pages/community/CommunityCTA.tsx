import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function CommunityCTA() {
  const t = useTranslations("Community.CTA");
  return (
    <Card className="max-w-5xl mx-auto">
      <CardContent className="px-6 py-12 sm:px-12 sm:py-16 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
        <p className="mt-4 mb-8">{t("description")}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <a
              target="_blank"
              href="https://discord.gg/XkSpxwVM"
              rel="noopener noreferrer">
              <Users />
              {t("joinCommunity")}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/support-us">
              <Heart />
              {t("supportUs")}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
