import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CommunityFeature() {
  const t = useTranslations("Community.Feature");
  const keys = ["expert", "build", "update", "network"] as const;
  return (
    <section className="space-y-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {keys.map((key) => (
          <div key={key} className="flex gap-4">
            <div className="p-2 rounded-full bg-primary/10 h-fit">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t(`${key}.title`)}
              </h3>
              <p className="text-muted-foreground">{t(`${key}.description`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
