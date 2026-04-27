import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { AuthWrapper } from "@/components/auth/AuthWrapper";



/**
 * Primary Font: Outfit — Geometric Sans-serif
 * Chosen for its clean, modern, premium feel that matches Dribbble-quality UI.
 * 300-900 weight range allows fine typographic control across all UI layers.
 */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/**
 * SEO Metadata — Optimized for Jeju Island tourism discovery.
 * Includes rich keywords for organic search visibility.
 */
export const metadata: Metadata = {
  title: "StampMap — Jeju Island Digital Passport & Stamp Collection",
  description:
    "Explore Jeju Island like never before. Collect digital stamps, unlock exclusive souvenirs, and build your interactive travel passport with StampMap.",
  keywords: [
    "Jeju Island", "stamp map", "digital passport", "travel", "tourism",
    "Korea", "stamp collection", "souvenir", "interactive map", "hallasan",
  ],
  openGraph: {
    title: "StampMap — Jeju Island Digital Passport",
    description: "Collect digital stamps across Jeju Island's iconic locations.",
    type: "website",
  },
};

/**
 * Viewport Configuration for mobile PWA experience.
 * Theme color matches the Jeju Blue brand color for system chrome integration.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3B6CF4",
};

/**
 * RootLayout — Top-level shell for all pages.
 * Injects the Outfit font, global CSS, modal slot, and persistent BottomNav.
 */
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode; // Parallel route slot for intercepting modals
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased text-ink`}>
        {/* Global layout: full viewport, flex column, centered on wide screens */}
        <div className="mx-auto min-h-dvh flex flex-col w-full relative">
          <AuthWrapper>
            {children}
            {modal}
            <BottomNav />
          </AuthWrapper>
        </div>
      </body>
    </html>
  );
}
