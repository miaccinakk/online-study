import type { Metadata } from "next";
import { GuestGuard } from "@/components/guest-guard";

export const metadata: Metadata = {
  alternates: {
    canonical: "/register",
  },
  title: "Create Account",
  description:
    "Create a free LinguaHub account to start learning English, French, Spanish, or German with live lessons and expert teachers.",
  openGraph: {
    title: "Create Account - LinguaHub",
    description: "Join LinguaHub and start learning a new language today.",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestGuard>{children}</GuestGuard>;
}
