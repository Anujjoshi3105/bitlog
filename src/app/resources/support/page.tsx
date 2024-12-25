import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <main>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Support Us?</h2>
        <p className="text-muted-foreground mb-8">
          Your support enables us to maintain and improve Bitlog, create more
          valuable content, and build new features that enhance your blogging
          experience. Every contribution, big or small, makes a difference in
          our mission to empower bloggers worldwide.
        </p>
        <div className="flex justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/about-us">
              <Heart className="h-5 w-5" />
              Support Us
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
