import Image from "next/image";

import { projects } from "@/site.config";

import { LinkArrowIcon } from "./icons";

export async function ProjectsTab() {
  /* Every project's stats() runs in parallel and is cached by the route's
     `revalidate`; a project without one simply gets no strip. */
  const strips = await Promise.all(
    projects.entries.map((entry) => entry.stats?.() ?? null),
  );

  return (
    <article className="tab-panel">
      <p className="prose-col mb-6 text-muted">{projects.intro}</p>
      <div className="grid gap-4">
        {projects.entries.map((entry, i) => (
          <div
            key={entry.name}
            className={`project-card ${entry.accent ?? ""}`}
          >
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
            {strips[i] && <p className="stat-strip">{strips[i]}</p>}
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
        {projects.reserved.map((entry) => (
          <div
            key={entry.name}
            className={`project-card reserved ${entry.accent ?? ""}`}
          >
            <div className="project-head">
              <span className="project-icon" aria-hidden>
                {"src" in entry.icon ? (
                  <Image src={entry.icon.src} alt="" fill sizes="44px" />
                ) : (
                  entry.icon.emoji
                )}
              </span>
              <span className="project-title">
                <span className="entry-name">{entry.name}</span>
              </span>
              <span className="project-year">{entry.year ?? "soon"}</span>
            </div>
            <p className="entry-bio">{entry.bio}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
