import type { Metadata } from "next";
import { Fraunces, Literata, Manrope } from "next/font/google";
import { brand } from "@/lib/constants/brand";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description:
    "Mirna digitalna biblioteka za e-knjige, audio knjige i lične preporuke.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr-Latn"
      className={`${fraunces.variable} ${literata.variable} ${manrope.variable} dark h-full antialiased`}
    >
      <body
        className={`${fraunces.variable} ${literata.variable} ${manrope.variable} min-h-full bg-background font-sans text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
