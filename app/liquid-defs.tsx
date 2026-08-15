/* Inline SVG filter for the liquid-glass tab thumb, rendered once in the
   root layout and referenced from globals.css by id.

   #lg-goo melts the two travelling thumb copies into one stretching blob:
   blur them together, contrast-crush the alpha so the blurred union reads
   as a single solid silhouette, then composite the crisp originals on top.
   Plain filter (not backdrop-filter), so it works in every browser. */

export function LiquidDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="lg-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
