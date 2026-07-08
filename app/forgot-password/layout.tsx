import type { Metadata } from "next";
import { GuestGuard } from "@/components/guest-guard";

export const metadata: Metadata = {
  alternates: {
    canonical: "/forgot-password",
  },
  title: "Forgot Password",
  description:
    "Reset your AI4Car account password. Enter your email to receive password reset instructions.",
  openGraph: {
    title: "Forgot Password - AI4Car",
    description: "Reset your AI4Car account password.",
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestGuard>{children}</GuestGuard>;
}
