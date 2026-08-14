/* Inline SVG filters for the liquid-glass effects, rendered once in the root
   layout and referenced from globals.css by id.

   #lg-goo  melts the two tab thumbs into one stretching blob while they
            travel (blur → alpha contrast → the crisp original on top).

   #lg-lens bends whatever is behind a glass pane, Apple-style: the feImage
            is a displacement map, neutral (128) across the middle half and
            ramping to full red/green only in the outer 25% bands, so the
            backdrop is untouched in the centre and bends progressively
            toward it at the edges — a convex lens, no seam. A map that
            ramps edge-to-edge instead reads as a shifted ghost, because a
            near-constant offset is a copy, not a bend. Only Chromium
            supports SVG filters in backdrop-filter; elsewhere the overlays
            that reference this simply paint nothing. */

/* the band ramps ease in and out (extra stops ≈ smoothstep) — hard-edged
   ramp bands leave a visible crease where the bend suddenly stops */
const rampStops = (hex: (v: number) => string) =>
  [
    [0, 255],
    [0.07, 233],
    [0.15, 176],
    [0.21, 140],
    [0.25, 128],
    [0.75, 128],
    [0.79, 116],
    [0.85, 80],
    [0.93, 22],
    [1, 0],
  ]
    .map(([o, v]) => `<stop offset='${o}' stop-color='${hex(v)}'/>`)
    .join("");

const channel = (v: number) => v.toString(16).padStart(2, "0");

const LENS_MAP = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>" +
    "<defs>" +
    "<linearGradient id='r' x1='0' y1='0' x2='1' y2='0'>" +
    rampStops((v) => `#${channel(v)}0000`) +
    "</linearGradient>" +
    "<linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    rampStops((v) => `#00${channel(v)}00`) +
    "</linearGradient>" +
    "</defs>" +
    "<rect width='64' height='64' fill='url(#r)'/>" +
    "<rect width='64' height='64' fill='url(#g)' style='mix-blend-mode:screen'/>" +
    "</svg>",
)}`;

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
        {/* full-strength lens for panels and cards, soft variant for small
            or high-contrast panes (photo, tab bar) where a 15px bend would
            drag their rounded corners into view */}
        {(
          [
            ["lg-lens", 30],
            ["lg-lens-soft", 14],
          ] as const
        ).map(([id, scale]) => (
          <filter
            key={id}
            id={id}
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={LENS_MAP}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
