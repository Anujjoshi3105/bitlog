import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function notFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center">
      <div className="py-16 select-none">
        <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider">
          404
        </p>
        <p className="text-4xl md:text-5xl font-bold tracking-wider mt-2">
          Page Not Found
        </p>
      </div>
      <Button asChild>
        <Link href="/" title="Return Home">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
