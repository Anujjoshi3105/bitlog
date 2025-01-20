import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function BlogSkeleton() {
  return (
    <div className="w-full">
      <header className="bg-primary/10 py-12 mb-8 h-96 relative">
        <div className="container mx-auto p-4 absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
        </div>
      </header>
      <main className="pt-0 grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        <aside className="space-y-6 md:col-span-1 pt-24">
          <div className="sticky top-10">
            <div className="rounded-lg bg-muted p-4 mb-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((index) => (
                <Badge key={index} variant="secondary">
                  <Skeleton className="h-4 w-16" />
                </Badge>
              ))}
            </div>
          </div>
        </aside>
        <div className="md:col-span-2 lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <Skeleton className="h-4 w-24 mb-1" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((index) => (
                <Skeleton key={index} className="w-8 h-8 rounded-full" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/6" />
          </div>
          <div className="mt-8 space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
