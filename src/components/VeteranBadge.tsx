const VeteranBadge = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 220 64"
    className={className}
    aria-label="Service-Disabled Veteran-Owned Small Business"
  >
    {/* Shield shape with flag inside */}
    <defs>
      <clipPath id="shieldClip">
        <path d="M6,4 L30,0 L54,4 L54,30 C54,44 30,56 30,56 C30,56 6,44 6,30 Z" />
      </clipPath>
    </defs>

    {/* Shield background */}
    <path
      d="M6,4 L30,0 L54,4 L54,30 C54,44 30,56 30,56 C30,56 6,44 6,30 Z"
      fill="#002868"
    />

    {/* Flag inside shield */}
    <g clipPath="url(#shieldClip)">
      {/* Red stripes */}
      <rect x="0" y="0" width="60" height="4.3" fill="#BF0A30" />
      <rect x="0" y="8.6" width="60" height="4.3" fill="#BF0A30" />
      <rect x="0" y="17.2" width="60" height="4.3" fill="#BF0A30" />
      <rect x="0" y="25.8" width="60" height="4.3" fill="#BF0A30" />
      <rect x="0" y="34.4" width="60" height="4.3" fill="#BF0A30" />
      <rect x="0" y="43" width="60" height="4.3" fill="#BF0A30" />
      {/* White stripes */}
      <rect x="0" y="4.3" width="60" height="4.3" fill="white" />
      <rect x="0" y="12.9" width="60" height="4.3" fill="white" />
      <rect x="0" y="21.5" width="60" height="4.3" fill="white" />
      <rect x="0" y="30.1" width="60" height="4.3" fill="white" />
      <rect x="0" y="38.7" width="60" height="4.3" fill="white" />
      <rect x="0" y="47.3" width="60" height="4.3" fill="white" />
      {/* Blue canton */}
      <rect x="0" y="0" width="26" height="26" fill="#002868" />
      {/* Stars */}
      <circle cx="8" cy="5" r="1" fill="white" />
      <circle cx="14" cy="5" r="1" fill="white" />
      <circle cx="20" cy="5" r="1" fill="white" />
      <circle cx="11" cy="9" r="1" fill="white" />
      <circle cx="17" cy="9" r="1" fill="white" />
      <circle cx="8" cy="13" r="1" fill="white" />
      <circle cx="14" cy="13" r="1" fill="white" />
      <circle cx="20" cy="13" r="1" fill="white" />
      <circle cx="11" cy="17" r="1" fill="white" />
      <circle cx="17" cy="17" r="1" fill="white" />
      <circle cx="8" cy="21" r="1" fill="white" />
      <circle cx="14" cy="21" r="1" fill="white" />
      <circle cx="20" cy="21" r="1" fill="white" />
    </g>

    {/* Shield border */}
    <path
      d="M6,4 L30,0 L54,4 L54,30 C54,44 30,56 30,56 C30,56 6,44 6,30 Z"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      opacity="0.7"
    />

    {/* White star at shield bottom */}
    <polygon
      points="30,36 31.8,41 37,41.5 33,44 34.2,49 30,46 25.8,49 27,44 23,41.5 28.2,41"
      fill="white"
      opacity="0.9"
    />

    {/* Text - all white */}
    <text x="64" y="19" fill="white" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
      SERVICE-DISABLED
    </text>
    <text x="64" y="34" fill="white" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
      VETERAN-OWNED
    </text>
    <text x="64" y="49" fill="white" fontSize="9" fontFamily="system-ui, sans-serif" opacity="0.75" letterSpacing="0.5">
      SMALL BUSINESS (SDVOSB)
    </text>
  </svg>
);

export default VeteranBadge;
