import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: 'swap',
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TechAxis Global | Enterprise IT Consulting & Solutions",
  description: "We manage your IT so you can manage your business. Enterprise IT consulting delivering digital transformation, ERP platforms, managed services, and cybersecurity.",
  alternates: {
    canonical: "https://techaxisglobal.com",
  },
  openGraph: {
    title: "TechAxis Global | Enterprise IT Consulting & Solutions",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TechAxis Global LLC",
    "alternateName": "TAG",
    "url": "https://techaxisglobal.com",
    "logo": "https://techaxisglobal.com/tag-logo-full.png",
    "description": "Enterprise IT consulting delivering digital transformation, ERP platforms, managed services, data analytics, and cybersecurity.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8401 Mayland Dr, Ste S",
      "addressLocality": "Richmond",
      "addressRegion": "VA",
      "postalCode": "23294",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-434-285-4949",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://www.linkedin.com/company/techaxisglobal",
      "https://x.com/techaxisglobal",
      "https://facebook.com/techaxisglobal"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${fontDisplay.variable} font-sans min-h-screen flex flex-col bg-white text-zinc-900 antialiased selection:bg-[#B42318] selection:text-white`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#B42318] text-white px-4 py-2 rounded-lg font-medium shadow-md z-[100] focus:outline-none">
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
