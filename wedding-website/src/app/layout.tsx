import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarah & Michael | Wedding Invitation",
  description: "Join us as we celebrate our special day. December 15, 2024",
  keywords: "wedding, invitation, Sarah, Michael, celebration, marriage",
  authors: [{ name: "Sarah & Michael" }],
  openGraph: {
    title: "Sarah & Michael | Wedding Invitation",
    description: "Join us as we celebrate our special day. December 15, 2024",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sarah & Michael Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarah & Michael | Wedding Invitation",
    description: "Join us as we celebrate our special day. December 15, 2024",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${dancing.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
