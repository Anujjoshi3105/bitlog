import { Badge } from "@/components/ui/badge";
import tags from "@/data/tags.json";
import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.topics.title,
  description: pages.topics.description,
};

export default function page() {
  return (
    <div className="flex items-center justify-center h-[90vh] w-full">
      <div className="flex items-center justify-center flex-wrap max-w-6xl overflow-hidden text-ellipsis text-center">
        {tags.map((tag) => (
          <Badge size="lg" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
