const projects = [
  {
    title: "EveryCase.org",
    summary: "Apple cases database.",
    href: "https://everycase.org",
  },
  {
    title: "DayOne × Twitter Importer",
    summary: "Move tweets into Day One.",
    href: "https://github.com/you/dayoneXtwitter",
  },
];

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl w-full">
      <h1 className="text-3xl font-semibold mb-6">Projects</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.href}
            className="block rounded-2xl border border-white/10 p-4 hover:border-white/30"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p className="text-sm text-neutral-400">{p.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
