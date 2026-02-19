const VeteranBadge = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 60"
    className={className}
    aria-label="Service-Disabled Veteran-Owned Small Business"
  >
    {/* Shield outline */}
    <path
      d="M10,6 L30,2 L50,6 L50,28 C50,40 30,52 30,52 C30,52 10,40 10,28 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.6"
    />
    {/* Flag stripes (red) */}
    <rect x="16" y="10" width="28" height="3" rx="0.5" fill="#B22234" />
    <rect x="16" y="16" width="28" height="3" rx="0.5" fill="#B22234" />
    <rect x="16" y="22" width="28" height="3" rx="0.5" fill="#B22234" />
    <rect x="16" y="28" width="24" height="3" rx="0.5" fill="#B22234" />
    {/* Flag stripes (white) */}
    <rect x="16" y="13" width="28" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
    <rect x="16" y="19" width="28" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
    <rect x="16" y="25" width="26" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
    {/* Blue canton */}
    <rect x="16" y="10" width="12" height="12" rx="1" fill="#3C3B6E" />
    {/* Stars (simplified) */}
    <circle cx="19" cy="13" r="0.8" fill="white" />
    <circle cx="22" cy="13" r="0.8" fill="white" />
    <circle cx="25" cy="13" r="0.8" fill="white" />
    <circle cx="20.5" cy="15.5" r="0.8" fill="white" />
    <circle cx="23.5" cy="15.5" r="0.8" fill="white" />
    <circle cx="19" cy="18" r="0.8" fill="white" />
    <circle cx="22" cy="18" r="0.8" fill="white" />
    <circle cx="25" cy="18" r="0.8" fill="white" />
    {/* Star on shield bottom */}
    <polygon
      points="30,34 31.5,38 36,38.5 32.5,41 33.8,45.5 30,42.5 26.2,45.5 27.5,41 24,38.5 28.5,38"
      fill="currentColor"
      opacity="0.5"
    />
    {/* Text */}
    <text x="58" y="20" fill="currentColor" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif" opacity="0.9">
      SERVICE-DISABLED
    </text>
    <text x="58" y="34" fill="currentColor" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif" opacity="0.9">
      VETERAN-OWNED
    </text>
    <text x="58" y="48" fill="currentColor" fontSize="9" fontFamily="system-ui, sans-serif" opacity="0.6" letterSpacing="0.5">
      SMALL BUSINESS (SDVOSB)
    </text>
  </svg>
);

export default VeteranBadge;
