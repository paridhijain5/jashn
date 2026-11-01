import type { OccasionTheme } from "@/src/lib/themes";

function PatternMotif({ theme }: { theme: OccasionTheme }) {
  switch (theme.pattern) {
    case "jaali":
      return <><path d="M30 2 58 30 30 58 2 30zM30 13l17 17-17 17-17-17z" /><circle cx="30" cy="30" r="3" /></>;
    case "vine":
      return <><path d="M4 54C19 42 17 20 31 7s28-1 23 11-22 8-20-2M5 56c15-5 25-2 31 6M26 35c-11-2-15-9-13-16m25 14c9-2 14-8 13-16" /><ellipse cx="17" cy="45" rx="4" ry="8" transform="rotate(-45 17 45)" /><ellipse cx="44" cy="43" rx="4" ry="8" transform="rotate(45 44 43)" /></>;
    case "confetti":
      return <><circle cx="10" cy="12" r="2" /><circle cx="43" cy="40" r="3" /><path d="m26 5 5 12m-5 0 5-12M7 39l7 3m-2-8-3 13m26-41-2 9" /></>;
    case "rangoli":
      return <><path d="M30 2c9 12 9 44 0 56C21 46 21 14 30 2Zm-28 28c12-9 44-9 56 0-12 9-44 9-56 0Zm8-20c15 2 31 18 33 33C28 41 12 25 10 10Zm40 0c-2 15-18 31-33 33 2-15 18-31 33-33Z" /><circle cx="30" cy="30" r="5" /></>;
    case "lotus":
      return <><path d="M30 52C7 43 7 28 17 20c4 11 8 16 13 19-4-17 0-27 0-34 8 12 10 23 4 34 8-7 12-15 13-25 11 14 4 32-17 38Z" /><path d="M6 54h48" /></>;
    case "hearts":
      return <><path d="M30 51 9 32C-1 20 13 8 23 19l7 8 7-8c10-11 24 1 14 13L30 51Z" /><path d="M4 8c14 2 24 9 28 21m24-21C42 10 32 17 28 29" /></>;
    case "clouds":
      return <><path d="M8 40a9 9 0 0 1 2-18 12 12 0 0 1 23-3 10 10 0 1 1 3 21H8Z" /><path d="m47 5 2 5 5 2-5 2-2 5-2-5-5-2 5-2zM13 50l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" /></>;
    case "grid":
      return <><path d="M2 2h56v56H2zM2 16h56M2 30h56M2 44h56M16 2v56m14-56v56m14-56v56" /><circle cx="30" cy="30" r="3" /></>;
  }
}

export function ThemeBackdrop({ theme }: { theme: OccasionTheme }) {
  const patternId = `theme-pattern-${theme.id}`;
  return (
    <div className="celebration-backdrop" aria-hidden="true">
      <svg className="backdrop-pattern" viewBox="0 0 180 180" focusable="false">
        <defs>
          <pattern id={patternId} width="60" height="60" patternUnits="userSpaceOnUse">
            <g fill="none" stroke={theme.colors.pattern} strokeWidth="1.15" opacity=".8"><PatternMotif theme={theme} /></g>
          </pattern>
        </defs>
        <rect width="180" height="180" fill={`url(#${patternId})`} />
      </svg>
      <span className="backdrop-ornament backdrop-ornament-one">{theme.id === "birthday" ? "✦" : theme.id === "baby" ? "☁" : theme.id === "corporate" ? "◇" : "❋"}</span>
      <span className="backdrop-ornament backdrop-ornament-two">{theme.id === "diwali" ? "🪔" : theme.id === "ganesh" ? "✿" : theme.id === "anniversary" ? "♡" : "✧"}</span>
    </div>
  );
}

function Scene({ theme }: { theme: OccasionTheme }) {
  switch (theme.art) {
    case "wedding":
      return <g className="scene-wedding">
        <path d="M110 445V230q0-208 250-208t250 208v215M155 445V235q0-162 205-162t205 162v210" fill="none" stroke="var(--theme-bright)" strokeWidth="10" />
        <path d="M165 445V280h390v165M205 445V285m310 160V285" fill="none" stroke="var(--theme-accent)" strokeWidth="8" />
        <path d="M178 285q32 55 64 0 32 55 64 0 32 55 64 0 32 55 64 0 32 55 64 0" fill="none" stroke="#f4a300" strokeWidth="7" />
        <g fill="#fadadd"><circle cx="150" cy="260" r="12"/><circle cx="610" cy="260" r="12"/><circle cx="220" cy="255" r="10"/><circle cx="500" cy="255" r="10"/></g>
        <g fill="none" stroke="var(--theme-bright)" strokeWidth="5"><path d="M295 45q30 30 0 58m170-58q-30 30 0 58"/><path d="M287 103h17l-8 18zm174 0h17l-8 18z"/></g>
        <g className="scene-petals" fill="#d81b72"><path d="M95 170q22-30 36 0-18 22-36 0Z"/><path d="M608 333q22-30 36 0-18 22-36 0Z"/><path d="M220 390q18-25 30 0-15 19-30 0Z"/></g>
        <text x="347" y="350" fill="var(--theme-bright)" fontSize="55" textAnchor="middle">♫</text>
      </g>;
    case "haldi":
      return <g className="scene-haldi">
        <path d="M160 430h430M185 230q18-120 95 0v210m230-210q18-120 95 0v210" fill="none" stroke="var(--theme-main)" strokeWidth="10"/>
        <path d="M175 230q42-56 84 0m230 0q42-56 84 0" fill="none" stroke="#f4a300" strokeWidth="9"/>
        <path d="M210 326h110l-15 60h-80zm220 0h110l-15 60h-80z" fill="#f4a300" stroke="var(--theme-deep)" strokeWidth="5"/>
        <ellipse cx="265" cy="325" rx="57" ry="18" fill="#fff3b0"/><ellipse cx="485" cy="325" rx="57" ry="18" fill="#fff3b0"/>
        <path d="M353 214c-52 27-48 109 1 133 47-31 49-104-1-133Zm-36 48q35 13 72 0m-71 22q36 12 72 0m-70 22q34 9 67-1" fill="none" stroke="var(--theme-main)" strokeWidth="7" strokeLinecap="round"/>
        <g className="scene-petals" fill="#f4a300"><path d="M90 180q20-25 32 0-16 20-32 0Z"/><path d="M620 270q20-25 32 0-16 20-32 0Z"/><path d="M130 360q20-25 32 0-16 20-32 0Z"/></g>
      </g>;
    case "birthday":
      return <g className="scene-birthday">
        <g className="scene-balloons"><path d="M205 175v120m150-180v155m150-105v120" stroke="var(--theme-bright)" strokeWidth="4"/><ellipse cx="205" cy="150" rx="53" ry="68" fill="#fadadd"/><ellipse cx="355" cy="105" rx="53" ry="68" fill="#5bb8f5"/><ellipse cx="505" cy="165" rx="53" ry="68" fill="#d9c2f0"/></g>
        <path d="M285 355h140v70H285zM310 295h90v60h-90z" fill="#fff8ec" stroke="var(--theme-main)" strokeWidth="7"/>
        <path d="M330 295v-45m50 45v-45" stroke="#ff7a1a" strokeWidth="7"/><path d="M324 246q6-23 12 0m38 0q6-23 12 0" fill="#f4a300"/>
        <path d="m135 285 48 20-38 37zm440-90 37 44-54 9zm-55 180 55-16-18 57zM250 90l15 42-42-10z" fill="#ff7a1a"/>
        <path d="M155 410q60 65 120 0m295-250q48-55 96 0" fill="none" stroke="#d81b72" strokeWidth="7"/>
        <path d="m410 220 50 80h-100z" fill="#ff7a1a" stroke="var(--theme-bright)" strokeWidth="5"/>
      </g>;
    case "diwali":
      return <g className="scene-diwali">
        <circle cx="430" cy="220" r="175" fill="var(--theme-deep)" opacity=".55"/>
        <g fill="#fff3b0"><path d="m230 112 8 18 18 8-18 8-8 18-8-18-18-8 18-8z"/><path d="m580 145 5 12 12 5-12 5-5 12-5-12-12-5 12-5z"/><circle cx="335" cy="165" r="5"/><circle cx="565" cy="270" r="5"/></g>
        <path d="M130 125q210 135 420 0" fill="none" stroke="var(--theme-bright)" strokeWidth="5"/>
        {[180,260,350,440,530].map((x) => <g key={x}><path d={`M${x} ${150 + Math.round(Math.abs(x - 350) / 2)}v28`} stroke="var(--theme-bright)" strokeWidth="3"/><circle cx={x} cy={182 + Math.round(Math.abs(x - 350) / 2)} r="9" fill="#ff7a1a"/></g>)}
        {[180,275,370,465,560].map((x) => <g key={x}><path d={`M${x-32} 398h64q-5 36-32 36t-32-36Zm12 0q20-32 40 0`} fill="#ff7a1a" stroke="var(--theme-bright)" strokeWidth="4"/><path d={`M${x} 353q-20 23 0 38 20-15 0-38`} fill="#fff3b0"/></g>)}
        <path d="M350 274c-75 40-75 95 0 125 75-30 75-85 0-125Zm0 20c-48 30-48 58 0 83 48-25 48-53 0-83Z" fill="none" stroke="#f4a300" strokeWidth="7"/>
        <g className="scene-fireworks" fill="none" stroke="#ff7a1a" strokeWidth="5"><path d="M110 220v-45m0 90v45m-45-45h-35m125 0h35m-75-45-24-24m64 93 24 24m0-93-24 24m-64 45-24 24"/></g>
      </g>;
    case "ganesh":
      return <g className="scene-ganesh">
        <path d="M170 445V210q0-190 180-190t180 190v235M210 445V220q0-145 140-145t140 145v225" fill="none" stroke="var(--theme-bright)" strokeWidth="9"/>
        <path d="M350 150c-84-5-116 75-70 125-38 42-18 111 33 126v45h75v-45c51-15 71-84 33-126 46-50 14-130-70-125Z" fill="#ff7a1a" stroke="var(--theme-bright)" strokeWidth="7"/>
        <path d="M350 222q-50-14-38 22 12 26 38 5 25 27 43 3 12-37-35-32m-7 34q-33 70 20 62" fill="none" stroke="#7a1f2b" strokeWidth="8" strokeLinecap="round"/>
        <path className="scene-flags" d="M122 108 160 49l38 59zm440 0 38-59 38 59z" fill="#ff7a1a"/>
        <path d="M220 305q-20-38 0-55 22 17 0 55m260 0q-20-38 0-55 22 17 0 55" fill="#d81b72"/>
        <path d="M505 361q-35-23 0-49 35 26 0 49Zm-306 0q-35-23 0-49 35 26 0 49Z" fill="#fff3b0"/>
        <path d="M324 382q26-18 52 0l-7 30h-38z" fill="#fff3b0" stroke="#f4a300" strokeWidth="5"/>
        <path d="M250 157v-55m200 55v-55" stroke="var(--theme-bright)" strokeWidth="4"/><path d="M237 100q13-20 26 0t26 0m148 0q13-20 26 0t26 0" fill="none" stroke="#f4a300" strokeWidth="6"/>
      </g>;
    case "anniversary":
      return <g className="scene-anniversary">
        <path d="M140 440V225q0-188 210-188t210 188v215" fill="none" stroke="var(--theme-bright)" strokeWidth="10"/>
        <path d="M190 440V230q0-140 160-140t160 140v210" fill="none" stroke="#d81b72" strokeWidth="5"/>
        <path d="M350 365 240 265c-48-54 12-110 57-57l53 55 53-55c45-53 105 3 57 57L350 365Z" fill="#fadadd" stroke="var(--theme-main)" strokeWidth="7"/>
        <ellipse cx="316" cy="251" rx="19" ry="32" transform="rotate(45 316 251)" fill="none" stroke="#d4af37" strokeWidth="7"/><ellipse cx="384" cy="251" rx="19" ry="32" transform="rotate(-45 384 251)" fill="none" stroke="#d4af37" strokeWidth="7"/>
        {[225,475].map((x) => <g key={x}><path d={`M${x-25} 405h50q-5 28-25 28t-25-28Z`} fill="#d4af37"/><path d={`M${x} 370q-18 22 0 35 18-13 0-35Z`} fill="#ff7a1a"/></g>)}
        <g fill="#fff3b0"><path d="m185 155 6 14 14 6-14 6-6 14-6-14-14-6 14-6z"/><path d="m510 177 5 11 11 5-11 5-5 11-5-11-11-5 11-5z"/></g>
      </g>;
    case "baby":
      return <g className="scene-baby">
        <path d="M90 145a55 55 0 0 1 110 0 65 65 0 0 1 120 28h-275a65 65 0 0 1 45-28Zm300 18a42 42 0 0 1 84 0 55 55 0 0 1 90 10H370a55 55 0 0 1 20-10Z" fill="#fff8ec" stroke="var(--theme-accent)" strokeWidth="5"/>
        <path d="M230 300q120 170 240 0v110H230z" fill="#fadadd" stroke="var(--theme-main)" strokeWidth="7"/><path d="M215 410h270m-220-91v91m60-59v59m60-59v59m60-91v91" stroke="var(--theme-bright)" strokeWidth="8"/>
        <path d="M305 291q45-70 90 0-11 42-45 42t-45-42Z" fill="#d9c2f0" stroke="var(--theme-main)" strokeWidth="5"/><circle cx="330" cy="288" r="4" fill="#2b1b17"/><circle cx="370" cy="288" r="4" fill="#2b1b17"/>
        <path d="M165 210v95m320-165v94" stroke="var(--theme-main)" strokeWidth="4"/><ellipse cx="165" cy="187" rx="36" ry="47" fill="#bfebd3"/><ellipse cx="485" cy="210" rx="34" ry="45" fill="#fadadd"/>
        <g className="scene-bubbles" fill="#d4af37"><path d="m560 90 6 14 14 6-14 6-6 14-6-14-14-6 14-6z"/><path d="m145 365 4 9 9 4-9 4-4 9-4-9-9-4 9-4z"/><circle cx="130" cy="210" r="7" fill="#cfe8fa"/><circle cx="555" cy="330" r="9" fill="#fadadd"/></g>
        <path d="M535 370q-25-28 0-48 30 15 0 48Zm0 0q25-28 0-48" fill="#c9a38d" stroke="#8f6c59" strokeWidth="5"/>
      </g>;
    case "corporate":
      return <g className="scene-corporate">
        <path d="M115 445V110h470v335M165 445V160h370v285M220 445V210h260v235" fill="none" stroke="var(--theme-accent)" strokeWidth="4"/>
        <path d="M140 360h420M140 280h420M140 200h420M240 110v335m110-335v335m110-335v335" stroke="var(--theme-pattern)" strokeWidth="2" opacity=".7"/>
        <circle className="scene-spotlight" cx="350" cy="230" r="122" fill="#fff3b0" opacity=".2"/><path d="M350 45v145" stroke="var(--theme-bright)" strokeWidth="7"/>
        <path d="M305 280h90v15h-90zm10 15h70l-10 85h-50z" fill="#f4a300" stroke="var(--theme-deep)" strokeWidth="6"/>
        <path d="M335 370v35m30-35v35m-65 0h100" stroke="var(--theme-deep)" strokeWidth="7"/>
        <path d="m350 215 10 20 22 3-16 15 4 22-20-11-20 11 4-22-16-15 22-3z" fill="#fff3b0"/>
        <path d="m168 131 15 20-23 7zm365 60 17-23 4 31zM210 380l20 9-18 14z" fill="#ff7a1a"/>
      </g>;
  }
}

export function ThemeHeroArt({ theme }: { theme: OccasionTheme }) {
  return (
    <svg className={`hero-illustration theme-art-${theme.art}`} viewBox="0 0 700 500" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`hero-glow-${theme.id}`}>
          <stop stopColor={theme.colors.bright} stopOpacity=".5" />
          <stop offset="1" stopColor={theme.colors.bright} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="390" cy="245" r="240" fill={`url(#hero-glow-${theme.id})`} />
      <Scene theme={theme} />
    </svg>
  );
}

export function ThemeDivider({ theme }: { theme: OccasionTheme }) {
  const symbol = {
    wedding: "✿", haldi: "❋", birthday: "✦", diwali: "🪔",
    ganesh: "✿", anniversary: "♡", baby: "✧", corporate: "◇",
  }[theme.id];
  return (
    <svg className="ornamental-divider" viewBox="0 0 600 42" aria-hidden="true" focusable="false">
      <path d="M0 21h238m124 0h238" stroke="currentColor" strokeWidth="1.5" />
      <path d="M300 4c-20 12-20 22 0 34 20-12 20-22 0-34Zm0 7c-11 8-11 12 0 20 11-8 11-12 0-20Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="259" cy="21" r="4" fill="currentColor" /><circle cx="341" cy="21" r="4" fill="currentColor" />
      <text x="300" y="28" textAnchor="middle" fill="var(--theme-main)" fontSize="12">{symbol}</text>
    </svg>
  );
}
