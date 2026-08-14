import { CareerTab } from "./career-tab";
import { HomeTab } from "./home-tab";
import { ProjectsTab } from "./projects-tab";

// Route-level ISR: the project stat strips (fetched in projects-tab.tsx)
// refresh daily.
export const revalidate = 86400;

const tabs = [
  { id: "tab-home", label: "home" },
  { id: "tab-projects", label: "projects" },
  { id: "tab-work", label: "career" },
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
        <HomeTab />
        <ProjectsTab />
        <CareerTab />
      </main>
    </div>
  );
}
