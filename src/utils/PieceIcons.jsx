export const PawnSVG = ({ size = 60, color = "#a78bfa", stroke = "none", filterId }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    {filterId && (
      <defs>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ddd6fe" floodOpacity="0.9" />
        </filter>
      </defs>
    )}
    <g filter={filterId ? `url(#${filterId})` : undefined}>
      <ellipse cx="40" cy="73" rx="14" ry="4" fill="black" opacity="0.15" />
      <rect x="28" y="54" width="24" height="10" rx="3" fill={color} stroke={stroke} strokeWidth="1.2" />
      <rect x="30" y="48" width="20" height="8" rx="2" fill={color} stroke={stroke} strokeWidth="1.2" />
      <rect x="32" y="38" width="16" height="12" rx="2" fill={color} opacity="0.9" stroke={stroke} strokeWidth="1.2" />
      <circle cx="40" cy="30" r="10" fill={color} stroke={stroke} strokeWidth="1.2" />
      <ellipse cx="37" cy="27" rx="3" ry="4" fill="white" opacity="0.2" />
    </g>
  </svg>
);

export const RookSVG = ({ size = 60, color = "#c4b5fd", stroke = "none", filterId }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    {filterId && (
      <defs>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ddd6fe" floodOpacity="0.9" />
        </filter>
      </defs>
    )}
    <g filter={filterId ? `url(#${filterId})` : undefined}>
      <ellipse cx="48" cy="89" rx="18" ry="4" fill="black" opacity="0.15" />
      <rect x="26" y="66" width="44" height="14" rx="3" fill={color} stroke={stroke} strokeWidth="1.2" />
      <rect x="30" y="34" width="36" height="34" rx="2" fill={color} opacity="0.9" stroke={stroke} strokeWidth="1.2" />
      <rect x="26" y="18" width="11" height="18" rx="2" fill={color} stroke={stroke} strokeWidth="1.2" />
      <rect x="43" y="18" width="11" height="18" rx="2" fill={color} stroke={stroke} strokeWidth="1.2" />
      <rect x="60" y="18" width="11" height="18" rx="2" fill={color} stroke={stroke} strokeWidth="1.2" />
      <ellipse cx="42" cy="42" rx="5" ry="7" fill="white" opacity="0.15" />
    </g>
  </svg>
);

export const KnightSVG = ({ size = 65, color = "#7c3aed", stroke = "none", filterId }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none">
    {filterId && (
      <defs>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ddd6fe" floodOpacity="0.9" />
        </filter>
      </defs>
    )}
    <g filter={filterId ? `url(#${filterId})` : undefined}>
      <ellipse cx="55" cy="101" rx="22" ry="5" fill="black" opacity="0.15" />
      <rect x="30" y="80" width="50" height="13" rx="3" fill={color} stroke={stroke} strokeWidth="1.2" />
      <path d="M38 80 C34 62 30 44 40 30 C46 22 56 17 64 21 C74 26 78 38 72 54 C67 65 60 74 55 80 Z" fill={color} opacity="0.9" stroke={stroke} strokeWidth="1.2" />
      <path d="M40 30 C38 22 42 13 50 11 C54 10 58 11 60 15" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M36 36 C32 32 33 26 38 26 C42 26 44 30 42 34 Z" fill={color} stroke={stroke} strokeWidth="1" />
      <circle cx="52" cy="22" r="5" fill={color} stroke={stroke} strokeWidth="1.2" />
      <circle cx="47" cy="28" r="2" fill="white" opacity="0.5" />
      <ellipse cx="46" cy="38" rx="4" ry="6" fill="white" opacity="0.15" />
    </g>
  </svg>
);

export const QueenSVG = ({ size = 70, color = "#ddd6fe", stroke = "none", filterId }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    {filterId && (
      <defs>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ddd6fe" floodOpacity="0.9" />
        </filter>
      </defs>
    )}
    <g filter={filterId ? `url(#${filterId})` : undefined}>
      <ellipse cx="60" cy="113" rx="24" ry="5" fill="black" opacity="0.15" />
      <rect x="32" y="90" width="56" height="14" rx="3" fill={color} stroke={stroke} strokeWidth="1.2" />
      <path d="M36 90 L30 52 L44 63 L60 22 L76 63 L90 52 L84 90 Z" fill={color} opacity="0.9" stroke={stroke} strokeWidth="1.2" />
      <circle cx="30" cy="48" r="7" fill={color} stroke={stroke} strokeWidth="1.2" />
      <circle cx="60" cy="17" r="7" fill={color} stroke={stroke} strokeWidth="1.2" />
      <circle cx="90" cy="48" r="7" fill={color} stroke={stroke} strokeWidth="1.2" />
      <circle cx="45" cy="37" r="5" fill={color} stroke={stroke} strokeWidth="1" />
      <circle cx="75" cy="37" r="5" fill={color} stroke={stroke} strokeWidth="1" />
      <ellipse cx="52" cy="60" rx="6" ry="10" fill="white" opacity="0.15" />
    </g>
  </svg>
);

export const KingSVG = ({ size = 70, color = "#ede9fe", stroke = "none", filterId }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    {filterId && (
      <defs>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ddd6fe" floodOpacity="0.9" />
        </filter>
      </defs>
    )}
    <g filter={filterId ? `url(#${filterId})` : undefined}>
      <ellipse cx="60" cy="113" rx="24" ry="5" fill="black" opacity="0.15" />
      <rect x="32" y="90" width="56" height="14" rx="3" fill={color} stroke={stroke} strokeWidth="1.2" />
      <path d="M38 90 L34 52 L60 60 L86 52 L82 90 Z" fill={color} opacity="0.9" stroke={stroke} strokeWidth="1.2" />
      <rect x="50" y="42" width="20" height="14" rx="3" fill={color} stroke={stroke} strokeWidth="1.2" />
      <rect x="57" y="10" width="6" height="32" rx="2" fill={color} stroke={stroke} strokeWidth="1.2" />
      <rect x="46" y="20" width="28" height="6" rx="2" fill={color} stroke={stroke} strokeWidth="1.2" />
      <ellipse cx="52" cy="65" rx="5" ry="9" fill="white" opacity="0.15" />
    </g>
  </svg>
);

export const BishopSVG = ({ size = 65, color = "#c4b5fd", stroke = "none", filterId }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none">
    {filterId && (
      <defs>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ddd6fe" floodOpacity="0.9" />
        </filter>
      </defs>
    )}
    <g filter={filterId ? `url(#${filterId})` : undefined}>
      <ellipse cx="55" cy="101" rx="22" ry="5" fill="black" opacity="0.15" />
      <rect x="30" y="80" width="50" height="13" rx="3" fill={color} stroke={stroke} strokeWidth="1.2" />
      <rect x="34" y="70" width="42" height="12" rx="3" fill={color} opacity="0.85" stroke={stroke} strokeWidth="1.2" />
      <path d="M55 18 C38 28 36 54 38 68 C46 72 64 72 72 68 C74 54 72 28 55 18 Z" fill={color} opacity="0.9" stroke={stroke} strokeWidth="1.2" />
      <circle cx="55" cy="14" r="7" fill={color} stroke={stroke} strokeWidth="1.2" />
      <line x1="44" y1="38" x2="62" y2="58" stroke="white" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />
      <ellipse cx="48" cy="40" rx="4" ry="7" fill="white" opacity="0.15" />
    </g>
  </svg>
);

/* ── Piece icon map ───────────────────────────────────────────────────── */
export const pieceIcons = {
  // White pieces — light lavender, violet stroke for definition
  K: (props) => <KingSVG   {...props} color="#f5f3ff" stroke="#7c3aed" />,
  Q: (props) => <QueenSVG  {...props} color="#ede9fe" stroke="#7c3aed" />,
  R: (props) => <RookSVG   {...props} color="#ddd6fe" stroke="#7c3aed" />,
  B: (props) => <BishopSVG {...props} color="#ddd6fe" stroke="#7c3aed" />,
  N: (props) => <KnightSVG {...props} color="#c4b5fd" stroke="#6d28d9" />,
  P: (props) => <PawnSVG   {...props} color="#c4b5fd" stroke="#6d28d9" />,

  // Black pieces — deep violet + lavender feDropShadow glow so they
  // stand out against the dark (#4c1d95 → #6d28d9) squares
  k: (props) => <KingSVG   {...props} color="#3b0764" filterId="glow-k" />,
  q: (props) => <QueenSVG  {...props} color="#4c1d95" filterId="glow-q" />,
  r: (props) => <RookSVG   {...props} color="#5b21b6" filterId="glow-r" />,
  b: (props) => <BishopSVG {...props} color="#5b21b6" filterId="glow-b" />,
  n: (props) => <KnightSVG {...props} color="#6d28d9" filterId="glow-n" />,
  p: (props) => <PawnSVG   {...props} color="#6d28d9" filterId="glow-p" />,
};
