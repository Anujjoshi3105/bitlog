import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/Logo";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 z-[1000] bg-secondary">
      <div>
        <Card className="w-[400px] shadow-lg">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to Bitlog
            </CardTitle>
            <CardDescription className="text-center">
              Sign in or create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
            <Separator />
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
          </CardContent>
          <CardFooter className="flex justify-center text-xs gap-4 text-muted-foreground">
            <Link
              href="/resources/terms-and-conditions"
              className="hover:underline">
              Terms & Conditions
            </Link>
            <div>|</div>
            <Link href="/resources/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
