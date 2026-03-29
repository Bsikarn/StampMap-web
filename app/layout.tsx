import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";

/**
 * Primary Font Configuration
 * Inter is used globally as a minimal, highly legible sans-serif typeface,
 * matching modern mobile app design standards.
 */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Global Metadata Configuration for SEO and System presentation.
 * This determines how the site appears in search engines and social cards.
 */
export const metadata: Metadata = {
  title: "StampMap - Interactive Stamp Map",
  description:
    "Collect stamps, explore locations, and exchange souvenirs with StampMap. Your interactive passport to the world.",
  keywords: ["stamp", "map", "travel", "passport", "souvenir", "collection"],
};

/**
 * Global Viewport Configuration.
 * Crucial for mobile PWA-like behavior. Disabling user scaling ensures
 * touch interactions (like double-taps) don't accidentally zoom the UI.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#A3D8F4",
};

/**
 * RootLayout Component
 * 
 * The top-most layout wrapper for the Next.js application.
 * It injects global CSS variables, intercepts parallel routes (@modal),
 * and permanently mounts the global BottomNav across all pages.
 */
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode; // Next.js parallel route slot for Intercepting Modals
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-slate-800`}>
        {/* Main content wrapper ensuring a mobile-first fullscreen viewport */}
        <div className="mx-auto min-h-dvh flex flex-col w-full relative">
          {children}
          {modal}   {/* Renders /@modal/... routes when applicable without unmounting base page */}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
