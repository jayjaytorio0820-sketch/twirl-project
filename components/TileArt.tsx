// Placeholder art para sa portfolio tile habang wala pang totoong video/photo.
const HUES: Record<string, [string, string]> = {
  wedding: ['#3A1F5C', '#D6336C'],
  debut: ['#2B1846', '#E27AA4'],
  corporate: ['#14213D', '#1FA6B3'],
  school: ['#1E2A44', '#7FC8A9'],
  birthday: ['#3A1F5C', '#F2B84B'],
  other: ['#22123A', '#8E7CC3'],
};
export default function TileArt({ type, seed }: { type: string; seed: number }) {
  const [a, b] = HUES[type] ?? HUES.other;
  const rot = (seed * 47) % 360;
  return (
    <svg className="art" viewBox="0 0 90 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="90" height="160" fill={a} />
      <g transform={`rotate(${rot} 45 70)`} fill="none" stroke={b} strokeWidth="1.2" opacity="0.85">
        <ellipse cx="45" cy="70" rx="38" ry="12" />
        <ellipse cx="45" cy="70" rx="30" ry="9" opacity="0.6" />
        <ellipse cx="45" cy="70" rx="22" ry="6" opacity="0.35" />
      </g>
      <circle cx="45" cy="70" r="4" fill={b} />
    </svg>
  );
}
