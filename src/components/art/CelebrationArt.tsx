export type OccasionTheme = "wedding" | "haldi" | "birthday" | "festival";

export type PresetArtKind =
  | "wedding"
  | "haldi"
  | "birthday"
  | "diwali"
  | "ganesh"
  | "anniversary"
  | "baby"
  | "corporate";

const PATTERNS: Record<OccasionTheme, { background: string; accent: string }> = {
  wedding: { background: "#7a1f2b", accent: "#e4d7f5" },
  haldi: { background: "#1e8a5c", accent: "#c9e265" },
  birthday: { background: "#5bb8f5", accent: "#d81b72" },
  festival: { background: "#2346a0", accent: "#fff3b0" },
};

export function CelebrationBackdrop({ theme }: { theme: OccasionTheme }) {
  const colors = PATTERNS[theme];
  return (
    <div className={`celebration-backdrop theme-${theme}`} aria-hidden="true">
      <svg className="backdrop-pattern" viewBox="0 0 180 180" role="presentation">
        <defs>
          <pattern id={`jaali-${theme}`} width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill={colors.background} fillOpacity=".1" />
            <path d="M30 2 58 30 30 58 2 30zM30 13l17 17-17 17-17-17z" fill="none" stroke={colors.accent} strokeWidth="1.2" />
            <circle cx="30" cy="30" r="3" fill={colors.accent} />
            <path d="M0 30h12m36 0h12M30 0v12m0 36v12" stroke={colors.accent} strokeWidth=".8" />
          </pattern>
        </defs>
        <rect width="180" height="180" fill={`url(#jaali-${theme})`} />
      </svg>
      <Mandala className="backdrop-mandala backdrop-mandala-left" />
      <Mandala className="backdrop-mandala backdrop-mandala-right" />
      {theme === "festival" && <div className="backdrop-stars">✦　✧　✦　✧　✦</div>}
    </div>
  );
}

export function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4">
        <circle cx="100" cy="100" r="88" />
        <circle cx="100" cy="100" r="72" />
        <circle cx="100" cy="100" r="48" />
        <circle cx="100" cy="100" r="23" />
        {Array.from({ length: 16 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 22.5} 100 100)`}>
            <path d="M100 12c-12 15-12 27 0 40 12-13 12-25 0-40Z" />
            <path d="M100 52v25" />
          </g>
        ))}
      </g>
      <circle cx="100" cy="100" r="7" fill="currentColor" />
    </svg>
  );
}

export function Toran() {
  const petals = ["#f4a300", "#fadadd", "#1e8a5c", "#5bb8f5", "#d9c2f0", "#ff7a1a"];
  return (
    <svg className="toran-art" viewBox="0 0 1440 150" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M-20 0v25Q160 92 340 30t360 0 360 0 360 0 60 0" fill="none" stroke="#d4af37" strokeWidth="5" />
      <path d="M-20 8v17Q160 100 340 38t360 0 360 0 360 0 60 0" fill="none" stroke="#fff0bd" strokeWidth="1.5" />
      {Array.from({ length: 23 }, (_, index) => {
        const x = index * 66;
        const y = Math.round(
          (28 + Math.abs(Math.sin((x / 1440) * Math.PI * 2)) * 55) * 100,
        ) / 100;
        return (
          <g key={index} transform={`translate(${x} ${y})`}>
            <path d="M0 0c-18 17-17 35 0 48 17-13 18-31 0-48Z" fill={petals[index % petals.length]} stroke="#d4af37" strokeWidth="2" />
            <circle cy="17" r="4" fill={index % 2 ? "#fff3b0" : "#cfe8fa"} />
            <path d="M0 48v15" stroke={index % 2 ? "#1e8a5c" : "#d4af37"} strokeWidth="2" />
          </g>
        );
      })}
    </svg>
  );
}

export function HeroIllustration({ theme }: { theme: OccasionTheme }) {
  return (
    <svg className={`hero-illustration hero-illustration-${theme}`} viewBox="0 0 760 500" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="arch" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f4a300" />
          <stop offset=".48" stopColor="#5bb8f5" />
          <stop offset="1" stopColor="#d9c2f0" />
        </linearGradient>
        <radialGradient id="glow">
          <stop stopColor="#fff4c4" stopOpacity=".95" />
          <stop offset=".55" stopColor="#fadadd" stopOpacity=".55" />
          <stop offset="1" stopColor="#5bb8f5" stopOpacity=".05" />
        </radialGradient>
      </defs>
      <circle cx="500" cy="250" r="200" fill="url(#glow)" />
      <path d="M230 492V234C230 104 318 24 432 24s202 80 202 210v258" fill="none" stroke="url(#arch)" strokeWidth="13" />
      <path d="M252 492V236c0-112 75-190 180-190s180 78 180 190v256" fill="none" stroke="#cfe8fa" strokeOpacity=".85" strokeWidth="2" />
      <Mandala className="hero-mandala" />
      <g className="hero-hanging-diyas" fill="none" stroke="#d4af37" strokeWidth="3">
        <path d="M325 0v86m104-86v61m105-61v92" />
      </g>
      <g fill="#f4a300" stroke="#cfe8fa" strokeWidth="2">
        <path d="M308 85h34c-2 17-7 24-17 24s-15-7-17-24Zm-2 0q19-19 38 0" />
        <path d="M413 61h32c-2 15-7 22-16 22s-14-7-16-22Zm-2 0q18-17 36 0" />
        <path d="M518 91h34c-2 16-7 23-17 23s-15-7-17-23Zm-2 0q19-18 38 0" />
      </g>
      <g fill="#fff3b0">
        <path d="m374 134 8 18 18 8-18 8-8 18-8-18-18-8 18-8z" />
        <circle cx="588" cy="208" r="5" /><circle cx="295" cy="232" r="4" />
      </g>
      <g className="hero-petals">
        <path d="M212 220q18-23 29 0-13 18-29 0Z" fill="#fadadd" />
        <path d="M649 298q17-23 29 0-13 18-29 0Z" fill="#bfebd3" />
        <path d="M273 376q15-20 27 0-12 16-27 0Z" fill="#5bb8f5" />
      </g>
    </svg>
  );
}

function PresetScene({ kind }: { kind: PresetArtKind }) {
  switch (kind) {
    case "wedding":
    case "anniversary":
      return <><path d="M35 104V55q45-65 90 0v49" fill="none" stroke="currentColor" strokeWidth="5" /><path d="M56 104V61q24-34 48 0v43" fill="none" stroke="#d4af37" strokeWidth="3" /><circle cx="67" cy="57" r="9" fill="#fadadd" /><circle cx="93" cy="57" r="9" fill="#e4d7f5" /><ellipse cx="80" cy="75" rx="7" ry="12" transform="rotate(45 80 75)" fill="#fff8ec" stroke="#d4af37" strokeWidth="2" /><ellipse cx="80" cy="75" rx="7" ry="12" transform="rotate(-45 80 75)" fill="#fff8ec" stroke="#d4af37" strokeWidth="2" /></>;
    case "haldi":
      return <><path d="M37 67h86l-9 37H46z" fill="#f4a300" stroke="currentColor" strokeWidth="4" /><path d="M45 65q33-25 68 0" fill="#ffcf4a" stroke="#d4af37" strokeWidth="3" /><path d="M79 36c-16 15-12 27 0 34 12-7 16-19 0-34Zm-28 4q-9 15 0 24 12-9 0-24Zm56-2q-10 15 0 25 12-10 0-25Z" fill="#ff7a1a" stroke="#fff8ec" strokeWidth="2" /></>;
    case "birthday":
      return <><path d="M45 68v35m35-43v43m35-35v35" stroke="#d4af37" strokeWidth="2" /><ellipse cx="45" cy="48" rx="15" ry="20" fill="#fadadd" /><ellipse cx="80" cy="40" rx="15" ry="20" fill="#5bb8f5" /><ellipse cx="115" cy="48" rx="15" ry="20" fill="#d9c2f0" /><path d="M48 102h64v18H48zM56 83h48v19H56z" fill="#fff8ec" stroke="#d4af37" strokeWidth="3" /><path d="M80 55v15m-4-15q4-8 8 0" stroke="#ff7a1a" strokeWidth="3" /></>;
    case "diwali":
      return <><path d="M35 53q45 28 90 0M45 52v12m20-5v12m30-12v12m20-19v12" stroke="#d4af37" strokeWidth="3" /><circle cx="45" cy="67" r="5" fill="#f4a300" /><circle cx="65" cy="72" r="5" fill="#ff7a1a" /><circle cx="95" cy="72" r="5" fill="#f4a300" /><circle cx="115" cy="67" r="5" fill="#ff7a1a" /><path d="M47 100h66q-5 23-33 23t-33-23Zm18 0q15-22 30 0" fill="#ff7a1a" stroke="#d4af37" strokeWidth="3" /><path d="M80 79q-12 13 0 20 12-7 0-20" fill="#f4a300" /></>;
    case "ganesh":
      return <><path d="M80 31c-24 0-36 17-31 34-13 11-11 30 5 35v23h52v-23c16-5 18-24 5-35 5-17-7-34-31-34Z" fill="#ff7a1a" stroke="currentColor" strokeWidth="4" /><path d="M80 56q-25-3-18 17 7 11 19 1 11 15 21 3 8-20-17-21m-5 19q-17 34 10 29" fill="none" stroke="#2b1b17" strokeWidth="4" strokeLinecap="round" /><circle cx="70" cy="48" r="3" fill="#2b1b17" /><circle cx="91" cy="48" r="3" fill="#2b1b17" /></>;
    case "baby":
      return <><path d="M42 77q38 45 76 0v31H42z" fill="#fadadd" stroke="currentColor" strokeWidth="3" /><path d="M52 79v29m18-16v16m18-16v16m18-29v29M37 111h86" stroke="#d4af37" strokeWidth="4" /><path d="M63 74q17-22 34 0-5 13-17 13T63 74Z" fill="#cfe8fa" stroke="#d4af37" strokeWidth="2" /><path d="m80 32 5 11 11 5-11 5-5 11-5-11-11-5 11-5z" fill="#bfebd3" /></>;
    case "corporate":
      return <><path d="M41 102V69l39-25 39 25v33z" fill="#2346a0" stroke="currentColor" strokeWidth="4" /><path d="M61 102V79h38v23m-28 0V87h18v15" fill="#bdede8" stroke="#d4af37" strokeWidth="3" /><path d="M34 108h92" stroke="#d4af37" strokeWidth="4" /><circle cx="80" cy="57" r="6" fill="#5bb8f5" /></>;
  }
}

export function PresetIllustration({ kind }: { kind: PresetArtKind }) {
  return (
    <svg viewBox="0 0 160 140" aria-hidden="true" className={`preset-art preset-art-${kind}`}>
      <path d="M17 124h126" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 5" />
      <PresetScene kind={kind} />
    </svg>
  );
}

export function OrnamentalDivider() {
  return (
    <svg className="ornamental-divider" viewBox="0 0 600 42" aria-hidden="true">
      <path d="M0 21h238m124 0h238" stroke="currentColor" strokeWidth="1.5" />
      <path d="M300 4c-20 12-20 22 0 34 20-12 20-22 0-34Zm0 7c-11 8-11 12 0 20 11-8 11-12 0-20Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="259" cy="21" r="4" fill="currentColor" /><circle cx="341" cy="21" r="4" fill="currentColor" />
    </svg>
  );
}
