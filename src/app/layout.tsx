import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TechAxis Global - Complexity Simplified | Enterprise IT Consulting & Solutions",
  description: "We manage your IT so you can manage your business. Enterprise IT consulting delivering digital transformation, ERP platforms, managed services, and cybersecurity.",
  alternates: {
    canonical: "https://techaxisglobal.com",
  },
  openGraph: {
    title: "TechAxis Global - Complexity Simplified",
    description: "We manage your IT so you can manage your business. Enterprise IT consulting delivering digital transformation, ERP platforms, managed services, and cybersecurity.",
    url: "https://techaxisglobal.com",
    siteName: "TechAxis Global LLC",
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-white text-[#1E293B] antialiased selection:bg-[#B42318] selection:text-white`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#B42318] text-white px-4 py-2 rounded-md z-[100]">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
