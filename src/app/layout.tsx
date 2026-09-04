import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://meridianpass.com";

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meridian — Private Travel Membership & Bespoke Destinations",
    template: "%s | Meridian",
  },
  description:
    "One private membership granting direct access to unlisted luxury residences and curated itineraries across Kyoto, Amalfi, Marrakech, Reykjavík, and Cappadocia.",
  keywords: [
    "Meridian travel pass",
    "private luxury membership",
    "bespoke travel itinerary",
    "off-market residences",
    "curated travel experiences",
  ],
  authors: [{ name: "Meridian Club" }],
  creator: "Meridian Club",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Meridian — Private Travel Membership & Curated Itineraries",
    description:
      "One private membership. Every door. Explore direct entry to premier off-market residences worldwide.",
    url: SITE_URL,
    siteName: "Meridian",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Meridian Private Travel Membership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian — Private Travel Membership & Bespoke Destinations",
    description:
      "One private membership. Every door. Explore direct entry to premier off-market residences worldwide.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Meridian",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description:
        "Private club membership for luxury residences and curated travel itineraries.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Meridian",
      publisher: { "@id": `${SITE_URL}/#organization` },
      description: "Private travel membership and curated itineraries.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${satoshi.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans selection:bg-foreground selection:text-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <TooltipProvider delayDuration={150}>
              {children}
            </TooltipProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
