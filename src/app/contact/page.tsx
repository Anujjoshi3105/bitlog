import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main>
      <div className="space-y-6 container mx-auto max-w-3xl">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold">Get in touch</h1>
          <p>Let&apos;s talk about everything</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Your email" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="min-h-[150px] resize-none"
              id="message"
              placeholder="Tell us about your inquiry..."
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="privacy" required />
            <Label htmlFor="privacy" className="text-sm">
              By selecting this you agree to our&nbsp;
              <a href="/resources/privacy-policy" className="underline">
                Privacy Policy
              </a>
            </Label>
          </div>
          <Button className="w-full" size="lg" type="submit">
            Send message
          </Button>
        </form>
      </div>
    </main>
  );
}
