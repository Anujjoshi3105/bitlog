"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import Tags from "@/data/tags.json";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function HeroSearch() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;

      setLoading(true);
      setTimeout(() => {
        console.log("Search query:", searchQuery);
        console.log("Selected tags:", selectedTags);
        setSearchQuery("");
        setLoading(false);
      }, 5000);
    },
    [searchQuery, selectedTags]
  );

  return (
    <form onSubmit={handleSearch} className="max-w-sm sm:max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <div className="relative flex-grow">
          <Input
            className="rounded-full pr-10 w-full"
            placeholder={t("Search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
          <Button
            type="submit"
            className="absolute right-0 top-0 rounded-l-none rounded-r-full"
            disabled={loading}
            aria-label="Submit search">
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4" aria-hidden="true" />
            ) : (
              <Search className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>
      <div className="line-clamp-1">
        {Tags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "secondary"}
            onClick={() => toggleTag(tag)}
            className="cursor-pointer">
            {tag}
          </Badge>
        ))}
      </div>
    </form>
  );
}
