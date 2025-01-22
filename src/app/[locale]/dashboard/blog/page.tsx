import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.dashboard.blog.title,
  description: pages.dashboard.blog.description,
};

export default function page() {
  return (
    <div className="h-screen w-full flex justify-center items-center">Blog</div>
  );
}
