import BlogPost from "@/sections/Blog/BlogPost";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogPost id={id} />;
}
