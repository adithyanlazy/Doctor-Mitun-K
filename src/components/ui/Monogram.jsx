/**
 * "M" monogram — traced from the client's supplied logo.
 *
 * Three strokes, round caps, all at 45°:
 *   1. a long slash corner to corner
 *   2. a left element — vertical dropping to the baseline, with a short
 *      diagonal off its top running parallel to the slash
 *   3. a right element — its mirror, raised, with the short diagonal
 *      running across the slash
 *
 * Strokes inherit `currentColor`, so the mark works on navy, cream and
 * white alike. Keep the geometry in sync with public/monogram.svg.
 */
export default function Monogram({ size = 34, className = '', strokeWidth = 3 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 2 98 98" />
      <path d="M36 64 2 30v68" />
      <path d="M62 36 98 2v64" />
    </svg>
  )
}
