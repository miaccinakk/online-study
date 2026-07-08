import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  title: "Contact Us",
  description:
    "Contact the AI4Car support team. Get help with your OBD2 diagnostics, subscription questions, or technical assistance.",
  openGraph: {
    title: "Contact Us - AI4Car",
    description: "Reach out to AI4Car support team for assistance.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
