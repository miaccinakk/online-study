import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mobile Authentication",
  description: "Authentication bridge for mobile app.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function MobileBridgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
