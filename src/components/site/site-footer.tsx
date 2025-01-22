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
        { href: "/faqs", label: t("navLinks.faqs") },
        { href: "/advertise", label: t("navLinks.advertise") },
        { href: "/support-us", label: t("navLinks.support-us") },
      ],
    }),
    [t]
  );

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-muted/20 border-t-2 select-none">
      <div className="text-sm p-8 md:px-12 mx-auto items-center grid gap-6 md:grid-cols-2 xl:grid-cols-4 text-center md:text-left">
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

      <div className="bg-muted py-1 underline-offset-2 text-xs md:text-sm text-center flex flex-col-reverse lg:flex-row justify-around items-center gap-2">
        <p>
          {t("Copyright")}&nbsp;
          <Link href="/" className="hover:underline text-primary">
            BITLOG
          </Link>
          &nbsp;&copy; {currentYear}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {["privacy-policy", "terms-and-conditions", "support-us"].map(
            (link) => (
              <Link key={link} href={`/${link}`} className="hover:underline">
                {t(`navLinks.${link}`)}
              </Link>
            )
          )}
        </div>
        <div className="flex gap-4">
          <Button className="rounded-full" size="smIcon" variant="outline">
            <Link
              href="https://github.com/Anujjoshi3105/bitlog"
              target="_blank">
              <Github aria-hidden="true" />
              <span className="sr-only">Github</span>
            </Link>
          </Button>
          <Button className="rounded-full" size="smIcon" variant="outline">
            <Link
              href="https://github.com/Anujjoshi3105/bitlog/issues"
              target="_blank">
              <Bug aria-hidden="true" />
              <span className="sr-only">Bug</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
