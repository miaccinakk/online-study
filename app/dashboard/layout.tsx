import type { Metadata } from "next";
import DashboardClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your AI4Car dashboard - manage your vehicles, view diagnostics history, and access AI-powered insights.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
