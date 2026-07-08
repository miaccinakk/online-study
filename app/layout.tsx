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
  metadataBase: new URL("https://ai4car.app"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "AI4Car - OBD2 Scanner App for Android & iPhone | Car Diagnostic App",
    template: "%s | AI4Car",
  },
  description:
    "The best OBD2 scanner app for Android and iPhone. Scan car errors, read fault codes, and get AI-powered vehicle diagnostics via Bluetooth or Wi-Fi. Download free.",
  keywords: [
    "obd2 scanner app",
    "car diagnostic app",
    "obd2 scanner for android",
    "obd2 scanner for iphone",
    "scan car errors",
    "check engine scanner app",
    "car fault code reader",
    "obd2 bluetooth scanner app",
    "vehicle diagnostics app",
    "obd2 app download",
    "car error code scanner",
    "AI car diagnostics",
  ],
  authors: [{ name: "AI4Car Team" }],
  creator: "AI4Car",
  publisher: "AI4Car",
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
    url: "https://ai4car.app",
    siteName: "AI4Car",
    title: "AI4Car - Best OBD2 Scanner App for Android & iPhone",
    description:
      "The #1 OBD2 scanner app for Android and iPhone. Scan car errors, read fault codes, and get AI-powered vehicle diagnostics. Download free today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI4Car - Smart OBD2 Diagnostics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI4Car - Best OBD2 Scanner App for Android & iPhone",
    description:
      "The #1 OBD2 scanner app. Scan car errors, read fault codes, and get AI-powered diagnostics on your smartphone. Download free.",
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
    "@type": "Organization",
    name: "AI4Car",
    url: "https://ai4car.app",
    logo: "https://ai4car.app/logo.svg",
    description: "AI-powered OBD2 scanner app for Android and iPhone. Scan car errors, read fault codes, and get smart vehicle diagnostics.",
    foundingDate: "2024",
    sameAs: [
      "https://play.google.com/store/apps/details?id=com.ai4car.app",
      "https://apps.apple.com/app/ai4car"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://ai4car.app/contact"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI4Car",
    url: "https://ai4car.app",
    description: "The best OBD2 scanner app for Android and iPhone with AI-powered diagnostics.",
    publisher: {
      "@type": "Organization",
      name: "AI4Car"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ai4car.app/problems/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI4Car - OBD2 Scanner",
    operatingSystem: "Android, iOS",
    applicationCategory: "UtilitiesApplication",
    description: "AI-powered OBD2 scanner app. Scan car errors, read fault codes, check engine light diagnostics via Bluetooth or Wi-Fi.",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Free Plan",
        description: "Basic error scanning, 3 full scans per month, 4 Live Data PIDs"
      },
      {
        "@type": "Offer",
        price: "15",
        priceCurrency: "USD",
        name: "Pro Plan",
        description: "Unlimited scans, 20 Live Data PIDs, 1M AI tokens, 3 vehicles"
      },
      {
        "@type": "Offer",
        price: "25",
        priceCurrency: "USD",
        name: "Premium Plan",
        description: "Unlimited Live Data PIDs, 5M AI tokens, 5 vehicles"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1"
    },
    downloadUrl: "https://ai4car.app/downloads",
    screenshot: "https://ai4car.app/og-image.jpg",
    softwareVersion: "1.0",
    author: {
      "@type": "Organization",
      name: "AI4Car"
    }
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
