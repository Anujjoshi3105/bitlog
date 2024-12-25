import {
  FileText,
  Shield,
  MessageCircle,
  Megaphone,
  DollarSign,
  Heart,
} from "lucide-react";
import Link from "next/link";

const supportItems = [
  {
    name: "Pricing",
    description:
      "Explore the different pricing plans and choose the one that best suits your needs.",
    icon: DollarSign,
    link: "/resources/pricing",
  },
  {
    name: "Terms and Conditions",
    description:
      "Review the terms and conditions that govern the use of our platform and services.",
    icon: FileText,
    link: "/resources/terms-and-conditions",
  },
  {
    name: "Privacy Policy",
    description:
      "Understand how we collect, use, and protect your personal data in accordance with privacy laws.",
    icon: Shield,
    link: "/resources/privacy-policy",
  },
  {
    name: "FAQs",
    description:
      "Find answers to commonly asked questions about our platform, features, and policies.",
    icon: MessageCircle,
    link: "/resources/faqs",
  },
  {
    name: "Support Us",
    description:
      "Learn how you can support our platform through donations, partnerships, or other means.",
    icon: Heart,
    link: "/resources/support",
  },
  {
    name: "Advertise",
    description:
      "Discover opportunities to advertise your brand or business on our platform.",
    icon: Megaphone,
    link: "/resources/advertise",
  },
];

export default function page() {
  return (
    <main>
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-semibold leading-7 text-primary">
          Unlock Your Potential
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Your Gateway to Assistance
        </h1>
        <p className="mt-4 text-base leading-snug text-muted-foreground">
          Explore guides, tutorials, policies, and more to make the most out of
          our platform.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2">
          {supportItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              passHref
              className="hover:scale-[1.02] duration-100">
              <div className="relative pl-16">
                <div className="text-base font-semibold leading-7">
                  <div className="absolute left-0  flex size-10 items-center justify-center rounded-lg bg-primary">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  {item.name}
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-snug">
                  {item.description}
                </p>
                <p className="mt-2 text-sm underline underline-offset-2">
                  Learn more
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
