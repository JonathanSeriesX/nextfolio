interface ExperienceEntry {
  years: string;
  name: string;
  meta: string;
  accent?: string;
  live?: boolean;
  bio: string;
  pills?: string[];
}

// palette variables for the career lane's colour gradients — each row hands
// its predecessor's colour to CSS as --xp-from (and gaps --xp-to as well)
const accentVar: Record<string, string> = {
  "accent-dayone": "var(--c-dayone)",
  "accent-amber": "var(--c-amber)",
  "accent-violet": "var(--c-violet)",
  "accent-emerald": "var(--c-emerald)",
};

// `{ gap: true }` rows render as a dashed stretch of the timeline lane — CV
// silence made explicit. Card sides alternate over the cards only, so a gap
// never breaks the zigzag rhythm.
const experience: (ExperienceEntry | { gap: true })[] = [
  {
    years: "nowadays",
    name: "Something special",
    meta: "under NDA",
    live: true,
    bio: "¯\\_(ツ)_/¯",
    pills: ["grafana", "argocd"],
  },
  {
    years: "2024–25",
    name: "BNP Paribas",
    meta: "SRE · Porto",
    accent: "accent-emerald",
    bio: "Sharpened monitoring and alerting inside one of Europe's largest banking groups: refined Grafana dashboards and alert rules for faster incident detection, automated internal workflows with Ansible, and cut the vulnerability backlog by 36% through triage and targeted upgrades.",
    pills: ["grafana", "ansible", "vuln triage"],
  },
  {
    years: "2022–24",
    name: "Libertex Group",
    meta: "SRE · Podgorica",
    accent: "accent-dayone",
    bio: "Led incident resolution for live trading systems — tuning ELK, Dynatrace, and Prometheus/Grafana until diagnosis took minutes, not hours. Ran production workloads on Docker and Kubernetes, optimised AWS for cost and fault tolerance, and automated CI/CD with Jenkins and GitLab across web and mobile.",
    pills: ["kubernetes", "aws", "elk", "ci/cd"],
  },
  { gap: true },
  {
    years: "2016–20",
    name: "BSc in Information Security",
    meta: "Saint Petersburg",
    accent: "accent-violet",
    bio: "Saint Petersburg State University of Aerospace Instrumentation — encryption, steganography, PKI, signal processing, and just enough x86 assembly to be dangerous.",
    pills: ["cryptography", "pki", "x86 asm"],
  },
];

// colour of an entry's lane segment, for the crossing gradients
const xpColor = (e?: (typeof experience)[number]) =>
  e && !("gap" in e) && e.accent ? accentVar[e.accent] : "var(--c-crimson)";

export function CareerTab() {
  // zigzag side counter — advances per card, not per row, so gap rows keep
  // the left/right alternation intact
  let zigzagSide = 0;

  return (
    <article className="tab-panel panel-work">
      <p className="mono mb-8 text-center text-muted">
        currently in Lisbon • open to relocation
      </p>
      <ol className="xp-zigzag">
        {experience.map((entry, i) => {
          if ("gap" in entry) {
            // direction = the upcoming card's side, so the dashed
            // crossing lands where that card's rail begins
            const toRight = zigzagSide % 2 === 1;
            return (
              <li
                key={`gap-${i}`}
                className={`xp-gap ${toRight ? "xp-right" : "xp-left"}`}
                aria-hidden
                style={
                  {
                    "--xp-from": xpColor(experience[i - 1]),
                    "--xp-to": xpColor(experience[i + 1]),
                  } as React.CSSProperties
                }
              >
                <span className="xp-lane" />
              </li>
            );
          }
          const side = zigzagSide++ % 2 ? "xp-right" : "xp-left";
          return (
            <li
              key={entry.name}
              className={`xp-row ${side}${entry.live ? " xp-live" : ""} ${entry.accent ?? ""}`}
              style={
                {
                  "--xp-from": xpColor(experience[i - 1]),
                } as React.CSSProperties
              }
            >
              <div className="xp-card">
                <div className="xp-head">
                  <span className="entry-name">{entry.name}</span>
                  <span className="xp-years">{entry.years}</span>
                </div>
                <span className="entry-meta">{entry.meta}</span>
                <p className="entry-bio">{entry.bio}</p>
                {entry.pills && (
                  <ul className="tag-cloud mt-3">
                    {entry.pills.map((pill) => (
                      <li key={pill} className="tag">
                        {pill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
