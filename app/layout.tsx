import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { AuthProvider } from "@/lib/auth-context";
import { PaymentTrackingProvider } from "@/lib/payment-tracking-context";
import { PaymentStatusIndicator } from "@/components/payment-status-indicator";
import { YandexMetricaProvider } from "@artginzburg/next-ym";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://linguahub.app"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "LinguaHub - Online Language School | Learn English, French, Spanish & German",
    template: "%s | LinguaHub",
  },
  description:
    "Learn a new language online with live lessons and native teachers. Courses in English, French, Spanish, and German for every level. Start free today.",
  keywords: [
    "online language school",
    "learn english online",
    "learn french online",
    "learn spanish online",
    "learn german online",
    "language courses",
    "live language lessons",
    "native teachers",
    "online language classes",
    "language learning",
  ],
  authors: [{ name: "LinguaHub Team" }],
  creator: "LinguaHub",
  publisher: "LinguaHub",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://linguahub.app",
    siteName: "LinguaHub",
    title: "LinguaHub - Online Language School",
    description:
      "Learn a new language online with live lessons and native teachers. Courses in English, French, Spanish, and German. Start free today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LinguaHub - Online Language School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinguaHub - Online Language School",
    description:
      "Learn a new language online with live lessons and native teachers. Courses in English, French, Spanish, and German. Start free today.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "LinguaHub",
    url: "https://linguahub.app",
    logo: "https://linguahub.app/logo.svg",
    description: "Online language school offering live lessons with native teachers in English, French, Spanish, and German.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://linguahub.app/contact"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LinguaHub",
    url: "https://linguahub.app",
    description: "Online language school with live lessons and native teachers.",
    publisher: {
      "@type": "Organization",
      name: "LinguaHub"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://linguahub.app/courses/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "LinguaHub Language Courses",
    description: "Live online language courses in English, French, Spanish, and German for all levels.",
    itemListElement: [
      {
        "@type": "Course",
        name: "English Course",
        description: "Learn English online with native teachers, from beginner to advanced.",
        provider: { "@type": "Organization", name: "LinguaHub", url: "https://linguahub.app" }
      },
      {
        "@type": "Course",
        name: "French Course",
        description: "Learn French online with live lessons and small groups.",
        provider: { "@type": "Organization", name: "LinguaHub", url: "https://linguahub.app" }
      },
      {
        "@type": "Course",
        name: "Spanish Course",
        description: "Learn Spanish online with conversation-focused lessons.",
        provider: { "@type": "Organization", name: "LinguaHub", url: "https://linguahub.app" }
      },
      {
        "@type": "Course",
        name: "German Course",
        description: "Learn German online with experienced native teachers.",
        provider: { "@type": "Organization", name: "LinguaHub", url: "https://linguahub.app" }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans`}>
        <YandexMetricaProvider
          tagID={109370160}
          initParameters={{
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            ecommerce: "dataLayer",
          }}
        >
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-Q9RSBYSVFK"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q9RSBYSVFK');
            `}
          </Script>
          <AuthProvider>
            <PaymentTrackingProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <CookieBanner />
              <PaymentStatusIndicator />
            </PaymentTrackingProvider>
          </AuthProvider>
        </YandexMetricaProvider>
      </body>
    </html>
  );
}
