import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/Navigation";
import ScrollProvider from "./_components/ScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio - Mont-Fort Inspired Design",
  description:
    "A modern portfolio website with Mont-Fort inspired design and smooth animations",
  keywords: "portfolio, web development, design, Mont-Fort",
  authors: [{ name: "Portfolio Owner" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900 overflow-x-hidden`}
      >
        <Navigation />
        <ScrollProvider>
          <main className="relative" data-scroll-section>
            {children}
          </main>
        </ScrollProvider>
      </body>
    </html>
  );
}
