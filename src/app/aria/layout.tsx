import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "ARIA — Agentic Revenue & Intelligence Accelerator | PwC × Adobe",
  description:
    "13 industry-specific micro-journeys designed to prove the Agentic Front Office through measurable 90-day outcomes.",
};

export default function AriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${dmSans.variable} font-sans`}>
      {children}
    </div>
  );
}
