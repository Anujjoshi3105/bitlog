import { Metadata } from "next";
import { pages } from "@/config/site";
import Register from "@/components/pages/auth/Register";

export const metadata: Metadata = {
  title: pages.auth.register.title,
  description: pages.auth.register.description,
};

export default function page() {
  return <Register />;
}
