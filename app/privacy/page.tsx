import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/privacy",
  },
  title: "Privacy Policy",
  description:
    "LinguaHub Privacy Policy. Learn how we collect, use, and protect your personal information as you learn languages with us.",
  openGraph: {
    title: "Privacy Policy - LinguaHub",
    description: "How LinguaHub handles your data and protects your privacy.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg space-y-8">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              1. Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              LinguaHub (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our platform and website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              2. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may collect information about you in various ways, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                <strong className="text-foreground">Personal Data:</strong> Email address,
                name, and other contact information you provide during registration.
              </li>
              <li>
                <strong className="text-foreground">Learning Data:</strong> Your chosen
                languages, course level, lesson attendance, and progress within our
                courses.
              </li>
              <li>
                <strong className="text-foreground">Usage Data:</strong> Information about
                how you use our platform, including features accessed and time
                spent.
              </li>
              <li>
                <strong className="text-foreground">Device Data:</strong> Device type,
                operating system, and unique device identifiers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use the collected information for various purposes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>To provide and maintain our service</li>
              <li>To deliver lessons and track your learning progress</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To improve our application and user experience</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              4. Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information. However, please note
              that no method of transmission over the Internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              5. Data Sharing
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third
              parties. We may share anonymized, aggregated data for research and
              improvement purposes. We may disclose your information if required
              by law or to protect our rights and safety.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              6. Your Rights
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              7. Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website uses cookies to enhance your experience. You can choose
              to accept or decline cookies through your browser settings. Declining
              cookies may prevent you from using some features of our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              8. Children&apos;s Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service is not intended for children under the age of 13. We do
              not knowingly collect personal information from children under 13.
              If you are a parent or guardian and believe your child has provided
              us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              9. Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              10. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact
              us at{" "}
              <a
                href="mailto:hello@linguahub.app"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                hello@linguahub.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
