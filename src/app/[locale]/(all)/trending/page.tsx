import { Metadata } from "next";
import { pages } from "@/config/site";
import Trending from "@/components/pages/trending/Trending";

export const metadata: Metadata = {
  title: pages.trending.title,
  description: pages.trending.description,
};

export default function page() {
  return <Trending />;
}
