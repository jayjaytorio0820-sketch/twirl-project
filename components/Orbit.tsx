// Hero signature: ang 360 platform na may umiikot na camera arm.
export default function Orbit() {
  const ring = 'TWIRL PROJECT  •  360 VIDEO BOOTH  •  TWIRL PROJECT  •  360 VIDEO BOOTH  •  ';
  return (
    <div className="orbit" role="img" aria-label="360 video booth platform na may umiikot na camera">
      <svg viewBox="0 0 520 520">
        <defs>
          <path id="ringPath" d="M260,260 m-232,0 a232,232 0 1,1 464,0 a232,232 0 1,1 -464,0" />
          <radialGradient id="stage" cx="50%" cy="45%" r="60%">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#E6E0F0" />
          </radialGradient>
        </defs>
        <g className="ring">
          <text className="ring-text"><textPath href="#ringPath">{ring}</textPath></text>
        </g>
        {/* platform */}
        <circle cx="260" cy="260" r="190" fill="url(#stage)" stroke="#22123A" strokeWidth="2" />
        <circle cx="260" cy="260" r="150" fill="none" stroke="#DCD6E8" strokeWidth="1.5" strokeDasharray="3 9" />
        <circle cx="260" cy="260" r="96" fill="#22123A" />
        <circle cx="260" cy="260" r="96" fill="none" stroke="#1FA6B3" strokeWidth="3" strokeDasharray="2 10" />
        {/* guests (abstract) */}
        <g fill="#F3F1F8">
          <circle cx="236" cy="246" r="15" /><rect x="220" y="264" width="32" height="40" rx="14" />
          <circle cx="284" cy="244" r="15" /><rect x="268" y="262" width="32" height="42" rx="14" />
        </g>
        {/* arm + camera */}
        <g className="arm">
          <line x1="260" y1="260" x2="260" y2="58" stroke="#22123A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="260" cy="260" r="12" fill="#D6336C" />
          <rect x="238" y="34" width="44" height="34" rx="8" fill="#22123A" />
          <circle cx="260" cy="51" r="9" fill="#1FA6B3" />
          <circle cx="260" cy="51" r="4" fill="#22123A" />
          <path d="M260 70 L214 200 L306 200 Z" fill="#1FA6B3" opacity="0.12" />
        </g>
      </svg>
    </div>
  );
}
