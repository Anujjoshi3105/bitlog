import { Metadata } from "next";
import { pages } from "@/config/site";
import Terms from "@/components/pages/resources/Terms";

export const metadata: Metadata = {
  title: pages.terms.title,
  description: pages.terms.description,
};

export default function page() {
  return <Terms />;
}
