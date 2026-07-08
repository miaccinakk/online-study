import type { Metadata } from "next";
import { GuestGuard } from "@/components/guest-guard";

export const metadata: Metadata = {
  alternates: {
    canonical: "/login",
  },
  title: "Sign In",
  description:
    "Sign in to your AI4Car account to access your vehicle diagnostics dashboard and AI-powered analysis tools.",
  openGraph: {
    title: "Sign In - AI4Car",
    description: "Access your AI4Car account and vehicle diagnostics.",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestGuard>{children}</GuestGuard>;
}
