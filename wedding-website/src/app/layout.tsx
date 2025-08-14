import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

// Optimized font loading with display swap
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Only load when needed
});

// Enhanced metadata for SEO and performance
export const metadata: Metadata = {
  title: {
    default: "Neru & AI Wedding Invitation | Join Our Special Day",
    template: "%s | Neru & AI Wedding",
  },
  description: "You are cordially invited to celebrate the wedding of Neru and AI. Join us for a beautiful ceremony filled with love, joy, and unforgettable memories on December 15, 2024.",
  keywords: [
    "wedding invitation",
    "Neru and AI wedding", 
    "wedding ceremony",
    "RSVP",
    "wedding celebration",
    "December 2024 wedding",
    "love story",
    "wedding details",
  ],
  authors: [{ name: "Neru & AI" }],
  creator: "Wedding Website",
  publisher: "Wedding Website",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Neru & AI Wedding Invitation",
    description: "You are cordially invited to celebrate our special day. Join us for a beautiful wedding ceremony filled with love and joy on December 15, 2024.",
    type: "website",
    locale: "en_US",
    siteName: "Neru & AI Wedding",
    images: [
      {
        url: "/images/og-wedding.jpg",
        width: 1200,
        height: 630,
        alt: "Neru & AI Wedding Invitation - Join us on December 15, 2024",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neru & AI Wedding Invitation",
    description: "You are cordially invited to celebrate our special day on December 15, 2024.",
    images: ["/images/og-wedding.jpg"],
    creator: "@wedding",
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon", 
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

// Optimized viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable} ${dancing.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Neru & AI Wedding Ceremony",
              description: "Wedding ceremony and celebration of Neru and AI",
              startDate: "2024-12-15T09:00:00",
              endDate: "2024-12-15T17:00:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Wedding Venue",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "City",
                  addressCountry: "Country",
                },
              },
              organizer: {
                "@type": "Person",
                name: "Neru & AI",
              },
            }),
          }}
        />
      </head>
      <body
        className={`
          min-h-screen 
          bg-gradient-to-br from-black via-gray-900 to-gray-800 
          text-white 
          font-sans 
          antialiased
          overflow-x-hidden
        `}
        suppressHydrationWarning
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-gold-500 text-black px-4 py-2 rounded-br-lg transition-all duration-300"
        >
          Skip to main content
        </a>
        
        <div id="main-content">
          {children}
        </div>
        
        {/* No-JS fallback */}
        <noscript>
          <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
            <div className="text-center p-8 bg-white text-black rounded-lg max-w-md mx-4">
              <h2 className="text-2xl font-bold mb-4">JavaScript Required</h2>
              <p className="mb-4">
                This wedding invitation requires JavaScript to display properly. 
                Please enable JavaScript in your browser settings.
              </p>
              <p className="text-sm text-gray-600">
                For the best experience, we recommend using a modern browser 
                with JavaScript enabled.
              </p>
            </div>
          </div>
        </noscript>
      </body>
    </html>
  );
}
