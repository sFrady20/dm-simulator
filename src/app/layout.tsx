import { AppProvider } from "@/components/app/provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Text Message Simulator",
  description: "Imagine conversations that never happened",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen dark:dark`}>
        <AppProvider>
          {children}
          <Toaster richColors />
        </AppProvider>
      </body>
    </html>
  );
}
