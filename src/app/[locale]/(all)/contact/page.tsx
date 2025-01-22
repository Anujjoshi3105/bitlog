import Heading from "@/components/ui/heading";
import ContactForm from "@/components/pages/contact/ContactForm";
import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.contact.title,
  description: pages.contact.description,
};

export default function ContactPage() {
  const t = useTranslations("Contact");
  return (
    <main className="space-y-6 mx-auto max-w-5xl">
      <Heading title={t("title")} description={t("subtitle")} size="lg" />
      <ContactForm />
    </main>
  );
}
