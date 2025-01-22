import { Metadata } from "next";
import { pages } from "@/config/site";
import Loading from "@/components/pages/Loading";

export const metadata: Metadata = {
  title: pages.loading.title,
  description: pages.loading.description,
};

export default function page() {
  return <Loading />;
}
