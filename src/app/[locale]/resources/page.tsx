import { Link } from "@/i18n/routing";
import {
  DollarSign,
  FileText,
  Heart,
  Megaphone,
  MessageCircle,
  Shield,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  const keys = [
    { icon: DollarSign, key: "price" },
    { icon: FileText, key: "terms" },
    { icon: Shield, key: "privacy" },
    { icon: MessageCircle, key: "faqs" },
    { icon: Heart, key: "support" },
    { icon: Megaphone, key: "advertise" },
  ] as const;

  return (
    <main>
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-semibold leading-7">{t("Resources.subtitle")}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("Resources.title")}
        </h1>
        <p className="mt-4 text-base leading-snug text-muted-foreground">
          {t("Resources.description")}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2">
          {keys.map(({ icon: Icon, key }) => (
            <Link
              key={key}
              href={`/resources/${key}`}
              passHref
              className="hover:scale-[1.02] duration-100">
              <div className="relative pl-16">
                <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Icon className="w-6 h-6 text-background" />
                </div>
                <div className="text-lg font-semibold leading-7">
                  {t(`Resources.${key}.title`)}
                </div>
                <p className="mt-2 text-muted-foreground leading-snug">
                  {t(`Resources.${key}.description`)}
                </p>
                <p className="mt-2 text-sm underline underline-offset-2">
                  {t("learnMore")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
