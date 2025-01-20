import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SettingsIcon } from "lucide-react";
import { Mode } from "./Mode";
import LanguageSwitcher from "../LanguageSwitcher";

export const SiteSettings = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-full flex hover:rotate-45 duration-300"
          aria-label="Settings">
          <SettingsIcon className="" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex gap-4 items-center w-fit" align="end">
        <LanguageSwitcher />
        <Mode />
      </PopoverContent>
    </Popover>
  );
};
