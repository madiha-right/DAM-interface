import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/shadcn";
import { siteConfig } from "@/utils/site";
import "./globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  // metadataBase: new URL(CDN_PUNK_URL), TODO:
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["Defi", "Ecosystem fund", "Grant", "Mantle", "Metis", "Layer 2", "L2", "Voting"],
  authors: [{ name: "DAM", url: siteConfig.url }],
  creator: "@0xMaki, @Glovin_, @madiha_right",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // images: siteConfig.ogImage,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // images: siteConfig.ogImage,
    creator: "@0xMaki, @Glovin_, @madiha_right",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/site.webmanifest`,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn(fontSans.variable, "bg-background font-sans text-foreground")}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
