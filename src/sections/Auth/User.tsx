"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, LogOut, Settings, User as UserAvatar } from "lucide-react";
import { Mode } from "@/components/site/Mode";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";
import { SiteSettings } from "@/components/site/site-settings";

export default function User() {
  const t = useTranslations();
  const session = useSession();
  switch (session.status) {
    case "loading":
      return <Loader2 className="animate-spin" />;
    case "unauthenticated":
      return (
        <>
          <SiteSettings />
          <Button className="hidden lg:flex rounded-full" asChild>
            <Link href="/auth">{t("joinNow")}</Link>
          </Button>
        </>
      );
  }

  const {
    name = "User",
    email = "email@example.com",
    image = "https://github.com/shadcn.png",
  } = session.data.user ?? {
    name: "Guest",
    email: "guest",
    image: "https://github.com/shadcn.png",
  };
  const role = "Member";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={image!} alt={name!} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex gap-2 items-center justify-between px-2">
          <LanguageSwitcher /> <Mode />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserAvatar className="mr-2 h-4 w-4" />
          <span>{role}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
