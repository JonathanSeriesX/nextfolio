"use client";

import { useState } from "react";

const tabs = ["Professional", "Personal"] as const;
type Tab = (typeof tabs)[number];

interface Tile {
  emoji: string;
  title: string;
  subtitle: string;
  href?: string;
  pills: string[];
}

const tiles: Record<Tab, Tile[]> = {
  Professional: [
    {
      emoji: "🏦",
      title: "BNP Paribas",
      subtitle: "Software engineering inside one of Europe's largest banks.",
      pills: ["banking"],
    },
    {
      emoji: "📈",
      title: "Libertex",
      subtitle: "Building an online trading platform.",
      pills: ["fintech"],
    },
    {
      emoji: "🤐",
      title: "Something Special",
      subtitle: "I'd love to tell you all about it — but it's under NDA.",
      pills: ["current"],
    },
  ],
  Personal: [
    {
      emoji: "📱",
      title: "EveryCase",
      subtitle: "An open database of (nearly) every case Apple has ever made.",
      href: "https://everycase.org",
      pills: ["everycase.org"],
    },
    {
      emoji: "🐦",
      title: "dayoneXtwitter",
      subtitle: "Rescues your tweets and imports them into Day One.",
      href: "https://github.com/JonathanSeriesX/dayoneXtwitter",
      pills: ["GitHub"],
    },
    {
      emoji: "🕹️",
      title: "Off Duty",
      subtitle: "Strong opinions on urbanism and right to repair included.",
      pills: ["Formula 1", "Tetris", "drum & bass"],
    },
  ],
};

function TileCard({ tile }: { tile: Tile }) {
  const body = (
    <>
      <div className="image-shell aspect-square w-full">
        <span className="text-6xl" aria-hidden>
          {tile.emoji}
        </span>
      </div>
      <span>
        <strong className="card-title">{tile.title}</strong>
        <span className="card-subtitle">{tile.subtitle}</span>
      </span>
    </>
  );

  return (
    <article className="glass-card w-full max-w-[250px]">
      {tile.href ? (
        <a
          href={tile.href}
          target="_blank"
          rel="noreferrer"
          className="card-link"
        >
          {body}
        </a>
      ) : (
        <div className="card-link">{body}</div>
      )}
      <ul className="meta-row">
        {tile.pills.map((pill) => (
          <li key={pill} className="pill">
            {pill}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Showcase() {
  const [active, setActive] = useState<Tab>("Professional");

  return (
    <section>
      <div role="tablist" className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active === tab}
            data-active={active === tab}
            onClick={() => setActive(tab)}
            className="tab-pill"
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="card-track" role="tabpanel">
        {tiles[active].map((tile) => (
          <TileCard key={tile.title} tile={tile} />
        ))}
      </div>
    </section>
  );
}
