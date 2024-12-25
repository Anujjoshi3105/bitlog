"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Search, X } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import tags from "@/data/tags.json";
import blogs from "@/data/blogs.json";
import Link from "next/link";

export default function BlogSearch() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");
  const [dateRange, setDateRange] = useState("all");
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [fliteredBlogs, setFliteredBlogs] = useState(blogs);

  useEffect(() => {
    setFliteredBlogs(blogs);
  }, [searchQuery, selectedTags, sortBy, dateRange, contentTypes]);

  const handleSearch = (query: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (query && !recentSearches.includes(query)) {
        setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
      }
    }, 1000);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleContentTypeChange = (type: string, checked: boolean) => {
    setContentTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-6">
        <div className="relative w-full max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }}
            className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Input
                className="rounded-full pr-10"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                aria-label="Search articles"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute rounded-full right-10 -translate-x-1/4 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => {
                    setSearchQuery("");
                    handleSearch("");
                  }}
                  aria-label="Clear search">
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Button
                type="submit"
                className="absolute right-0 top-0 rounded-l-none rounded-r-full"
                disabled={loading}
                aria-label="Search">
                {loading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="grid">
          {fliteredBlogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No blogs found.
            </div>
          ) : (
            fliteredBlogs.map((blog) => (
              <BlogCard
                key={blog.title}
                blog={blog}
                variant="horizontal"
                className="sm:h-[220px]"
              />
            ))
          )}
          <div className="flex justify-center items-center">
            <Button asChild className="mt-6">
              <Link href="/blog">View All</Link>
            </Button>
          </div>
        </div>
      </div>
      <aside className="space-y-8">
        <div>
          <h4 className="text-lg font-bold mb-2 uppercase">Filter By Tags</h4>
          <div>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold uppercase mb-2">Sort By</h4>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Select sort option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Latest First</SelectItem>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="readTime">Read Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="font-bold uppercase mb-2">Date Range</h4>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-2 uppercase">Content Type</h4>
          <div className="space-y-2">
            {["Articles", "Tutorials", "News", "Videos"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type.toLowerCase()}
                  checked={contentTypes.includes(type)}
                  onCheckedChange={(checked) =>
                    handleContentTypeChange(type, checked as boolean)
                  }
                />
                <Label htmlFor={type.toLowerCase()}>{type}</Label>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
