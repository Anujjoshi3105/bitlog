import { Metadata } from "next";
import { pages } from "@/config/site";
import Community from "@/components/pages/community/Community";

export const metadata: Metadata = {
  title: pages.community.title,
  description: pages.community.description,
};

export default function page() {
  return <Community />;
}
