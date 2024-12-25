import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import Link from "next/link";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-xs underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            <FaGithub className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
          <Button variant="outline" className="w-full">
            <FaGoogle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?&nbsp;
        <Link href="/auth/register" className="underline underline-offset-4">
          Register
        </Link>
      </div>
      <div className="text-center text-balance text-xs text-muted-foreground">
        By clicking continue, you agree to our&nbsp;
        <Link
          href="/resources/terms-and-conditions"
          className="underline underline-offset-4">
          Terms and Conditions
        </Link>
        &nbsp; and&nbsp;
        <Link
          href="/resources/privacy-policy"
          className="underline underline-offset-4">
          Privacy Policy
        </Link>
      </div>
    </form>
  );
}