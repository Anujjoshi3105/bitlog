import { Metadata } from "next";
import { pages } from "@/config/site";
import FAQ from "@/components/pages/resources/Faqs";

export const metadata: Metadata = {
  title: pages.faqs.title,
  description: pages.faqs.description,
};

export default function page() {
  return <FAQ />;
}
