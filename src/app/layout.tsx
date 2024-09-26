import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers/Providers";

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

export const metadata: Metadata = {
  title: "Williams Mata portfolio",
  description:
    "Welcome to the web development portfolio of Williams Mata. I am a skilled fullstack developer with experience creating modern, beautiful and dynamic websites. Explore my portfolio to see some of the projects I have worked on and get in touch if you are interested in collaborating on a project together.",
  openGraph: {
    type: "website",
    title: "Williams Mata portfolio",
    description:
      "Welcome to the web development portfolio of Williams Mata. I am a skilled fullstack developer with experience creating modern, beautiful and dynamic websites. Explore my portfolio to see some of the projects I have worked on and get in touch if you are interested in collaborating on a project together.",
    url: "https://williamsmata.com",
    siteName: "Williams Mata portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
