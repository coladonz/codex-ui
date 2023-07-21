"use client";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Web3Provider from "@/providers/Web3";

import "@/styles/globals.css";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <></>;
  }

  return (
    <ThemeProvider defaultTheme="light" attribute="class" enableSystem={false}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ThemeProvider>
  );
}
