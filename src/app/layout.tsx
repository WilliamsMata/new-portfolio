import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Toaster } from "@/components/ui/sonner";

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
  title: "Williams Mata",
  description:
    "I am a fullstack developer with experience creating modern, beautiful and dynamic websites and mobile apps. Explore my portfolio to see some of the projects I have worked on and get in touch if you are interested in collaborating on a project together.",
  openGraph: {
    type: "website",
    title: "Williams Mata",
    description:
      "I am a fullstack developer with experience creating modern, beautiful and dynamic websites and mobile apps. Explore my portfolio to see some of the projects I have worked on and get in touch if you are interested in collaborating on a project together.",
    url: "https://williamsmata.com",
    siteName: "Williams Mata Rojas",
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
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
