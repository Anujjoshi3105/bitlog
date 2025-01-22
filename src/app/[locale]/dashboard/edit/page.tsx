import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.dashboard.edit.title,
  description: pages.dashboard.edit.description,
};

export default function EditBlogPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">Edit</div>
  );
}
