import { useState, useEffect, useRef, useCallback } from "react";
import "./testimonials.css";

const TESTIMONIALS = [
  {
    quote:
      "We wanted a simple website to show our farming products. NF9 did exactly that without making it complicated. Now my business is online.",
    name: "Muthyam",
    role: "Founder, Devarsu Products",
  },
  {
    quote:
      "We were looking for a more refined and minimal approach, and NF9 delivered precisely that without unnecessary complexity.",
    name: "Raja Shekar",
    role: "Founder, Greentaj Trading & Contracting W.L.L",
  },
  {
    quote:
      "The Order Management Portal developed by NF9 is now used by multiple companies to track and manage their eCommerce operations efficiently. It simplified workflows and improved overall business visibility.",
    name: "Operations Team",
    role: "Order Management Portal Users",
  },
];

const INTERVAL = 3000; // ms per slide

export default function Testimonials() {
  const total = TESTIMONIALS.length;
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(null);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedRef = useRef(false);

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

      <div className="nf9-t__stage">
        <div className="nf9-t__aside" aria-hidden="true">
          <span className="nf9-t__big-mark">"</span>
        </div>

        <div className="nf9-t__slides">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className={[
                "nf9-t__slide",
                i === current ? "active" : "",
                i === exiting ? "exit" : "",
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

      <div className="nf9-t__footer">

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

        <div className="nf9-t__progress" aria-hidden="true">
          <div
            className="nf9-t__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

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