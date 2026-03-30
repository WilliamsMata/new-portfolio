import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import LayoutClientExtras from "@/components/common/LayoutClientExtras";
import { i18n, type Locale } from "@/i18n/i18n-config";
import { getDictionary } from "@/i18n/getDictionary";
import Header from "@/components/common/Header";
import Script from "next/script";

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

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;

  const {
    metadata: { description },
  } = await getDictionary(lang as Locale);

  const baseUrl = new URL("https://williamsmata.com");

  return {
    title: "Williams Mata",
    description,
    metadataBase: baseUrl,
    icons: {
      icon: new URL("/icon.svg", baseUrl).toString(),
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      title: "Williams Mata",
      description,
      url: new URL(`/${lang}`, baseUrl).toString(),
      siteName: "Williams Mata Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: "Williams Mata",
      description,
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

  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang} suppressHydrationWarning className="relative">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative overflow-x-hidden font-[family-name:var(--font-geist-sans)] antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex min-h-screen flex-col overflow-hidden">
            <Header dictionary={dictionary.header} />

            {children}
          </div>

          <LayoutClientExtras />
        </Providers>
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Williams Mata",
              url: "https://williamsmata.com",
              sameAs: [
                "https://github.com/WilliamsMata",
                "https://www.linkedin.com/in/williams-mata",
                "https://x.com/williamsmata99",
              ],
            }),
          }}
        />
        <Script
          id="ld-json-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Williams Mata Portfolio",
              url: "https://williamsmata.com",
              inLanguage: lang,
            }),
          }}
        />
      </body>
    </html>
  );
}
