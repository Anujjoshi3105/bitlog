import { Metadata } from "next";
import { pages } from "@/config/site";
import Resources from "@/components/pages/resources/Resources";

export const metadata: Metadata = {
  title: pages.resources.title,
  description: pages.resources.description,
};

export default function page() {
  return <Resources />;
}
