import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Markdown from "react-markdown";

export default function Page() {
  const t = useTranslations("Cookies");
  return (
    <main>
      <div>
        <h1 className="text-3xl font-bold uppercase my-6 underline underline-offset-8">
          {t("title")}
        </h1>
        <p>{t("date")}</p>

        <section className="mt-8 text-primary prose w-full">
          <Markdown>{t("content")}</Markdown>
        </section>
      </div>
      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/">{t("btn")}</Link>
        </Button>
      </div>
    </main>
  );
}
