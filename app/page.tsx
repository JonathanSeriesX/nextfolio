const cycleWords = [
  "all sorts of people.",
  "big banks.",
  "trading floors.",
  "Apple collectors.",
  "tweet archivists.",
  "something secret.",
];

const tabs = [
  { id: "tab-projects", label: "Pet projects" },
  { id: "tab-interests", label: "Interests" },
  { id: "tab-work", label: "Experience" },
  { id: "tab-education", label: "Education" },
];

const professional = [
  {
    name: "Something special",
    meta: "2026 · under NDA",
    bio: "What I'm doing now. All I can say is: it's special, and I can't wait to show you.",
  },
  {
    name: "BNP Paribas",
    meta: "SRE · 2024–2025 · Porto",
    bio: "Sharpened monitoring and alerting inside one of Europe's largest banking groups: refined Grafana dashboards and alert rules for faster incident detection, automated internal workflows with Ansible, and cut the vulnerability backlog by 36% through triage and targeted upgrades.",
  },
  {
    name: "Libertex Group",
    meta: "SRE · 2022–2024 · Podgorica",
    bio: "Led incident resolution for live trading systems — tuning ELK, Dynatrace, and Prometheus/Grafana until diagnosis took minutes, not hours. Ran production workloads on Docker and Kubernetes, optimised AWS for cost and fault tolerance, and automated CI/CD with Jenkins and GitLab across web and mobile.",
  },
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

const interests = [
  {
    name: "Home lab",
    bio: "Quietly humming hardware running containers, backups, and experiments — forever one component away from perfect.",
  },
  {
    name: "Photography",
    bio: "Digital photography, mostly with whatever camera is already in my pocket. Lisbon does half the work.",
  },
  {
    name: "Racing & games",
    bio: "Formula 1 on race weekends, indie video games and competitive Tetris on weeknights.",
  },
  {
    name: "Micro-mobility",
    bio: "Getting around Lisbon on anything with fewer than four wheels, with strong opinions on urbanism and the right to repair.",
  },
];

const education = [
  {
    name: "BSc in Information Security",
    meta: "2016–2020 · Saint Petersburg",
    bio: "Saint Petersburg State University of Aerospace Instrumentation — encryption, steganography, PKI, signal processing, and just enough x86 assembly to be dangerous.",
  },
];

export default function Home() {
  return (
    <article className="flex flex-col">
      <section className="stagger pt-6 pb-14 sm:pt-14">
        <h1>
          Hi there, my name is Evgenii.
          <br />
          I keep things running for{" "}
          <span className="cycler" aria-label="all sorts of people.">
            <span className="cycler-track" aria-hidden>
              {[...cycleWords, cycleWords[0]].map((word, i) => (
                <span key={i}>{word}</span>
              ))}
            </span>
          </span>
        </h1>
        <div className="prose-col mt-10 text-muted">
          <p>
            I&apos;m a site reliability &amp; DevOps engineer in Lisbon,
            Portugal. I&apos;ve spent the last years keeping trading platforms
            and banking systems observable, automated, and pleasantly boring —
            Grafana dashboards, Kubernetes clusters, Ansible playbooks, and
            the occasional 3 a.m. incident.
          </p>
          <p>
            I like infrastructure that is small, legible, and built to be
            repaired — the fewer moving parts, the better. This site ships
            almost no JavaScript: the tabs below are pure CSS, and the only
            script on the page runs the theme switch.
          </p>
        </div>
      </section>

      <section className="tabs section stagger">
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
        <nav className="tab-bar" aria-label="Sections">
          <span className="tab-thumb" aria-hidden />
          {tabs.map((tab) => (
            <label key={tab.id} htmlFor={tab.id}>
              {tab.label}
            </label>
          ))}
        </nav>

        <ul className="tab-panel panel-projects prose-col">
          {projects.map((entry) => (
            <li key={entry.name}>
              <a href={entry.href} className="link entry-name">
                {entry.name}
              </a>
              <p className="entry-bio">{entry.bio}</p>
            </li>
          ))}
        </ul>

        <ul className="tab-panel panel-interests prose-col">
          {interests.map((entry) => (
            <li key={entry.name}>
              <span className="entry-name">{entry.name}</span>
              <p className="entry-bio">{entry.bio}</p>
            </li>
          ))}
        </ul>

        <ul className="tab-panel panel-work prose-col">
          {professional.map((entry, i) => (
            <li key={entry.name}>
              <span className="entry-no">{i + 1}</span>
              <span className="entry-name">{entry.name}</span>
              <span className="entry-meta">{entry.meta}</span>
              <p className="entry-bio">{entry.bio}</p>
            </li>
          ))}
        </ul>

        <ul className="tab-panel panel-education prose-col">
          {education.map((entry) => (
            <li key={entry.name}>
              <span className="entry-name">{entry.name}</span>
              <span className="entry-meta">{entry.meta}</span>
              <p className="entry-bio">{entry.bio}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
