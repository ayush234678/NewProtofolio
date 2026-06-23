import { useState, useRef, useEffect } from "react";

/**
 * WORK EXPERIENCE — 2x2 card grid
 * Continues the amber/charcoal system from DarkHero.jsx.
 * Icons are original flat-glass illustrations (rocket, lightbulb,
 * badge, compass) rather than the reference's bookmark/hat/pin set.
 */

const BG = "#0E0F12";
const PANEL = "#16181D";
const PANEL_2 = "#1A1C22";
const TEXT = "#F4F2ED";
const MUTED = "#8A8F98";
const AMBER = "#E8954A";
const AMBER_SOFT = "#F2B679";
const LINE = "#2A2D33";

function useInView(threshold = 0.2) {
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

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(18px)",
        transition: `opacity 0.6s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 0.6s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* --- Original glossy icon illustrations --- */

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
      <path
        d="M50 36 L56 48 L69 48 L58 56 L62 69 L50 61 L38 69 L42 56 L31 48 L44 48Z"
        fill="#FCE3C4"
        transform="scale(0.92)"
        transform-origin="50 52"
      />
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

const ROLES = [
  {
    icon: IconRocket,
    role: "enior Backend Engineer",
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

export default function WorkExperience() {
  return (
    <section className="we-section" id="experience">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        .we-section {
          background: ${BG};
          padding: 90px 56px 110px;
          position: relative;
        }

        .we-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .we-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .we-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: ${MUTED};
          margin: 0 0 12px;
        }

        .we-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(30px, 4vw, 42px);
          color: ${TEXT};
          margin: 0;
        }

        .we-count {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: ${AMBER};
        }

        .we-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .card-wrap { min-width: 0; }

        .card {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 22px;
          background: linear-gradient(155deg, ${PANEL_2}, ${PANEL});
          border: 1px solid ${LINE};
          border-radius: 16px;
          padding: 30px 28px;
          height: 100%;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover, .card:focus-visible {
          border-color: rgba(232,149,74,0.45);
          transform: translateY(-3px);
          box-shadow: 0 18px 36px -18px rgba(232,149,74,0.25);
        }
        .card:focus-visible { outline: none; }

        .card-icon-wrap {
          flex-shrink: 0;
          width: 64px;
          height: 64px;
        }
        .role-icon { width: 100%; height: 100%; }

        .card-body { flex: 1; min-width: 0; }

        .card-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .card-role {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 19px;
          color: ${TEXT};
          margin: 0;
        }

        .card-period {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: ${MUTED};
          white-space: nowrap;
        }

        .card-org {
          font-size: 13px;
          font-weight: 500;
          color: ${AMBER_SOFT};
          margin-top: 4px;
        }

        .card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #B7BAC0;
          margin: 12px 0 20px;
        }

        .card-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid ${LINE};
          color: ${TEXT};
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 9px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
        }
        .card-btn:hover {
          border-color: ${AMBER};
          color: ${AMBER};
          background: rgba(232,149,74,0.08);
        }
        .card-btn:focus-visible {
          outline: 2px solid ${AMBER};
          outline-offset: 2px;
        }
        .card-btn svg { transition: transform 0.25s ease; }
        .card-btn:hover svg { transform: translate(1px, -1px); }

        .card-dot {
          position: absolute;
          border-radius: 50%;
          background: ${AMBER};
          opacity: 0.35;
        }
        .dot-1 { width: 5px; height: 5px; bottom: 20px; left: 20px; }
        .dot-2 { width: 3px; height: 3px; top: 24px; right: 90px; }

        @media (max-width: 760px) {
          .we-section { padding: 64px 22px 80px; }
          .we-grid { grid-template-columns: 1fr; }
          .card { flex-direction: column; gap: 16px; padding: 26px 24px; }
          .card-icon-wrap { width: 52px; height: 52px; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

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
  );
}
