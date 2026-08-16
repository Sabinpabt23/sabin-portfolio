import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sabinpant.com.np"),
  title: "Sabin Pant — Software Developer Portfolio",
  description:
    "Sabin Pant's portfolio — Full-Stack & Backend Developer specializing in system design, Node.js, Next.js, and scalable API architecture.",
  openGraph: {
    title: "Sabin Pant — Software Developer Portfolio",
    description:
      "Sabin Pant's portfolio — Full-Stack & Backend Developer specializing in system design, Node.js, Next.js, and scalable API architecture.",
    url: "https://sabinpant.com.np/",
    siteName: "Sabin Pant Portfolio",
    locale: "en_US",
    type: "website",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sabin Pant",
  url: "https://sabinpant.com.np",
  jobTitle: "Full-Stack & Backend Developer",
  description:
    "Full-Stack & Backend Developer specializing in system design, Node.js, Next.js, and scalable API architecture.",
  sameAs: [
    "https://github.com/SabinPant",
    "https://linkedin.com/in/sabinpant",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
