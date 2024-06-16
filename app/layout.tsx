import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Online Bookstore',
  description: 'Buy and sell books online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader />
        <StoreProvider>
          <Providers>
            <ToastContainer />
            <Navbar />
            {children}
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
