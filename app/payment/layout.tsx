import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
  description: "AI4Car payment processing.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
