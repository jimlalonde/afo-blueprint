import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-source-serif",
  axes: ["opsz"],
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
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`} style={{ colorScheme: "light" }}>
      <body className="min-h-screen" style={{ fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
