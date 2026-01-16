import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AdaptiveLayout } from "@/components/adaptive/AdaptiveLayout";
import { ToastProvider } from "@/components/providers/ToastProvider";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Cashew Growers Association of Zambia (CGAZ)",
  description:
    "Empowering 22,490 cashew farmers across Zambia through sustainable agricultural practices, training programs, and community development.",
  keywords: [
    "cashew",
    "cashew farming",
    "Zambia agriculture",
    "CGAZ",
    "cashew growers",
    "agricultural association",
    "farmers training",
    "sustainable farming",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo/cashew-logo.png",
  },
  authors: [{ name: "CGAZ" }],
  creator: "Fluxium Software Agency",
  publisher: "Cashew Growers Association of Zambia",
  openGraph: {
    type: "website",
    locale: "en_ZM",
    url: "https://cgaz.org",
    title: "Cashew Growers Association of Zambia (CGAZ)",
    description:
      "Empowering cashew farmers across Zambia through sustainable agricultural practices and training programs.",
    siteName: "CGAZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cashew Growers Association of Zambia (CGAZ)",
    description:
      "Empowering cashew farmers across Zambia through sustainable agricultural practices.",
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

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased bg-neutral-50 text-neutral-900`}>
        <ToastProvider />
        <AdaptiveLayout>{children}</AdaptiveLayout>
      </body>
    </html>
  );
}
