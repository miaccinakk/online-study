import type { Metadata } from "next";
import { GuestGuard } from "@/components/guest-guard";

export const metadata: Metadata = {
  alternates: {
    canonical: "/login",
  },
  title: "Sign In",
  description:
    "Sign in to your LinguaHub account to access your language courses, live lessons, and learning dashboard.",
  openGraph: {
    title: "Sign In - LinguaHub",
    description: "Access your LinguaHub account and language courses.",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestGuard>{children}</GuestGuard>;
}
