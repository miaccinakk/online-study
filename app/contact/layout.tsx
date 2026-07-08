import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  title: "Contact Us",
  description:
    "Contact the LinguaHub support team. Get help with your language courses, subscription questions, or technical assistance.",
  openGraph: {
    title: "Contact Us - LinguaHub",
    description: "Reach out to the LinguaHub support team for assistance.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
