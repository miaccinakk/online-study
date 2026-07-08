import type { Metadata } from "next";
import { GuestGuard } from "@/components/guest-guard";

export const metadata: Metadata = {
  alternates: {
    canonical: "/forgot-password",
  },
  title: "Forgot Password",
  description:
    "Reset your LinguaHub account password. Enter your email to receive password reset instructions.",
  openGraph: {
    title: "Forgot Password - LinguaHub",
    description: "Reset your LinguaHub account password.",
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestGuard>{children}</GuestGuard>;
}
