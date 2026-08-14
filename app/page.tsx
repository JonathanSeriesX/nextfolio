import Image from "next/image";

const cycleWords = [
  "all sorts of people.",
  "big banks.",
  "trading floors.",
  "Apple collectors.",
  "Day One users.",
];

// The roll keyframes are generated from cycleWords, so the animation always
// matches the row count — edit the list freely. Track = words + a duplicate
// of the first, so the loop restart is seamless.
const cycleRows = cycleWords.length + 1;
const cycleSlot = 100 / cycleWords.length;
const cycleKeyframes = `@keyframes cycle {
${cycleWords
  .map((_, i) => {
    const from = (i * cycleSlot).toFixed(2);
    const to = ((i + 1) * cycleSlot - 3).toFixed(2);
    return `  ${from}%, ${to}% { transform: translateY(calc(-100% * ${i} / ${cycleRows})); }`;
  })
  .join("\n")}
  100% { transform: translateY(calc(-100% * ${cycleWords.length} / ${cycleRows})); }
}`;
const cycleDuration = `${(cycleWords.length * 2.4).toFixed(1)}s`;

const tabs = [
  { id: "tab-home", label: "home" },
  { id: "tab-projects", label: "projects" },
  { id: "tab-work", label: "career" },
];

const interests: { label: string; hover?: string }[] = [
  { label: "home lab" },
  { label: "computer hardware" },
  { label: "digital photography" },
  { label: "formula 1", hover: "#CL16" },
  { label: "competitive tetris" },
  { label: "indie games" },
  { label: "micro-mobility" },
  { label: "urbanism" },
  { label: "right to repair" },
  { label: "drum & bass" },
];

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

const projects: Project[] = [
  {
    name: "Finest Woven",
    href: "https://everycase.org",
    icon: { src: "/icons/everycase.png" },
    year: "2023 — today",
    accent: "",
    pills: ["next.js", "mongodb", "data scraping"],
    bio: "The one and only database of accessories made by Apple. Ultra-fast and non-intrusive, as every website should be.",
  },
  {
    name: "Twixodus",
    href: "https://github.com/JonathanSeriesX/dayoneXtwitter",
    icon: { emoji: "🕊️" },
    year: "2025 — today",
    accent: "accent-dayone",
    pills: ["swift", "local llms"],
    bio: "A Swift app that migrates your Twitter archive into Day One journal, and does it really well.",
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

// Live-ish numbers for the project stat strips, refreshed daily: case and
// device counts come straight from everycase's public CSVs, stars from the
// GitHub API. Fallbacks are the values counted on 2026-08-14.
export const revalidate = 86400;

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

const experience = [
  {
    years: "2026 — today",
    name: "Something special",
    meta: "under NDA",
    live: true,
    bio: "¯\\_(ツ)_/¯",
  },
  {
    years: "2024–25",
    name: "BNP Paribas",
    meta: "SRE · Porto",
    bio: "Sharpened monitoring and alerting inside one of Europe's largest banking groups: refined Grafana dashboards and alert rules for faster incident detection, automated internal workflows with Ansible, and cut the vulnerability backlog by 36% through triage and targeted upgrades.",
  },
  {
    years: "2022–24",
    name: "Libertex Group",
    meta: "SRE · Podgorica",
    bio: "Led incident resolution for live trading systems — tuning ELK, Dynatrace, and Prometheus/Grafana until diagnosis took minutes, not hours. Ran production workloads on Docker and Kubernetes, optimised AWS for cost and fault tolerance, and automated CI/CD with Jenkins and GitLab across web and mobile.",
  },
  {
    years: "2016–20",
    name: "BSc in Information Security",
    meta: "Saint Petersburg",
    bio: "Saint Petersburg State University of Aerospace Instrumentation — encryption, steganography, PKI, signal processing, and just enough x86 assembly to be dangerous.",
  },
];

export default async function Home() {
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
    <div className="tabs flex grow flex-col">
      {tabs.map((tab, i) => (
        <input
          key={tab.id}
          type="radio"
          name="tabs"
          id={tab.id}
          defaultChecked={i === 0}
          className="tab-input"
        />
      ))}

      <header className="site-header">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6">
          <span className="mono font-medium">me_irl</span>
          <nav className="tab-bar" aria-label="Sections">
            <span className="tab-thumb" aria-hidden />
            {tabs.map((tab) => (
              <label key={tab.id} htmlFor={tab.id}>
                {tab.label}
              </label>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl grow px-4 pb-4 sm:px-6">
        <article className="tab-panel panel-home stagger">
          <div className="flow-root">
            <div className="photo-shell">
              <Image
                src="/me.jpg"
                alt="Evgenii"
                fill
                sizes="176px"
                priority
                className="object-cover"
              />
            </div>
            <h1>
              Hi there, my name is Evgenii.
              <br />I build stuff for{" "}
              <span className="cycler" aria-label="all sorts of people.">
                <style>{cycleKeyframes}</style>
                <span
                  className="cycler-track"
                  aria-hidden
                  style={
                    { "--cycle-duration": cycleDuration } as React.CSSProperties
                  }
                >
                  {[...cycleWords, cycleWords[0]].map((word, i) => (
                    <span key={i}>{word}</span>
                  ))}
                </span>
              </span>
            </h1>
            <p className="mt-6 text-muted">
              By day, I&apos;m a DevOps engineer keeping{" "}
              <span className="mono">&lt;something_secret&gt;</span> observable,
              automated, and exceeding SLOs.
            </p>
          </div>
          <div className="mt-6 border-t border-rule pt-6 text-muted">
            <p>By evening, I&apos;m into:</p>
          </div>
          <ul className="tag-cloud mt-4">
            {interests.map((tag) => (
              <li
                key={tag.label}
                className={`tag${tag.hover ? " tag-swap" : ""}`}
              >
                {tag.hover ? (
                  <>
                    <span className="tag-label">{tag.label}</span>
                    <span className="tag-hover" aria-hidden>
                      {tag.hover}
                    </span>
                  </>
                ) : (
                  tag.label
                )}
              </li>
            ))}
          </ul>
        </article>

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

        <article className="tab-panel panel-work">
          <p className="mono mb-8 text-muted">
            currently in Lisbon • open to relocation
          </p>
          <ol className="timeline">
            {experience.map((entry) => (
              <li
                key={entry.name}
                className={`timeline-entry${entry.live ? " timeline-live" : ""}`}
              >
                <span className="timeline-year">{entry.years}</span>
                <div>
                  <span className="entry-name">{entry.name}</span>
                  <span className="entry-meta">{entry.meta}</span>
                  <p className="entry-bio">{entry.bio}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </main>
    </div>
  );
}
