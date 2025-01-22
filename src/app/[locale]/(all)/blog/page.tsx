import BlogSearch from "@/components/pages/blog/BlogSearch";
import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.blog.title,
  description: pages.blog.description,
};

export default function page() {
  return <BlogSearch />;
}
