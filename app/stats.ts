/* Helpers for the live numbers in a project's stat strip.
 *
 * Each project in site.config.tsx may declare an async `stats()`; these are
 * the building blocks it composes. Everything returns null on failure so the
 * caller can fall back to a hardcoded figure rather than render an empty
 * strip — a portfolio should never go blank because GitHub rate-limited it.
 *
 * REVALIDATE is the per-request cache window. Keep it in step with the route's
 * `revalidate` in page.tsx, which Next requires to be a literal. */
export const REVALIDATE = 86_400;

/** Row count of a remote CSV, header excluded. */
export async function countCsvRows(url: string): Promise<number | null> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return (await res.text()).trim().split("\n").length - 1;
  } catch {
    return null;
  }
}

/** Stars on a public GitHub repo, given as "owner/name". */
export async function githubStars(repo: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return ((await res.json())?.stargazers_count as number) ?? null;
  } catch {
    return null;
  }
}
