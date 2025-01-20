import ContactForm from "@/sections/Contact/ContactForm";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Contact");
  return (
    <main>
      <div className="space-y-6 container mx-auto max-w-3xl">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold">{t("title")}</h1>
          <p className="font-medium text-primary">{t("subtitle")}</p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
