import "./globals.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import { site, socials } from "@/site.config";

import { ThemeSwitch } from "./theme-switch";

/* The one place the typeface is chosen. globals.css only ever refers to
   --font-body, so swapping this for another local file — or for a
   next/font/google import — is a self-contained change.

   Tofino is licensed, not redistributable: a fork of this site needs its own
   face here and its own file in public/fonts. */
const bodyFont = localFont({
  src: "../public/fonts/TofinoVariable.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  robots: { index: true, follow: true },
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.wordmark,
    locale: site.locale,
    type: "website",
    url: site.url,
    images: [
      {
        url: site.ogImage.src,
        width: site.ogImage.width,
        height: site.ogImage.height,
        alt: site.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: site.twitter.card,
    creator: site.twitter.creator,
    images: [site.ogImage.src],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: site.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: site.themeColor.dark },
  ],
};

const beaconToken = site.analytics.cloudflareBeaconToken;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: theme class is set pre-hydration by next-themes
    <html
      lang={site.lang}
      className={bodyFont.variable}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <ThemeProvider
          attribute="class"
          themes={["light", "dark", "black"]}
          enableColorScheme={false}
        >
          <div className="grain" aria-hidden />
          {children}
          <footer className="mx-auto w-full max-w-3xl px-6">
            <div className="section flex flex-wrap items-center justify-between gap-4">
              <nav className="seg" aria-label="Social links">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <Icon />
                  </a>
                ))}
              </nav>
              <ThemeSwitch />
            </div>
          </footer>
          {/* Cloudflare Web Analytics — classic defer variant, as on everycase.
              No token configured, no beacon: a fork stays untracked until its
              owner sets NEXT_PUBLIC_CF_BEACON_TOKEN. */}
          {beaconToken && (
            <script
              defer
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={JSON.stringify({ token: beaconToken })}
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
