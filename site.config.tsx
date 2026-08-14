/* ===========================================================================
   Liquid Portfolio — every word, link and number on the site lives in this
   file. Nothing below is layout: swap the values, keep the shapes, and the
   design follows. The components in app/ read from here and never hardcode
   content, so this is usually the only file you need to touch.

   EVERYTHING HERE IS FICTIONAL SAMPLE DATA. Ada Fernwright is not a real
   person; the links point at GitHub's own demo account and example.com. Delete
   it all and put yourself in.

   Fields that pair with something outside this file are flagged in comments —
   the tab list mirrors the panel order in app/page.tsx, and themeColor mirrors
   --paper in app/globals.css.
   =========================================================================== */

import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";
// import localFont from "next/font/local";

import {
  GitHubIcon,
  MailIcon,
  // LinkedInIcon,
  // XIcon,
  // YouTubeIcon,
} from "@/app/icons";
import { githubStars } from "@/app/stats";

/* --- typeface -------------------------------------------------------------
   The whole site refers to --font-body and nothing else, so this is the only
   place a face is chosen. Exactly one `bodyFont` export must be live; comment
   the other out, imports included, so next/font doesn't fetch a face nobody
   uses.

   Montserrat ships by default: next/font/google self-hosts it at build time
   (no runtime request to Google) and the OFL lets anyone redistribute it.
   Any other Google face is a one-word change.

   To use your own instead, drop a variable .woff2 into public/fonts and swap
   the two blocks:

     import localFont from "next/font/local";

     export const bodyFont = localFont({
       src: "./public/fonts/YourFace.woff2",
       variable: "--font-body",
       display: "swap",
       weight: "100 800",
     });

   Mind the licence — most retail webfonts may not be committed to a public
   repo. Keep those in a private fork, or load them from a CDN you pay for. */
export const bodyFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** Optional credit rendered between the footer's two pill clusters — some
    retail font licences require attribution, and this is where it goes.
    Montserrat's OFL doesn't, so the template ships none:

      export const fontCredit: FontCredit | null = {
        name: "Suisse Intl",
        href: "https://www.swisstypefaces.com/fonts/suisse/",
        designer: "Swiss Typefaces",
        designerHref: "https://www.swisstypefaces.com/",
      };
*/
export const fontCredit: FontCredit | null = null;

/* --- shapes ---------------------------------------------------------------
   `accent` is a class from globals.css; leaving it off gives the site accent
   (crimson). Add your own by declaring .accent-<name> alongside the others. */
export type Accent =
  | "accent-azure"
  | "accent-amber"
  | "accent-violet"
  | "accent-emerald";

export type ProjectIcon = { src: string } | { emoji: string };

export interface FontCredit {
  /** the typeface */
  name: string;
  href?: string;
  /** who drew it */
  designer: string;
  designerHref?: string;
}

export interface Social {
  label: string;
  href: string;
  Icon: () => ReactNode;
}

export interface Tab {
  /** used for the radio/label pairing; must be unique */
  id: string;
  label: string;
}

export interface Interest {
  label: string;
  /** swapped in on hover, for a private joke or two */
  hover?: string;
}

export interface Project {
  name: string;
  href: string;
  icon: ProjectIcon;
  year: string;
  accent?: Accent;
  pills: string[];
  bio: string;
  /** live figures for the stat strip — see app/stats.ts for the helpers */
  stats?: () => Promise<ReactNode>;
}

export interface ReservedProject {
  name: string;
  icon: ProjectIcon;
  accent?: Accent;
  /** defaults to "soon" */
  year?: string;
  bio: string;
}

export interface ExperienceEntry {
  years: string;
  name: string;
  meta: string;
  accent?: Accent;
  /** pulses the timeline dot — for the role you are in right now */
  live?: boolean;
  bio: string;
  pills?: string[];
}

/** `{ gap: true }` renders a dashed stretch of the timeline: CV silence,
    made explicit rather than papered over. */
export type ExperienceRow = ExperienceEntry | { gap: true };

export interface SiteConfig {
  /** shown at the top left, and used as the OG site name */
  wordmark: string;
  title: string;
  description: string;
  url: string;
  lang: string;
  locale: string;
  /** null ships no share image; drop a 1200×630 file in public/ to add one */
  ogImage: { src: string; width: number; height: number; alt: string } | null;
  twitter: { card: "summary" | "summary_large_image"; creator?: string };
  themeColor: { light: string; dark: string };
  analytics: { cloudflareBeaconToken?: string };
}

/* The three panels. Annotating each section (rather than letting TypeScript
   infer it) is what makes an editor autocomplete the fields below and flag a
   typo'd accent as you type. */
export interface HomeContent {
  /** null drops the portrait and lets the hero run full width */
  photo: { src: string; alt: string } | null;
  headline: ReactNode;
  cycleWords: string[];
  cycleLabel: string;
  blurb: ReactNode;
  interestsIntro: ReactNode;
  interests: Interest[];
}

export interface ProjectsContent {
  intro: ReactNode;
  entries: Project[];
  reserved: ReservedProject[];
}

export interface CareerContent {
  intro: ReactNode;
  entries: ExperienceRow[];
}

/* --- site ---------------------------------------------------------------- */

export const site: SiteConfig = {
  wordmark: "hello_world",
  title: "Ada Fernwright",
  description: "Design engineer building calm interfaces for the web.",
  /** used for canonical URLs and OG tags — set this before you deploy */
  url: "https://example.com",
  lang: "en",
  locale: "en_GB",

  /* No share image ships with the template, so link previews fall back to
     title + description. To add one, drop a 1200×630 image in public/ and
     point this at it:

       ogImage: { src: "/og.png", width: 1200, height: 630, alt: "Ada Fernwright" }

     If you would rather generate one, Next can: add an app/opengraph-image.tsx
     that returns an ImageResponse from next/og (no extra dependency). */
  ogImage: null,

  /* `summary_large_image` suits a wide banner; `summary` suits a square
     portrait shown beside the text. */
  twitter: { card: "summary" },

  /** browser chrome colour — keep in step with --paper in app/globals.css */
  themeColor: {
    light: "#f7f4ef",
    dark: "#131110",
  },

  analytics: {
    /** Cloudflare Web Analytics. Unset → no beacon is rendered at all.
        Set NEXT_PUBLIC_CF_BEACON_TOKEN in your host's env (see .env.example).
        NEXT_PUBLIC_* values are inlined at BUILD time — a token added after a
        deploy only takes effect on the next one. */
    cloudflareBeaconToken: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN,
  },
};

/* Icons live in app/icons.tsx — five ship with the template, and adding one is
   a copy-paste of any 24×24 path. */
export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/octocat", Icon: GitHubIcon },
  { label: "Email", href: "mailto:hello@example.com", Icon: MailIcon },
  // { label: "LinkedIn", href: "https://linkedin.com/in/you", Icon: LinkedInIcon },
  // { label: "X", href: "https://x.com/you", Icon: XIcon },
  // { label: "YouTube", href: "https://youtube.com/@you", Icon: YouTubeIcon },
];

/* --- tabs ---------------------------------------------------------------
   Two to six. The picker folds onto two rows on narrow viewports once there
   are four or more (4 → 2+2, 5 → 3+2, 6 → 3+3), so long labels stay legible;
   short ones look best. ORDER MATTERS: tab N shows the Nth panel rendered in
   app/page.tsx, so adding a tab means adding a panel there too. */
export const tabs: Tab[] = [
  { id: "home", label: "home" },
  { id: "projects", label: "projects" },
  { id: "career", label: "career" },
];

/* --- home ---------------------------------------------------------------- */

export const home: HomeContent = {
  /* Add a portrait by dropping a square image in public/ and setting:
       photo: { src: "/me.jpg", alt: "Your Name" }
     It floats to the right of the hero and is rendered at 176px. */
  photo: null,

  /* the line before the rolling words; the roll is appended inline */
  headline: (
    <>
      Hi, I&apos;m Ada.
      <br />I build interfaces for{" "}
    </>
  ),

  /* Rolls once per visit to the panel and parks on the last entry, so put the
     line you actually mean at the end. Any length works — the keyframes are
     generated from this list. */
  cycleWords: [
    "design systems.",
    "two-person teams.",
    "transit nerds.",
    "screen readers.",
    "the open web.",
  ],
  /** what a screen reader hears in place of the roll */
  cycleLabel: "the open web.",

  blurb: (
    <>
      By day, I&apos;m a design engineer — the person who keeps the{" "}
      <span className="mono">design ↔ code</span> handoff from being a handoff
      at all. Mostly TypeScript, CSS that earns its keep, and a stubborn
      preference for pages that load before you notice.
    </>
  ),

  interestsIntro: "Away from the keyboard:",
  interests: [
    { label: "letterpress" },
    { label: "bicycle touring" },
    { label: "field recording" },
    { label: "chess", hover: "1. d4" },
    { label: "brutalist maps" },
    { label: "sourdough" },
    { label: "night trains" },
    { label: "public libraries" },
  ],
};

/* --- projects ------------------------------------------------------------ */

export const projects: ProjectsContent = {
  intro: (
    <>
      Small tools, mostly built because the alternative annoyed me. All of them
      are open source and none of them have a pricing page.
    </>
  ),

  /* newest first */
  entries: [
    {
      name: "Tideline",
      href: "https://github.com/octocat/Hello-World",
      icon: { emoji: "🌊" },
      year: "2025 — today",
      accent: "accent-azure",
      pills: ["typescript", "css", "zero deps"],
      bio: "A scroll-linked timeline component that does the whole thing in CSS. 1.4kB, no observers, no jank.",
      /* Live numbers, cached for a day. Point this at your own repo — and see
         app/stats.ts for the other helper (countCsvRows) if your figures live
         in a CSV somewhere. */
      stats: async () => {
        const stars = await githubStars("octocat/Hello-World");
        return (
          <>
            <span className="star" aria-hidden>
              ★
            </span>{" "}
            {stars ?? 0} on github · used on 200+ sites
          </>
        );
      },
    },
    {
      name: "Fernpress",
      href: "https://example.com",
      icon: { emoji: "🖨️" },
      year: "2023 — 2025",
      pills: ["rust", "markdown"],
      bio: "A static site generator with exactly one configuration option, which is the output directory. Retired happily once the platform caught up.",
      /* A stat strip can also just be a string — no fetching required. */
      stats: async () => "3 releases · 0 open issues · archived with honours",
    },
  ],

  /* placeholders for things that exist but have nowhere to live yet — they
     render dashed and un-clickable, which is a nicer kind of honest than a
     dead link */
  reserved: [
    {
      name: "Photographs",
      icon: { emoji: "📷" },
      accent: "accent-amber",
      bio: "Four years of medium format, still sitting in a folder because I cannot decide on a grid.",
    },
    {
      name: "Field notes",
      icon: { emoji: "🎙️" },
      accent: "accent-violet",
      bio: "Recordings from train stations across Europe. One day this will be a map you can click.",
    },
  ],
};

/* --- career -------------------------------------------------------------- */

export const career: CareerContent = {
  intro: "based in Rotterdam • open to remote",

  /* Newest first. Each row hands its colour to the next as the timeline's lane
     gradient, so reordering recolours the lane automatically. */
  entries: [
    {
      years: "2024 — now",
      name: "Studio Kestrel",
      meta: "Design engineer · Rotterdam",
      live: true,
      bio: "Two designers, one engineer, and a component library that ships to eleven client sites. I own the part where a Figma file becomes something a browser can render without regret.",
      pills: ["typescript", "design systems", "a11y"],
    },
    {
      years: "2021 — 24",
      name: "Meridian Labs",
      meta: "Frontend engineer · Remote",
      accent: "accent-emerald",
      bio: "Rebuilt a dashboard that 40,000 people opened every morning, and got first paint under a second on a mid-range Android. Most of the win came from deleting things.",
      pills: ["react", "performance", "graphql"],
    },
    { gap: true },
    {
      years: "2016 — 20",
      name: "BA in Graphic Design",
      meta: "Willem de Kooning Academy",
      accent: "accent-violet",
      bio: "Typography, print production, and a final year spent arguing that a website is a designed object rather than a delivery mechanism.",
      pills: ["typography", "print"],
    },
  ],
};
