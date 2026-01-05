import { useRef } from "react";
import "./works.css";

const PROJECTS = [
  {
    title: "Tabasque",
    subtitle: "Classy cocktails for modern age",
    image: "https://framerusercontent.com/images/atcXOmc4RccZDvf4CJnL76IfNwg.jpg",
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
  const imgRef = useRef(null);

  const onMove = (e) => {
    if (window.innerWidth < 769) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;

    imgRef.current.style.transform = `scale(1.25) translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1)";
    }
  };

  return (
    <article className="nf9-card">
      <div
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
