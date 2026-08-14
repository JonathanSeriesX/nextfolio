import Image from "next/image";

/* external-link arrow, same glyph as everycase's LinkArrowIcon */
function LinkArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="link-arrow"
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

type ProjectIcon = { src: string } | { emoji: string };

interface Project {
  name: string;
  href: string;
  icon: ProjectIcon;
  year: string;
  accent: string;
  pills: string[];
  bio: string;
}

// newest first
const projects: Project[] = [
  {
    name: "Twixodus",
    href: "https://github.com/JonathanSeriesX/dayoneXtwitter",
    icon: { emoji: "🕊️" },
    year: "2025 — today",
    accent: "accent-dayone",
    pills: ["swift", "local llms"],
    bio: "A Swift app that migrates your Twitter archive into Day One journal, and does it really well.",
  },
  {
    name: "Finest Woven",
    href: "https://everycase.org",
    icon: { src: "/icons/everycase.png" },
    year: "2023 — today",
    accent: "",
    pills: ["next.js", "mongodb", "data scraping"],
    bio: "The one and only database of accessories made by Apple. Ultra-fast and non-intrusive, as every website should be.",
  },
];

const reserved = [
  {
    name: "Photography",
    icon: { emoji: "📷" },
    accent: "accent-amber",
    bio: "I figured out a lovely way to process images from my mirrorless, but I've yet to figure out a nice way to publish them :/",
  },
  {
    name: "DJing",
    icon: { emoji: "🎧" },
    accent: "accent-violet",
    bio: "Mixes will land somewhere once my drum & bass folder stops being on fire.",
  },
];

// Live-ish numbers for the project stat strips, refreshed daily (the route's
// `revalidate` lives in page.tsx): case and device counts come straight from
// everycase's public CSVs, stars from the GitHub API. Fallbacks are the
// values counted on 2026-08-14.
async function countCsvRows(url: string): Promise<number | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return (await res.text()).trim().split("\n").length - 1;
  } catch {
    return null;
  }
}

async function getProjectStats() {
  const base =
    "https://raw.githubusercontent.com/JonathanSeriesX/everycase/HEAD/database";
  const [cases, devices, stars] = await Promise.all([
    countCsvRows(`${base}/database.csv`),
    countCsvRows(`${base}/devices.csv`),
    fetch("https://api.github.com/repos/JonathanSeriesX/dayoneXtwitter", {
      next: { revalidate: 86400 },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((repo) => repo?.stargazers_count as number | undefined)
      .catch(() => undefined),
  ]);
  return { cases: cases ?? 1331, devices: devices ?? 345, stars: stars ?? 19 };
}

export async function ProjectsTab() {
  const stats = await getProjectStats();
  // keyed by project name — keep in sync with the `projects` array above
  const statStrips: Record<string, React.ReactNode> = {
    "Finest Woven": `${stats.cases.toLocaleString("en-GB")} cases · ${stats.devices} devices · $0/mo to run`,
    Twixodus: (
      <>
        <span className="star" aria-hidden>
          ★
        </span>{" "}
        {stats.stars} on github · thousands of tweets imported
      </>
    ),
  };

  return (
    <article className="tab-panel panel-projects">
      <p className="prose-col mb-6 text-muted">
        By night, I&apos;m fixing small gaps in this world one by one, and
        probably with more care than they deserve.
      </p>
      <div className="grid gap-4">
        {projects.map((entry) => (
          <div key={entry.name} className={`project-card ${entry.accent}`}>
            <div className="project-head">
              <span className="project-icon" aria-hidden>
                {"src" in entry.icon ? (
                  <Image src={entry.icon.src} alt="" fill sizes="44px" />
                ) : (
                  entry.icon.emoji
                )}
              </span>
              <span className="project-title">
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer"
                  className="entry-name project-name-link"
                >
                  {entry.name}
                  <LinkArrowIcon />
                </a>
              </span>
              <span className="project-year">{entry.year}</span>
            </div>
            <p className="entry-bio">{entry.bio}</p>
            <p className="stat-strip">{statStrips[entry.name]}</p>
            <ul className="tag-cloud">
              {entry.pills.map((pill) => (
                <li key={pill} className="tag">
                  {pill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {reserved.map((entry) => (
          <div
            key={entry.name}
            className={`project-card reserved ${entry.accent}`}
          >
            <div className="project-head">
              <span className="project-icon" aria-hidden>
                {entry.icon.emoji}
              </span>
              <span className="project-title">
                <span className="entry-name">{entry.name}</span>
              </span>
              <span className="project-year">soon</span>
            </div>
            <p className="entry-bio">{entry.bio}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
