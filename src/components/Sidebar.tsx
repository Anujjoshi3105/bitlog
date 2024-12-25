"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
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
    label: "Settings",
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
        "bg-primary/5 relative flex flex-col items-center justify-between h-screen py-6 px-2 md:py-8 md:px-4 border-r transition-all duration-300 ease-in-out",
        isCollapsed || isMobile ? "w-20" : "w-64"
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
          className="absolute top-1/2 -right-5 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
          size="icon"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      )}
    </aside>
  );
}

function UserInfo({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex justify-center items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="User avatar"
          />
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="ml-2 opacity-100">
            <p className="font-semibold">Anuj Joshi</p>
            <p className="text-xs text-muted-foreground">@anujjoshi3105</p>
          </div>
        )}
      </div>
      <Badge
        variant="secondary"
        className={cn(
          "transition-opacity duration-300",
          isCollapsed ? "opacity-0 w-0" : "opacity-100"
        )}>
        admin
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
