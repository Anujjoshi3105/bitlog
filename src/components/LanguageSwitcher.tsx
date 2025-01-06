"use client";

import { useLocale } from "next-intl";
import LanguageSwitcherSelect from "./LanguageSwitcherSelect";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const locale = useLocale();

  return (
    <div className={cn("flex items-center", className)}>
      <LanguageSwitcherSelect defaultValue={locale} label="Select a locale" />
    </div>
  );
}
