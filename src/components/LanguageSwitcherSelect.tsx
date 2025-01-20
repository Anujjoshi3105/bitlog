"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { getCountryName } from "@/lib/utils";
import { useParams } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { toast } from "sonner";

const localeToCountry: { [key: string]: string } = {
  en: "GB",
  de: "DE",
};

type Props = {
  defaultValue: string;
  label: string;
};

export default function LanguageSwitcherSelect({ defaultValue, label }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale as Locale }
    );
    setTimeout(() => {
      toast.success("Langauge changed successfully", {
        description: `You have successfully changed your language to ${getCountryName(
          nextLocale
        )}`,
      });
    }, 500);
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={onSelectChange}>
      <SelectTrigger
        className="text-xs focus:ring-0 focus:ring-offset-0"
        aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            <div className="text-xs flex items-center justify-center gap-2">
              <ReactCountryFlag
                countryCode={localeToCountry[locale] || "en"}
                svg
              />
              <span>{locale.toUpperCase()}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
