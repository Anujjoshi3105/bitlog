import Grid from "@/components/template/grid";
import Heading from "@/components/ui/heading";
import { Users, Code, RefreshCw, Network } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CommunityFeature() {
  const t = useTranslations("Community.Feature");

  const items = [
    { key: "expert", icon: Users },
    { key: "build", icon: Code },
    { key: "update", icon: RefreshCw },
    { key: "network", icon: Network },
  ].map(({ key, icon }) => ({
    key,
    icon,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  }));

  return (
    <section className="text-balance">
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
    </section>
  );
}
