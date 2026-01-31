import React, { useEffect, useRef } from "react";
import "./serviceslist.css";

const services = [
  {
    id: "01",
    title: "Neural Network",
    subtitle:
      "A self-learning intelligence core that observes, learns, and makes smart decisions in milliseconds to optimize your operations.",
    description:
      "Our neural engine forms the intelligent core of your infrastructure. Through continuous learning and pattern analysis, it evolves with your needs, making increasingly sophisticated decisions.",
    image: "https://framerusercontent.com/images/dH3YgDqCRIzqoBzeGKe0noWpAw.jpeg",
  },
  {
    id: "02",
    title: "Design Intelligence",
    subtitle:
      "An automated architecture engine that designs and adapts your infrastructure on the fly.",
    description:
      "It analyzes usage patterns, anticipates growth requirements, and automatically implements optimal configurations.",
    image: "https://framerusercontent.com/images/deYGLS22CQzYIyIpMjbZHzcrzMw.jpeg",
  },
  {
    id: "03",
    title: "Security AI",
    subtitle:
      "A proactive defense system that anticipates and evolves with threats.",
    description:
      "Our AI security system monitors global threat patterns and neutralizes risks before impact.",
    image: "https://framerusercontent.com/images/LDUuKjtAiZ9Dt3A4Ib9ugB0H7II.jpeg",
  },
  {
    id: "04",
    title: "Smart Scale",
    subtitle:
      "An intelligent scaling module that grows or streamlines resources automatically.",
    description:
      "Predicts traffic and adjusts infrastructure for optimal performance and cost efficiency.",
    image: "https://framerusercontent.com/images/pZdX5DSLgcDIuo8Kwf0r7qayGs.jpeg",
  },
];

const Services = () => {
  const rowsRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );

    rowsRef.current.forEach((el) => el && obs.observe(el));
  }, []);

  return (
    <section className="services-section">
      <div className="services-container">

        {/* HEADER */}
        <div className="services-header">
          <h1>Our Services</h1>

          <div className="label-row">
            <div className="label-row1">
              <span className="orange-line" />
              <div>
                <p className="label-main">Services</p>
                <p className="label-sub">Next Frontier 9</p>
              </div>
            </div>
            <h3>Flexible solutions for building modern digital infrastructure.</h3>
          <p className="small-text">
            Future-proof systems that scale seamlessly.
          </p>
          </div>
        </div>

        {/* INTRO */}
        <div className="services-intro">
          <div className="intro-text">
            <h2>
              Modular, flexible solutions for modern digital infrastructure
            </h2>
            <p>
              At Platform®, we specialize in developing future-proof systems that
              scale and adapt to evolving business needs.
            </p>
          </div>

          <div className="intro-img">
            <img src="https://framerusercontent.com/images/fG5jaXcnt8LMl8SpLuihd7Ulwo.jpeg" />
          </div>
        </div>

        {/* LIST */}
        <div className="services-list">
          {services.map((s, i) => (
            <div
              key={s.id}
              className="service-row"
              ref={(el) => (rowsRef.current[i] = el)}
            >
              <div className="row-img">
                <img src={s.image} />
              </div>

              <div className="row-content">
                <h4>{s.title}</h4>
                <p className="row-sub">{s.subtitle}</p>
                <p className="row-desc">{s.description}</p>
              </div>

              <div className="row-meta">
                <span className="arrow">↗</span>
                <span className="row-id">{s.id}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
