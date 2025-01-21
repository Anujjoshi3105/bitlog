import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Bug, Github } from "lucide-react";
import Newsletter from "./Newsletter";

interface FooterLink {
  href: string;
  label: string;
}

function FooterLinks({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="space-y-1 flex flex-col">
      <h4 className="text-lg font-bold uppercase mb-2">{title}</h4>
      {links.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          className="hover:underline text-muted-foreground hover:text-foreground underline-offset-2">
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function SiteFooter() {
  const t = useTranslations();

  const footerLinks = useMemo(
    () => ({
      explore: [
        { href: "/trending", label: t("navLinks.trending") },
        { href: "/community", label: t("navLinks.community") },
        { href: "/topics", label: t("navLinks.topics") },
      ],
      resource: [
        { href: "/resources/faqs", label: t("navLinks.faqs") },
        { href: "/resources/advertise", label: t("navLinks.advertise") },
        { href: "/resources/support", label: t("navLinks.support") },
      ],
    }),
    [t]
  );

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-muted/20 border-t-2 select-none">
      <div className="p-8 px-12 text-sm">
        <div className="container items-center grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
          <div>
            <Link
              href="/"
              className="text-primary link text-2xl font-extrabold block mb-2">
              BITLOG
            </Link>
            <p className="max-w-md md:max-w-xs mx-auto md:mx-0 text-pretty">
              {t("Description")}
            </p>
          </div>

          <FooterLinks
            title={t("navLinks.explore")}
            links={footerLinks.explore}
          />
          <FooterLinks
            title={t("navLinks.resources")}
            links={footerLinks.resource}
          />

          <Newsletter />
        </div>
      </div>

      <div className="bg-muted py-1 underline-offset-2 text-xs md:text-sm text-center flex flex-col-reverse md:flex-row justify-around items-center gap-2">
        <p>
          {t("Copyright")}&nbsp;
          <Link href="/" className="hover:underline text-primary">
            BITLOG
          </Link>
          &nbsp;&copy; {currentYear}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {["privacy", "terms", "support"].map((link) => (
            <Link
              key={link}
              href={`/resources/${link}`}
              className="hover:underline">
              {t(`navLinks.${link}`)}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          {[Bug, Github].map((Icon, index) => (
            <Button
              key={index}
              className="rounded-full"
              size="smIcon"
              variant="ghost">
              <Icon aria-hidden="true" />
              <span className="sr-only">{Icon.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
