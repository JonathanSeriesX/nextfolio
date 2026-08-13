import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

const tofino = localFont({
  src: "../public/fonts/TofinoVariable.woff2",
  variable: "--font-tofino",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evgenii.org"),
  title: "Evgenii Ostrovskii",
  description:
    "Personal website of Evgenii Ostrovskii — site reliability & DevOps engineer in Lisbon, Portugal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={tofino.variable}>
      <body className="flex min-h-dvh flex-col bg-paper font-sans antialiased">
        <div className="grain" aria-hidden />
        <div className="mx-auto flex w-full max-w-3xl grow flex-col px-6">
          <header className="py-10">
            <span className="font-medium">Evgenii Ostrovskii</span>
          </header>
          <main className="grow">{children}</main>
          <footer className="section mt-16 !grid-cols-1 text-muted">
            <nav className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <a href="https://github.com/JonathanSeriesX" className="link">
                GitHub
              </a>
              <a href="https://twitter.com/JonathanSeriesX" className="link">
                X
              </a>
              <a href="https://linkedin.com/in/jonathunky" className="link">
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@intensifiedhipster"
                className="link"
              >
                YouTube
              </a>
              <a href="mailto:cv@evgenii.org" className="link">
                Email
              </a>
              <span className="mono ml-auto">
                lisbon, pt · open to relocation
              </span>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
