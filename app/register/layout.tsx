import type { Metadata } from "next";
import { GuestGuard } from "@/components/guest-guard";

export const metadata: Metadata = {
  alternates: {
    canonical: "/register",
  },
  title: "Create Account",
  description:
    "Create a free AI4Car account to start diagnosing your vehicle with AI-powered OBD2 scanning technology.",
  openGraph: {
    title: "Create Account - AI4Car",
    description: "Join AI4Car and start diagnosing your vehicle today.",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestGuard>{children}</GuestGuard>;
}
