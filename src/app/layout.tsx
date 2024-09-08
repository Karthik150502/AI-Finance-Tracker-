import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { montserrat400 } from "./fonts";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: "Finacle Finance",
  description: "AI assisted Finance tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={montserrat400.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
