import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";
import LoginModal from "@/components/login/LoginModal";
import getConfig from "next/config";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ModalProvider } from "./context/ModalContext";
import { Toaster } from "sonner";

const { publicRuntimeConfig } = getConfig();
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className} translate="no">
        <ThemeProvider attribute="class">
          <Providers publicRuntimeConfig={publicRuntimeConfig} lang={locale}>
            <NextIntlClientProvider messages={messages}>
              <Toaster position="top-center" richColors />
              <ModalProvider>
                <div className="relative flex min-h-screen flex-col">
                  {/* <Navbar /> */}
                  <div className="flex-1">{children}</div>
                  {/* <Footer /> */}
                </div>
              </ModalProvider>
              <LoginModal />
            </NextIntlClientProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
