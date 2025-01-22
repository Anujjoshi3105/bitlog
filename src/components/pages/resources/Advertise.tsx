import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  HeartHandshake,
  Layout,
  Megaphone,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Heading from "@/components/ui/heading";
import Grid from "@/components/template/grid";
import { Card, CardContent } from "@/components/ui/card";

export default function Advertise() {
  const t = useTranslations("Advertise");
  const items = [
    { icon: Target, key: "audience" },
    { icon: TrendingUp, key: "engagement" },
    { icon: Zap, key: "content" },
    { icon: BarChart2, key: "analytics" },
    { icon: Layout, key: "ad" },
    { icon: Shield, key: "brand" },
    { icon: Users, key: "subscriber" },
    { icon: HeartHandshake, key: "support" },
  ].map(({ key, icon }) => ({
    key,
    icon,
    title: t(`Feature.${key}.title`),
    description: t(`Feature.${key}.description`),
  }));
  return (
    <main className="space-y-24 overflow-hidden">
      {/* Advertise Features */}
      <section>
        <div className="max-w-7xl mx-auto">
          <Heading
            title={t("Feature.title")}
            subtitle={t("Feature.subtitle")}
            description={t("Feature.description")}
          />
          <Grid
            items={items}
            variant="inline"
            columns={2}
            maxWidth="4xl"
            className="mx-auto max-w-2xl lg:max-w-4xl"
          />
        </div>
      </section>

      {/* Advertis CTA */}
      <Card className="max-w-5xl mx-auto">
        <CardContent className="px-6 py-12 sm:px-12 sm:py-16 text-center max-w-3xl mx-auto">
          <div className="mx-auto mb-10 flex size-20 items-center justify-center rounded-full bg-primary">
            <Megaphone className="size-10 text-card" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">{t("CTA.title")}</h2>
          <p className="mt-4 mb-8">{t("CTA.description")}</p>
          <Button size="lg" asChild>
            <Link href="/contact">{t("CTA.btn")}</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
