import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ifeanyi Ijezie | Security Automation Engineer & GRC",
  description:
    "Security Automation Engineer architecting autonomous security platforms, automating compliance workflows, and designing multi-model agent systems. CompTIA Security+ certified.",
  keywords: [
    "cybersecurity",
    "GRC",
    "risk management",
    "NIST",
    "security+",
    "compliance",
    "DevOps",
  ],
  openGraph: {
    title: "Ifeanyi Ijezie | Security Automation Engineer & GRC",
    description: "Forming security risk into clear business decisions.",
    url: "https://ijeziermf.github.io/portfolio/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}