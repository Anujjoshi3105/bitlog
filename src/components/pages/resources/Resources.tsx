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

export default function Resources() {
  const t = useTranslations();
  const resources = [
    {
      icon: DollarSign,
      key: "price",
      title: t("Resources.price.title"),
      description: t("Resources.price.description"),
      href: "pricing",
    },
    {
      icon: FileText,
      key: "terms",
      title: t("Resources.terms.title"),
      description: t("Resources.terms.description"),
      href: "/terms-and-conditions",
    },
    {
      icon: Shield,
      key: "privacy",
      title: t("Resources.privacy.title"),
      description: t("Resources.privacy.description"),
      href: "/privacy-policy",
    },
    {
      icon: MessageCircle,
      key: "faqs",
      title: t("Resources.faqs.title"),
      description: t("Resources.faqs.description"),
      href: "/faqs",
    },
    {
      icon: Heart,
      key: "support",
      title: t("Resources.support.title"),
      description: t("Resources.support.description"),
      href: "/support-us",
    },
    {
      icon: Megaphone,
      key: "advertise",
      title: t("Resources.advertise.title"),
      description: t("Resources.advertise.description"),
      href: "/advertise",
    },
  ];

  return (
    <main>
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
    </main>
  );
}
