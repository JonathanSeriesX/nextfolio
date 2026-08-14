/* Inline SVG filters for the liquid-glass effects, rendered once in the
   root layout and referenced from globals.css by id.

   #lg-goo  melts the two travelling tab-thumb copies into one stretching
            blob: blur them together, contrast-crush the alpha so the
            blurred union reads as a single solid silhouette, then
            composite the crisp originals on top.

   #lg-lens bends whatever is behind a glass pane toward its centre. The
            feImage is a displacement map (R = horizontal, G = vertical,
            128 = rest): neutral across the middle, each edge ramps up
            through a smootherstep band, and — the part that keeps it
            clean — each edge's bend fades to nothing before it reaches a
            corner. Straight x/y bands that run all the way into a corner
            collide there at 1.4x strength with clashing directions, which
            is exactly the folded-paper blemish this map exists to avoid.
            Only Chromium supports SVG filters in backdrop-filter; the
            overlays referencing this paint nothing elsewhere. */

/* smootherstep samples: k eases 1 → 0 with zero slope at both ends, so
   neither the pane edge nor the hand-over to the neutral middle leaves a
   visible crease */
const EASE: Array<[number, number]> = [
  [0, 1],
  [0.25, 0.896],
  [0.5, 0.5],
  [0.75, 0.104],
  [0.9, 0.008],
  [1, 0],
];

/* how deep the bend band reaches into the pane, and how far from each end
   of an edge the bend has fully faded (both as fractions of the pane) */
const BAND = 0.16;
const FADE = 0.2;

const channel = (v: number) => v.toString(16).padStart(2, "0");

const stop = (offset: number, color: string) =>
  `<stop offset='${offset.toFixed(3)}' stop-color='${color}'/>`;

/* one displacement channel: full deflection at the near edge easing to
   neutral (128), flat middle, then neutral easing to zero at the far edge */
const rampStops = (hex: (v: number) => string) =>
  [
    ...EASE.map(([f, k]) => stop(f * BAND, hex(Math.round(128 + 127 * k)))),
    ...EASE.map(([f, k]) =>
      stop(1 - BAND * (1 - f), hex(Math.round(128 * k))),
    ),
  ].join("");

/* corner-fade mask: white (= overlay the neutral colour, suppressing the
   bend) at both ends of an edge, black across its middle */
const fadeStops = () =>
  [
    ...EASE.map(([f, k]) => {
      const g = channel(Math.round(255 * k));
      return stop(f * FADE, `#${g}${g}${g}`);
    }),
    ...EASE.map(([f, k]) => {
      const g = channel(Math.round(255 * (1 - k)));
      return stop(1 - FADE * (1 - f), `#${g}${g}${g}`);
    }),
  ].join("");

const LENS_MAP = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>" +
    "<defs>" +
    `<linearGradient id='rx' x1='0' y1='0' x2='1' y2='0'>${rampStops(
      (v) => `#${channel(v)}0000`,
    )}</linearGradient>` +
    `<linearGradient id='gy' x1='0' y1='0' x2='0' y2='1'>${rampStops(
      (v) => `#00${channel(v)}00`,
    )}</linearGradient>` +
    `<linearGradient id='fx' x1='0' y1='0' x2='0' y2='1'>${fadeStops()}</linearGradient>` +
    `<linearGradient id='fy' x1='0' y1='0' x2='1' y2='0'>${fadeStops()}</linearGradient>` +
    "<mask id='mx'><rect width='64' height='64' fill='url(#fx)'/></mask>" +
    "<mask id='my'><rect width='64' height='64' fill='url(#fy)'/></mask>" +
    "</defs>" +
    /* R: horizontal ramp, neutralised near the top/bottom ends */
    "<rect width='64' height='64' fill='url(#rx)'/>" +
    "<rect width='64' height='64' fill='#800000' mask='url(#mx)'/>" +
    /* G: vertical ramp, neutralised near the left/right ends, screened
       onto the red image (disjoint channels, so screen = combine) */
    "<g style='mix-blend-mode:screen'>" +
    "<rect width='64' height='64' fill='url(#gy)'/>" +
    "<rect width='64' height='64' fill='#008000' mask='url(#my)'/>" +
    "</g>" +
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
            or high-contrast panes (photo, tab bar) where a deep bend would
            drag their rounded corners into view */}
        {(
          [
            ["lg-lens", 24],
            ["lg-lens-soft", 10],
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
