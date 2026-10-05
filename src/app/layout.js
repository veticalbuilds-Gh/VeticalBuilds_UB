import { Inter, Playfair_Display, Michroma } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const michroma = Michroma({ weight: '400', subsets: ["latin"], variable: "--font-michroma" });

export const metadata = {
  metadataBase: new URL('https://www.veticalbuilds.com'),
  title: {
    default: "Vetical Builds Pvt Ltd | Real Estate & Construction Company in Bangalore",
    template: "%s | Vetical Builds",
  },
  description: "Vetical Builds Pvt Ltd is a premium real estate and construction company in Bangalore delivering residential, commercial, and development solutions with a focus on quality and design.",
  openGraph: {
    title: "Vetical Builds Pvt Ltd | Real Estate & Construction",
    description: "Premium residential, commercial, and development projects in Bangalore.",
    url: "https://www.veticalbuilds.com",
    siteName: "Vetical Builds",
    images: [{ url: "https://www.veticalbuilds.com/logo.png", width: 1200, height: 630, alt: "Vetical Builds" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vetical Builds Pvt Ltd",
    description: "Premium residential, commercial, and development projects in Bangalore.",
    images: ["/og-image.jpg"],
  },
  verification: { google: "YOUR_SEARCH_CONSOLE_CODE" },
  icons: { /* aapka existing icons block jaisa hai waisa hi rehne do */ },
  robots: { index: true, follow: true },
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
                  "@type": "WebSite",
                  "@id": "https://www.veticalbuilds.com/#website",
                  "url": "https://www.veticalbuilds.com",
                  "name": "Vetical Builds",
                  "publisher": { "@id": "https://www.veticalbuilds.com/#business" }
                },
                {
                  "@type": ["GeneralContractor", "RealEstateAgent"],
                  "@id": "https://www.veticalbuilds.com/#business",
                  "name": "Vetical Builds Pvt Ltd",
                  "url": "https://www.veticalbuilds.com",
                  "logo": "https://www.veticalbuilds.com/logo.png",
                  "image": "https://www.veticalbuilds.com/og-image.jpg",
                  "telephone": "+919135537575",
                  "email": "info@veticalbuilds.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "APNA ASLI STREET ADDRESS",
                    "addressLocality": "Bangalore",
                    "addressRegion": "Karnataka",
                    "postalCode": "5600XX",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 12.9715987,
                    "longitude": 77.5945627
                  },
                  "areaServed": ["Bangalore", "Karnataka"],
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:30",
                    "closes": "18:30"
                  },
                  "sameAs": [
                    "https://www.instagram.com/veticalbuilds",
                    "https://www.linkedin.com/company/veticalbuilds"
                  ]
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
