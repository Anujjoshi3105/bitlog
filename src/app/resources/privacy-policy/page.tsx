import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="prose prose-blue max-w-none dark:prose-invert">
          <h1 className="text-4xl font-bold uppercase mt-8 underline underline-offset-8">
            Privacy Policy
          </h1>
          <p>Last updated: December 25, 2024</p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">
              Our Commitment to Your Privacy
            </h2>
            <p className="mt-4">
              At Bitlog, we deeply value your trust and are dedicated to
              ensuring that your personal information is handled with the utmost
              care and transparency. This Privacy Policy details how we collect,
              use, protect, and share your data while using our platform. By
              engaging with Bitlog, you agree to the practices described herein.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Information We Collect</h2>

            <h3 className="mt-4 text-xl font-medium">Personal Data</h3>
            <p className="mt-2">
              The following types of personal information may be collected:
            </p>
            <ul className="bullet mt-2 pl-6">
              <li>Full name, contact details (email, phone number, address)</li>
              <li>Demographic data and government-issued identification</li>
              <li>
                Financial data, including income, expenses, and credit history
              </li>
              <li>Employment and professional details</li>
              <li>Images, signatures, and voice recordings</li>
              <li>Responses to surveys and customer feedback</li>
              <li>Device, browser, and usage information</li>
              <li>Location data when enabled on our app</li>
            </ul>

            <h3 className="mt-4 text-xl font-medium">Usage Data</h3>
            <p className="mt-2">Automatically collected data includes:</p>
            <ul className="bullet mt-2 pl-6">
              <li>IP addresses and device identifiers</li>
              <li>Browser types and versions</li>
              <li>Pages visited, time spent, and interaction logs</li>
              <li>Error reports and diagnostic data</li>
            </ul>

            <h3 className="mt-4 text-xl font-medium">Cookies and Tracking</h3>
            <p className="mt-2">
              We employ cookies and similar technologies to enhance your user
              experience, track preferences, and analyze platform performance.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">How We Use Your Data</h2>
            <p className="mt-2">
              Your data enables us to provide better services, including:
            </p>
            <ul className="bullet mt-2 pl-6">
              <li>
                Facilitating transactions and maintaining accurate records
              </li>
              <li>Enhancing your user experience through customization</li>
              <li>Ensuring compliance with legal regulations</li>
              <li>Developing insights through analytics and research</li>
              <li>Communicating updates, promotions, and support details</li>
              <li>Conducting risk assessments and identity verification</li>
              <li>Improving platform security and fraud prevention measures</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Sharing Your Data</h2>
            <p className="mt-2">
              We share your personal data only under these conditions:
            </p>
            <ul className="bullet mt-2 pl-6">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or court orders</li>
              <li>With trusted partners for service enhancement, under NDA</li>
              <li>To prevent fraud, manage risk, or recover debts</li>
              <li>During mergers, acquisitions, or similar corporate events</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">
              Data Security and Storage
            </h2>
            <p className="mt-2">
              Your data is stored within India and protected by state-of-the-art
              security measures, including:
            </p>
            <ul className="bullet mt-2 pl-6">
              <li>Encryption in transit and at rest</li>
              <li>Role-based access controls and monitoring</li>
              <li>Regular vulnerability assessments</li>
              <li>Incident response and recovery protocols</li>
            </ul>
            <p className="mt-2">
              Although we prioritize security, no system can be entirely secure.
              Please safeguard your account credentials to minimize risk.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Your Rights</h2>
            <p className="mt-2">
              Under applicable laws, you have the right to:
            </p>
            <ul className="bullet mt-2 pl-6">
              <li>Access and request a copy of your personal data</li>
              <li>Correct inaccuracies or update incomplete information</li>
              <li>Request data deletion, subject to retention obligations</li>
              <li>Withdraw consent for specific data uses</li>
              <li>Request data portability to another provider</li>
            </ul>
            <p className="mt-2">
              For assistance with these rights, contact us at the details below.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="mt-2">
              For queries or concerns about this policy, reach out to our
              Compliance Officer:
            </p>
            <address className="mt-4 not-italic">
              <strong>Compliance Officer:</strong> Anuj Joshi
              <br />
              <strong>Email:</strong> anujjoshi3105@gmail.com
              <br />
              <strong>Phone:</strong> +1-234-567-8900
              <br />
              <strong>Address:</strong> New Delhi, India
              <br />
            </address>
          </section>

          <section className="mt-8">
            <p className="italic">
              All the points listed here are yet to be fully achieved, but we
              are diligently working towards realizing them to the best of our
              abilities. This is a bootstrap project passionately run by
              developer <a href="https://anujjoshi.netlify.app">Anuj Joshi</a>,
              reflecting our vision of continuous improvement and innovation. We
              sincerely apologize for any inaccuracies or errors that may be
              present and encourage your <Link href="/contact">feedback</Link>
              &nbsp; to help us correct and refine our efforts. If you wish to
              contribute, share suggestions, or&nbsp;
              <Link href="/contact">contact us</Link>, please don&apos;t
              hesitate to reach out. Together, we can build something
              remarkable.
            </p>
          </section>
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
