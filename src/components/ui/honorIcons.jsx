/**
 * Award icons for the About honours grid — richer badge-style marks that read
 * better than generic line icons at 20px inside the navy tiles.
 */

function IconBase({ size = 20, className = '', children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/** Royal college membership — crest shield with laurel ring. */
export function HonorCollegeIcon({ size = 20, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <path
        fill="currentColor"
        d="M12 2.2 5.4 4.8v5.1c0 4.1 2.8 7.9 6.6 8.8 3.8-.9 6.6-4.7 6.6-8.8V4.8L12 2.2Z"
        opacity="0.95"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        d="M8.2 9.4c1.4-1.8 3.2-2.7 3.8-2.7s2.4.9 3.8 2.7"
        opacity="0.55"
      />
      <circle cx="12" cy="11.2" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        d="M4.6 8.2c1.4-.8 2.9-1.3 4.4-1.5M19.4 8.2c-1.4-.8-2.9-1.3-4.4-1.5"
        opacity="0.45"
      />
    </IconBase>
  )
}

/** Clinical excellence award — cup trophy with star finial. */
export function HonorTrophyIcon({ size = 20, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <path
        fill="currentColor"
        d="M7.2 5.4h9.6l.7 2.2c.5 1.6-.2 3.3-1.7 4.1-1 .6-2.2.9-3.3.9s-2.3-.3-3.3-.9c-1.5-.8-2.2-2.5-1.7-4.1l.7-2.2Z"
        opacity="0.95"
      />
      <path
        fill="currentColor"
        d="M9.8 13.1h4.4l.8 2.2H9l.8-2.2Z"
        opacity="0.85"
      />
      <rect x="8.6" y="15.3" width="6.8" height="1.5" rx=".5" fill="currentColor" opacity="0.75" />
      <rect x="7.4" y="16.8" width="9.2" height="1.8" rx=".6" fill="currentColor" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        d="M5.8 6.8c-1.4.4-2.3 1.5-2.3 2.8 0 1.5 1.2 2.7 2.8 2.9M18.2 6.8c1.4.4 2.3 1.5 2.3 2.8 0 1.5-1.2 2.7-2.8 2.9"
        opacity="0.55"
      />
      <path
        fill="currentColor"
        d="M12 2.4 12.8 4.4h2.1l-1.7 1.2.6 2.1L12 6.4 9.2 7.7l.6-2.1L8.1 4.4h2.1L12 2.4Z"
        opacity="0.9"
      />
    </IconBase>
  )
}

/** International advisor — globe with advisory badge. */
export function HonorAdvisorIcon({ size = 20, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <circle cx="11" cy="11.5" r="7.2" fill="currentColor" opacity="0.22" />
      <circle cx="11" cy="11.5" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="11" cy="11.5" rx="3.1" ry="7.2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.75" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        d="M3.8 11.5h14.4M4.6 8h12.8M4.6 15h12.8"
        opacity="0.55"
      />
      <path
        fill="currentColor"
        d="M16.8 4.2h4.2v4.2l-1.6-1.2-1.5 2.4-.9-2.1-1.5 1.5.7-4.8Z"
        opacity="0.95"
      />
      <circle cx="18.9" cy="6.3" r="3.4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </IconBase>
  )
}

/** Published research — journal with peer-review seal. */
export function HonorResearchIcon({ size = 20, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <path
        fill="currentColor"
        d="M5.2 4.8h10.8c.8 0 1.4.6 1.4 1.4v12.4c0 .8-.6 1.4-1.4 1.4H6.6c-1 0-1.8-.8-1.8-1.8V6.6c0-1 .8-1.8 1.8-1.8Z"
        opacity="0.9"
      />
      <path fill="currentColor" d="M7.2 4.8V19.2c0 .8.6 1.4 1.4 1.4h8.8V6.2c0-.8-.6-1.4-1.4-1.4H7.2Z" opacity="0.55" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        d="M9.2 9h6.8M9.2 11.8h6.8M9.2 14.6h4.4"
        opacity="0.65"
      />
      <circle cx="17.4" cy="16.8" r="3.8" fill="currentColor" />
      <circle cx="17.4" cy="16.8" r="2.5" fill="none" stroke="currentColor" strokeWidth=".9" opacity="0.35" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.1 16.8 1 1 2.4-2.6"
        opacity="0.85"
      />
    </IconBase>
  )
}

export const honorIconMap = {
  college: HonorCollegeIcon,
  trophy: HonorTrophyIcon,
  advisor: HonorAdvisorIcon,
  research: HonorResearchIcon,
}
