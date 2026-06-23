import { useState, useRef, useEffect } from "react";

/**
 * TECH ORBIT — interactive, animated tech-stack section.
 * Core mark pulses; converging icons feed into it from above;
 * three elliptical rings rotate at different speeds/directions.
 * Hover any orbiting icon: rotation pauses, that icon highlights,
 * others dim, and a tooltip names the tech.
 *
 * Architecture note: each ring's rotation speed/direction is applied
 * via inline animationDuration / animationDirection on a SHARED
 * keyframe (orbit-spin), not per-ring dynamically-generated keyframes.
 * This avoids style-tag ordering/timing bugs entirely.
 */

const BG = "#0E0F12";
const TEXT = "#F4F2ED";
const MUTED = "#8A8F98";
const AMBER = "#E8954A";
const AMBER_SOFT = "#F2B679";
const LINE = "#2A2D33";

/* ============================================================
   REAL TECH LOGOS — accurate shapes, official brand colors.
   Each is a self-contained SVG sized to a 0 0 24 24 viewBox
   so they drop into any size circle uniformly.
   ============================================================ */

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
    <path
      d="M12 1.85c-.3 0-.6.08-.86.23L4.3 5.92c-.53.31-.86.88-.86 1.49v9.18c0 .61.33 1.18.86 1.49l1.9 1.1c.92.46 1.26.46 1.68.46 1.37 0 2.16-.83 2.16-2.28V8.34c0-.12-.1-.21-.21-.21H8.95c-.12 0-.21.09-.21.21v8.92c0 .64-.66 1.28-1.74.74l-2-1.16a.23.23 0 0 1-.11-.2V7.42a.23.23 0 0 1 .11-.2l6.84-3.94a.22.22 0 0 1 .22 0l6.84 3.94c.07.04.11.11.11.2v9.18c0 .08-.04.16-.11.2l-6.84 3.95a.22.22 0 0 1-.22 0l-1.75-1.04c-.05-.03-.12-.04-.17-.01-.49.28-.58.32-1.04.48-.11.04-.28.1.06.3l2.28 1.36c.27.15.57.23.87.23s.6-.08.86-.23l6.84-3.95c.53-.31.86-.88.86-1.49V7.41c0-.61-.33-1.18-.86-1.49l-6.84-3.94a1.74 1.74 0 0 0-.86-.23z"
      fill="#539E43"
    />
    <path
      d="M14.07 14.07c-2.94 0-3.56-1.35-3.56-2.49 0-.11.09-.2.21-.2h.92c.1 0 .19.07.2.18.14.92.54 1.39 2.23 1.39 1.35 0 1.92-.3 1.92-1.03 0-.42-.16-.72-2.26-.93-1.75-.17-2.83-.56-2.83-1.97 0-1.29 1.09-2.07 2.91-2.07 2.04 0 3.06.71 3.19 2.23a.2.2 0 0 1-.2.22h-.93a.2.2 0 0 1-.19-.16c-.21-.96-.72-1.27-2.1-1.27-1.55 0-1.73.54-1.73.94 0 .48.21.62 2.19.87 1.96.25 2.9.61 2.9 2 0 1.4-1.17 2.21-3.21 2.21z"
      fill="#fff"
    />
  </svg>
);

const LogoDocker = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path
      fill="#2496ED"
      d="M21.8 9.6c-.4-.3-1.2-.4-1.9-.3-.1-.7-.5-1.3-1.1-1.8l-.3-.2-.2.3c-.4.5-.6 1.2-.5 1.9-.3.1-.5.3-.8.4H3.1c-.2.9-.2 1.9.1 2.9.5 1.7 1.5 3 3 3.8 1.7.9 4 1.2 6.1.9 3-.4 5.6-1.9 7-4.8.9.1 1.8-.1 2.3-.8.1-.2.3-.5.4-.8l.1-.3-.3-.2c-.1-.4-.1-.4-.1-.4z"
    />
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
    <path
      fill="#000"
      d="M15.9 18.3c.4.7.9 1.2 1.9 1.2.8 0 1.3-.4 1.3-1 0-.7-.5-.9-1.4-1.3l-.5-.2c-1.4-.6-2.4-1.4-2.4-3 0-1.5 1.1-2.6 2.9-2.6 1.3 0 2.2.4 2.8 1.6l-1.5.97c-.3-.6-.7-.8-1.3-.8-.6 0-.9.3-.9.8 0 .6.3.8 1.2 1.2l.5.2c1.6.7 2.6 1.5 2.6 3.1 0 1.8-1.4 2.8-3.3 2.8-1.8 0-3-.9-3.6-2.1l1.7-1zm-6.9.16c.3.5.6.95 1.3.95.6 0 1-.25 1-1.2v-6.5h1.9v6.55c0 1.95-1.1 2.85-2.8 2.85-1.5 0-2.4-.8-2.8-1.7l1.4-.95z"
    />
  </svg>
);

const LogoExpress = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <rect width="24" height="24" rx="4" fill="#1A1A1A" />
    <path
      fill="#fff"
      d="M3.5 15.2c0-2.4 1.5-3.9 3.5-3.9 1.9 0 3.2 1.4 3.2 3.6v.5H5c.1 1.2 1 1.9 2.1 1.9.8 0 1.4-.3 1.8-.8l1 .8c-.6.8-1.5 1.3-2.8 1.3-2.1 0-3.6-1.5-3.6-3.4zm1.5-.7h3.6c-.1-1-.8-1.6-1.7-1.6-1 0-1.7.6-1.9 1.6zm6-3h1.6l1.5 2.2 1.5-2.2h1.6l-2.3 3.3 2.4 3.4h-1.7l-1.6-2.3-1.6 2.3h-1.6l2.4-3.4-2.2-3.3z"
    />
  </svg>
);

const LogoPostgres = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path
      fill="#336791"
      d="M17.1 2.6c-1.6-.2-3.1.1-4.3.7-.6-.1-1.2-.2-1.9-.1-1.2.1-2.3.6-3.1 1.4-.7.7-1.2 1.7-1.4 2.9-.6.4-1 1-1.3 1.7-.5 1.2-.5 2.5-.1 3.7-.5 1.1-.5 2.4 0 3.7.6 1.6 1.9 2.9 3.5 3.6-.1.5-.1 1 0 1.4.2.7.7 1.2 1.4 1.4.9.3 1.9.1 2.7-.5.4.1.9.2 1.4.2 1.6 0 3.1-.6 4.2-1.7.3.1.7.1 1 0 .8-.2 1.4-.8 1.6-1.6.1-.4.1-.8 0-1.2.9-1 1.4-2.4 1.4-3.8 0-.7-.1-1.4-.4-2 .4-1 .5-2.1.2-3.2-.3-1.3-1.1-2.4-2.2-3.1.1-.7 0-1.4-.3-2-.5-1.1-1.7-1.8-3.4-1.5z"
    />
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
    <path
      fill="#47A248"
      d="M12 2.3s4.3 4.2 4.3 9.7c0 4.1-2.4 6.6-3.5 7.6l-.2 2.6h-1.2l-.2-2.6c-1.1-1-3.5-3.5-3.5-7.6 0-5.5 4.3-9.7 4.3-9.7zm0 2.2c-.6 1.4-1.4 4-1.4 7.5 0 2.6 1 4.6 1.4 5.3.4-.7 1.4-2.7 1.4-5.3 0-3.5-.8-6.1-1.4-7.5z"
    />
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
    <path
      fill="#3776AB"
      d="M11.9 1.8c-1 0-1.9.1-2.6.3-2.3.4-2.7 1.3-2.7 2.9v2.1h5.4v.7H4.5C2.9 7.8 1.5 8.8 1.5 11.6c0 3.1 1.3 4.3 3 4.3H6V14c0-1.8 1.6-3.3 3.5-3.3h3.6c1.6 0 2.9-1.3 2.9-2.9V5C16 3.3 14.5 2 12.7 1.8c-.2 0-.5 0-.8 0zM8.9 3.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
    />
    <path
      fill="#FFD43B"
      d="M12.1 22.2c1 0 1.9-.1 2.6-.3 2.3-.4 2.7-1.3 2.7-2.9v-2.1h-5.4v-.7h7.5c1.6 0 3-.9 3-3.8 0-3.1-1.3-4.3-3-4.3H18V10c0 1.8-1.6 3.3-3.5 3.3h-3.6c-1.6 0-2.9 1.3-2.9 2.9V19c0 1.7 1.5 3 3.3 3.2.2 0 .5 0 .8 0zm3.2-1.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
    />
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

const STACK_TOP = ["Figma", "React", "C++", "Node.js", "Docker", "JavaScript", "Express"];
const STACK_TOP2 = ["PostgreSQL", "Next.js", "Go", "AWS", "Redis", "MongoDB"];

/* Orbit ring config: radiusX, radiusY, tilt(deg), duration(s), direction (1 | -1) */
const RINGS = [
  { rx: 280, ry: 70, tilt: -6, duration: 38, dir: 1, items: ["TypeScript", "Rust", "AWS", "Git"] },
  { rx: 220, ry: 54, tilt: 4, duration: 26, dir: -1, items: ["Go", "Kubernetes", "SQL"] },
  { rx: 160, ry: 38, tilt: -3, duration: 18, dir: 1, items: ["Node.js", "Python"] },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(16px)",
        transition: `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function TopIcon({ name, index, hovered, setHovered }) {
  const isDimmed = hovered !== null && hovered !== `top-${index}`;
  const Logo = LOGO_MAP[name];
  return (
    <div
      className={`orbit-top-icon ${isDimmed ? "dimmed" : ""}`}
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

/**
 * One orbiting icon. Positioned via x/y (computed from ring radius + angle),
 * then counter-rotated by -tilt so it stays upright regardless of the ring's
 * static tilt. The spin itself lives on the parent .ring-group only.
 */
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

export default function TechOrbit() {
  const [hovered, setHovered] = useState(null);
  const paused = hovered !== null;
  const topAll = [...STACK_TOP, ...STACK_TOP2];

  return (
    <section className="orbit-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        .orbit-section {
          background: ${BG};
          padding: 90px 24px 140px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .orbit-head {
          max-width: 640px;
          margin: 0 auto 64px;
        }

        .orbit-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px;
          letter-spacing: 0.06em;
          color: ${MUTED};
          margin: 0 0 14px;
        }

        .orbit-headline {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: clamp(22px, 3.2vw, 30px);
          line-height: 1.4;
          color: ${TEXT};
          margin: 0 0 10px;
        }
        .orbit-headline b {
          color: ${AMBER};
          font-weight: 600;
          font-style: italic;
        }

        .orbit-sub {
          font-size: 14.5px;
          color: ${MUTED};
          margin: 0;
        }

        .orbit-top-row {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-bottom: 6px;
          flex-wrap: wrap;
          max-width: 760px;
          margin-inline: auto;
          position: relative;
          z-index: 3;
        }

        .orbit-top-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #1A1C22;
          border: 1px solid ${LINE};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: translateY(-10px);
          animation: orbit-drop 0.6s cubic-bezier(.22,.61,.36,1) forwards;
          transition: transform 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }
        @keyframes orbit-drop {
          to { opacity: 1; transform: translateY(0); }
        }
        .orbit-top-icon:hover, .orbit-top-icon:focus-visible {
          transform: translateY(-4px) scale(1.14);
          border-color: ${AMBER};
          box-shadow: 0 6px 18px -6px rgba(232,149,74,0.5);
          outline: none;
        }
        .orbit-top-icon.dimmed { opacity: 0.25 !important; }

        .logo-mask {
          width: 60%;
          height: 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
        }
        .logo-mask svg { width: 100%; height: 100%; display: block; }
        .logo-mask-sm { width: 70%; height: 70%; }

        .orbit-lines {
          position: relative;
          display: block;
          width: 760px;
          max-width: 90vw;
          height: 200px;
          margin: 0 auto;
          pointer-events: none;
          z-index: 1;
        }
        .orbit-line-path {
          stroke: ${AMBER};
          stroke-width: 1;
          fill: none;
          opacity: 0.22;
          stroke-dasharray: 4 7;
          animation: orbit-flow 3.5s linear infinite;
        }
        @keyframes orbit-flow {
          to { stroke-dashoffset: -110; }
        }

        .orbit-core-wrap {
          position: relative;
          width: 100%;
          height: 420px;
          margin-top: -40px;
        }

        .orbit-glow {
          position: absolute;
          top: 50%; left: 50%;
          width: 520px; height: 520px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(232,149,74,0.26), rgba(232,149,74,0.06) 50%, transparent 72%);
          border-radius: 50%;
          animation: orbit-glow-pulse 4.5s ease-in-out infinite;
          z-index: 0;
        }
        @keyframes orbit-glow-pulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
        }

        .orbit-core {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 96px; height: 96px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #2A2118, #1A140E);
          border: 1px solid rgba(232,149,74,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          box-shadow: 0 0 50px rgba(232,149,74,0.35);
        }
        .orbit-core-mark {
          font-family: 'Fraunces', serif;
          font-size: 30px;
          font-weight: 600;
          color: ${TEXT};
          transform: scaleX(-1);
        }

        .orbit-ring-svg {
          position: absolute;
          top: 50%;
          left: 50%;
          overflow: visible;
          z-index: 2;
        }

        .ring-pivot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          z-index: 4;
        }

        .ring-group {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          animation-name: orbit-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .ring-group.is-paused {
          animation-play-state: paused;
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .ring-icon-pos {
          position: absolute;
          top: 0;
          left: 0;
        }

        .ring-icon-counter {
          position: relative;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1A1C22;
          border: 1px solid ${LINE};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transform: translate(-16px, -16px);
          transition: border-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          overflow: hidden;
        }
        .ring-icon-counter:hover, .ring-icon-counter:focus-visible {
          border-color: ${AMBER};
          transform: translate(-16px, -16px) scale(1.2);
          box-shadow: 0 6px 16px -6px rgba(232,149,74,0.5);
          outline: none;
        }
        .ring-icon-counter.dimmed { opacity: 0.25; }

        .ring-tooltip {
          position: absolute;
          bottom: 130%;
          left: 50%;
          transform: translateX(-50%);
          background: #1F2127;
          border: 1px solid ${LINE};
          color: ${TEXT};
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          padding: 4px 9px;
          border-radius: 6px;
          white-space: nowrap;
          z-index: 10;
        }

        @media (max-width: 760px) {
          .orbit-section { padding: 64px 16px 100px; }
          .orbit-core-wrap { height: 320px; }
          .orbit-top-icon { width: 34px; height: 34px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ring-group { animation: none !important; }
          .orbit-top-icon, .orbit-glow, .orbit-line-path { animation: none !important; }
        }
      `}</style>

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
  );
}
