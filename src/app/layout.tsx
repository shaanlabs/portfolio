import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CommandPalette from "@/components/CommandPalette";

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
  title: "Shaanif Ahmed — Backend & Full-Stack Developer",
  description:
    "Backend-focused developer with production experience in REST APIs, SaaS backends, and ERPNext/Frappe customizations. Open to full-time backend and full-stack roles.",
  keywords: [
    "Shaanif Ahmed",
    "Backend Developer",
    "Full-Stack Developer",
    "Python",
    "Node.js",
    "ERPNext",
    "Django",
    "FastAPI",
    "Portfolio",
  ],
  authors: [{ name: "Shaanif Ahmed" }],
  openGraph: {
    title: "Shaanif Ahmed — Backend & Full-Stack Developer",
    description:
      "Backend-focused developer shipping REST APIs, SaaS backends, and ERP customizations. Actively seeking full-time roles.",
    type: "website",
    locale: "en_US",
    url: "https://shaanif.dev",
    siteName: "Shaanif Ahmed Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaanif Ahmed — Backend & Full-Stack Developer",
    description:
      "Backend-focused developer shipping REST APIs, SaaS backends, and ERP customizations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
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
      <body className="min-h-screen font-body antialiased bg-background noise-overlay">
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
              "jobTitle": "Backend & Full-Stack Developer",
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
