import { AppProvider } from "@/components/providers/app";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "On Blast",
  description: "Fake text message screenshots",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen dark`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}