// Hero signature: ang 360 platform na may umiikot na gold arm, may totoong photo ng TWIRL sa gitna.
export default function Orbit() {
  const ring = 'TWIRL PROJECT  •  360 VIDEO BOOTH  &  PHOTO BOOTH  •  TWIRL PROJECT  •  360 VIDEO BOOTH  •  ';
  return (
    <div className="orbit" role="img" aria-label="A bride in front of the TWIRL Project backdrop, circled by a spinning 360 camera arm">
      <svg viewBox="0 0 520 520">
        <defs>
          <path id="ringPath" d="M260,260 m-232,0 a232,232 0 1,1 464,0 a232,232 0 1,1 -464,0" />
          <clipPath id="stageClip"><circle cx="260" cy="260" r="186" /></clipPath>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F2D272" /><stop offset="0.5" stopColor="#D4AF37" /><stop offset="1" stopColor="#8C6A12" />
          </linearGradient>
        </defs>
        <g className="ring">
          <text className="ring-text" style={{ fill: '#D4AF37' }}><textPath href="#ringPath">{ring}</textPath></text>
        </g>
        <image href="/images/portfolio/bride-backdrop.jpg" x="74" y="74" width="372" height="372" preserveAspectRatio="xMidYMid slice" clipPath="url(#stageClip)" />
        <circle cx="260" cy="260" r="188" fill="none" stroke="url(#goldGrad)" strokeWidth="5" />
        <circle cx="260" cy="260" r="200" fill="none" stroke="#D4AF37" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 8" />
        <g className="arm">
          <circle cx="260" cy="60" r="16" fill="#0D0B08" stroke="url(#goldGrad)" strokeWidth="4" />
          <circle cx="260" cy="60" r="6" fill="#F2D272" />
        </g>
      </svg>
    </div>
  );
}
