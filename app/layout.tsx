import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

const tofino = localFont({
  src: "../public/fonts/TofinoVariable.woff2",
  variable: "--font-tofino",
  display: "swap",
  weight: "100 800",
  style: "oblique 0deg 1deg",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evgenii.org"),
  title: "Evgenii Ostrovskii",
  description:
    "Personal website of Evgenii Ostrovskii — software engineer in Porto, Portugal.",
};

const socials = [
  { label: "GitHub", href: "https://github.com/JonathanSeriesX" },
  { label: "X", href: "https://twitter.com/JonathanSeriesX" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jonathunky" },
  { label: "YouTube", href: "https://www.youtube.com/@intensifiedhipster" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={tofino.variable}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <header className="mx-auto flex w-full max-w-3xl flex-wrap items-baseline justify-between gap-x-6 gap-y-3 px-6 py-8">
          <span className="font-semibold whitespace-nowrap tracking-tight">
            Evgenii Ostrovskii
          </span>
          <nav className="flex flex-wrap gap-1.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="pill"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </header>
        <main className="mx-auto w-full max-w-3xl grow px-6">{children}</main>
        <footer
          className="mx-auto w-full max-w-3xl px-6 py-8 text-sm"
          style={{ color: "var(--site-fg-muted)" }}
        >
          © {new Date().getFullYear()} Evgenii Ostrovskii · Porto, Portugal
        </footer>
      </body>
    </html>
  );
}
