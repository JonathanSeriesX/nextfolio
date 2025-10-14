import { Fira_Code as FontMono } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = localFont({
  src: "../public/fonts/TofinoVariable.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 800",
  style: "oblique 0deg 1deg",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
