import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import blogs from "@/data/blogs.json";
import tags from "@/data/tags.json";
import Link from "next/link";

export default function Latest() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold">Latest Blogs</h1>
      <h3 className="text-muted-foreground mb-6 italic">Most Recent Blogs</h3>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid">
            {blogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No blogs found.
              </div>
            ) : (
              blogs
                .slice(0, 4)
                .map((blog) => (
                  <BlogCard
                    key={blog.title}
                    blog={blog}
                    variant="horizontal"
                    className="sm:h-[220px]"
                  />
                ))
            )}
            <Button asChild className="mt-6">
              <Link href="/blog">View All</Link>
            </Button>
          </div>
        </div>
        <aside className="space-y-8">
          <div>
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
