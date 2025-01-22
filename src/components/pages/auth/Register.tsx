import Logo from "@/components/Logo";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import RegisterForm from "@/components/pages/auth/Form/RegisterForm";

export default function Register() {
  return (
    <div className="h-full w-screen fixed overflow-y-auto top-0 left-0 bg-background">
      <div className="grid h-full lg:grid-cols-2">
        <div className="inline-flex flex-col gap-12 p-6 md:p-10">
          <Link
            href="/"
            className="lg:flex hidden justify-center md:justify-start">
            <Logo />
          </Link>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm">
              <RegisterForm />
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
