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

export function Features() {
  const t = useTranslations("Pricing");

  const keys = [
    {
      name: "ai",
      icon: CloudUpload,
    },
    {
      name: "seo",
      icon: Search,
    },
    {
      name: "images",
      icon: Image,
    },
    {
      name: "users",
      icon: Users,
    },
    {
      name: "analytics",
      icon: BarChart2,
    },
    {
      name: "templates",
      icon: Lock,
    },
    {
      name: "priority",
      icon: Rocket,
    },
    {
      name: "grammar",
      icon: UserCheck,
    },
  ];

  return (
    <>
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-semibold leading-7">{t("subtitle")}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-snug text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2">
          {keys.map(({ name, icon: Icon }) => (
            <div key={name} className="relative pl-16">
              <div className="text-lg font-semibold leading-7">
                <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                  <Icon className="w-6 h-6 text-background" />
                </div>
                {t(`${name}.title`)}
              </div>
              <p className="mt-2 text-muted-foreground leading-snug">
                {t(`${name}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
