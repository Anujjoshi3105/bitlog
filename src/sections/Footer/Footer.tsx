import footerLinks from "@/data/footerLinks.json";
import bottomLinks from "@/data/bottomLinks.json";
import Link from "next/link";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer() {
  return (
    <footer className="border-t-2 border-primary bg-primary/5 select-none">
      <div className="p-8 px-12 text-sm">
        <div className="container items-center grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
          {/* Brand Section */}
          <div>
            <Link
              href="/"
              className="link text-2xl text-primary font-extrabold block mb-2">
              BITLOG
            </Link>
            <p className="max-w-md md:max-w-xs mx-auto md:mx-0 text-pretty">
              A developer&apos;s journey through in-depth tutorials, expert
              insights, and real-world stories. Empowering you with the
              knowledge and community to excel in tech.
            </p>
          </div>

          {/* Dynamic Sections */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h5 className="text-lg font-bold uppercase mb-2 text-primary">
                {title}
              </h5>
              <ul className="space-y-1">
                {links.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="hover:underline underline-offset-2">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div>
            <h5 className="text-lg font-bold uppercase mb-3 text-primary">
              Newsletter
            </h5>
            <p className="max-w-xs mx-auto md:mx-0">
              Stay updated on the latest news and events. Subscribe now!
            </p>
            <FooterNewsletter />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-primary text-background py-1 underline-offset-2 text-xs md:text-sm">
        <div className="text-center flex flex-col-reverse md:flex-row justify-around items-center gap-2">
          <p>
            All rights are reserved by&nbsp;
            <Link href="/" className="hover:underline">
              BITLOG
            </Link>
            &nbsp;&copy; {new Date().getFullYear()}
          </p>
          <ul className="grid grid-cols-3 gap-2">
            {bottomLinks.map(({ title, href }) => (
              <li key={title}>
                <Link href={href} className="hover:underline">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
