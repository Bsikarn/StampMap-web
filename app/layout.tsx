import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Primary font: Poppins (modern, clean sans-serif per spec)
const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StampMap - Interactive Stamp Map",
  description:
    "Collect stamps, explore locations, and exchange souvenirs with StampMap. Your interactive passport to the world.",
  keywords: ["stamp", "map", "travel", "passport", "souvenir", "collection"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#A3D8F4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {/* Main content area with mobile-first max width */}
        <div className="mx-auto min-h-dvh w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
