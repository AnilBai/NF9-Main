import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Preloader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  const preloaderRef = useRef(null);
  const topCurtainRef = useRef(null);
  const bottomCurtainRef = useRef(null);
  const lettersRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
        onComplete?.();
      },
    });

    gsap.set(lettersRef.current, { yPercent: 120, opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });

    // Curtains
    tl.to(topCurtainRef.current, { yPercent: -100, duration: 1.8 }, 0);
    tl.to(bottomCurtainRef.current, { yPercent: 100, duration: 1.8 }, 0);

    // Letters in
    tl.to(
      lettersRef.current,
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
      },
      0.8
    );

    // Line in
    tl.to(
      lineRef.current,
      {
        scaleX: 1.2,
        opacity: 0.15,
        duration: 0.6,
        ease: "power2.out",
      },
      0.9
    );

    // Hold
    tl.to({}, { duration: 0.15 });

    // Letters out
    tl.to(lettersRef.current, {
      yPercent: -160,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.in",
    });

    // Line out
    tl.to(
      lineRef.current,
      {
        scaleX: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      },
      "<"
    );

    // Fade preloader
    tl.to(preloaderRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");

    return () => tl.kill();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={preloaderRef}
      className="preloader fixed inset-0 z-[9999]"
    >
      {/* Curtains */}
      <div ref={topCurtainRef} className="curtain top" />
      <div ref={bottomCurtainRef} className="curtain bottom" />

      {/* Center */}
      <div className="preloader-center">
        <div className="preloader-box">
          <div className="preloader-mask">
            <div className="preloader-letters">
              {["N", "F", "9"].map((l, i) => (
                <span
                  key={i}
                  ref={(el) => (lettersRef.current[i] = el)}
                  className="preloader-text"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div ref={lineRef} className="preloader-line" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
