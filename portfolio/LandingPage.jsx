import { useState, useEffect, useRef } from "react";

/**
 * UNIFIED PORTFOLIO LANDING PAGE
 * Combines:
 * - DarkHero: Hero section with intro and typewriter effect
 * - TechOrbit: Interactive tech stack with animated rings
 * - WorkExperience: Work experience cards
 */

// ============= SHARED COLORS & CONSTANTS =============
const BG = "#0E0F12";
const PANEL = "#15171C";
const PANEL_2 = "#1A1C22";
const TEXT = "#F4F2ED";
const MUTED = "#8A8F98";
const AMBER = "#E8954A";
const AMBER_SOFT = "#F2B679";
const LINE = "#2A2D33";

// ============= CUSTOM HOOKS =============
function useTypewriter(text, speed = 45, startDelay = 300) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [text, speed, startDelay]);
  return [out, done];
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, as = "div", className = "" }) {
  const [ref, inView] = useInView();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(14px)",
        transition: `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

// ============= HERO SECTION COMPONENTS =============
function DeskAvatar() {
  return (
    <svg viewBox="0 0 240 240" className="avatar-svg" aria-hidden="true">
      <defs>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8B58C" />
          <stop offset="100%" stopColor="#D9A077" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A2420" />
          <stop offset="100%" stopColor="#171310" />
        </linearGradient>
        <linearGradient id="laptopGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3D44" />
          <stop offset="100%" stopColor="#23252A" />
        </linearGradient>
      </defs>
      <path d="M40 240 Q40 175 120 175 Q200 175 200 240 Z" fill="#2D3038" />
      <rect x="105" y="140" width="30" height="35" fill="url(#skinGrad)" />
      <ellipse cx="120" cy="118" rx="46" ry="50" fill="url(#skinGrad)" />
      <ellipse cx="74" cy="120" rx="7" ry="10" fill="#D9A077" />
      <ellipse cx="166" cy="120" rx="7" ry="10" fill="#D9A077" />
      <path d="M70 110 Q62 55 120 50 Q178 55 170 110 Q170 85 150 80 Q140 65 120 68 Q100 65 90 80 Q70 85 70 110 Z" fill="url(#hairGrad)" />
      <path d="M68 108 Q75 95 80 108 Q72 112 68 108Z" fill="url(#hairGrad)" />
      <path d="M172 108 Q165 95 160 108 Q168 112 172 108Z" fill="url(#hairGrad)" />
      <ellipse cx="102" cy="120" rx="5.5" ry="7" fill="#1C1A17" />
      <ellipse cx="138" cy="120" rx="5.5" ry="7" fill="#1C1A17" />
      <circle cx="100" cy="117" r="1.6" fill="#F4F2ED" opacity="0.8" />
      <circle cx="136" cy="117" r="1.6" fill="#F4F2ED" opacity="0.8" />
      <path d="M93 105 Q102 100 111 104" stroke="#171310" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M129 104 Q138 100 147 105" stroke="#171310" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M120 122 Q116 134 120 138" stroke="#C2906A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M106 148 Q120 156 134 148" stroke="#5A3826" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="55" y="178" width="130" height="10" rx="3" fill="url(#laptopGrad)" />
      <rect x="68" y="138" width="104" height="42" rx="4" fill="url(#laptopGrad)" stroke="#46494F" strokeWidth="1" />
      <rect x="74" y="144" width="92" height="30" rx="2" fill="#0E0F12" />
      <rect x="80" y="150" width="34" height="3" rx="1.5" fill={AMBER} opacity="0.85" />
      <rect x="80" y="157" width="50" height="3" rx="1.5" fill="#5C6068" />
      <rect x="80" y="164" width="26" height="3" rx="1.5" fill="#5C6068" />
      <ellipse cx="62" cy="184" rx="9" ry="7" fill="url(#skinGrad)" />
      <ellipse cx="178" cy="184" rx="9" ry="7" fill="url(#skinGrad)" />
    </svg>
  );
}

function TerminalCursorWord({ word }) {
  return (
    <span className="cursor-word">
      {word}
      <span className="cursor-blink" aria-hidden="true" />
    </span>
  );
}

// ============= TECH LOGOS =============
const LogoFigma = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path d="M9 1a3 3 0 0 0 0 6h2.5V1H9z" fill="#0ACF83" />
    <path d="M5.5 8.5A3 3 0 0 1 8.5 5.5h3V11.5h-3a3 3 0 0 1-3-3z" fill="#A259FF" />
    <path d="M5.5 15.5a3 3 0 0 1 3-3h3v3a3 3 0 1 1-6 0z" fill="#F24E1E" />
    <path d="M11.5 5.5h3a3 3 0 1 1 0 6h-3v-6z" fill="#FF7262" />
    <path d="M14.5 11.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="#1ABCFE" />
  </svg>
);

const LogoReact = () => (
  <svg viewBox="-11.5 -10.23 23 20.46" width="100%" height="100%">
    <circle r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const LogoCpp = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path d="M12 2 3.5 6.93v10.14L12 22l8.5-4.93V6.93L12 2z" fill="#00599C" />
    <path d="M12 2 3.5 6.93v10.14L12 22l8.5-4.93V6.93L12 2z" fill="none" stroke="#004482" strokeWidth="0.4" />
    <text x="12" y="15.5" textAnchor="middle" fontSize="6.2" fontFamily="Arial, sans-serif" fontWeight="700" fill="#fff">
      C++
    </text>
  </svg>
);

const LogoNode = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path d="M12 1.85c-.3 0-.6.08-.86.23L4.3 5.92c-.53.31-.86.88-.86 1.49v9.18c0 .61.33 1.18.86 1.49l1.9 1.1c.92.46 1.26.46 1.68.46 1.37 0 2.16-.83 2.16-2.28V8.34c0-.12-.1-.21-.21-.21H8.95c-.12 0-.21.09-.21.21v8.92c0 .64-.66 1.28-1.74.74l-2-1.16a.23.23 0 0 1-.11-.2V7.42a.23.23 0 0 1 .11-.2l6.84-3.94a.22.22 0 0 1 .22 0l6.84 3.94c.07.04.11.11.11.2v9.18c0 .08-.04.16-.11.2l-6.84 3.95a.22.22 0 0 1-.22 0l-1.75-1.04c-.05-.03-.12-.04-.17-.01-.49.28-.58.32-1.04.48-.11.04-.28.1.06.3l2.28 1.36c.27.15.57.23.87.23s.6-.08.86-.23l6.84-3.95c.53-.31.86-.88.86-1.49V7.41c0-.61-.33-1.18-.86-1.49l-6.84-3.94a1.74 1.74 0 0 0-.86-.23z" fill="#539E43" />
    <path d="M14.07 14.07c-2.94 0-3.56-1.35-3.56-2.49 0-.11.09-.2.21-.2h.92c.1 0 .19.07.2.18.14.92.54 1.39 2.23 1.39 1.35 0 1.92-.3 1.92-1.03 0-.42-.16-.72-2.26-.93-1.75-.17-2.83-.56-2.83-1.97 0-1.29 1.09-2.07 2.91-2.07 2.04 0 3.06.71 3.19 2.23a.2.2 0 0 1-.2.22h-.93a.2.2 0 0 1-.19-.16c-.21-.96-.72-1.27-2.1-1.27-1.55 0-1.73.54-1.73.94 0 .48.21.62 2.19.87 1.96.25 2.9.61 2.9 2 0 1.4-1.17 2.21-3.21 2.21z" fill="#fff" />
  </svg>
);

const LogoDocker = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path fill="#2496ED" d="M21.8 9.6c-.4-.3-1.2-.4-1.9-.3-.1-.7-.5-1.3-1.1-1.8l-.3-.2-.2.3c-.4.5-.6 1.2-.5 1.9-.3.1-.5.3-.8.4H3.1c-.2.9-.2 1.9.1 2.9.5 1.7 1.5 3 3 3.8 1.7.9 4 1.2 6.1.9 3-.4 5.6-1.9 7-4.8.9.1 1.8-.1 2.3-.8.1-.2.3-.5.4-.8l.1-.3-.3-.2c-.1-.4-.1-.4-.1-.4z" />
    <g fill="#2496ED">
      <rect x="5.3" y="9.6" width="2" height="1.8" />
      <rect x="8" y="9.6" width="2" height="1.8" />
      <rect x="10.7" y="9.6" width="2" height="1.8" />
      <rect x="8" y="7.1" width="2" height="1.8" />
      <rect x="10.7" y="7.1" width="2" height="1.8" />
      <rect x="10.7" y="4.6" width="2" height="1.8" />
      <rect x="13.4" y="9.6" width="2" height="1.8" />
    </g>
  </svg>
);

const LogoJavaScript = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <path fill="#000" d="M15.9 18.3c.4.7.9 1.2 1.9 1.2.8 0 1.3-.4 1.3-1 0-.7-.5-.9-1.4-1.3l-.5-.2c-1.4-.6-2.4-1.4-2.4-3 0-1.5 1.1-2.6 2.9-2.6 1.3 0 2.2.4 2.8 1.6l-1.5.97c-.3-.6-.7-.8-1.3-.8-.6 0-.9.3-.9.8 0 .6.3.8 1.2 1.2l.5.2c1.6.7 2.6 1.5 2.6 3.1 0 1.8-1.4 2.8-3.3 2.8-1.8 0-3-.9-3.6-2.1l1.7-1zm-6.9.16c.3.5.6.95 1.3.95.6 0 1-.25 1-1.2v-6.5h1.9v6.55c0 1.95-1.1 2.85-2.8 2.85-1.5 0-2.4-.8-2.8-1.7l1.4-.95z" />
  </svg>
);

const LogoExpress = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <rect width="24" height="24" rx="4" fill="#1A1A1A" />
    <path fill="#fff" d="M3.5 15.2c0-2.4 1.5-3.9 3.5-3.9 1.9 0 3.2 1.4 3.2 3.6v.5H5c.1 1.2 1 1.9 2.1 1.9.8 0 1.4-.3 1.8-.8l1 .8c-.6.8-1.5 1.3-2.8 1.3-2.1 0-3.6-1.5-3.6-3.4zm1.5-.7h3.6c-.1-1-.8-1.6-1.7-1.6-1 0-1.7.6-1.9 1.6zm6-3h1.6l1.5 2.2 1.5-2.2h1.6l-2.3 3.3 2.4 3.4h-1.7l-1.6-2.3-1.6 2.3h-1.6l2.4-3.4-2.2-3.3z" />
  </svg>
);

const LogoPostgres = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path fill="#336791" d="M17.1 2.6c-1.6-.2-3.1.1-4.3.7-.6-.1-1.2-.2-1.9-.1-1.2.1-2.3.6-3.1 1.4-.7.7-1.2 1.7-1.4 2.9-.6.4-1 1-1.3 1.7-.5 1.2-.5 2.5-.1 3.7-.5 1.1-.5 2.4 0 3.7.6 1.6 1.9 2.9 3.5 3.6-.1.5-.1 1 0 1.4.2.7.7 1.2 1.4 1.4.9.3 1.9.1 2.7-.5.4.1.9.2 1.4.2 1.6 0 3.1-.6 4.2-1.7.3.1.7.1 1 0 .8-.2 1.4-.8 1.6-1.6.1-.4.1-.8 0-1.2.9-1 1.4-2.4 1.4-3.8 0-.7-.1-1.4-.4-2 .4-1 .5-2.1.2-3.2-.3-1.3-1.1-2.4-2.2-3.1.1-.7 0-1.4-.3-2-.5-1.1-1.7-1.8-3.4-1.5z" />
    <ellipse cx="12" cy="13" rx="0.4" ry="0.6" fill="#FFF" transform="rotate(-20 12 13)" />
    <ellipse cx="15" cy="13" rx="0.4" ry="0.6" fill="#FFF" transform="rotate(20 15 13)" />
  </svg>
);

const LogoNext = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <circle cx="12" cy="12" r="12" fill="#000" />
    <path fill="#FFF" d="M9.7 8.3v8.1H8.4V8.3h1.3zm.2 0 5.4 7v-7h1.3v8.1h-1.1l-5.6-7.2v7.2H8.6V8.3h1.3z" />
  </svg>
);

const LogoGo = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <rect width="24" height="24" rx="3" fill="#00ADD8" />
    <text x="12" y="16" textAnchor="middle" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="700" fill="#fff">
      Go
    </text>
  </svg>
);

const LogoAWS = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <rect width="24" height="24" rx="3" fill="#232F3E" />
    <text x="12" y="14" textAnchor="middle" fontSize="6.5" fontFamily="Arial, sans-serif" fontWeight="700" fill="#FF9900">
      AWS
    </text>
    <path d="M5 17c3.5 2 10.5 2 14 0" stroke="#FF9900" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M17.5 16.3l1.5.4-.4-1.5" stroke="#FF9900" strokeWidth="1" fill="none" strokeLinecap="round" />
  </svg>
);

const LogoRedis = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path fill="#DC382D" d="M12 3.5c-3 0-5.4.8-5.4 1.8v1.4c0 1 2.4 1.8 5.4 1.8s5.4-.8 5.4-1.8V5.3c0-1-2.4-1.8-5.4-1.8z" />
    <path fill="#DC382D" d="M6.6 9.4v1.4c0 1 2.4 1.8 5.4 1.8s5.4-.8 5.4-1.8V9.4c-1 .7-3 1.1-5.4 1.1s-4.4-.4-5.4-1.1z" />
    <path fill="#DC382D" d="M6.6 12.6V14c0 1 2.4 1.8 5.4 1.8s5.4-.8 5.4-1.8v-1.4c-1 .7-3 1.1-5.4 1.1s-4.4-.4-5.4-1.1z" />
    <path fill="#A41E11" d="M6.6 15.8v1.4c0 1 2.4 1.8 5.4 1.8s5.4-.8 5.4-1.8v-1.4c-1 .7-3 1.1-5.4 1.1s-4.4-.4-5.4-1.1z" />
    <path fill="#fff" opacity="0.3" d="M9.5 5.6l-2 .8 2 .8 2-.8z" />
  </svg>
);

const LogoMongo = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path fill="#47A248" d="M12 2.3s4.3 4.2 4.3 9.7c0 4.1-2.4 6.6-3.5 7.6l-.2 2.6h-1.2l-.2-2.6c-1.1-1-3.5-3.5-3.5-7.6 0-5.5 4.3-9.7 4.3-9.7zm0 2.2c-.6 1.4-1.4 4-1.4 7.5 0 2.6 1 4.6 1.4 5.3.4-.7 1.4-2.7 1.4-5.3 0-3.5-.8-6.1-1.4-7.5z" />
  </svg>
);

const LogoTypeScript = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <rect width="24" height="24" rx="3" fill="#3178C6" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="700" fill="#fff">
      TS
    </text>
  </svg>
);

const LogoRust = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <circle cx="12" cy="12" r="11" fill="#000" />
    <text x="12" y="16" textAnchor="middle" fontSize="9" fontFamily="Georgia, serif" fontWeight="700" fill="#fff">
      R
    </text>
    <circle cx="12" cy="12" r="9.2" fill="none" stroke="#fff" strokeWidth="0.6" strokeDasharray="1.2 1.4" />
  </svg>
);

const LogoGit = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <rect width="24" height="24" rx="4" fill="#F05033" />
    <circle cx="8" cy="16" r="1.6" fill="#fff" />
    <circle cx="8" cy="9" r="1.6" fill="#fff" />
    <circle cx="15" cy="12.5" r="1.6" fill="#fff" />
    <path d="M8 9v7" stroke="#fff" strokeWidth="1.4" />
    <path d="M8 11c0 2 2 1.5 4 1.5" stroke="#fff" strokeWidth="1.4" fill="none" />
  </svg>
);

const LogoKubernetes = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path d="M12 1.5l1.8.6 7 4.2.9 1.9-1.6 9.4-1.5 1.5-7.6 2.4-1.6-.5-6.5-6-.4-1.8 2.7-9 1.6-1.2z" fill="#326CE5" />
    <circle cx="12" cy="12" r="3.4" fill="#fff" />
  </svg>
);

const LogoSQL = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <rect width="24" height="24" rx="3" fill="#4479A1" />
    <text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontFamily="Arial, sans-serif" fontWeight="700" fill="#fff">
      SQL
    </text>
  </svg>
);

const LogoPython = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path fill="#3776AB" d="M11.9 1.8c-1 0-1.9.1-2.6.3-2.3.4-2.7 1.3-2.7 2.9v2.1h5.4v.7H4.5C2.9 7.8 1.5 8.8 1.5 11.6c0 3.1 1.3 4.3 3 4.3H6V14c0-1.8 1.6-3.3 3.5-3.3h3.6c1.6 0 2.9-1.3 2.9-2.9V5C16 3.3 14.5 2 12.7 1.8c-.2 0-.5 0-.8 0zM8.9 3.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" />
    <path fill="#FFD43B" d="M12.1 22.2c1 0 1.9-.1 2.6-.3 2.3-.4 2.7-1.3 2.7-2.9v-2.1h-5.4v-.7h7.5c1.6 0 3-.9 3-3.8 0-3.1-1.3-4.3-3-4.3H18V10c0 1.8-1.6 3.3-3.5 3.3h-3.6c-1.6 0-2.9 1.3-2.9 2.9V19c0 1.7 1.5 3 3.3 3.2.2 0 .5 0 .8 0zm3.2-1.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
  </svg>
);

const LOGO_MAP = {
  Figma: LogoFigma,
  React: LogoReact,
  "C++": LogoCpp,
  "Node.js": LogoNode,
  Docker: LogoDocker,
  JavaScript: LogoJavaScript,
  Express: LogoExpress,
  PostgreSQL: LogoPostgres,
  "Next.js": LogoNext,
  Go: LogoGo,
  AWS: LogoAWS,
  Redis: LogoRedis,
  MongoDB: LogoMongo,
  TypeScript: LogoTypeScript,
  Rust: LogoRust,
  Git: LogoGit,
  Kubernetes: LogoKubernetes,
  SQL: LogoSQL,
  Python: LogoPython,
};

// ============= TECH ORBIT DATA =============
const STACK_TOP = ["Figma", "React", "C++", "Node.js", "Docker", "JavaScript", "Express"];
const STACK_TOP2 = ["PostgreSQL", "Next.js", "Go", "AWS", "Redis", "MongoDB"];
const RINGS = [
  { rx: 280, ry: 70, tilt: -6, duration: 38, dir: 1, items: ["TypeScript", "Rust", "AWS", "Git"] },
  { rx: 220, ry: 54, tilt: 4, duration: 26, dir: -1, items: ["Go", "Kubernetes", "SQL"] },
  { rx: 160, ry: 38, tilt: -3, duration: 18, dir: 1, items: ["Node.js", "Python"] },
];

// ============= TECH ORBIT COMPONENTS =============
function TopIcon({ name, index, hovered, setHovered }) {
  const isDimmed = hovered !== null && hovered !== `top-${index}`;
  const Logo = LOGO_MAP[name];
  return (
    <div
      className="orbit-top-icon"
      style={{ animationDelay: `${index * 90}ms` }}
      onMouseEnter={() => setHovered(`top-${index}`)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(`top-${index}`)}
      onBlur={() => setHovered(null)}
      tabIndex={0}
      role="img"
      aria-label={name}
      title={name}
    >
      <div className="logo-mask">{Logo && <Logo />}</div>
    </div>
  );
}

function RingIcon({ label, x, y, tilt, id, hovered, setHovered }) {
  const isDimmed = hovered !== null && hovered !== id;
  const Logo = LOGO_MAP[label];
  return (
    <div className="ring-icon-pos" style={{ transform: `translate(${x}px, ${y}px)` }}>
      <div className="ring-icon-tilt" style={{ transform: `rotate(${-tilt}deg)` }}>
        <div
          className={`ring-icon-counter ${isDimmed ? "dimmed" : ""}`}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(id)}
          onBlur={() => setHovered(null)}
          tabIndex={0}
          role="img"
          aria-label={label}
        >
          <div className="logo-mask logo-mask-sm">{Logo && <Logo />}</div>
          {hovered === id && <div className="ring-tooltip">{label}</div>}
        </div>
      </div>
    </div>
  );
}

// ============= WORK EXPERIENCE ICONS =============
function IconRocket() {
  return (
    <svg viewBox="0 0 100 100" className="role-icon">
      <defs>
        <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={AMBER_SOFT} />
          <stop offset="100%" stopColor="#C9762E" />
        </linearGradient>
        <radialGradient id="rocketGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="rgba(232,149,74,0.55)" />
          <stop offset="100%" stopColor="rgba(232,149,74,0)" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="42" r="34" fill="url(#rocketGlow)" />
      <ellipse cx="50" cy="86" rx="20" ry="4" fill="#000" opacity="0.25" />
      <path d="M50 18 Q66 34 64 58 Q64 68 50 74 Q36 68 36 58 Q34 34 50 18Z" fill="url(#rocketBody)" />
      <circle cx="50" cy="44" r="9" fill="#0E0F12" opacity="0.85" />
      <circle cx="50" cy="44" r="5.5" fill={AMBER_SOFT} />
      <path d="M36 58 Q26 60 24 72 Q34 68 38 62Z" fill="#C9762E" />
      <path d="M64 58 Q74 60 76 72 Q66 68 62 62Z" fill="#C9762E" />
      <path d="M44 74 L50 90 L56 74Z" fill="#F2B679" opacity="0.9" />
      <circle cx="20" cy="30" r="2" fill={AMBER} opacity="0.7" />
      <circle cx="78" cy="50" r="1.6" fill={AMBER} opacity="0.6" />
      <circle cx="74" cy="24" r="1.3" fill={AMBER} opacity="0.5" />
    </svg>
  );
}

function IconLightbulb() {
  return (
    <svg viewBox="0 0 100 100" className="role-icon">
      <defs>
        <radialGradient id="bulbGlass" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FCE3C4" />
          <stop offset="55%" stopColor={AMBER_SOFT} />
          <stop offset="100%" stopColor="#C9762E" />
        </radialGradient>
        <radialGradient id="bulbGlow" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="rgba(232,149,74,0.5)" />
          <stop offset="100%" stopColor="rgba(232,149,74,0)" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="46" r="32" fill="url(#bulbGlow)" />
      <circle cx="50" cy="42" r="22" fill="url(#bulbGlass)" />
      <path d="M40 60 L60 60 L58 72 L42 72Z" fill="#5C6068" />
      <rect x="42" y="73" width="16" height="5" rx="2" fill="#3A3D44" />
      <rect x="44" y="79" width="12" height="4" rx="2" fill="#3A3D44" />
      <path d="M44 38 Q50 30 56 38" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
      <circle cx="18" cy="24" r="2" fill={AMBER} opacity="0.6" />
      <circle cx="80" cy="60" r="1.8" fill={AMBER} opacity="0.6" />
    </svg>
  );
}

function IconBadge() {
  return (
    <svg viewBox="0 0 100 100" className="role-icon">
      <defs>
        <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={AMBER_SOFT} />
          <stop offset="100%" stopColor="#B5641F" />
        </linearGradient>
        <radialGradient id="badgeGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(232,149,74,0.5)" />
          <stop offset="100%" stopColor="rgba(232,149,74,0)" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="46" r="33" fill="url(#badgeGlow)" />
      <path d="M32 24 L68 24 L68 64 L50 78 L32 64Z" fill="url(#badgeGrad)" />
      <path d="M50 36 L56 48 L69 48 L58 56 L62 69 L50 61 L38 69 L42 56 L31 48 L44 48Z" fill="#0E0F12" opacity="0.8" />
      <path d="M50 36 L56 48 L69 48 L58 56 L62 69 L50 61 L38 69 L42 56 L31 48 L44 48Z" fill="#FCE3C4" transform="scale(0.92)" transformOrigin="50 52" />
      <circle cx="22" cy="20" r="1.8" fill={AMBER} opacity="0.6" />
      <circle cx="78" cy="68" r="2" fill={AMBER} opacity="0.5" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 100 100" className="role-icon">
      <defs>
        <radialGradient id="compassFace" cx="40%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#FCE3C4" />
          <stop offset="60%" stopColor={AMBER_SOFT} />
          <stop offset="100%" stopColor="#B5641F" />
        </radialGradient>
        <radialGradient id="compassGlow" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="rgba(232,149,74,0.5)" />
          <stop offset="100%" stopColor="rgba(232,149,74,0)" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="48" r="33" fill="url(#compassGlow)" />
      <circle cx="50" cy="46" r="26" fill="url(#compassFace)" />
      <circle cx="50" cy="46" r="26" fill="none" stroke="#0E0F12" strokeWidth="2" opacity="0.3" />
      <path d="M50 28 L58 46 L50 64 L42 46Z" fill="#0E0F12" opacity="0.85" />
      <path d="M50 32 L55 46 L50 60 L45 46Z" fill="#fff" opacity="0.9" />
      <circle cx="50" cy="46" r="3" fill="#0E0F12" />
      <circle cx="22" cy="22" r="1.8" fill={AMBER} opacity="0.6" />
      <circle cx="78" cy="64" r="1.6" fill={AMBER} opacity="0.5" />
    </svg>
  );
}

// ============= SOCIAL ICON COMPONENTS =============
function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z" />
    </svg>
  );
}

function IconLeetCode() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      {/* Main black C shape */}
      <path
        d="M 20 4 Q 14 4 10 8 Q 6 12 10 16 Q 14 20 20 20"
        fill="none"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top amber accent */}
      <path
        d="M 18 6 Q 14 6 11 9"
        fill="none"
        stroke={AMBER}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom amber accent */}
      <path
        d="M 18 18 Q 14 18 11 15"
        fill="none"
        stroke={AMBER}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Gray middle line */}
      <line
        x1="6"
        y1="12"
        x2="16"
        y2="12"
        stroke="#999"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ============= WORK EXPERIENCE DATA =============
const ROLES = [
  {
    icon: IconRocket,
    role: "Senior Backend Engineer",
    org: "Facebook",
    period: "2023 — Present",
    desc: "Own the payments reconciliation pipeline serving 40M+ daily transactions across three regions.",
  },
  {
    icon: IconLightbulb,
    role: "Software Engineer",
    org: "Notion",
    period: "2021 — 2023",
    desc: "Built the real-time sync engine that keeps edits consistent across offline and online clients.",
  },
  {
    icon: IconBadge,
    role: "Backend Engineer",
    org: "Razorpay",
    period: "2019 — 2021",
    desc: "Designed the fraud-scoring service that screens every transaction in under 80 milliseconds.",
  },
  {
    icon: IconCompass,
    role: "Software Engineer Intern",
    org: "Zomato",
    period: "2018 — 2019",
    desc: "Shipped the delivery-partner routing prototype that became the team's production algorithm.",
  },
];

// ============= FEATURED PROJECTS DATA =============
const PROJECTS = [
  {
    title: "Spotify Data Visualizer",
    label: "Featured Project",
    desc: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    techs: ["React", "Node.js", "PostgreSQL"],
    link: "https://spotify-visualizer-demo.com",
    color: "linear-gradient(135deg, rgba(232,149,74,0.15), rgba(232,149,74,0.05))",
  },
  {
    title: "Real-time Sync Engine",
    label: "Featured Project",
    desc: "A distributed system for keeping user edits consistent across offline and online clients. Built with event sourcing and CRDT algorithms to handle concurrent modifications with sub-50ms latency.",
    techs: ["TypeScript", "Go", "PostgreSQL"],
    link: "https://sync-engine-demo.com",
    color: "linear-gradient(135deg, rgba(232,149,74,0.1), rgba(232,149,74,0.02))",
  },
];

// ============= SOCIAL LINKS DATA =============
const SOCIALS = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com",
    icon: "leetcode",
  },
];

// ============= WORK EXPERIENCE COMPONENTS =============
function RoleCard({ item, index }) {
  const Icon = item.icon;
  return (
    <Reveal delay={index * 90} className="card-wrap">
      <article className="card" tabIndex={0}>
        <div className="card-icon-wrap">
          <Icon />
        </div>
        <div className="card-body">
          <div className="card-top">
            <h3 className="card-role">{item.role}</h3>
            <span className="card-period">{item.period}</span>
          </div>
          <div className="card-org">{item.org}</div>
          <p className="card-desc">{item.desc}</p>
          <button className="card-btn" type="button">
            View details
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 11L11 2M11 2H4M11 2V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="card-dot dot-1" />
        <div className="card-dot dot-2" />
      </article>
    </Reveal>
  );
}

// ============= FEATURED PROJECTS COMPONENT =============
function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 120} className="project-card-wrap">
      <article className="project-card" style={{ background: project.color }} tabIndex={0}>
        <div className="project-content">
          <div className="project-label">{project.label}</div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.desc}</p>
          <div className="project-techs">
            {project.techs.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
            Live Demo
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 11L11 2M11 2H4M11 2V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <div className="project-mockup">
          <svg viewBox="0 0 280 200" className="mockup-svg">
            <defs>
              <linearGradient id={`mockup-${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F2B679" />
                <stop offset="100%" stopColor="#E8954A" />
              </linearGradient>
            </defs>
            <rect x="15" y="15" width="250" height="170" rx="8" fill="#1A1C22" stroke={`url(#mockup-${index})`} strokeWidth="1.5" />
            <rect x="25" y="30" width="230" height="25" rx="4" fill={`url(#mockup-${index})`} opacity="0.2" />
            <rect x="25" y="65" width="100" height="12" rx="3" fill={`url(#mockup-${index})`} opacity="0.4" />
            <rect x="25" y="85" width="200" height="8" rx="3" fill={`url(#mockup-${index})`} opacity="0.25" />
            <rect x="25" y="100" width="180" height="8" rx="3" fill={`url(#mockup-${index})`} opacity="0.25" />
            <circle cx="90" cy="140" r="25" fill={`url(#mockup-${index})`} opacity="0.3" />
            <circle cx="200" cy="145" r="20" fill={`url(#mockup-${index})`} opacity="0.2" />
          </svg>
        </div>
      </article>
    </Reveal>
  );
}

// ============= CONTACT & FOOTER COMPONENTS =============
function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <Reveal>
          <div className="contact-head">
            <p className="contact-eyebrow">Get in touch</p>
            <h2 className="contact-title">Let's Connect</h2>
          </div>
        </Reveal>

        <Reveal delay={120} as="div" className="contact-content">
          <p className="contact-desc">
            I'm currently looking to join a cross-functional team that values improving people's lives through accessible design, or have a project in mind? Let's connect.
          </p>

          <a href="mailto:ayushanand1205@gmail.com" className="contact-email">
            ayushanand1205@gmail.com
          </a>

          <div className="social-links">
            {SOCIALS.map((social) => {
              let Icon;
              if (social.icon === "github") Icon = IconGitHub;
              if (social.icon === "linkedin") Icon = IconLinkedIn;
              if (social.icon === "leetcode") Icon = IconLeetCode;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title={social.name}
                  aria-label={social.name}
                >
                  {Icon && <Icon />}
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            Designed & built by <strong>Ayush Anand</strong> | © {new Date().getFullYear()}
          </p>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============= MAIN LANDING PAGE COMPONENT =============
export default function LandingPage() {
  const [typed, typedDone] = useTypewriter("I'm a Software Engineer.", 42, 900);
  const [hovered, setHovered] = useState(null);
  const paused = hovered !== null;
  const topAll = [...STACK_TOP, ...STACK_TOP2];

  return (
    <div className="landing-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        .landing-page {
          background: ${BG};
          color: ${TEXT};
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
        }

        /* ===== HERO SECTION ===== */
        .dh-page { background: ${BG}; }
        .dh-topstrip { height: 3px; background: linear-gradient(90deg, ${AMBER}, #F2B679, ${AMBER}); }
        .dh-mast { display: flex; justify-content: space-between; align-items: center; padding: 22px 56px; border-bottom: 1px solid ${LINE}; }
        .dh-mark { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: ${TEXT}; letter-spacing: 0.01em; }
        .dh-mark span { color: ${AMBER}; }
        .dh-nav { display: flex; gap: 36px; font-size: 14.5px; font-weight: 500; }
        .dh-nav a { color: ${TEXT}; text-decoration: none; opacity: 0.85; position: relative; padding-bottom: 4px; }
        .dh-nav a:hover { opacity: 1; }
        .dh-nav a::after { content: ''; position: absolute; left: 0; bottom: 0; width: 0; height: 2px; background: ${AMBER}; transition: width 0.25s ease; }
        .dh-nav a:hover::after { width: 100%; }
        .dh-nav a:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 4px; }

        .dh-container { max-width: 1080px; margin: 0 auto; padding: 0 56px; }
        .dh-hero { display: flex; align-items: center; gap: 56px; padding: 90px 0 50px; }
        .dh-avatar-wrap { position: relative; flex-shrink: 0; width: 260px; height: 260px; }
        .dh-glow { position: absolute; inset: -40px; background: radial-gradient(circle at 50% 45%, rgba(232,149,74,0.30), rgba(232,149,74,0.08) 55%, transparent 75%); border-radius: 28px; filter: blur(2px); animation: dh-pulse 5s ease-in-out infinite; }
        @keyframes dh-pulse { 0%, 100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.03); } }
        .avatar-svg { position: relative; z-index: 2; width: 100%; height: 100%; filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5)); }
        .dh-intro-tag { position: absolute; top: -14px; right: -150px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: ${MUTED}; white-space: nowrap; z-index: 3; }
        .dh-intro-tag b { color: ${AMBER}; font-weight: 500; }
        .dh-intro-tag::before { content: ''; position: absolute; left: -28px; top: 8px; width: 22px; height: 14px; border-left: 1.5px solid ${MUTED}; border-bottom: 1.5px solid ${MUTED}; border-radius: 0 0 0 6px; }
        .dh-hero-text { flex: 1; min-width: 0; }
        .dh-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.05em; color: ${MUTED}; margin: 0 0 14px; }
        .dh-headline { font-family: 'Fraunces', serif; font-weight: 600; font-size: clamp(34px, 4.6vw, 52px); line-height: 1.08; margin: 0 0 14px; }
        .cursor-word { color: ${AMBER}; position: relative; font-style: italic; }
        .cursor-blink { display: inline-block; width: 3px; height: 0.85em; background: ${AMBER}; margin-left: 4px; vertical-align: -0.1em; animation: dh-blink 1s steps(1) infinite; }
        @keyframes dh-blink { 50% { opacity: 0; } }
        .dh-subline { font-size: 15px; color: ${MUTED}; margin: 0 0 36px; max-width: 420px; line-height: 1.55; }
        .dh-typewriter-row { font-family: 'IBM Plex Mono', monospace; font-size: 26px; font-weight: 500; color: ${TEXT}; min-height: 1.4em; }
        .dh-typewriter-row .tw-cursor { display: inline-block; width: 2px; height: 1.1em; background: ${AMBER}; margin-left: 2px; vertical-align: -0.18em; animation: dh-blink 0.9s steps(1) infinite; }
        .dh-bio-row { display: flex; align-items: baseline; gap: 8px; margin: 14px 0 0; font-size: 15px; color: ${MUTED}; }
        .dh-bio-row a { color: ${TEXT}; text-decoration: none; font-weight: 500; border-bottom: 1px solid ${AMBER}; padding-bottom: 1px; }
        .dh-bio-row a:hover { color: ${AMBER}; }
        .dh-divider { height: 1px; background: ${LINE}; margin: 56px 0 48px; }
        .dh-about { padding-bottom: 100px; max-width: 640px; }
        .dh-about p { font-size: 17px; line-height: 1.75; color: #C9CCD2; margin: 0 0 18px; }
        .dh-about strong { color: ${TEXT}; font-weight: 600; }

        /* ===== TECH ORBIT SECTION ===== */
        .orbit-section { background: ${BG}; padding: 90px 24px 140px; position: relative; overflow: hidden; text-align: center; }
        .orbit-head { max-width: 640px; margin: 0 auto 64px; }
        .orbit-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; letter-spacing: 0.06em; color: ${MUTED}; margin: 0 0 14px; }
        .orbit-headline { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(22px, 3.2vw, 30px); line-height: 1.4; color: ${TEXT}; margin: 0 0 10px; }
        .orbit-headline b { color: ${AMBER}; font-weight: 600; font-style: italic; }
        .orbit-sub { font-size: 14.5px; color: ${MUTED}; margin: 0; }

        .orbit-top-row { display: flex; justify-content: center; gap: 14px; margin-bottom: 6px; flex-wrap: wrap; max-width: 760px; margin-inline: auto; position: relative; z-index: 3; }
        .orbit-top-icon { width: 42px; height: 42px; border-radius: 50%; background: #1A1C22; border: 1px solid ${LINE}; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transform: translateY(-10px); animation: orbit-drop 0.6s cubic-bezier(.22,.61,.36,1) forwards; transition: transform 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease; overflow: hidden; }
        @keyframes orbit-drop { to { opacity: 1; transform: translateY(0); } }
        .orbit-top-icon:hover, .orbit-top-icon:focus-visible { transform: translateY(-4px) scale(1.14); border-color: ${AMBER}; box-shadow: 0 6px 18px -6px rgba(232,149,74,0.5); outline: none; }
        .orbit-top-icon.dimmed { opacity: 0.25 !important; }

        .logo-mask { width: 60%; height: 60%; display: flex; align-items: center; justify-content: center; border-radius: 50%; overflow: hidden; background: #fff; }
        .logo-mask svg { width: 100%; height: 100%; display: block; }
        .logo-mask-sm { width: 70%; height: 70%; }

        .orbit-lines { position: relative; display: block; width: 760px; max-width: 90vw; height: 200px; margin: 0 auto; pointer-events: none; z-index: 1; }
        .orbit-line-path { stroke: ${AMBER}; stroke-width: 1; fill: none; opacity: 0.22; stroke-dasharray: 4 7; animation: orbit-flow 3.5s linear infinite; }
        @keyframes orbit-flow { to { stroke-dashoffset: -110; } }

        .orbit-core-wrap { position: relative; width: 100%; height: 420px; margin-top: -40px; }
        .orbit-glow { position: absolute; top: 50%; left: 50%; width: 520px; height: 520px; transform: translate(-50%, -50%); background: radial-gradient(circle, rgba(232,149,74,0.26), rgba(232,149,74,0.06) 50%, transparent 72%); border-radius: 50%; animation: orbit-glow-pulse 4.5s ease-in-out infinite; z-index: 0; }
        @keyframes orbit-glow-pulse { 0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); } }

        .orbit-core { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 96px; height: 96px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #2A2118, #1A140E); border: 1px solid rgba(232,149,74,0.4); display: flex; align-items: center; justify-content: center; z-index: 5; box-shadow: 0 0 50px rgba(232,149,74,0.35); }
        .orbit-core-mark { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 600; color: ${TEXT}; transform: scaleX(-1); }

        .orbit-ring-svg { position: absolute; top: 50%; left: 50%; overflow: visible; z-index: 2; }
        .ring-pivot { position: absolute; top: 50%; left: 50%; width: 0; height: 0; z-index: 4; }
        .ring-group { position: absolute; top: 0; left: 0; width: 0; height: 0; animation-name: orbit-spin; animation-timing-function: linear; animation-iteration-count: infinite; }
        .ring-group.is-paused { animation-play-state: paused; }
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .ring-icon-pos { position: absolute; top: 0; left: 0; }
        .ring-icon-tilt { position: relative; }
        .ring-icon-counter { position: relative; width: 32px; height: 32px; border-radius: 50%; background: #1A1C22; border: 1px solid ${LINE}; display: flex; align-items: center; justify-content: center; cursor: pointer; transform: translate(-16px, -16px); transition: border-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease; overflow: hidden; }
        .ring-icon-counter:hover, .ring-icon-counter:focus-visible { border-color: ${AMBER}; transform: translate(-16px, -16px) scale(1.2); box-shadow: 0 6px 16px -6px rgba(232,149,74,0.5); outline: none; }
        .ring-icon-counter.dimmed { opacity: 0.25; }
        .ring-tooltip { position: absolute; bottom: 130%; left: 50%; transform: translateX(-50%); background: #1F2127; border: 1px solid ${LINE}; color: ${TEXT}; font-family: 'IBM Plex Mono', monospace; font-size: 11px; padding: 4px 9px; border-radius: 6px; white-space: nowrap; z-index: 10; }

        /* ===== WORK EXPERIENCE SECTION ===== */
        .we-section { background: ${BG}; padding: 90px 56px 110px; position: relative; }
        .we-container { max-width: 1080px; margin: 0 auto; }
        .we-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 48px; flex-wrap: wrap; gap: 12px; }
        .we-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; color: ${MUTED}; margin: 0 0 12px; }
        .we-title { font-family: 'Fraunces', serif; font-weight: 600; font-size: clamp(30px, 4vw, 42px); color: ${TEXT}; margin: 0; }
        .we-count { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: ${AMBER}; }

        .we-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        .card-wrap { min-width: 0; }
        .card { position: relative; display: flex; align-items: flex-start; gap: 22px; background: linear-gradient(155deg, ${PANEL_2}, ${PANEL}); border: 1px solid ${LINE}; border-radius: 16px; padding: 30px 28px; height: 100%; overflow: hidden; cursor: default; transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .card:hover, .card:focus-visible { border-color: rgba(232,149,74,0.45); transform: translateY(-3px); box-shadow: 0 18px 36px -18px rgba(232,149,74,0.25); }
        .card:focus-visible { outline: none; }

        .card-icon-wrap { flex-shrink: 0; width: 64px; height: 64px; }
        .role-icon { width: 100%; height: 100%; }
        .card-body { flex: 1; min-width: 0; }
        .card-top { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
        .card-role { font-family: 'Fraunces', serif; font-weight: 600; font-size: 19px; color: ${TEXT}; margin: 0; }
        .card-period { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: ${MUTED}; white-space: nowrap; }
        .card-org { font-size: 13px; font-weight: 500; color: ${AMBER_SOFT}; margin-top: 4px; }
        .card-desc { font-size: 14px; line-height: 1.6; color: #B7BAC0; margin: 12px 0 20px; }
        .card-btn { display: inline-flex; align-items: center; gap: 8px; background: transparent; border: 1px solid ${LINE}; color: ${TEXT}; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; letter-spacing: 0.04em; text-transform: uppercase; padding: 9px 16px; border-radius: 999px; cursor: pointer; transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease; }
        .card-btn:hover { border-color: ${AMBER}; color: ${AMBER}; background: rgba(232,149,74,0.08); }
        .card-btn:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 2px; }
        .card-btn svg { transition: transform 0.25s ease; }
        .card-btn:hover svg { transform: translate(1px, -1px); }

        .card-dot { position: absolute; border-radius: 50%; background: ${AMBER}; opacity: 0.35; }
        .dot-1 { width: 5px; height: 5px; bottom: 20px; left: 20px; }
        .dot-2 { width: 3px; height: 3px; top: 24px; right: 90px; }

        /* ===== FEATURED PROJECTS SECTION ===== */
        .fp-section { background: ${BG}; padding: 110px 56px 120px; position: relative; }
        .fp-container { max-width: 1080px; margin: 0 auto; }
        .fp-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 52px; flex-wrap: wrap; gap: 12px; }
        .fp-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; color: ${MUTED}; margin: 0 0 12px; }
        .fp-title { font-family: 'Fraunces', serif; font-weight: 600; font-size: clamp(30px, 4vw, 42px); color: ${TEXT}; margin: 0; }
        .fp-count { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: ${AMBER}; }

        .fp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .project-card-wrap { min-width: 0; }
        .project-card { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; border: 1px solid ${LINE}; border-radius: 20px; padding: 48px 40px; height: 100%; overflow: hidden; cursor: default; transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; backdrop-filter: blur(10px); }
        .project-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 100% 0%, rgba(232,149,74,0.08), transparent 70%); pointer-events: none; }
        .project-card:hover, .project-card:focus-visible { border-color: ${AMBER}; transform: translateY(-2px); box-shadow: 0 16px 32px -12px rgba(232,149,74,0.2); }
        .project-card:focus-visible { outline: none; }

        .project-content { position: relative; z-index: 2; }
        .project-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.08em; color: ${AMBER}; text-transform: uppercase; margin-bottom: 10px; }
        .project-title { font-family: 'Fraunces', serif; font-weight: 600; font-size: 28px; color: ${TEXT}; margin: 0 0 14px; }
        .project-desc { font-size: 14px; line-height: 1.7; color: #B7BAC0; margin: 0 0 20px; }
        .project-techs { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
        .tech-badge { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: ${TEXT}; background: rgba(232,149,74,0.1); border: 1px solid rgba(232,149,74,0.25); padding: 6px 12px; border-radius: 12px; white-space: nowrap; }
        .project-link-btn { display: inline-flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; letter-spacing: 0.04em; text-transform: uppercase; color: ${TEXT}; text-decoration: none; border: 1px solid ${LINE}; padding: 9px 16px; border-radius: 999px; transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease; cursor: pointer; }
        .project-link-btn:hover { border-color: ${AMBER}; color: ${AMBER}; background: rgba(232,149,74,0.08); }
        .project-link-btn:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 2px; }
        .project-link-btn svg { transition: transform 0.25s ease; }
        .project-link-btn:hover svg { transform: translate(1px, -1px); }

        .project-mockup { position: relative; z-index: 2; }
        .mockup-svg { width: 100%; height: auto; filter: drop-shadow(0 12px 24px rgba(0,0,0,0.4)); }

        @media (max-width: 1024px) {
          .project-card { grid-template-columns: 1fr; gap: 24px; }
          .project-mockup { display: none; }
        }

        @media (max-width: 760px) {
          .fp-section { padding: 64px 22px 80px; }
          .fp-grid { grid-template-columns: 1fr; gap: 20px; }
          .project-card { padding: 28px 20px; }
          .project-title { font-size: 22px; }
        }

        /* ===== CONTACT SECTION ===== */
        .contact-section { background: ${BG}; padding: 110px 56px 80px; position: relative; }
        .contact-container { max-width: 680px; margin: 0 auto; text-align: center; }
        .contact-head { margin-bottom: 48px; }
        .contact-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.06em; color: ${MUTED}; margin: 0 0 12px; }
        .contact-title { font-family: 'Fraunces', serif; font-weight: 600; font-size: clamp(30px, 4vw, 42px); color: ${TEXT}; margin: 0; }
        .contact-desc { font-size: 15px; line-height: 1.75; color: #B7BAC0; margin: 0 0 32px; }
        .contact-email { display: inline-block; font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 500; color: ${TEXT}; text-decoration: none; border-bottom: 2px solid ${AMBER}; padding-bottom: 4px; transition: color 0.25s ease, border-color 0.25s ease; margin-bottom: 40px; }
        .contact-email:hover { color: ${AMBER}; border-color: #F2B679; }
        .social-links { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .social-icon { width: 48px; height: 48px; border-radius: 50%; background: #1A1C22; border: 1.5px solid ${LINE}; display: flex; align-items: center; justify-content: center; color: ${TEXT}; transition: all 0.3s ease; cursor: pointer; }
        .social-icon:hover { border-color: ${AMBER}; color: ${AMBER}; background: rgba(232,149,74,0.08); transform: translateY(-3px); box-shadow: 0 8px 16px rgba(232,149,74,0.2); }
        .social-icon:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 4px; }

        /* ===== FOOTER ===== */
        .footer { background: #0A0B0E; border-top: 1px solid ${LINE}; padding: 32px 56px; }
        .footer-container { max-width: 1080px; margin: 0 auto; }
        .footer-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; }
        .footer-text { font-size: 13px; color: ${MUTED}; margin: 0; }
        .footer-text strong { color: ${TEXT}; font-weight: 600; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: ${MUTED}; text-decoration: none; transition: color 0.25s ease; }
        .footer-links a:hover { color: ${AMBER}; }

        @media (max-width: 760px) {
          .contact-section { padding: 64px 22px 60px; }
          .footer { padding: 24px 22px; }
          .footer-content { flex-direction: column; align-items: flex-start; }
          .footer-links { flex-direction: column; gap: 12px; }
          .social-icon { width: 40px; height: 40px; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
          .dh-container { padding: 0 24px; }
          .dh-mast { padding: 18px 24px; }
          .dh-nav { gap: 20px; font-size: 13px; }
          .dh-hero { flex-direction: column; align-items: flex-start; gap: 36px; padding: 56px 0 30px; }
          .dh-avatar-wrap { width: 200px; height: 200px; }
          .dh-intro-tag { position: static; margin-top: 16px; display: block; }
          .dh-intro-tag::before { display: none; }
          .dh-typewriter-row { font-size: 20px; }
        }

        @media (max-width: 760px) {
          .orbit-section { padding: 64px 16px 100px; }
          .orbit-core-wrap { height: 320px; }
          .orbit-top-icon { width: 34px; height: 34px; }
          .we-section { padding: 64px 22px 80px; }
          .we-grid { grid-template-columns: 1fr; }
          .card { flex-direction: column; gap: 16px; padding: 26px 24px; }
          .card-icon-wrap { width: 52px; height: 52px; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
          .ring-group { animation: none !important; }
          .orbit-top-icon, .orbit-glow, .orbit-line-path { animation: none !important; }
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <div className="dh-page">
        <div className="dh-topstrip" />

        <header className="dh-mast">
          <div className="dh-mark">
            dev<span>.</span>
          </div>
          <nav className="dh-nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="dh-container">
          <section className="dh-hero" id="home">
            <Reveal as="div" className="dh-avatar-wrap">
              <div className="dh-glow" />
              <DeskAvatar />
              <div className="dh-intro-tag">
                Hello! I'm <b>Ayush Anand</b>
              </div>
            </Reveal>

            <Reveal as="div" className="dh-hero-text" delay={120}>
              <p className="dh-eyebrow">A Software Developer & Data Enthusiast</p>
              <h1 className="dh-headline">
                Ships the part that has to
                <br />
                <TerminalCursorWord word="just work" />.
              </h1>
              <p className="dh-subline">
                Because if the core doesn't hold, nothing built on top of it matters.
              </p>
            </Reveal>
          </section>

          <Reveal as="div" delay={80}>
            <div className="dh-typewriter-row">
              {typed}
              <span className="tw-cursor" />
            </div>
            <div className="dh-bio-row">
              <span>Currently building backend systems at</span>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Facebook
              </a>
              <span>.</span>
            </div>
          </Reveal>

          <div className="dh-divider" />

          <Reveal as="section" className="dh-about" id="about">
            <p>
              I am a <strong>Computer Science student</strong> passionate about creating impactful software solutions. 
              Over the past few years, I have worked on projects involving <strong>Full-Stack Web Development</strong> using 
              React, Node.js, Express, and MongoDB, as well as <strong>Data Analysis</strong> using SQL, Excel, Python, and Power BI.
            </p>
            <p>
              My experience also includes <strong>REST API Development</strong> with FastAPI, <strong>Database Management</strong> and 
              Query Optimization, and <strong>Dashboard Development</strong> for Business Insights. I enjoy solving challenging problems 
              through code and continuously improving my technical skills.
            </p>
            <p>
              My goal is to become a software engineer who can build <strong>reliable systems</strong>, extract meaningful insights 
              from data, and leverage <strong>AI to create intelligent products</strong>.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ===== TECH ORBIT SECTION ===== */}
      <section className="orbit-section">
        <Reveal className="orbit-head">
          <p className="orbit-eyebrow">Currently open to</p>
          <h2 className="orbit-headline">
            I'm looking to join a <b>backend / infrastructure</b> team
          </h2>
          <p className="orbit-sub">that values systems built to stay reliable under real load.</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="orbit-top-row" role="list" aria-label="Tools and technologies">
            {topAll.map((name, i) => (
              <TopIcon key={name} name={name} index={i} hovered={hovered} setHovered={setHovered} />
            ))}
          </div>
        </Reveal>

        <svg className="orbit-lines" viewBox="0 0 760 200" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          {topAll.map((_, i) => {
            const x = (760 / (topAll.length + 1)) * (i + 1);
            return (
              <path
                key={i}
                className="orbit-line-path"
                d={`M ${x} 0 Q ${380 + (x - 380) * 0.3} 110 380 190`}
              />
            );
          })}
        </svg>

        <div className="orbit-core-wrap">
          <div className="orbit-glow" />

          {RINGS.map((ring, ri) => (
            <svg
              key={`ring-svg-${ri}`}
              className="orbit-ring-svg"
              width={ring.rx * 2}
              height={ring.ry * 2}
              style={{
                marginLeft: -ring.rx,
                marginTop: -ring.ry,
                transform: `rotate(${ring.tilt}deg)`,
              }}
              aria-hidden="true"
            >
              <ellipse
                cx={ring.rx}
                cy={ring.ry}
                rx={ring.rx - 1}
                ry={ring.ry - 1}
                fill="none"
                stroke="rgba(232,149,74,0.22)"
                strokeWidth="1"
              />
            </svg>
          ))}

          {RINGS.map((ring, ri) => (
            <div key={`pivot-${ri}`} className="ring-pivot" style={{ transform: `rotate(${ring.tilt}deg)` }}>
              <div
                className={`ring-group ${paused ? "is-paused" : ""}`}
                style={{
                  animationDuration: `${ring.duration}s`,
                  animationDirection: ring.dir === -1 ? "reverse" : "normal",
                }}
              >
                {ring.items.map((label, ii) => {
                  const angle = (360 / ring.items.length) * ii;
                  const rad = (angle * Math.PI) / 180;
                  const x = ring.rx * Math.cos(rad);
                  const y = ring.ry * Math.sin(rad);
                  const id = `ring-${ri}-${ii}`;
                  return (
                    <RingIcon
                      key={id}
                      id={id}
                      label={label}
                      x={x}
                      y={y}
                      tilt={ring.tilt}
                      hovered={hovered}
                      setHovered={setHovered}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <div className="orbit-core">
            <span className="orbit-core-mark">K</span>
          </div>
        </div>
      </section>

      {/* ===== WORK EXPERIENCE SECTION ===== */}
      <section className="we-section" id="experience">
        <div className="we-container">
          <Reveal>
            <div className="we-head">
              <div>
                <p className="we-eyebrow">Track record</p>
                <h2 className="we-title">Work Experience</h2>
              </div>
              <span className="we-count">04 roles</span>
            </div>
          </Reveal>

          <div className="we-grid">
            {ROLES.map((item, i) => (
              <RoleCard item={item} index={i} key={item.role} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS SECTION ===== */}
      <section className="fp-section" id="projects">
        <div className="fp-container">
          <Reveal>
            <div className="fp-head">
              <div>
                <p className="fp-eyebrow">Showcase</p>
                <h2 className="fp-title">Featured Projects</h2>
              </div>
              <span className="fp-count">02 projects</span>
            </div>
          </Reveal>

          <div className="fp-grid">
            {PROJECTS.map((project, i) => (
              <ProjectCard project={project} index={i} key={project.title} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <ContactSection />

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
