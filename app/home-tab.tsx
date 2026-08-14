import Image from "next/image";

// Ordered for a single pass: opens on the specific ("big banks."), rolls
// through the rest, and parks on the umbrella phrase — which is also the
// aria-label below.
const cycleWords = [
  "international banks.",
  "trading floors.",
  "Apple collectors.",
  "Day One users.",
  "people.",
];

// The roll keyframes are generated from cycleWords, so the animation always
// matches the row count — edit the list freely; the last word is where the
// roll parks. It plays once per visit to the home tab (see .cycler-track in
// globals.css), so no duplicate first row is needed anymore.
const cycleRows = cycleWords.length;
const cycleSlot = 100 / cycleWords.length;
const cycleKeyframes = `@keyframes cycle {
${cycleWords
  .map((_, i) => {
    const from = (i * cycleSlot).toFixed(2);
    const to =
      i === cycleWords.length - 1
        ? "100.00"
        : ((i + 1) * cycleSlot - 3).toFixed(2);
    return `  ${from}%, ${to}% { transform: translateY(calc(-100% * ${i} / ${cycleRows})); }`;
  })
  .join("\n")}
}`;
const cycleDuration = `${(cycleWords.length * 2.4).toFixed(1)}s`;

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

export function HomeTab() {
  return (
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
              {cycleWords.map((word, i) => (
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
          <li key={tag.label} className={`tag${tag.hover ? " tag-swap" : ""}`}>
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
  );
}
