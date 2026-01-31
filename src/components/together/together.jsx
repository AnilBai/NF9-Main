import React, { useEffect, useRef } from "react";
import "./together.css";

const CONFIG = {
  OUT_X: 420,
  LEFT_OUT_Y: -70,
  RIGHT_OUT_Y: 40,
  LEFT_ROT: -18,
  RIGHT_ROT: 18,
  CENTER_SCALE: 1.08,
};

export default function Together() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerRef = useRef(null);
  const titleRef = useRef(null);

  const anim = useRef({
    current: 0,
    target: 0,
    raf: null,
    visible: false,
  });

  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    const state = anim.current;

    /* ================= IMAGE SCROLL ANIMATION ================= */

    const sectionIO = new IntersectionObserver(
      ([entry]) => (state.visible = entry.isIntersecting),
      { threshold: 0.35 }
    );

    sectionRef.current && sectionIO.observe(sectionRef.current);

    const startRAF = () => {
      if (!state.raf) state.raf = requestAnimationFrame(tick);
    };

    const stopRAF = () => {
      cancelAnimationFrame(state.raf);
      state.raf = null;
    };

    const onWheel = (e) => {
      if (!state.visible) return;
      state.target = e.deltaY > 0 ? 1 : 0;
      startRAF();
    };

    let lastY = null;

    const onTouchStart = (e) => {
      lastY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!state.visible || lastY === null) return;
      const diff = lastY - e.touches[0].clientY;
      if (Math.abs(diff) > 14) {
        state.target = diff > 0 ? 1 : 0;
        startRAF();
        lastY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      lastY = null;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const tick = () => {
      state.current = lerp(state.current, state.target, 0.12);
      const t = Math.max(0, Math.min(1, state.current));
      const vw = window.innerWidth;

      let outX = CONFIG.OUT_X;
      let leftY = CONFIG.LEFT_OUT_Y;
      let rightY = CONFIG.RIGHT_OUT_Y;
      let centerScale = CONFIG.CENTER_SCALE;
      let baseY = -26;

      if (vw <= 768) {
        outX = 260;
        leftY = -40;
        rightY = 28;
        centerScale = 1.04;
        baseY = -22;
      }

      if (vw <= 468) {
        outX = 140;
        leftY = -30;
        rightY = -10;
        centerScale = 1.02;
        baseY = -10;
      }

      const leftX = lerp(0, -outX, t);
      const rightX = lerp(0, outX, t);

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

      if (Math.abs(state.current - state.target) > 0.001) {
        state.raf = requestAnimationFrame(tick);
      } else {
        stopRAF();
      }
    };

    /* ================= TEXT SLIDE-UP ================= */

    const titleIO = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current.classList.add("is-visible");
          titleIO.disconnect(); // run once
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -120px 0px", // delays trigger = smoother perception
      }
    );
    
    titleRef.current && titleIO.observe(titleRef.current);
    

    /* ================= CLEANUP ================= */

    return () => {
      sectionIO.disconnect();
      titleIO.disconnect();
      stopRAF();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className="together-section" ref={sectionRef}>
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
        <h1>
          TOGETHER<span className="dot">.</span>
        </h1>

        <a href="/contact-us" className="framer-cta">
          <span className="cta-label">GET STARTED TODAY</span>
          <span className="cta-line"></span>
          <span className="cta-arrow">
            <svg viewBox="0 0 24 24">
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
