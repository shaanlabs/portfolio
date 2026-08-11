import React from "react";
import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CommandPalette from "@/components/CommandPalette";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shaanif Ahmed — Backend Engineer & Data Scientist",
  description:
    "Fresh grad. Backend Builder. Data nerd. Freelancer. Built 64+ projects across Python, Node.js, ERPNext & AI. Open to full-time roles — let's build something wild.",
  keywords: [
    "Shaanif Ahmed",
    "Backend Developer",
    "Data Scientist",
    "Full-Stack Developer",
    "Python Developer",
    "Node.js",
    "ERPNext",
    "Django",
    "FastAPI",
    "Portfolio",
    "Freelancer",
    "Karnataka",
    "India",
  ],
  authors: [{ name: "Shaanif Ahmed" }],
  openGraph: {
    title: "Shaanif Ahmed — Backend Engineer & Data Scientist",
    description:
      "Fresh grad. Backend Builder. Data nerd. Freelancer. Open to full-time roles.",
    type: "website",
    locale: "en_US",
    url: "https://shaanif.dev",
    siteName: "Shaanif Ahmed Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaanif Ahmed — Backend Engineer & Data Scientist",
    description: "Fresh grad. Backend Builder. Data nerd. Open to full-time roles.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`min-h-screen font-body antialiased bg-background grain-overlay`}>
        <Preloader />
        <CursorGlow />
        <ScrollProgress />
        {children}
        <BackToTop />
        <CommandPalette />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Shaanif Ahmed",
              "jobTitle": "Backend Engineer & Data Scientist",
              "url": "https://shaanif.dev",
              "sameAs": [
                "https://github.com/shaanlabs",
                "https://www.linkedin.com/in/shaanif-ahmed-765934233/"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
