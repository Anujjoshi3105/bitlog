import { Metadata } from "next";
import { pages } from "@/config/site";
import Auth from "@/components/pages/auth/Auth";

export const metadata: Metadata = {
  title: pages.auth.title,
  description: pages.auth.description,
};

export default function page() {
  return <Auth />;
}
