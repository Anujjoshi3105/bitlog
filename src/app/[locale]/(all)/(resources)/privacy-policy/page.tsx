import { Metadata } from "next";
import { pages } from "@/config/site";
import Privacy from "@/components/pages/resources/Privacy";

export const metadata: Metadata = {
  title: pages.privacy.title,
  description: pages.privacy.description,
};

export default function page() {
  return <Privacy />;
}
