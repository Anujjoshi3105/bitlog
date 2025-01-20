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

export default function Page() {
  const t = useTranslations("Advertise");
  const keys = [
    { icon: Target, key: "audience" },
    { icon: TrendingUp, key: "engagement" },
    { icon: Zap, key: "content" },
    { icon: BarChart2, key: "analytics" },
    { icon: Layout, key: "ad" },
    { icon: Shield, key: "brand" },
    { icon: Users, key: "subscriber" },
    { icon: HeartHandshake, key: "support" },
  ] as const;
  return (
    <main className="space-y-24 overflow-hidden">
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            {t("Feature.title")}
          </h2>
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-3">
            {keys.map(({ icon: Icon, key }) => (
              <div key={key} className="relative pl-16">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Icon className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(`Feature.${key}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`Feature.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary">
              <Megaphone className="h-12 w-12 text-background" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight uppercase">
              {t("CTA.title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("CTA.description")}
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">{t("CTA.btn")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
