const cycleWords = [
  "all sorts of people.",
  "big banks.",
  "trading floors.",
  "Apple collectors.",
  "tweet archivists.",
  "something secret.",
];

const tabs = [
  { id: "tab-home", label: "home" },
  { id: "tab-projects", label: "projects" },
  { id: "tab-work", label: "experience" },
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

const projects = [
  {
    name: "EveryCase",
    href: "https://everycase.org",
    bio: "An open database of (nearly) every case Apple has ever made — every colour, every season, every SKU. Built end-to-end with Next.js, tuned to sub-second first paint, and engineered to cost exactly nothing to run.",
  },
  {
    name: "Twixodus",
    href: "https://github.com/JonathanSeriesX/dayoneXtwitter",
    bio: "A Swift app (born a Python script) that migrates your Twitter archive into Day One — dates, media, and dignity preserved, with local LLM processing for privacy-friendly categorisation of your old tweets.",
  },
];

const experience = [
  {
    years: "2026 —",
    name: "Something special",
    meta: "under NDA",
    live: true,
    bio: "What I'm doing now. All I can say is: it's special, and I can't wait to show you.",
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

export default function Home() {
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
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6 px-6 py-3">
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

      <main className="mx-auto w-full max-w-3xl grow px-6 pb-4">
        <article className="tab-panel panel-home stagger">
          <h1>
            Hi there, my name is Evgenii.
            <br />I keep things running for{" "}
            <span className="cycler" aria-label="all sorts of people.">
              <span className="cycler-track" aria-hidden>
                {[...cycleWords, cycleWords[0]].map((word, i) => (
                  <span key={i}>{word}</span>
                ))}
              </span>
            </span>
          </h1>
          <div className="prose-col mt-8 text-muted">
            <p>
              By day, I&apos;m a DevOps engineer keeping{" "}
              <span className="mono">&lt;something_secret&gt;</span>{" "}
              observable, automated, and exceeding SLOs.
            </p>
          </div>
          <div className="prose-col mt-8 border-t border-rule pt-8 text-muted">
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
          <p className="prose-col mb-8 text-muted">
            By night, I&apos;m building small things I wanted to exist — sharp
            edges filed off, hosted for pennies, and maintained with more care
            than they strictly deserve.
          </p>
          <ul className="prose-col">
            {projects.map((entry) => (
              <li key={entry.name}>
                <a href={entry.href} className="link entry-name">
                  {entry.name}
                </a>
                <p className="entry-bio">{entry.bio}</p>
              </li>
            ))}
          </ul>
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
