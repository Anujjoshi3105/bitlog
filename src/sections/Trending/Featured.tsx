"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import blog from "@/data/blogs.json";

export default function Featured({ maxblog = 4 }: { maxblog?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError] = useState(false);

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

  if (hasError) {
    return (
      <section className="container mx-auto py-8 text-center text-red-500">
        Error loading featured blog
      </section>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Featured Blogs</h1>
      <h3 className="text-muted-foreground mb-6 italic">Top Picks for You</h3>
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
