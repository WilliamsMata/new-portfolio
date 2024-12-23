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

type Params = Promise<{ lang: Locale }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;

  const {
    metadata: { description },
  } = await getDictionary(lang);

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
  params: Params;
}>) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
        suppressHydrationWarning
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
