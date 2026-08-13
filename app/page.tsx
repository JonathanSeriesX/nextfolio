import { Showcase } from "./showcase";

export default function Home() {
  return (
    <article className="flex flex-col gap-10 py-8 sm:py-14">
      <section className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
            Hi there, my name is{" "}
            <span style={{ color: "var(--site-accent)" }}>Evgenii</span>.
          </h1>
          <p
            className="mt-5 text-lg"
            style={{ color: "var(--site-fg-muted)" }}
          >
            Software engineer in Porto, Portugal. I build things for the web —
            and occasionally for myself.
          </p>
        </div>
        <div
          aria-label="Photo of Evgenii, coming soon"
          className="image-shell aspect-square w-36 shrink-0 text-center text-sm sm:w-44"
          style={{ color: "var(--site-fg-muted)" }}
        >
          photo of me,
          <br />
          eventually
        </div>
      </section>

      <Showcase />
    </article>
  );
}
