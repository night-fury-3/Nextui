import "@/styles/globals.css";
import {Metadata} from "next";
import {clsx} from "@nextui-org/shared-utils";
import {Link} from "@nextui-org/react";

import {Providers} from "./providers";

import {VercelCallout} from "@/components/vercel-callout";
import manifest from "@/content/docs/manifest.json";
import {siteConfig} from "@/config/site";
import {fontSans} from "@/config/fonts";
import {Navbar} from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "NextUI",
    "React Aria",
    "Server Components",
    "React Components",
    "UI Components",
    "UI Kit",
    "UI Library",
    "UI Framework",
    "UI Design System",
  ],
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  twitter: siteConfig.twitter,
  openGraph: siteConfig.openGraph,
  authors: [
    {
      name: "jrgarciadev",
      url: "https://jrgarciadev.com",
    },
  ],
  creator: "jrgarciadev",
  viewport:
    "viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
          <div className="relative flex flex-col">
            <Navbar routes={manifest.routes} />
            <main className="container mx-auto max-w-7xl px-6 flex-grow">{children}</main>
            <footer className="container mx-auto max-w-7xl pb-12 px-12">
              <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-sm text-default-400">
                  Created&nbsp;by&nbsp;
                  <Link isExternal className="text-sm" href={siteConfig.links.portfolio}>
                    Junior Garcia
                  </Link>
                </p>
                <VercelCallout />
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
