import { useRef, useEffect } from "react";
import "./works.css";

const PROJECTS = [
  {
    title: "Devarsu Products",
    subtitle: "Woo-Commerce Store",
    image: "http://devarsuproducts.com/wp-content/uploads/2026/03/NF9xDevarsuproducts.png",
    color: "#ffcc96",
    link: "https://devarsuproducts.com/",
  },
  {
    title: "Greentaj",
    subtitle: "TRADING & CONTRACTING W.L.L",
    image: "https://nf9.in/wp-content/uploads/2026/03/NF9xGreentaj.png",
    color: "#aab8ff",
    link: "https://greentaj.com/",
  },
  {
    title: "Order Managment Portal",
    subtitle: "Order Management Portal for e-commerce stores",
    image: "https://nf9.in/wp-content/uploads/2026/03/NF9xOrderPortal-scaled.png",
    color: "#fce7d6",
  },
];

export default function Works() {
  return (
    <section id="works" className="nf9-projects">
      <header className="nf9-projects-header">
        <h1>
          Our Projects <sup>{PROJECTS.length}</sup>
        </h1>
      </header>

      <div className="nf9-layout">
        <ProjectCard {...PROJECTS[0]} />
        <div className="nf9-row-two">
          <ProjectCard {...PROJECTS[1]} />
          <ProjectCard {...PROJECTS[2]} />
        </div>
      </div>
    </section>
  );
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(v, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function ProjectCard({ title, subtitle, image, color, link }) {
  const wrapRef   = useRef(null);
  const imgRef    = useRef(null);
  const rafRef    = useRef(null);

  // smoothed values that lerp toward targets each frame
  const current = useRef({ zoom: 1, scrollY: 0, hoverX: 0, hoverY: 0 });
  const target  = useRef({ zoom: 1, scrollY: 0, hoverX: 0, hoverY: 0 });

  useEffect(() => {
    const img  = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap) return;

    // lerpFactor: higher = snappier, lower = more floaty
    // Use a slightly lower value on mobile for smoothness
    const isMobile = window.innerWidth < 769;
    const lerpFactor = isMobile ? 0.06 : 0.09;

    const computeTarget = () => {
      const rect = wrap.getBoundingClientRect();
      const vh   = window.innerHeight;
      const w    = window.innerWidth;

      // Card not near viewport — keep zoom at 1
      if (rect.bottom < -200 || rect.top > vh + 200) {
        target.current.zoom    = 1;
        target.current.scrollY = 0;
        return;
      }

      const progress = (vh - rect.top) / (vh + rect.height);
      const raw      = clamp(progress);
      const p        = easeOutCubic(raw);

      const zoomStrength = w < 768 ? 0.14 : w < 1024 ? 0.16 : 0.18;
      const parallaxStr  = w < 768 ? 5 : 8;

      target.current.zoom    = 1 + p * zoomStrength;
      target.current.scrollY = -p * parallaxStr;
    };

    const applyTransform = () => {
      const c = current.current;
      img.style.transform = `translate3d(${c.hoverX.toFixed(2)}px, ${(c.scrollY + c.hoverY).toFixed(2)}px, 0) scale(${c.zoom.toFixed(4)})`;
    };

    let running = true;

    const loop = () => {
      if (!running) return;

      computeTarget();

      const c = current.current;
      const t = target.current;
      const f = lerpFactor;

      const zDiff  = Math.abs(t.zoom    - c.zoom);
      const yDiff  = Math.abs(t.scrollY - c.scrollY);
      const hxDiff = Math.abs(t.hoverX  - c.hoverX);
      const hyDiff = Math.abs(t.hoverY  - c.hoverY);

      if (zDiff > 0.0001 || yDiff > 0.01 || hxDiff > 0.01 || hyDiff > 0.01) {
        c.zoom    = lerp(c.zoom,    t.zoom,    f);
        c.scrollY = lerp(c.scrollY, t.scrollY, f);
        c.hoverX  = lerp(c.hoverX,  t.hoverX,  0.12);
        c.hoverY  = lerp(c.hoverY,  t.hoverY,  0.12);
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Hover depth — only updates the target, the loop smooths it
  const onMove = (e) => {
    if (window.innerWidth < 769) return;
    const rect = wrapRef.current.getBoundingClientRect();
    target.current.hoverX = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    target.current.hoverY = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
  };

  const onLeave = () => {
    target.current.hoverX = 0;
    target.current.hoverY = 0;
  };

  const Wrapper = link ? "a" : "article";
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper className="nf9-card" {...wrapperProps}>
      <div
        ref={wrapRef}
        className="nf9-image-wrap"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ "--arrow": color }}
      >
        <img ref={imgRef} src={image} alt={title} />
        <div className="nf9-arrow">↗</div>
      </div>

      <div className="nf9-info">
        <p className="title">{title}</p>
        <p className="subtitle">{subtitle}</p>
      </div>
    </Wrapper>
  );
}