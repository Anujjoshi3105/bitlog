import Logo from "@/components/Logo";
import { LoginForm } from "@/sections/Auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-[1000] bg-secondary">
      <div className="grid h-screen lg:grid-cols-2">
        <div className="flex flex-col gap-12 p-6 md:p-10">
          <Link
            href="/"
            className="lg:flex hidden justify-center md:justify-start">
            <Logo />
          </Link>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
            src="/blog1.jpg"
            alt="Image"
            fill
            className="absolute inset-0 h-full w-full object-cover brightness-[0.6] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}
