"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/routing";
import {
  UserIcon,
  SettingsIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  FilePlus2,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

const MOBILE_BREAKPOINT = 768;

const SidebarLinks = [
  {
    href: "/dashboard/",
    icon: <UserIcon />,
    label: "Profile",
  },
  {
    href: "/dashboard/blog",
    icon: <FileText />,
    label: "Blog",
  },
  {
    href: "/dashboard/edit",
    icon: <FilePlus2 />,
    label: "Add Blog",
  },
  {
    href: "/dashboard/settings",
    icon: <SettingsIcon />,
    label: "Setting",
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(newIsMobile);
    if (newIsMobile) setIsCollapsed(true);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const toggleSidebar = () => {
    if (!isMobile) setIsCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={cn(
        "bg-accent relative flex flex-col items-center justify-between h-screen py-6 px-2 md:py-8 md:px-4 border-r transition-all duration-300 ease-in-out",
        isCollapsed || isMobile ? "w-16" : "w-64"
      )}>
      <UserInfo isCollapsed={isCollapsed || isMobile} />
      <nav className="space-y-4">
        {SidebarLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={isCollapsed || isMobile}
          />
        ))}
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          onClick={() => signOut()}
          className={cn(isCollapsed ? "rounded-full" : "w-full justify-start")}>
          <LogOut className="w-15 h-15" />
          {!isCollapsed && <span className="ml-2">Log Out</span>}
        </Button>
      </nav>

      <Link
        href="/"
        className={cn(
          isMobile || isCollapsed ? "scale-50" : "flex justify-center"
        )}>
        <Logo />
      </Link>

      {!isMobile && (
        <Button
          onClick={toggleSidebar}
          variant="outline"
          className="absolute top-1/2 -right-5 rounded-full transition-transform duration-300 ease-in-out transform"
          size="icon"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      )}
    </aside>
  );
}

function UserInfo({ isCollapsed }: { isCollapsed: boolean }) {
  const session = useSession();
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex justify-center items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={session.data?.user?.image || ""}
            alt={session.data?.user?.name || ""}
          />
          <AvatarFallback>{session.data?.user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="ml-2 opacity-100">
            <p className="font-semibold">{session.data?.user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {session.data?.user?.email}
            </p>
          </div>
        )}
      </div>
      <Badge
        className={cn(
          "transition-opacity duration-300",
          isCollapsed ? "opacity-0 w-0" : "opacity-100"
        )}>
        {session.data?.user?.role}
      </Badge>
    </div>
  );
}

const SidebarLink = ({
  href,
  icon,
  label,
  isCollapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}) => (
  <Button
    variant="ghost"
    size={isCollapsed ? "icon" : "default"}
    className={cn(isCollapsed ? "rounded-full" : "w-full justify-start")}
    asChild>
    <Link href={href} prefetch={false}>
      {icon}
      {!isCollapsed && <span className="ml-2">{label}</span>}
    </Link>
  </Button>
);
