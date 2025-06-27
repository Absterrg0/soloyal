import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Wallet from "@/components/wallet";
import { ThemeProvider } from "@/components/theme-provider";
import NavbarLayout from "@/components/navbar-layout";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/query-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Soloyal",
  description: "Decentralized loyalty program on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
          className={`  ${dmSans.className}   antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <QueryProvider>
            <Wallet>
              <NavbarLayout />
              {children}
            </Wallet>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
