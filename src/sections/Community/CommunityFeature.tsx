import { Trophy } from "lucide-react";

export default function CommunityFeature() {
  const features = [
    {
      title: "Learn from Experts",
      description:
        "Access exclusive tutorials, workshops, and mentorship opportunities from industry leaders.",
    },
    {
      title: "Build Together",
      description:
        "Collaborate on projects, share feedback, and grow your skills with fellow makers.",
    },
    {
      title: "Stay Updated",
      description:
        "Get the latest insights on technology trends, best practices, and innovation.",
    },
    {
      title: "Grow Your Network",
      description:
        "Connect with like-minded individuals and expand your professional network.",
    },
  ];
  return (
    <section className="space-y-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center">
        Why Join Our Community?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className="p-2 rounded-full bg-primary/10 h-fit">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
