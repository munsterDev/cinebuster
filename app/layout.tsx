import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
import Footer from "@/components/footer/Footer";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Cinebuster",
  description: "Your ultimate movie and TV streaming service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
            <MantineProvider theme={theme} defaultColorScheme="dark">{children}</MantineProvider>
          <Footer />
      </body>
    </html>
  );
}
