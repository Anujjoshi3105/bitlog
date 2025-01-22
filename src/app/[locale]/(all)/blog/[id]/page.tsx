import BlogPost from "@/components/pages/blog/BlogPost";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogPost id={id} />;
}
