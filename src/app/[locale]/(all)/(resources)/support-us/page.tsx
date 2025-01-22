import { Metadata } from "next";
import { pages } from "@/config/site";
import Support from "@/components/pages/resources/Support";

export const metadata: Metadata = {
  title: pages.support.title,
  description: pages.support.description,
};

export default function page() {
  return <Support />;
}
