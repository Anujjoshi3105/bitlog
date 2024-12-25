import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="prose prose-blue max-w-none dark:prose-invert">
          <h1 className="text-4xl font-bold uppercase mt-8 underline underline-offset-8">
            Terms & Conditions
          </h1>
          <p>Last updated: December 25, 2024</p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">General Terms</h2>

            <h3 className="mt-4 text-xl font-medium">Use of Our Service</h3>
            <p className="mt-2">
              By accessing and placing an order with Bitlog, you confirm your
              agreement to our policies. We are not liable for any indirect
              damages arising from your use or inability to use our site. We may
              change prices and policies at any time and will notify you of
              significant changes through email or our platform.
            </p>

            <h3 className="mt-4 text-xl font-medium">Content Ownership</h3>
            <p className="mt-2">
              All content stored and displayed on our website belongs to Bitlog.
              If you believe any content infringes your copyright or is pirated,
              please contact us. Upon verification, we will remove the
              infringing content within 3 to 6 months.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">User Account</h2>

            <h3 className="mt-4 text-xl font-medium">Account Responsibility</h3>
            <p className="mt-2">
              For some services, an account is required. Keep your account
              details confidential. Providing false information may lead to
              account termination.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Products and Services</h2>

            <h3 className="mt-4 text-xl font-medium">
              Digital Product Delivery
            </h3>
            <p className="mt-2">
              All our products are 100% digital and delivered electronically.
              They can be accessed on your account page. We are not responsible
              for delays outside our control. If technology issues prevent
              access, you will find your purchases on the account page.
            </p>

            <h3 className="mt-4 text-xl font-medium">Order Cancellation</h3>
            <p className="mt-2">
              We may cancel orders at any time for any reason. If this happens,
              we will notify you and issue a refund.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Third-Party Links</h2>

            <h3 className="mt-4 text-xl font-medium">External Sites</h3>
            <p className="mt-2">
              Our website may include links to third-party sites. We are not
              responsible for their content or practices. Please review their
              terms and conditions.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">
              Product Availability and Errors
            </h2>

            <h3 className="mt-4 text-xl font-medium">Information Accuracy</h3>
            <p className="mt-2">
              We strive to provide up-to-date information about our 100% digital
              products, but errors in pricing and availability may occur. We
              reserve the right to correct any errors without liability.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Data Rights</h2>

            <h3 className="mt-4 text-xl font-medium">
              Data Modification and Deletion
            </h3>
            <p className="mt-2">
              For details on how we handle data modification, deletion, and
              protect your privacy, please refer to our&nbsp;
              <Link href="/resources/privacy-policy">Privacy Policy</Link>.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Changes to Terms</h2>

            <h3 className="mt-4 text-xl font-medium">Liability Cap</h3>
            <p className="mt-2">
              We are not liable for data loss, lost profits, or any damages
              arising from the use of our site.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">
              Governing Law and Jurisdiction
            </h2>

            <h3 className="mt-4 text-xl font-medium">Legal Framework</h3>
            <p className="mt-2">
              These terms are governed by applicable federal laws and
              regulations. Any disputes arising from or relating to the terms
              shall be subject to the exclusive jurisdiction of the competent
              courts as determined by applicable law.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Contact Information</h2>

            <h3 className="mt-4 text-xl font-medium">Queries</h3>
            <p className="mt-2">
              If you have questions about these terms or the handling of content
              on our site, please contact us via chat from our website. For
              concerns regarding copyright infringement, please contact us. Upon
              verification, we will take appropriate steps to remove such
              content within 3 to 6 months.
            </p>
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
