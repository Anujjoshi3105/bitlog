import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import blogs from "@/data/blogs.json";
import tags from "@/data/tags.json";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
export default function Latest() {
  const t = useTranslations();
  return (
    <div>
      <h1 className="text-3xl font-bold">{t("Trending.Latest.title")}</h1>
      <p className="mb-6 mt-1">{t("Trending.Latest.subtitle")}</p>
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
            <Button asChild className="mt-4">
              <Link href="/blog">{t("viewAll")}</Link>
            </Button>
          </div>
        </div>
        <aside>
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </aside>
      </div>
    </div>
  );
}
