import { Metadata } from "next";
import { pages } from "@/config/site";
import Pricing from "@/components/pages/resources/Pricing";

export const metadata: Metadata = {
  title: pages.pricing.title,
  description: pages.pricing.description,
};

export default function page() {
  return <Pricing />;
}
