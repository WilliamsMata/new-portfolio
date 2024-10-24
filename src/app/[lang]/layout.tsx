import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import { ConsoleLog } from "@/components/common/ConsoleLog";
import { i18n, type Locale } from "@/i18n/i18n-config";
import { getDictionary } from "@/i18n/getDictionary";
import Header from "@/components/common/Header";
import FloatingDockComponent from "@/components/common/FloatingDockComponent";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const {
    metadata: { description },
  } = await getDictionary(params.lang);

  return {
    title: "Williams Mata",
    description,
    openGraph: {
      type: "website",
      title: "Williams Mata",
      description,
      url: "https://williamsmata.com",
      siteName: "Williams Mata Portfolio",
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col overflow-hidden font-[family-name:var(--font-geist-sans)]">
            <Header dictionary={dictionary.header} />

            {children}

            <FloatingDockComponent />
          </div>

          <Toaster />
          <ConsoleLog />
        </Providers>
      </body>
    </html>
  );
}
