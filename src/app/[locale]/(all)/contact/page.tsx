import Heading from "@/components/ui/heading";
import ContactForm from "@/sections/Contact/ContactForm";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Contact");
  return (
    <main className="space-y-6 mx-auto max-w-5xl">
      <Heading title={t("title")} description={t("subtitle")} size="lg" />
      <ContactForm />
    </main>
  );
}
