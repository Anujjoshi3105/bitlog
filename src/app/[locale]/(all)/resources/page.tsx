import Heading from "@/components/ui/heading";
import {
  DollarSign,
  FileText,
  Heart,
  Megaphone,
  MessageCircle,
  Shield,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Grid from "@/components/template/grid";

export default function Page() {
  const t = useTranslations();
  const resources = [
    {
      icon: DollarSign,
      key: "price",
      title: t("Resources.price.title"),
      description: t("Resources.price.description"),
      href: "/resources/price",
    },
    {
      icon: FileText,
      key: "terms",
      title: t("Resources.terms.title"),
      description: t("Resources.terms.description"),
      href: "/resources/terms",
    },
    {
      icon: Shield,
      key: "privacy",
      title: t("Resources.privacy.title"),
      description: t("Resources.privacy.description"),
      href: "/resources/privacy",
    },
    {
      icon: MessageCircle,
      key: "faqs",
      title: t("Resources.faqs.title"),
      description: t("Resources.faqs.description"),
      href: "/resources/faqs",
    },
    {
      icon: Heart,
      key: "support",
      title: t("Resources.support.title"),
      description: t("Resources.support.description"),
      href: "/resources/support",
    },
    {
      icon: Megaphone,
      key: "advertise",
      title: t("Resources.advertise.title"),
      description: t("Resources.advertise.description"),
      href: "/resources/advertise",
    },
  ];

  return (
    <main>
      <div>
        <Heading
          title={t("Resources.title")}
          subtitle={t("Resources.subtitle")}
          description={t("Resources.description")}
        />

        <Grid
          items={resources}
          columns={2}
          maxWidth="4xl"
          className="mx-auto max-w-2xl lg:max-w-4xl"
        />
      </div>
    </main>
  );
}
