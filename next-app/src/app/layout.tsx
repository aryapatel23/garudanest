import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "700", "900"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teamgarudanest.in";
const siteName = "GarudaNest";
const defaultTitle = "GarudaNest | Elite Developers Building Systems That Soar";
const defaultDescription = "GarudaNest is an elite engineering collective helping startups and growth teams design, build, and scale high-performance web platforms, backend systems, AI-powered workflows, and mobile products with senior engineering execution.";
const socialImage = "https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png";
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "YQV-b0FPeWTnr9LfzKVH7laCFbSlNNCORzFWJQH4yx8";

const iconImage = socialImage;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | GarudaNest"
  },
  description: defaultDescription,
  applicationName: siteName,
  keywords: [
    "GarudaNest",
    "full stack development",
    "AI development agency",
    "Next.js development",
    "mobile app development India",
    "backend engineering",
    "startup product engineering",
    "MVP development"
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/"
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: socialImage, type: "image/png" }],
    apple: [{ url: socialImage, type: "image/png" }],
    shortcut: [socialImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: googleSiteVerification
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "GarudaNest - Elite Developers Building Systems That Soar"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [socialImage]
  },
  category: "technology"
};

import { Preloader } from "@/components/ui/Preloader";
import { AmbientUI } from "@/components/ui/AmbientUI";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { GlobalAudio } from "@/components/ui/GlobalAudio";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: socialImage,
    contactPoint: {
      "@type": "ContactPoint",
      email: BRAND.email,
      contactType: "customer support"
    },
    sameAs: [
      BRAND.social.instagram,
      BRAND.social.twitter,
      BRAND.social.linkedin
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/work?query={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="scroll-smooth overflow-x-clip">
      <head>
        <meta name="google-site-verification" content={googleSiteVerification} />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href={iconImage} type="image/png" sizes="512x512" />
        <link rel="shortcut icon" href={iconImage} type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href={iconImage} type="image/png" sizes="512x512" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased text-white bg-[#050505] overflow-x-clip`}>
        <GoogleAnalytics gaId={gaId} />
        <MagneticCursor />
        <GlobalAudio />
        <Preloader />
        <AmbientUI />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

