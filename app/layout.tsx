import "./globals.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import { ThemeSwitch } from "./theme-switch";

const tofino = localFont({
  src: "../public/fonts/TofinoVariable.woff2",
  variable: "--font-tofino",
  display: "swap",
  weight: "100 800",
});

const title = "Evgenii Ostrovskii";
const description =
  "Personal website of Evgenii Ostrovskii — site reliability & DevOps engineer in Lisbon, Portugal.";

export const metadata: Metadata = {
  metadataBase: new URL("https://evgenii.org"),
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    siteName: title,
    locale: "en_GB",
    type: "website",
    url: "https://evgenii.org",
  },
  twitter: {
    card: "summary",
    creator: "@JonathanSeriesX",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#131110" },
  ],
};

const socials = [
  { label: "GitHub", href: "https://github.com/JonathanSeriesX" },
  { label: "X", href: "https://twitter.com/JonathanSeriesX" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jonathunky" },
  { label: "YouTube", href: "https://www.youtube.com/@intensifiedhipster" },
  { label: "Email", href: "mailto:cv@evgenii.org" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: theme class is set pre-hydration by next-themes
    <html lang="en" className={tofino.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <ThemeProvider
          attribute="class"
          themes={["light", "dark", "black"]}
          enableColorScheme={false}
        >
          <div className="grain" aria-hidden />
          <header className="site-header">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-4">
              <span className="font-medium">Evgenii Ostrovskii</span>
              <ThemeSwitch />
            </div>
          </header>
          <div className="mx-auto flex w-full max-w-3xl grow flex-col px-6">
            <main className="grow">{children}</main>
            <footer className="section mt-16 text-muted">
              <nav className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="link">
                    {s.label}
                  </a>
                ))}
                <span className="mono ml-auto">
                  lisbon, pt · open to relocation
                </span>
              </nav>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
