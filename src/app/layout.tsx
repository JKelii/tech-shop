import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { twMerge } from "tailwind-merge";

import Footer from "@/components/Footer/footer";
import Headers from "@/components/Header/Header";
import { CookiesModal } from "@/components/pages/Home/CookiesModal";

import { ClientContexts } from "@/contexts/ClientContexts";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: " Tech-shop",
    default: "Tech-shop",
  },
  description: "NextJs project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          `${inter.className} min-h-screen items-center flex w-screen overflow-x-hidden flex-col `,
        )}
      >
        <ClientContexts>
          <Headers />
          {children}
          <CookiesModal />
          <Footer />
          <Toaster />
        </ClientContexts>
      </body>
    </html>
  );
}
