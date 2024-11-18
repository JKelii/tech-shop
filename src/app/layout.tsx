import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import Footer from "@/components/Footer/footer";
import { ClientContexts } from "@/contexts/ClientContexts";
import Headers from "@/components/Header/Header";
import { Toaster } from "sonner";
import { CookiesModal } from "@/components/pages/Home/CookiesModal";

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
          `${inter.className} min-h-screen items-center flex w-screen overflow-x-hidden flex-col `
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
