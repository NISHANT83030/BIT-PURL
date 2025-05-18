import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIT PURL",
  description: "BIT PURL is a URL shortener service that allows you to create short URLs for your content.",
  icons: {
    icon:"/favicon.png",
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout:{
            // logoImageUrl:'/logo.svg',
            socialButtonsVariant:"iconButton"
          },
          variables:{
            colorPrimary: "#0E78F9",
            colorText: "#ffffff",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A3E",
            colorInputText: "#ffffff",
          }

        }} 
          >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#161925]`}
      >
        {children}
      </body>
      </ClerkProvider>
    </html>
  );
}
