import { Metadata } from "next";
import { pages } from "@/config/site";
import Cookies from "@/components/pages/resources/Cookies";

export const metadata: Metadata = {
  title: pages.cookies.title,
  description: pages.cookies.description,
};

export default function page() {
  return <Cookies />;
}
