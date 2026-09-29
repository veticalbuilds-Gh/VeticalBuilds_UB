import { Inter, Playfair_Display, Michroma } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const michroma = Michroma({ weight: '400', subsets: ["latin"], variable: "--font-michroma" });

export const metadata = {
  metadataBase: new URL('https://veticalbuilds.com'),
  title: "Vetical Builds Pvt Ltd | Real Estate & Construction Company",
  description: "Vetical Builds Pvt Ltd is a premium real estate and construction company delivering residential, commercial, and development solutions with a focus on quality and design.",
  keywords: ["Vetical Builds Pvt Ltd", "Vetical Builds Bangalore", "real estate developer Bangalore", "construction company", "residential projects", "commercial construction"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Vetical Builds Pvt Ltd | Real Estate & Construction",
    description: "Vetical Builds Pvt Ltd is a premium real estate and construction company delivering residential, commercial, and development solutions.",
    url: "https://veticalbuilds.com",
    siteName: "Vetical Builds",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/logo.ico?v=2' },
      { url: '/logo.png?v=2', type: 'image/png', sizes: '32x32' },
      { url: '/logo.png?v=2', type: 'image/png', sizes: '192x192' },
      { url: '/logo.png?v=2', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/logo.png?v=2' }
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";
import Preloader from "@/components/Preloader";
import FloatingWidgets from "@/components/FloatingWidgets";
import BrochureModalContainer from "@/components/BrochureModalContainer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://veticalbuilds.com/#organization",
                  "name": "Vetical Builds Pvt Ltd",
                  "url": "https://veticalbuilds.com",
                  "logo": "https://veticalbuilds.com/logo.png",
                  "sameAs": [
                    "https://www.instagram.com/veticalbuilds",
                    "https://www.linkedin.com/company/veticalbuilds"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://veticalbuilds.com/#localBusiness",
                  "name": "Vetical Builds Pvt Ltd",
                  "image": "https://veticalbuilds.com/logo.png",
                  "telephone": "+919501731511",
                  "url": "https://veticalbuilds.com",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Bangalore",
                    "addressRegion": "Karnataka",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 12.9715987,
                    "longitude": 77.5945627
                  },
                  "priceRange": "$$$"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${michroma.variable}`}>
        <Preloader />
        <Navbar />
        <MobileNavbar />
        <main>{children}</main>
        <FloatingWidgets />
        <Footer />
        <ContactPopup />
        <BrochureModalContainer />
      </body>
    </html>
  );
}
