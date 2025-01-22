import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.auth.logout.title,
  description: pages.auth.logout.description,
};

export default function page() {
  return <div>Logout</div>;
}
