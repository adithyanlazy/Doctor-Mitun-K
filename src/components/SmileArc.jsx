import { motion } from 'framer-motion'

/**
 * SIGNATURE ELEMENT — the straightening smile.
 *
 * A twelve-crown upper arch seated on a smile curve. The teeth enter crooked
 * (rotated, tipped and stepped, the way a real malocclusion presents) and
 * settle into alignment on scroll: a literal picture of what the treatment
 * does.
 *
 * Crowns are drawn per tooth type rather than as identical rounded boxes —
 * centrals are the widest and longest, laterals shorter and narrower, canines
 * taper to a cusp tip, premolars and molars are progressively shorter and
 * rounder. Teeth toward the corners are also narrowed to fake the
 * foreshortening you get across a real arch.
 *
 * The whole <svg> holds ONE viewport observer and propagates the "show"
 * state to each tooth via variants + staggerChildren — reliable on SVG,
 * unlike per-child whileInView (which IntersectionObserver misses).
 */

/**
 * Crown proportions by distance from the midline (0 = central incisor).
 * Roughly to life: a central incisor crown is about 10.5mm long by 8.5mm
 * wide, and the teeth get shorter and blunter toward the back.
 */
const TOOTH_TYPES = [
  { k: 'central', w: 1.0, h: 1.0, cervix: 0.84, corner: 0.16, edge: 'flat' },
  { k: 'lateral', w: 0.8, h: 0.85, cervix: 0.82, corner: 0.2, edge: 'flat' },
  { k: 'canine', w: 0.9, h: 0.98, cervix: 0.72, corner: 0.26, edge: 'cusp' },
  { k: 'premolar1', w: 0.88, h: 0.72, cervix: 0.86, corner: 0.3, edge: 'bicusp' },
  { k: 'premolar2', w: 0.9, h: 0.64, cervix: 0.88, corner: 0.32, edge: 'bicusp' },
  { k: 'molar', w: 1.04, h: 0.56, cervix: 0.92, corner: 0.36, edge: 'round' },
]

/**
 * One crown, drawn around its own centre. Cervical (gum) end is -y, incisal
 * (biting) edge is +y, so the enamel gradient runs the right way once the
 * tooth is rotated onto the arch.
 */
function crownPath(w, h, t) {
  const hw = w / 2
  const hh = h / 2
  const cw = hw * t.cervix // half-width where the crown meets the gum
  const r = w * t.corner // incisal corner radius
  const bulge = w * 0.06 // slight convexity down the sides

  let edge
  if (t.edge === 'cusp') {
    // canine — a single tip, blunted rather than spiked
    edge = `Q ${r * 0.35} ${hh + h * 0.05} 0 ${hh + h * 0.07} Q ${-r * 0.35} ${hh + h * 0.05} ${-hw + r} ${hh}`
  } else if (t.edge === 'bicusp') {
    // premolar — two low cusps with a groove between them
    edge = `L ${r * 0.3} ${hh} Q 0 ${hh - h * 0.07} ${-r * 0.3} ${hh}`
  } else if (t.edge === 'round') {
    // molar — broad and blunt
    edge = `Q 0 ${hh + h * 0.04} ${-hw + r} ${hh}`
  } else {
    // incisor — flat biting edge
    edge = `L ${-hw + r} ${hh}`
  }

  return [
    `M ${-cw} ${-hh}`,
    // cervical line arches slightly toward the root
    `Q 0 ${-hh - h * 0.07} ${cw} ${-hh}`,
    // distal side, bowing out a touch
    `C ${hw + bulge} ${-hh + h * 0.3} ${hw} ${hh - r * 1.4} ${hw} ${hh - r}`,
    `Q ${hw} ${hh} ${hw - r} ${hh}`,
    edge,
    `Q ${-hw} ${hh} ${-hw} ${hh - r}`,
    // mesial side back up to the gum
    `C ${-hw} ${hh - r * 1.4} ${-hw - bulge} ${-hh + h * 0.3} ${-cw} ${-hh}`,
    'Z',
  ].join(' ')
}

export default function SmileArc({ teeth = 12, className = '', guide = '#2FC7C7', once = true }) {
  const cx = 220
  const cy = 34
  const R = 154
  const startDeg = 129
  const endDeg = 51
  const baseW = 21
  const baseH = 26

  // deterministic jitter (stable across renders, no Math.random needed)
  const jitter = (i) => {
    const s = Math.sin((i + 1) * 12.9898) * 43758.5453
    return s - Math.floor(s) // 0..1
  }

  const mid = (teeth - 1) / 2

  // Size every crown first, then walk the arch handing each one an arc share
  // proportional to its own width. Spacing the teeth evenly instead leaves
  // gaps beside the narrow laterals and the foreshortened back teeth — real
  // teeth sit in contact.
  const sized = Array.from({ length: teeth }, (_, i) => {
    const fromMid = Math.min(TOOTH_TYPES.length - 1, Math.round(Math.abs(i - mid) - 0.5 + 0.001))
    const type = TOOTH_TYPES[Math.max(0, fromMid)]
    // crowns toward the corners of the arch turn away from the viewer
    const foreshorten = 0.78 + 0.22 * Math.cos(((i - mid) / mid) * 0.95)
    return { i, type, w: baseW * type.w * foreshorten, h: baseH * type.h }
  })

  // running centres, each tooth stepped on by its own width less a little
  // overlap at the contact point
  let walked = 0
  const centres = sized.map((s) => {
    const c = walked + s.w / 2
    walked += s.w * 0.94
    return c
  })
  // normalise so the first and last crowns land on the ends of the arch
  const first = centres[0]
  const last = centres[centres.length - 1]
  const spread = last - first || 1

  const list = sized.map((s, idx) => {
    const t = teeth === 1 ? 0.5 : (centres[idx] - first) / spread
    const deg = startDeg + (endDeg - startDeg) * t
    const rad = (deg * Math.PI) / 180

    const j = jitter(s.i)
    const j2 = jitter(s.i + 99)
    const j3 = jitter(s.i + 411)

    return {
      i: s.i,
      px: cx + R * Math.cos(rad),
      py: cy + R * Math.sin(rad),
      w: s.w,
      h: s.h,
      alignedRot: deg - 90,
      // how far back in the mouth this tooth sits — drives the shading
      depth: Math.abs(s.i - mid) / mid,
      d: crownPath(s.w, s.h, s.type),
      // crooked state: rotation, a step up or down, and a little in or out
      jr: (j - 0.5) * 40,
      jx: (j2 - 0.5) * 9,
      jy: (j - 0.5) * 13,
      js: 0.92 + j3 * 0.14,
      op: 0.9 + j2 * 0.1,
    }
  })

  // paint back teeth first so the centrals sit in front where they overlap
  const painted = [...list].sort((a, b) => b.depth - a.depth)

  // smooth guide path through the base points
  const guidePts = Array.from({ length: 48 }, (_, k) => {
    const t = k / 47
    const deg = startDeg + (endDeg - startDeg) * t
    const rad = (deg * Math.PI) / 180
    return `${(cx + R * Math.cos(rad)).toFixed(1)} ${(cy + R * Math.sin(rad)).toFixed(1)}`
  })
  const guideD = `M ${guidePts.join(' L ')}`

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
  }
  const toothV = {
    hidden: (tt) => ({ rotate: tt.jr, x: tt.jx, y: tt.jy, scale: tt.js, opacity: 0 }),
    show: (tt) => ({
      rotate: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: tt.op,
      transition: { type: 'spring', stiffness: 120, damping: 15 },
    }),
  }
  const guideV = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: 'easeInOut' } },
  }

  return (
    <motion.svg
      viewBox="104 134 232 78"
      className={className}
      role="img"
      aria-label="Crooked teeth aligning into a straight, even smile"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.35 }}
    >
      <defs>
        {/* enamel: warmer and slightly darker at the gum, brightest across the
            middle third, cooler and faintly translucent at the biting edge */}
        <linearGradient id="sa-enamel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DCD6C8" />
          <stop offset="18%" stopColor="#F1EDE2" />
          <stop offset="55%" stopColor="#FDFCF8" />
          <stop offset="88%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E9F1F6" />
        </linearGradient>
        {/* the wet highlight running down the labial face */}
        <linearGradient id="sa-gloss" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d={guideD}
        fill="none"
        stroke={guide}
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 7"
        variants={guideV}
      />

      {painted.map((tt) => (
        <g key={tt.i} transform={`translate(${tt.px} ${tt.py}) rotate(${tt.alignedRot})`}>
          <motion.g custom={tt} variants={toothV}>
            {/* contact shadow, so neighbouring crowns read as separate teeth */}
            <path d={tt.d} fill="#0B1F3A" opacity="0.3" transform="translate(0.8 1)" />
            <path d={tt.d} fill="url(#sa-enamel)" />
            {/* teeth further back sit in shadow */}
            <path d={tt.d} fill="#0B1F3A" opacity={(tt.depth * 0.26).toFixed(3)} />
            {/* wet highlight down the labial face */}
            <ellipse
              cx={-tt.w * 0.12}
              cy={-tt.h * 0.1}
              rx={tt.w * 0.24}
              ry={tt.h * 0.28}
              fill="url(#sa-gloss)"
              opacity="0.75"
            />
          </motion.g>
        </g>
      ))}
    </motion.svg>
  )
}
