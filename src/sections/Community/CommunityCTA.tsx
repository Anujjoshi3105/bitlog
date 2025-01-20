import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function CommunityCTA() {
  const t = useTranslations("Community.CTA");
  return (
    <section>
      <Card className="bg-muted">
        <CardContent className="px-4 py-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <a
                target="_blank"
                href="https://discord.gg/XkSpxwVM"
                rel="noopener noreferrer">
                <Users className="h-5 w-5" />
                {t("joinCommunity")}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/resources/support">
                <Heart className="h-5 w-5" />
                {t("supportUs")}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
