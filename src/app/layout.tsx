import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/Navigation";
import ScrollProvider from "./_components/ScrollProvider";
import BrowserCompatibility from "./_components/BrowserCompatibility";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jing Feng's Portfolio",
  description:
    "A modern portfolio website with Mont-Fort inspired design and smooth animations",
  keywords: "portfolio, web development, design",
  authors: [{ name: "Cheah Jing Feng" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} font-sans antialiased bg-white text-gray-900 overflow-x-hidden`}
      >
        <BrowserCompatibility />
        <Navigation />
        <ScrollProvider>
          <main id="main-content" className="relative" data-scroll-section>
            {children}
          </main>
        </ScrollProvider>
      </body>
    </html>
  );
}
