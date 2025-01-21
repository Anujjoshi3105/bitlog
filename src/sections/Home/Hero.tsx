import Heading from "@/components/ui/heading";
import HeroSearch from "@/sections/Home/HeroSearch";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Home.Hero");
  return (
    <section className="text-center min-h-[50vh] select-none flex flex-col items-center justify-center max-w-3xl mx-auto">
      <Heading
        subtitle={t("subtitle")}
        title={t("title")}
        description={t("description")}
        size="lg"
      />
      <HeroSearch />
    </section>
  );
}
