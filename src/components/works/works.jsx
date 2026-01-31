import { useRef, useEffect } from "react";
import "./works.css";

const PROJECTS = [
  {
    title: "Tabasque",
    subtitle: "Classy cocktails for modern age",
    image: "https://framerusercontent.com/images/UPqJOHQLdYtNuK2jee5437Lno.jpg",
    color: "#ffcc96",
  },
  {
    title: "Sensaya",
    subtitle: "Memories in the making",
    image: "https://framerusercontent.com/images/uK2BpwnizijFTL9zd5gnyiD2i0U.png",
    color: "#aab8ff",
  },
  {
    title: "Le Blink",
    subtitle: "Skincare for the future",
    image: "https://framerusercontent.com/images/rzoORZnzNHiRX63g8X4x3iR2PnE.png",
    color: "#fce7d6",
  },
];

export default function Works() {
  return (
    <section className="nf9-projects">
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

function ProjectCard({ title, subtitle, image, color }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const raf = useRef(null);

  const lastScrollY = useRef(window.scrollY);
  const maxZoom = useRef(1);

  useEffect(() => {
    const update = () => {
      const wrap = wrapRef.current;
      const img = imgRef.current;
      if (!wrap || !img) return;

      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.bottom < 0 || rect.top > vh) {
        raf.current = null;
        return;
      }

      /* ===== progress ===== */
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamp = (v) => Math.max(0, Math.min(1, v));
      const raw = clamp(progress);

      /* Framer-style easeOutCubic */
      const p = 1 - Math.pow(1 - raw, 3);

      /* ===== scroll speed ===== */
      const currentY = window.scrollY;
      const velocity = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;
      const speed = Math.min(velocity / 40, 1);

      /* ===== responsive strength ===== */
      const w = window.innerWidth;

      let zoomStrength = 0.18;
      if (w < 1024) zoomStrength = 0.24; // tablet
      if (w < 768) zoomStrength = 0.3;  // mobile

      const parallaxStrength = w < 768 ? 6 : 9;

      /* ===== apply transforms ===== */
      const targetZoom = 1 + p * zoomStrength * (1 + speed * 0.6);
      maxZoom.current = Math.max(maxZoom.current, targetZoom);

      img.style.setProperty("--scrollY", `${-p * parallaxStrength}px`);
      img.style.setProperty("--zoom", maxZoom.current.toFixed(3));

      raf.current = null;
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  /* ===== hover depth (desktop only) ===== */
  const onMove = (e) => {
    if (window.innerWidth < 769) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    imgRef.current.style.setProperty("--hoverX", `${x}px`);
    imgRef.current.style.setProperty("--hoverY", `${y}px`);
  };

  const onLeave = () => {
    imgRef.current.style.setProperty("--hoverX", "0px");
    imgRef.current.style.setProperty("--hoverY", "0px");
  };

  return (
    <article className="nf9-card">
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
    </article>
  );
}
