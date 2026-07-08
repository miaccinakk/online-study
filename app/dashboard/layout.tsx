import type { Metadata } from "next";
import DashboardClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your LinguaHub dashboard - manage your courses, track your learning progress, and access your lessons.",
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
