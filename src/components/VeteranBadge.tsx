const VeteranBadge = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 180 200"
    className={className}
    aria-label="Service-Disabled Veteran-Owned Small Business"
  >
    <defs>
      <clipPath id="shieldClip">
        <path d="M10,8 L90,0 L170,8 L170,120 C170,155 90,190 90,190 C90,190 10,155 10,120 Z" />
      </clipPath>
    </defs>

    {/* Shield border (dark navy) */}
    <path
      d="M6,5 L90,-4 L174,5 L174,123 C174,160 90,195 90,195 C90,195 6,160 6,123 Z"
      fill="#1B2A4A"
    />

    {/* Inner shield */}
    <path
      d="M10,8 L90,0 L170,8 L170,120 C170,155 90,190 90,190 C90,190 10,155 10,120 Z"
      fill="#2B4570"
    />

    {/* Flag area clipped to shield */}
    <g clipPath="url(#shieldClip)">
      {/* Flag background white */}
      <rect x="10" y="40" width="160" height="100" fill="white" />

      {/* Red stripes */}
      <rect x="10" y="40" width="160" height="8" fill="#BF0A30" />
      <rect x="10" y="56" width="160" height="8" fill="#BF0A30" />
      <rect x="10" y="72" width="160" height="8" fill="#BF0A30" />
      <rect x="10" y="88" width="160" height="8" fill="#BF0A30" />
      <rect x="10" y="104" width="160" height="8" fill="#BF0A30" />
      <rect x="10" y="120" width="160" height="8" fill="#BF0A30" />
      <rect x="10" y="136" width="160" height="8" fill="#BF0A30" />

      {/* Blue canton */}
      <rect x="10" y="40" width="68" height="48" fill="#002868" />

      {/* Stars in canton */}
      {/* Row 1 */}
      <circle cx="22" cy="48" r="2" fill="white" />
      <circle cx="34" cy="48" r="2" fill="white" />
      <circle cx="46" cy="48" r="2" fill="white" />
      <circle cx="58" cy="48" r="2" fill="white" />
      <circle cx="70" cy="48" r="2" fill="white" />
      {/* Row 2 */}
      <circle cx="28" cy="56" r="2" fill="white" />
      <circle cx="40" cy="56" r="2" fill="white" />
      <circle cx="52" cy="56" r="2" fill="white" />
      <circle cx="64" cy="56" r="2" fill="white" />
      {/* Row 3 */}
      <circle cx="22" cy="64" r="2" fill="white" />
      <circle cx="34" cy="64" r="2" fill="white" />
      <circle cx="46" cy="64" r="2" fill="white" />
      <circle cx="58" cy="64" r="2" fill="white" />
      <circle cx="70" cy="64" r="2" fill="white" />
      {/* Row 4 */}
      <circle cx="28" cy="72" r="2" fill="white" />
      <circle cx="40" cy="72" r="2" fill="white" />
      <circle cx="52" cy="72" r="2" fill="white" />
      <circle cx="64" cy="72" r="2" fill="white" />
      {/* Row 5 */}
      <circle cx="22" cy="80" r="2" fill="white" />
      <circle cx="34" cy="80" r="2" fill="white" />
      <circle cx="46" cy="80" r="2" fill="white" />
      <circle cx="58" cy="80" r="2" fill="white" />
      <circle cx="70" cy="80" r="2" fill="white" />

      {/* Soldier silhouette (saluting) */}
      <g transform="translate(55, 38) scale(0.85)" opacity="0.92">
        {/* Head */}
        <ellipse cx="55" cy="12" rx="12" ry="13" fill="#1B2A4A" />
        {/* Cap brim */}
        <rect x="42" y="6" width="28" height="4" rx="2" fill="#1B2A4A" />
        <rect x="40" y="9" width="32" height="2" fill="#1B2A4A" />
        {/* Body/torso */}
        <path d="M35,25 L75,25 L80,100 L30,100 Z" fill="#1B2A4A" />
        {/* Saluting arm (right) */}
        <path d="M68,28 L85,10 L92,6 L90,10 L82,18 L75,30 Z" fill="#1B2A4A" />
        {/* Left arm */}
        <path d="M38,30 L28,55 L32,56 L42,35 Z" fill="#1B2A4A" />
        {/* Shoulders */}
        <path d="M30,25 L80,25 L82,35 L28,35 Z" fill="#1B2A4A" />
      </g>
    </g>

    {/* Top banner - VETERAN OWNED */}
    <path
      d="M10,8 L90,0 L170,8 L170,40 L10,40 Z"
      fill="#1B2A4A"
    />
    <text
      x="90" y="28"
      fill="white"
      fontSize="16"
      fontWeight="800"
      fontFamily="system-ui, sans-serif"
      textAnchor="middle"
      letterSpacing="3"
    >
      VETERAN OWNED
    </text>

    {/* Bottom text area */}
    <text
      x="90" y="175"
      fill="white"
      fontSize="8"
      fontWeight="600"
      fontFamily="system-ui, sans-serif"
      textAnchor="middle"
      letterSpacing="1"
    >
      SERVICE-DISABLED · SDVOSB
    </text>

    {/* Red star at bottom of shield */}
    <polygon
      points="90,150 94,160 105,161 97,168 99,179 90,173 81,179 83,168 75,161 86,160"
      fill="#BF0A30"
    />
  </svg>
);

export default VeteranBadge;
