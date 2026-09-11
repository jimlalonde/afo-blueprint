import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Intelligent Customer Edge Capability Blueprint",
  description:
    "Explore, assess, and plan your agentic front office capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
