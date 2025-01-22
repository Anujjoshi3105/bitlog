import { Metadata } from "next";
import { pages } from "@/config/site";
import Login from "@/components/pages/auth/Login";

export const metadata: Metadata = {
  title: pages.auth.login.title,
  description: pages.auth.login.description,
};

export default function page() {
  return <Login />;
}
