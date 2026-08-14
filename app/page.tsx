import { site, tabs } from "@/site.config";

import { CareerTab } from "./career-tab";
import { HomeTab } from "./home-tab";
import { ProjectsTab } from "./projects-tab";

// Route-level ISR: the project stat strips (fetched in projects-tab.tsx)
// refresh daily. Next requires a literal here — keep it in step with
// REVALIDATE in stats.ts.
export const revalidate = 86400;

export default function Home() {
  return (
    <div className="tabs flex grow flex-col">
      {/* One radio per tab, ahead of everything that reacts to it: the CSS
          reads them positionally (.tab-input:nth-of-type(N)), so no rule
          anywhere needs to know a tab's name. */}
      {tabs.map((tab, i) => (
        <input
          key={tab.id}
          type="radio"
          name="tabs"
          id={`tab-${tab.id}`}
          defaultChecked={i === 0}
          className="tab-input"
        />
      ))}

      <header className="site-header">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6">
          {/* items-center keeps the wordmark centred against the picker even
              when the picker folds onto two rows */}
          <span className="mono font-medium">{site.wordmark}</span>
          <nav
            className="tab-bar"
            aria-label="Sections"
            // data-tabs picks the narrow-viewport row split, --tab-count does
            // the thumb geometry; both live in globals.css
            data-tabs={tabs.length}
            style={
              { "--tab-count": String(tabs.length) } as React.CSSProperties
            }
          >
            <span className="tab-thumb" aria-hidden />
            {tabs.map((tab) => (
              <label key={tab.id} htmlFor={`tab-${tab.id}`}>
                {tab.label}
              </label>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl grow px-4 pb-4 sm:px-6">
        {/* Panels are matched to tabs by position — this order must mirror
            `tabs` in site.config.tsx. */}
        <HomeTab />
        <ProjectsTab />
        <CareerTab />
      </main>
    </div>
  );
}
