import blogs from "@/data/blogs.json";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroBlog() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(0, 6).map((blog) => (
          <BlogCard key={blog.title} blog={blog} variant="vertical" />
        ))}
      </div>
      <div className="flex justify-center items-center mt-2">
        <Button asChild className="mt-6">
          <Link href="/blog">View All</Link>
        </Button>
      </div>
    </div>
  );
}
