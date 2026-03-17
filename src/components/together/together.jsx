import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./together.css";

const CONFIG = {
  OUT_X:       420,
  LEFT_OUT_Y:  -70,
  RIGHT_OUT_Y:  40,
  LEFT_ROT:    -18,
  RIGHT_ROT:    18,
  CENTER_SCALE: 1.08,
};

export default function Together() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const centerRef  = useRef(null);
  const titleRef   = useRef(null);

  const raf     = useRef(null);
  const current = useRef(0); // smoothed progress 0→1

  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    /* ─────────────────────────────────────────
       Compute t purely from section's scroll position.
       t = 0  → section just entered viewport (images centered)
       t = 1  → section fully scrolled through (images spread)
       Scrolling back up reverses t naturally.
    ───────────────────────────────────────── */
    const getTarget = () => {
      const section = sectionRef.current;
      if (!section) return 0;

      const rect = section.getBoundingClientRect();
      const vh   = window.innerHeight;

      // We want spread to happen while the section occupies the viewport.
      // progress: 0 when top of section hits bottom of viewport,
      //           1 when bottom of section hits top of viewport.
      const total    = vh + rect.height;
      const traveled = vh - rect.top;
      const raw      = Math.max(0, Math.min(1, traveled / total));

      // Start spreading the moment the section enters the viewport (raw=0),
      // reach full spread by the time 55% of the scroll is done.
      const remapped = Math.max(0, Math.min(1, raw / 0.55));

      // easeOutCubic — fast start, gentle finish
      return 1 - Math.pow(1 - remapped, 3);
    };

    const applyFrame = () => {
      const t  = Math.max(0, Math.min(1, current.current));
      const vw = window.innerWidth;

      let outX        = CONFIG.OUT_X;
      let leftY       = CONFIG.LEFT_OUT_Y;
      let rightY      = CONFIG.RIGHT_OUT_Y;
      let centerScale = CONFIG.CENTER_SCALE;
      let baseY       = -26;

      if (vw <= 768) { outX = 260; leftY = -40; rightY = 28; centerScale = 1.04; baseY = -22; }
      if (vw <= 468) { outX = 140; leftY = -30; rightY = -10; centerScale = 1.02; baseY = -10; }

      const leftX  = lerp(0, -outX, t);
      const rightX = lerp(0,  outX, t);

      if (leftRef.current) {
        leftRef.current.style.transform = `
          translate(-50%, ${baseY}%)
          translate(${leftX}px, ${lerp(0, leftY, t)}px)
          rotate(${lerp(0, CONFIG.LEFT_ROT, t)}deg)
        `;
        leftRef.current.style.opacity = t;
      }

      if (rightRef.current) {
        rightRef.current.style.transform = `
          translate(-50%, ${baseY}%)
          translate(${rightX}px, ${lerp(0, rightY, t)}px)
          rotate(${lerp(0, CONFIG.RIGHT_ROT, t)}deg)
        `;
        rightRef.current.style.opacity = t;
      }

      if (centerRef.current) {
        centerRef.current.style.transform = `
          translate(-50%, -50%)
          scale(${lerp(1, centerScale, t)})
        `;
      }
    };

    const tick = () => {
      const target = getTarget();
      const diff   = target - current.current;

      current.current += diff * 0.14; // faster tracking

      applyFrame();

      // Keep ticking only while there's visible movement
      if (Math.abs(diff) > 0.0005) {
        raf.current = requestAnimationFrame(tick);
      } else {
        current.current = target; // snap to final value
        applyFrame();
        raf.current = null;
      }
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Run once on mount to set initial state
    tick();

    /* ── text slide-up ── */
    const titleIO = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current.classList.add("is-visible");
          titleIO.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -120px 0px" }
    );
    if (titleRef.current) titleIO.observe(titleRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
      titleIO.disconnect();
    };
  }, []);

  return (
    <section id="together" className="together-section" ref={sectionRef}>
      <div className="together-wrapper">
        <img
          ref={leftRef}
          className="side-img"
          src="https://res.cloudinary.com/dzwm5v9gy/image/upload/v1765214808/lpcjuyknXEzXalpC07Z4IhsSwXU_uu3xzl.avif"
          alt=""
        />
        <img
          ref={rightRef}
          className="side-img"
          src="https://res.cloudinary.com/dzwm5v9gy/image/upload/v1765214808/3GZ80fDYAmP4JFvmOKKzh2e7fVo_gcgous.avif"
          alt=""
        />
        <img
          ref={centerRef}
          className="center-img"
          src="https://res.cloudinary.com/dzwm5v9gy/image/upload/v1765214808/7sAfDH9xTZEcsX8HVwaznXFOPHw_tzmaxh.avif"
          alt=""
        />
      </div>

      <div className="together-title" ref={titleRef}>
        <h1>LET&apos;S WORK</h1>
        <h1>TOGETHER<span className="dot">.</span></h1>

        <Link to="/contact-us" className="framer-cta">
          <span className="cta-label">GET STARTED TODAY</span>
          <span className="cta-line"></span>
          <span className="cta-arrow">
            <svg viewBox="0 0 24 24">
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}