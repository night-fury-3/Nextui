import React from "react";
import {Inter} from "next/font/google";
import {Analytics} from "@vercel/analytics/react";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider} from "next-themes";
import {NextPage} from "next";
import {AppProps} from "next/app";

import {__PROD__} from "@/utils";
import "../styles/globals.css";

const Application: NextPage<AppProps<{}>> = ({Component, pageProps}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <NextUIProvider>
        <Component {...pageProps} />
        {__PROD__ && <Analytics />}
      </NextUIProvider>
    </ThemeProvider>
  );
};

const sans = Inter({
  adjustFontFallback: true,
  display: "optional",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  preload: true,
  style: "normal",
  subsets: ["latin"],
  weight: "variable",
});

export const fonts = {
  sans: sans.style.fontFamily,
};

export default Application;
