import type { Metadata } from "next";
import { Baloo_2, Cormorant_Garamond, Nunito, Yatra_One } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const hindi = Yatra_One({
  variable: "--font-accent",
  subsets: ["devanagari", "latin"],
  weight: "400",
});

const playful = Baloo_2({
  variable: "--font-playful",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Jashn — Celebration Command Center",
  description:
    "Thoughtful event plans, budgets, timelines, vendor checklists, and Plan B for celebrations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${hindi.variable} ${playful.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
