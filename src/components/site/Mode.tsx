"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Mode({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("rounded-full", className)}
      onClick={toggleTheme}>
      <Sun className="scale-100 transition-all dark:scale-0" />
      <Moon className="absolute scale-0 transition-all dark:scale-100" />
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
}
