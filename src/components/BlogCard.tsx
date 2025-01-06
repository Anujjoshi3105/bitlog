import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface BlogCardProps {
  blog: Blog;
  variant?: "vertical" | "horizontal";
  className?: string;
}

export default function BlogCard({
  blog,
  variant = "vertical",
  className,
}: BlogCardProps) {
  const isVertical = variant === "vertical";

  return (
    <Link
      href={`/blog/${blog.title}`}
      className={cn(
        "block w-full transition-transform duration-300 p-1",
        className
      )}>
      <Card
        className={cn(
          "group overflow-hidden transition-colors duration-300 flex flex-col h-full",
          isVertical ? "flex-col" : "flex-col sm:flex-row"
        )}>
        <div
          className={cn(
            "relative overflow-hidden",
            isVertical
              ? "aspect-video w-full"
              : "aspect-video w-full sm:w-2/5 sm:aspect-square"
          )}>
          <Image
            src={blog.img}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-1 left-2 line-clamp-1">
            {blog.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/60 text-primary-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col justify-between flex-grow",
            !isVertical && "sm:w-3/5"
          )}>
          <div>
            <CardHeader>
              <CardTitle className="line-clamp-2 transition-colors">
                {blog.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm line-clamp-3 text-muted-foreground">
                {blog.description}
              </p>
            </CardContent>
          </div>
          <CardContent>
            <div className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src={blog.author.avatar}
                    alt={blog.author.name}
                  />
                  <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground">
                  {blog.author.name}
                </span>
              </div>
              <time
                dateTime={
                  blog.date instanceof Date
                    ? blog.date.toISOString()
                    : blog.date
                }
                className="text-muted-foreground">
                {formatDate(blog.date)}
              </time>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
