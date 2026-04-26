import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UgoAI - Fully Local Autonomous AI Agent",
  description: "UgoAI is a fully local, autonomous AI agent that thinks, plans, and controls your computer — no API keys required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}