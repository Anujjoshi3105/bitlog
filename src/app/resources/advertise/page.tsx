import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Target,
  TrendingUp,
  Zap,
  BarChart2,
  Layout,
  Shield,
  Users,
  HeartHandshake,
  Megaphone,
} from "lucide-react";

const features = [
  {
    name: "Targeted Tech Audience",
    description:
      "Reach developers, IT professionals, and tech enthusiasts directly interested in your products.",
    icon: Target,
  },
  {
    name: "High Engagement Rates",
    description:
      "Benefit from our highly engaged readership, resulting in better conversion rates for your ads.",
    icon: TrendingUp,
  },
  {
    name: "Custom Content Integration",
    description:
      "Seamlessly integrate your brand message with our high-quality tech content for maximum impact.",
    icon: Zap,
  },
  {
    name: "Detailed Analytics",
    description:
      "Get comprehensive reports on ad performance, user engagement, and ROI metrics.",
    icon: BarChart2,
  },
  {
    name: "Flexible Ad Formats",
    description:
      "Choose from a variety of ad formats including banner ads, sponsored posts, and newsletter features.",
    icon: Layout,
  },
  {
    name: "Brand Safety",
    description:
      "Rest assured your ads appear alongside curated, high-quality tech content in a brand-safe environment.",
    icon: Shield,
  },
  {
    name: "Large Subscriber Base",
    description:
      "Tap into our extensive subscriber network of tech professionals and decision-makers.",
    icon: Users,
  },
  {
    name: "Dedicated Support",
    description:
      "Work with our experienced team to create and optimize your advertising campaigns for best results.",
    icon: HeartHandshake,
  },
];

export default function page() {
  return (
    <main className="space-y-24 overflow-hidden">
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Advertise with Us?
          </h2>
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary">
              <Megaphone className="h-12 w-12 text-white" />
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
              Advertise with Bitlog
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Reach a targeted audience of tech enthusiasts and developers.
              Showcase your products and services on the leading technology
              blog.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
