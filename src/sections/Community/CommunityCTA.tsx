import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";
import Link from "next/link";

export default function CommunityCTA() {
  return (
    <section>
      <Card className="bg-primary/5">
        <CardContent className="px-4 py-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
            Your support enables us to maintain and improve our platform, create
            more valuable content, and build new features that enhance your
            experience. Every contribution, big or small, makes a difference in
            our mission to empower makers worldwide.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <a
                target="_blank"
                href="https://discord.gg/XkSpxwVM"
                rel="noopener noreferrer">
                <Users className="h-5 w-5" />
                Join Community
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/resources/support">
                <Heart className="h-5 w-5" />
                Support Us
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
