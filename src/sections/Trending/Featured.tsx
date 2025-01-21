"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import blog from "@/data/blogs.json";
import { useTranslations } from "next-intl";

export default function Featured({ maxblog = 4 }: { maxblog?: number }) {
  const t = useTranslations("Trending.Featured");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, blog.length - maxblog) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + maxblog >= blog.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <h4 className="text-muted-foreground mb-6 mt-1">{t("subtitle")}</h4>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <BlogCard blog={blog[currentIndex]} variant="vertical" />
        <div className="flex flex-col justify-around">
          {blog.slice(currentIndex + 1, currentIndex + maxblog).map((post) => (
            <BlogCard
              key={post.title}
              blog={post}
              variant="horizontal"
              className="lg:h-[200px]"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-2 gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handlePrevious}
          disabled={isLoading || blog.length <= maxblog}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous blog</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleNext}
          disabled={isLoading || blog.length <= maxblog}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next blog</span>
        </Button>
      </div>
    </div>
  );
}
