import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import { ConsoleLog } from "@/components/common/ConsoleLog";
import { i18n, type Locale } from "@/i18n/i18n-config";
import { getDictionary } from "@/i18n/getDictionary";

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
  const dictionary = await getDictionary(params.lang);

  return {
    title: "Williams Mata",
    description: dictionary.metadata.description,
    openGraph: {
      type: "website",
      title: "Williams Mata",
      description: dictionary.metadata.description,
      url: "https://williamsmata.com",
      siteName: "Williams Mata Rojas",
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster />
        <ConsoleLog />
      </body>
    </html>
  );
}
