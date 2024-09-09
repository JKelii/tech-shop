import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import Footer from "@/components/Footer/footer";
import { ClientContexts } from "@/contexts/ClientContexts";
import { getCartFromCookie } from "@/actions/cart";
import Headers from "@/components/Header/Headers";
import { getProductSlug } from "@/lib";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech-shop",
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
          `${inter.className} min-h-screen items-center flex flex-col w-full`
        )}
      >
        <ClientContexts>
          <Headers />
          {children}
          <Footer />
        </ClientContexts>
      </body>
    </html>
  );
}
