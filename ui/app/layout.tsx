import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R. Kot-Weav",
  description: "An app without a purpose",
  icons: {
    icon: [
      {
        url: '/images/icon.ico',
        href: '/images/icon.ico',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header /> 
        <main>{children}</main>
      </body>
    </html>
  );
}
