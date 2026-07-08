import type { Metadata } from "next";
import { GuestGuard } from "@/components/guest-guard";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Set a new password for your AI4Car account.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Reset Password - AI4Car",
    description: "Create a new password for your AI4Car account.",
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestGuard>{children}</GuestGuard>;
}
