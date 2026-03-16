import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ourprocess.css";

gsap.registerPlugin(ScrollTrigger);

const PROCESS = [
  {
    step: "01",
    label: "Discovery",
    title: ["Understand", "The Problem"],
    desc: "We deep dive into your business, users, and goals to define a clear direction before a single pixel is touched.",
    tag: "Research & Insights"
  },
  {
    step: "02",
    label: "Strategy",
    title: ["Plan", "The Experience"],
    desc: "Wireframes, flows, and architecture designed to convert users and communicate with clarity at every touchpoint.",
    tag: "UX Architecture"
  },
  {
    step: "03",
    label: "Design",
    title: ["Visual", "Identity"],
    desc: "Pixel-perfect UI with motion in mind. Clean, bold, and conversion-focused design that stands apart.",
    tag: "UI & Motion"
  },
  {
    step: "04",
    label: "Development",
    title: ["Build Fast", "& Clean"],
    desc: "Modern frontend with smooth animations, optimised performance, and code built to scale.",
    tag: "Engineering"
  },
  {
    step: "05",
    label: "Launch",
    title: ["Test &", "Deploy"],
    desc: "Thorough QA, performance audits, and a seamless deployment — ready to grow from day one.",
    tag: "Go-Live"
  }
];

// Breakpoint where we switch to vertical layout
const HORIZONTAL_MIN_WIDTH = 900;

export default function OurProcess() {
  const sectionRef   = useRef(null);
  const trackRef     = useRef(null);
  const progressRef  = useRef(null);
  const ctxRef       = useRef(null);

  const [isHorizontal, setIsHorizontal] = useState(
    typeof window !== "undefined" ? window.innerWidth >= HORIZONTAL_MIN_WIDTH : true
  );

  /* ── detect layout mode ── */
  useEffect(() => {
    const check = () => {
      setIsHorizontal(window.innerWidth >= HORIZONTAL_MIN_WIDTH);
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── GSAP horizontal scroll (desktop only) ── */
  useEffect(() => {
    const section  = sectionRef.current;
    const track    = trackRef.current;
    const bar      = progressRef.current;

    if (!isHorizontal) {
      // kill any lingering GSAP ctx
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      return;
    }

    const ctx = gsap.context(() => {
      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const tl = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
          }
        }
      });
    }, section);

    ctxRef.current = ctx;
    return () => ctx.revert();
  }, [isHorizontal]);

  return (
    <>
      {/* Progress bar — only meaningful on horizontal */}
      {isHorizontal && (
        <div className="process-progress-bar" ref={progressRef} />
      )}

      <section
        className={`ourprocess ${isHorizontal ? "is-horizontal" : "is-vertical"}`}
        ref={sectionRef}
      >
        <div className="ourprocess-track" ref={trackRef}>

          {/* ── INTRO ── */}
          <div className="process-intro">

            <div className="process-intro-inner">
              <span className="process-eyebrow">How we work</span>

              <h1>
                Our<br />
                <em>Process</em>
              </h1>

              <p className="process-intro-sub">
                A structured approach that transforms ideas into
                high-impact digital products — on time, on brand.
              </p>

              {isHorizontal && (
                <div className="process-scroll-hint" aria-hidden="true">
                  <span className="scroll-arrow" />
                  Scroll to explore
                </div>
              )}
            </div>
          </div>

          {/* ── CARDS ── */}
          {PROCESS.map((item, index) => (
            <div
              className="process-card"
              key={index}
              data-step={item.step}
            >
              <div className="process-card-inner">
                <div className="process-meta">
                  <span className="process-step">{item.step}</span>
                  <span className="process-dot" aria-hidden="true" />
                  <span className="process-label">{item.label}</span>
                </div>

                <h2>
                  {item.title.map((line, i) => (
                    <span key={i} style={{ display: "block" }}>{line}</span>
                  ))}
                </h2>

                <p className="process-desc">{item.desc}</p>

                <span className="process-tag">{item.tag}</span>
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
}