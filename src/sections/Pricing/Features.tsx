import { useTranslations } from "next-intl";
import {
  BarChart2,
  CloudUpload,
  Image,
  Lock,
  Rocket,
  Search,
  UserCheck,
  Users,
} from "lucide-react";
import Heading from "@/components/ui/heading";
import Grid from "@/components/template/grid";

export function Features() {
  const t = useTranslations("Pricing");
  const items = [
    { key: "ai", icon: CloudUpload },
    { key: "seo", icon: Search },
    { key: "images", icon: Image },
    { key: "users", icon: Users },
    { key: "analytics", icon: BarChart2 },
    { key: "templates", icon: Lock },
    { key: "priority", icon: Rocket },
    { key: "grammar", icon: UserCheck },
  ].map(({ key, icon }) => ({
    key,
    icon,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  }));

  return (
    <>
      <Heading
        subtitle={t("subtitle")}
        title={t("title")}
        description={t("description")}
      />

      <Grid
        items={items}
        variant="inline"
        columns={2}
        maxWidth="4xl"
        className="mx-auto max-w-2xl lg:max-w-4xl"
      />
    </>
  );
}
