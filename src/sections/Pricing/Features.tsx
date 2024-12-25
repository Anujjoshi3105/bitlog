import {
  CloudUpload,
  Rocket,
  Lock,
  UserCheck,
  Image,
  Search,
  Users,
  BarChart2,
} from "lucide-react";

const features = [
  {
    name: "AI Content Suggestions",
    description:
      "Leverage advanced AI to get intelligent content suggestions tailored to your niche and audience.",
    icon: CloudUpload,
  },
  {
    name: "Advanced SEO Optimization",
    description:
      "Boost your blog's visibility with built-in tools for optimizing keywords, metadata, and structure.",
    icon: Search,
  },
  {
    name: "Unlimited Image Generation",
    description:
      "Generate stunning visuals for your blog with AI-powered image creation tools.",
    icon: Image,
  },
  {
    name: "Multiple User Access",
    description:
      "Collaborate with your team seamlessly with multi-user access and shared editing tools.",
    icon: Users,
  },
  {
    name: "Custom Analytics Dashboard",
    description:
      "Track your blog's performance with detailed and customizable analytics dashboards.",
    icon: BarChart2,
  },
  {
    name: "Customizable Templates",
    description:
      "Choose from a wide variety of templates and customize them to match your brand identity.",
    icon: Lock,
  },
  {
    name: "24/7 Priority Support",
    description:
      "Get round-the-clock support from our dedicated team to resolve any issues promptly.",
    icon: Rocket,
  },
  {
    name: "Comprehensive Grammar Check",
    description:
      "Ensure error-free content with an advanced grammar and style checker integrated into the platform.",
    icon: UserCheck,
  },
];

export function Features() {
  return (
    <>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Empower Your Blog with Advanced Features
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Take your blogging to the next level with cutting-edge features
          designed to save time and improve quality.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
