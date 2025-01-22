import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Markdown from "react-markdown";

export default function Terms() {
  const t = useTranslations("Terms");
  return (
    <main className="text-center">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold uppercase underline underline-offset-8">
          {t("title")}
        </h1>
        <p>{t("date")}</p>
      </div>
      <section className="mt-8 prose w-full mx-auto">
        <Markdown>{t("content")}</Markdown>
      </section>
      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/">{t("btn")}</Link>
        </Button>
      </div>
    </main>
  );
}
