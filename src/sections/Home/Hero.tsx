import HeroSearch from "@/sections/Home/HeroSearch";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Home.Hero");
  return (
    <section className="text-center min-h-[50vh] select-none flex flex-col items-center justify-center max-w-3xl mx-auto">
      <h3 className="mb-4 font-inter text-sm font-semibold text-primary/90">
        {t("subtitle")}
      </h3>
      <h1 className="mb-5 max-w-2xl text-4xl font-bold md:text-5xl">
        {t("title")}
      </h1>
      <h2 className="mb-8 max-w-xl leading-6 font-medium">
        {t("description")}
      </h2>
      <HeroSearch />
    </section>
  );
}
