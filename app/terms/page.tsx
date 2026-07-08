import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/terms",
  },
  title: "Terms of Service",
  description:
    "LinguaHub Terms of Service. Read about user accounts, acceptable use, subscription policies, and liability limitations.",
  openGraph: {
    title: "Terms of Service - LinguaHub",
    description: "Terms and conditions for using the LinguaHub online language school.",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg space-y-8">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the LinguaHub platform and services, you agree
              to be bound by these Terms of Service. If you do not agree to these
              terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              LinguaHub provides online language education services, including
              live group lessons with native teachers, interactive exercises, and
              learning materials in English, French, Spanish, and German.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              3. User Accounts
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              To use certain features of our service, you must create an account.
              You are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete registration information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              4. Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              LinguaHub is provided &quot;as is&quot; without any warranties, express or
              implied. While our teachers and materials are designed to help you
              learn effectively, individual results and progress may vary
              depending on your effort, attendance, and practice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              5. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              LinguaHub shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              6. Acceptable Use
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Reverse engineer or decompile the application</li>
              <li>Share your account credentials with others</li>
              <li>Use the service to transmit harmful content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              7. Subscription and Payments
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Some features of LinguaHub require a paid subscription. By subscribing,
              you agree to pay all applicable fees. Subscriptions automatically
              renew unless canceled before the renewal date. Refunds are handled
              according to our refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              8. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, features, and functionality of LinguaHub, including but not
              limited to text, graphics, logos, lesson materials, and software, are the
              exclusive property of LinguaHub and are protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              9. Termination
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to terminate or suspend your account and access
              to our services at our sole discretion, without notice, for conduct
              that we believe violates these Terms of Service or is harmful to
              other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              10. Changes to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may modify these Terms of Service at any time. We will notify
              users of significant changes by posting a notice on our website or
              sending an email. Continued use of the service after changes
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              11. Governing Law
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service shall be governed by and construed in
              accordance with applicable laws. Any disputes arising from these
              terms shall be resolved through binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              12. Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at{" "}
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
