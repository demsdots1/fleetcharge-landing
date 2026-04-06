import type { Metadata } from "next";
import { Inter, DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "FleetCharge HQ — The Reconciliation Engine for Mixed-Fuel Fleets",
    template: "%s | FleetCharge HQ",
  },
  description:
    "Turn WEX EV charges into complete transaction records with verified kWh, vehicle ID, cost-per-mile, and an audit trail your CFO and auditor will accept.",
  keywords: [
    "fleet energy cost management",
    "EV fleet charging reconciliation",
    "multi-fuel fleet cost tracking",
    "WEX EV transaction data",
    "home charging reimbursement fleet",
    "fleet cost per mile EV vs diesel",
    "fleet financial management software",
  ],
  metadataBase: new URL("https://fleetchargehq.com"),
  openGraph: {
    title:
      "FleetCharge HQ — The Reconciliation Engine for Mixed-Fuel Fleets",
    description:
      "Turn WEX EV charges into complete transaction records with verified kWh, vehicle ID, cost-per-mile, and an audit trail.",
    url: "https://fleetchargehq.com",
    siteName: "FleetCharge HQ",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "FleetCharge HQ — The Reconciliation Engine for Mixed-Fuel Fleets",
    description:
      "Turn WEX EV charges into complete transaction records your CFO and auditor will accept.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FleetCharge HQ",
  applicationCategory: "BusinessApplication",
  description:
    "The reconciliation engine for mixed-fuel fleets. Complete EV transaction records, confidence scoring, and audit trails for fleet finance teams.",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "6",
    highPrice: "18",
    priceCurrency: "USD",
    offerCount: "3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-navy">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <GoogleTagManager gtmId="G-RPXXRQHQ21" />
      </body>
    </html>
  );
}
