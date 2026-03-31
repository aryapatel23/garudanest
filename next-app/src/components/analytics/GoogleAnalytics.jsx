"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

export function GoogleAnalytics({ gaId }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) return;

    const query = typeof window !== "undefined" ? window.location.search : "";
    const pagePath = `${pathname || ""}${query || ""}`;

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", gaId, {
        page_path: pagePath,
      });
    }
  }, [gaId, pathname]);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            send_page_view: true,
            page_path: window.location.pathname + window.location.search,
          });
        `}
      </Script>
    </>
  );
}
