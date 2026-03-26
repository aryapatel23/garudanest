import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "700", "900"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "GarudaNest | Elite Developers Building Systems That Soar",
  description: "A tight collective of top full-stack, backend & AI engineers turning bold ideas into scalable reality. Fast. Reliable. Production-Ready.",
  openGraph: {
    title: "GarudaNest | Digital Systems That Soar",
    description: "Elite full-stack & AI developers building scalable production-grade systems.",
    url: "https://garudanest.com",
    siteName: "GarudaNest",
    locale: "en_US",
    type: "website",
  },
};

import { Preloader } from "@/components/ui/Preloader";
import { AmbientUI } from "@/components/ui/AmbientUI";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GarudaNest",
              url: "https://garudanest.com",
              logo: "https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png",
              contactPoint: {
                "@type": "ContactPoint",
                email: "teamgarudanest@gmail.com",
                contactType: "customer support"
              },
              sameAs: [
                "https://www.instagram.com/teamgarudanest/",
                "https://x.com/teamgarudanest",
                "https://www.linkedin.com/in/teamgarudanest/"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased text-white bg-[#050505] overflow-x-hidden`}>
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
