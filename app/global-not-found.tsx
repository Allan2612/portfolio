import type { Metadata } from "next";
import { STIX_Two_Text } from "next/font/google";
import { NotFoundContent } from "@/components/not-found";
import "./globals.css";

// For URLs outside /en and /es (the root layout lives in [locale], so there is no layout to reuse here).
const stix = STIX_Two_Text({ subsets: ["latin", "latin-ext"], variable: "--font-stix" });

export const metadata: Metadata = {
  title: "Page not found · Página no encontrada",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={stix.variable}>
      <body>
        <NotFoundContent />
      </body>
    </html>
  );
}
