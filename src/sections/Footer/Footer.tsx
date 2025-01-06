import Newsletter from "./Newsletter";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const explore = [
    { href: "/trending", label: t("navLinks.trending") },
    { href: "/community", label: t("navLinks.community") },
    { href: "/topics", label: t("navLinks.topics") },
  ];
  const resource = [
    { href: "/resources/faqs", label: t("navLinks.faqs") },
    { href: "/resources/advertise", label: t("navLinks.advertise") },
    { href: "/resources/support", label: t("navLinks.support") },
  ];
  return (
    <footer className="border-t-2 border-primary bg-primary/5 dark:bg-secondary/20 select-none">
      <div className="p-8 px-12 text-sm">
        <div className="container items-center grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
          {/* Brand Section */}
          <div>
            <Link href="/" className="link text-2xl font-extrabold block mb-2">
              BITLOG
            </Link>
            <p className="max-w-md md:max-w-xs mx-auto md:mx-0 text-pretty">
              {t("Description")}
            </p>
          </div>

          <div>
            <h5 className="text-lg font-bold uppercase mb-2">
              {t("navLinks.explore")}
            </h5>
            <ul className="space-y-1">
              {explore.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:underline underline-offset-2">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold uppercase mb-2">
              {t("navLinks.resources")}
            </h5>
            <ul className="space-y-1">
              {resource.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:underline underline-offset-2">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <Newsletter />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-primary text-background py-1 underline-offset-2 text-xs md:text-sm">
        <div className="text-center flex flex-col-reverse md:flex-row justify-around items-center gap-2">
          <p>
            {t("Copyright")}&nbsp;
            <Link href="/" className="hover:underline">
              BITLOG
            </Link>
            &nbsp;&copy; {new Date().getFullYear()}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Link href="/resources/privacy" className="hover:underline">
              {t("navLinks.privacy")}
            </Link>
            <Link href="/resources/terms" className="hover:underline">
              {t("navLinks.terms")}
            </Link>
            <Link href="/resources/support" className="hover:underline">
              {t("navLinks.support")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
