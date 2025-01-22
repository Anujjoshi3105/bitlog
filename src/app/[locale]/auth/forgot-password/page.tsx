import { Metadata } from "next";
import { pages } from "@/config/site";
import Forgot from "@/components/pages/auth/Forgot";

export const metadata: Metadata = {
  title: pages.auth.forgot.title,
  description: pages.auth.forgot.description,
};

export default function page() {
  return <Forgot />;
}
