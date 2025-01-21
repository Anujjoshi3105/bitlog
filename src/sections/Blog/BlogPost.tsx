"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Heart,
  Share2,
  MessageSquare,
  Bookmark,
  Calendar,
  Clock,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";

async function fetchBlogPost(id: string) {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id,
    title: "GraphQL for Beginners",
    author: {
      name: "Anuj Joshi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: `# GraphQL for Beginners

## What is GraphQL?

GraphQL is a query language for APIs and a runtime for executing queries and mutations. It provides a way to fetch specific data from a server in a way that is both efficient and easy to use.

## Why Use GraphQL?

1. **Efficient Data Fetching**: With GraphQL, clients can request exactly the data they need, no more and no less. This reduces over-fetching and under-fetching of data.

2. **Single Endpoint**: Unlike REST APIs where you might need to make multiple requests to different endpoints, GraphQL allows you to get all the data you need in a single request.

3. **Strongly Typed**: GraphQL APIs are strongly typed, which means you can validate queries within the GraphQL type system before execution.

## Basic Concepts

### Queries

Queries in GraphQL are used to fetch data. Here's a simple example:

\`\`\`graphql
query {
  user(id: "123") {
    name
    email
    posts {
      title
    }
  }
}
\`\`\`

### Mutations

Mutations are used to modify server-side data. Here's an example:

\`\`\`graphql
mutation {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
    email
  }
}
\`\`\`

## Getting Started

To start using GraphQL, you'll need:

1. A GraphQL server
2. A client to make requests to the server

Popular GraphQL clients include Apollo Client and Relay.

## Conclusion

GraphQL offers a powerful and flexible approach to API development. Its ability to request precisely the data needed makes it an excellent choice for modern web and mobile applications.
    `,
    tableOfContents: [
      { title: "What is GraphQL?", slug: "what-is-graphql" },
      { title: "Why Use GraphQL?", slug: "why-use-graphql" },
      { title: "Basic Concepts", slug: "basic-concepts" },
      { title: "Getting Started", slug: "getting-started" },
      { title: "Conclusion", slug: "conclusion" },
    ],
    technologies: ["GraphQL", "API", "Web Development", "Backend"],
    publishedAt: new Date("2023-05-15T09:00:00Z"),
    readingTime: "5 min read",
    likes: 42,
    comments: 7,
  };
}

export default function BlogPost({ id }: { id: string }) {
  const [post, setPost] = useState<Awaited<
    ReturnType<typeof fetchBlogPost>
  > | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchBlogPost(id).then(setPost);
  }, [id]);

  if (!post) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically update the like count on the server
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Here you would typically save the post on the server
  };

  const handleShare = () => {
    // Implement share functionality
    alert("Sharing functionality to be implemented");
  };

  const handleComment = () => {
    // Implement comment functionality
    alert("Comment functionality to be implemented");
  };

  return (
    <div className="w-full">
      <header className="bg-muted py-12 h-72 relative">
        <div className="container mx-auto p-4 absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
            {post.title}
          </h1>
        </div>
      </header>
      <main className="pt-0 grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        <aside className="space-y-6 md:col-span-1 pt-24">
          <div className="sticky top-10">
            <div className="rounded-lg bg-muted p-4 mb-6">
              <h2 className="text-xl font-bold mb-2">Table of Contents</h2>
              <ul className="space-y-1 text-sm">
                {post.tableOfContents.map((item, index) => (
                  <li key={index} className="hover:underline">
                    <a href={`#${item.slug}`}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </aside>
        <div className="md:col-span-2 lg:col-span-3">
          <div className="pb-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold">
                  {post.author.name}
                </span>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={handleLike}>
                      <Heart
                        className={`h-4 w-4 ${
                          isLiked ? "fill-current text-red-500" : ""
                        }`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isLiked ? "Unlike" : "Like"} this post</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share this post</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={handleComment}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Comment on this post</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={handleSave}>
                      <Bookmark
                        className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isSaved ? "Unsave" : "Save"} this post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <Markdown className="prose prose-sm sm:prose p-0">
            {post.content}
          </Markdown>
        </div>
      </main>
    </div>
  );
}
