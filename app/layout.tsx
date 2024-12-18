import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import Footer from "./Footer";
import "./globals.css";
import Navbar from "./NavBar";
import { Providers } from "./Providers";
import { getServerSession } from "next-auth";
import { options } from "@/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PulseArt",
  description: "Interpreting our world through art",
  openGraph: {
    title: "PulseArt",
    description: "Interpreting our world through art",
    url: "",
    siteName: "PulseArt",
    images: [
      {
        secureUrl: "https://INSERT_IMAGE",
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        secureUrl: "https://INSERT_IMAGE",
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseArt",
    description: "Interpreting our world through art",
    creator: "Donovan Courtney",
    images: ["https://INSERT_IMAGE"],
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  minimumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use next/headers to get the user-agent
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile =
    /(android.+mobile|iphone|ipod|ipad|blackberry|bb10|mini|windows\sce|palm)/i.test(
      userAgent
    );
  const session = await getServerSession(options);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
        <Providers session={session} isMobile={isMobile}>
          <Navbar />
          <main className="md:px-5 scrollbar-hide text-content1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
