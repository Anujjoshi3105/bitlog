/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import BlogSkeleton from "./loading";
import BlogPost from "@/sections/Blog/BlogPost";

export default function Page({ params }: any) {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogPost id={params.id} />
    </Suspense>
  );
}
