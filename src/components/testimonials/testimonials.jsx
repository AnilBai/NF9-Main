import { useState, useEffect, useRef, useCallback } from "react";
import "./testimonials.css";

const TESTIMONIALS = [
  {
    quote:
      "NF9 transformed our vision into a stunning website that loads fast and converts visitors into customers. The team was responsive and delivered beyond expectations.",
    name: "Priya Sharma",
    role: "Founder, BrightStart",
  },
  {
    quote:
      "Working with NF9 was seamless. Their design sense is exceptional, and their ability to translate complex requirements into a beautiful experience is unmatched.",
    name: "Rahul Mehta",
    role: "Product Lead, QuantumX",
  },
  {
    quote:
      "From kickoff to launch, the NF9 team kept communication clear and executed quickly. Our website now feels modern, polished, and incredibly fast.",
    name: "Neha Gupta",
    role: "Marketing Head, Stellar Studio",
  },
  {
    quote:
      "The attention to detail in both design and code was impressive. Every interaction felt considered. NF9 didn't just build a product — they built an experience.",
    name: "Arjun Nair",
    role: "CEO, Launchpad Studio",
  },
  {
    quote:
      "We had a tight deadline and a complex brief. NF9 delivered on both counts without cutting corners. The results speak for themselves — traffic is up 3×.",
    name: "Sana Iqbal",
    role: "Head of Growth, Vortex Labs",
  },
];

const INTERVAL = 3000; // ms per slide

export default function Testimonials() {
  const total                     = TESTIMONIALS.length;
  const [current, setCurrent]     = useState(0);
  const [exiting, setExiting]     = useState(null);
  const [progress, setProgress]   = useState(0);
  const timerRef                  = useRef(null);
  const progressRef               = useRef(null);
  const startTimeRef              = useRef(null);
  const pausedRef                 = useRef(false);

  // ── advance to next slide ──
  const goTo = useCallback((idx) => {
    const next = (idx + total) % total;
    setExiting(current);
    setCurrent(next);
    setProgress(0);
    startTimeRef.current = performance.now();

    setTimeout(() => setExiting(null), 650);
  }, [current, total]);

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  // ── auto timer ──
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(progressRef.current);
    startTimeRef.current = performance.now();
    setProgress(0);

    progressRef.current = setInterval(() => {
      if (pausedRef.current) return;
      const elapsed = performance.now() - startTimeRef.current;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      if (!pausedRef.current) next();
    }, INTERVAL);
  }, [next]);

  useEffect(() => {
    startTimer();
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [startTimer]);

  // pause on hover
  const onEnter = () => { pausedRef.current = true; };
  const onLeave = () => {
    pausedRef.current = false;
    startTimeRef.current = performance.now() - (progress / 100) * INTERVAL;
  };

  const pad = (n) => String(n + 1).padStart(2, "0");

  return (
    <section
      className="nf9-t"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* ── Header ── */}
      <div className="nf9-t__header">
        <div>
          <div className="nf9-t__kicker">Client Reviews</div>
          <h2 className="nf9-t__title">
            What Clients
            <span>Say.</span>
          </h2>
        </div>
        <span className="nf9-t__header-counter">
          <em>{pad(current)}</em>&nbsp;/&nbsp;{String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ── Stage ── */}
      <div className="nf9-t__stage">
        {/* Decorative quote mark column */}
        <div className="nf9-t__aside" aria-hidden="true">
          <span className="nf9-t__big-mark">"</span>
        </div>

        {/* Slides */}
        <div className="nf9-t__slides">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className={[
                "nf9-t__slide",
                i === current ? "active" : "",
                i === exiting ? "exit"   : "",
              ].filter(Boolean).join(" ")}
              aria-hidden={i !== current}
            >
              <p className="nf9-t__quote">{item.quote}</p>

              <div className="nf9-t__author">
                <div className="nf9-t__author-line" aria-hidden="true" />
                <div className="nf9-t__author-info">
                  <span className="nf9-t__name">{item.name}</span>
                  <span className="nf9-t__role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="nf9-t__footer">

        {/* Dot buttons */}
        <div className="nf9-t__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`nf9-t__dot-btn${i === current ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            >
              <span className="nf9-t__dot" />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="nf9-t__progress" aria-hidden="true">
          <div
            className="nf9-t__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Prev / Next */}
        <div className="nf9-t__nav">
          <button
            className="nf9-t__nav-btn"
            onClick={prev}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            className="nf9-t__nav-btn"
            onClick={next}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}