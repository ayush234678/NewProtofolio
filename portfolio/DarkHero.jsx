import { useState, useEffect, useRef } from "react";

/**
 * DARK HERO — DEVELOPER PORTFOLIO LANDING
 * A near-black "desk at night" hero: amber glow instead of violet,
 * geometric flat-illustration avatar instead of 3D memoji-style,
 * terminal-cursor underline instead of a hand-drawn circle.
 */

const BG = "#0E0F12";
const PANEL = "#15171C";
const TEXT = "#F4F2ED";
const MUTED = "#8A8F98";
const AMBER = "#E8954A";
const LINE = "#2A2D33";

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

/* Flat geometric avatar — head + laptop, original silhouette */
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

      {/* shoulders */}
      <path d="M40 240 Q40 175 120 175 Q200 175 200 240 Z" fill="#2D3038" />

      {/* neck */}
      <rect x="105" y="140" width="30" height="35" fill="url(#skinGrad)" />

      {/* face */}
      <ellipse cx="120" cy="118" rx="46" ry="50" fill="url(#skinGrad)" />

      {/* ears */}
      <ellipse cx="74" cy="120" rx="7" ry="10" fill="#D9A077" />
      <ellipse cx="166" cy="120" rx="7" ry="10" fill="#D9A077" />

      {/* hair */}
      <path
        d="M70 110 Q62 55 120 50 Q178 55 170 110 Q170 85 150 80 Q140 65 120 68 Q100 65 90 80 Q70 85 70 110 Z"
        fill="url(#hairGrad)"
      />
      <path d="M68 108 Q75 95 80 108 Q72 112 68 108Z" fill="url(#hairGrad)" />
      <path d="M172 108 Q165 95 160 108 Q168 112 172 108Z" fill="url(#hairGrad)" />

      {/* eyes */}
      <ellipse cx="102" cy="120" rx="5.5" ry="7" fill="#1C1A17" />
      <ellipse cx="138" cy="120" rx="5.5" ry="7" fill="#1C1A17" />
      <circle cx="100" cy="117" r="1.6" fill="#F4F2ED" opacity="0.8" />
      <circle cx="136" cy="117" r="1.6" fill="#F4F2ED" opacity="0.8" />

      {/* brows */}
      <path d="M93 105 Q102 100 111 104" stroke="#171310" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M129 104 Q138 100 147 105" stroke="#171310" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* nose + mouth */}
      <path d="M120 122 Q116 134 120 138" stroke="#C2906A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M106 148 Q120 156 134 148" stroke="#5A3826" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* laptop base */}
      <rect x="55" y="178" width="130" height="10" rx="3" fill="url(#laptopGrad)" />
      {/* laptop screen */}
      <rect x="68" y="138" width="104" height="42" rx="4" fill="url(#laptopGrad)" stroke="#46494F" strokeWidth="1" />
      <rect x="74" y="144" width="92" height="30" rx="2" fill="#0E0F12" />
      {/* screen glow lines (code) */}
      <rect x="80" y="150" width="34" height="3" rx="1.5" fill={AMBER} opacity="0.85" />
      <rect x="80" y="157" width="50" height="3" rx="1.5" fill="#5C6068" />
      <rect x="80" y="164" width="26" height="3" rx="1.5" fill="#5C6068" />

      {/* hands on edges of laptop */}
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

export default function DarkHero() {
  const [typed, typedDone] = useTypewriter("I'm a Software Engineer.", 42, 900);

  return (
    <div className="dh-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        .dh-page {
          background: ${BG};
          color: ${TEXT};
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
        }

        .dh-topstrip {
          height: 3px;
          background: linear-gradient(90deg, ${AMBER}, #F2B679, ${AMBER});
        }

        .dh-mast {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 56px;
          border-bottom: 1px solid ${LINE};
        }

        .dh-mark {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 600;
          color: ${TEXT};
          letter-spacing: 0.01em;
        }
        .dh-mark span { color: ${AMBER}; }

        .dh-nav {
          display: flex;
          gap: 36px;
          font-size: 14.5px;
          font-weight: 500;
        }
        .dh-nav a {
          color: ${TEXT};
          text-decoration: none;
          opacity: 0.85;
          position: relative;
          padding-bottom: 4px;
        }
        .dh-nav a:hover { opacity: 1; }
        .dh-nav a::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 0; height: 2px;
          background: ${AMBER};
          transition: width 0.25s ease;
        }
        .dh-nav a:hover::after { width: 100%; }
        .dh-nav a:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 4px; }

        .dh-container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 56px;
        }

        .dh-hero {
          display: flex;
          align-items: center;
          gap: 56px;
          padding: 90px 0 50px;
        }

        .dh-avatar-wrap {
          position: relative;
          flex-shrink: 0;
          width: 260px;
          height: 260px;
        }

        .dh-glow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(circle at 50% 45%, rgba(232,149,74,0.30), rgba(232,149,74,0.08) 55%, transparent 75%);
          border-radius: 28px;
          filter: blur(2px);
          animation: dh-pulse 5s ease-in-out infinite;
        }
        @keyframes dh-pulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }

        .avatar-svg {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
        }

        .dh-intro-tag {
          position: absolute;
          top: -14px;
          right: -150px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: ${MUTED};
          white-space: nowrap;
          z-index: 3;
        }
        .dh-intro-tag b { color: ${AMBER}; font-weight: 500; }
        .dh-intro-tag::before {
          content: '';
          position: absolute;
          left: -28px;
          top: 8px;
          width: 22px;
          height: 14px;
          border-left: 1.5px solid ${MUTED};
          border-bottom: 1.5px solid ${MUTED};
          border-radius: 0 0 0 6px;
        }

        .dh-hero-text { flex: 1; min-width: 0; }

        .dh-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.05em;
          color: ${MUTED};
          margin: 0 0 14px;
        }

        .dh-headline {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(34px, 4.6vw, 52px);
          line-height: 1.08;
          margin: 0 0 14px;
        }

        .cursor-word {
          color: ${AMBER};
          position: relative;
          font-style: italic;
        }
        .cursor-blink {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          background: ${AMBER};
          margin-left: 4px;
          vertical-align: -0.1em;
          animation: dh-blink 1s steps(1) infinite;
        }
        @keyframes dh-blink { 50% { opacity: 0; } }

        .dh-subline {
          font-size: 15px;
          color: ${MUTED};
          margin: 0 0 36px;
          max-width: 420px;
          line-height: 1.55;
        }

        .dh-typewriter-row {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 26px;
          font-weight: 500;
          color: ${TEXT};
          min-height: 1.4em;
        }
        .dh-typewriter-row .tw-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: ${AMBER};
          margin-left: 2px;
          vertical-align: -0.18em;
          animation: dh-blink 0.9s steps(1) infinite;
        }

        .dh-bio-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin: 14px 0 0;
          font-size: 15px;
          color: ${MUTED};
        }
        .dh-bio-row a {
          color: ${TEXT};
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid ${AMBER};
          padding-bottom: 1px;
        }
        .dh-bio-row a:hover { color: ${AMBER}; }

        .dh-divider {
          height: 1px;
          background: ${LINE};
          margin: 56px 0 48px;
        }

        .dh-about {
          padding-bottom: 100px;
          max-width: 640px;
        }
        .dh-about p {
          font-size: 17px;
          line-height: 1.75;
          color: #C9CCD2;
          margin: 0 0 18px;
        }
        .dh-about strong { color: ${TEXT}; font-weight: 600; }

        @media (max-width: 880px) {
          .dh-container { padding: 0 24px; }
          .dh-mast { padding: 18px 24px; }
          .dh-nav { gap: 20px; font-size: 13px; }
          .dh-hero { flex-direction: column; align-items: flex-start; gap: 36px; padding: 56px 0 30px; }
          .dh-avatar-wrap { width: 200px; height: 200px; }
          .dh-intro-tag { position: static; margin-top: 16px; margin-bottom: 60px; display: block; }
          .dh-intro-tag::before { display: none; }
          .dh-typewriter-row { font-size: 20px; }
        }
      `}</style>

      <div className="dh-topstrip" />

      <header className="dh-mast">
        <div className="dh-mark">
          dev<span>.</span>
        </div>
        <nav className="dh-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#lab">Lab</a>
        </nav>
      </header>

      <div className="dh-container">
        <section className="dh-hero" id="home">
          <Reveal as="div" className="dh-avatar-wrap">
            <div className="dh-glow" />
            <DeskAvatar />
            <div className="dh-intro-tag">
              Hello! I'm <b>Ibrahim Memon</b>
            </div>
          </Reveal>

          <Reveal as="div" className="dh-hero-text" delay={120}>
            <p className="dh-eyebrow">An engineer who</p>
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
            A self-taught backend engineer, working in the industry for{" "}
            <strong>4+ years</strong> now. I build the infrastructure underneath
            products — the queues, migrations, and on-call tooling that only
            get noticed when they fail.
          </p>
          <p>
            I care about systems that stay <strong>boring under pressure</strong>:
            predictable, observable, and easy to hand off to the next engineer at
            3am.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
