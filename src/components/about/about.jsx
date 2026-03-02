import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_CONFIG = [
  { src: "https://framerusercontent.com/images/c2XLEwqGOghXJ5c7lBcb090p6A.png", speed: -300 },
  { src: "https://framerusercontent.com/images/e0LAGcGE4nkhyHBpdtiWjTlfc8.png", speed: 260  },
  { src: "https://framerusercontent.com/images/k9PQmRbDHccgBBeupUCYnhcGw0.png", speed: -240  },
  { src: "https://framerusercontent.com/images/YM4vbK7504gqynWVsNUdp6nG84.png", speed: 290  },
  { src: "https://framerusercontent.com/images/8RvSjvFQKjEyXTQffVuKZrfnk.png",  speed: -270  },
  { src: "https://framerusercontent.com/images/Czwk5ntg08zcZtYUvlcOe79oshk.png", speed: 250 },
];

// For TITLE — wraps the ENTIRE line as ONE clip unit so it stays on one line
const SplitLine = ({ text }) => (
  <span className="line-wrap">
    <span className="word">{text}</span>
  </span>
);

const About = () => {
  const sectionRef  = useRef(null);
  const labelRef    = useRef(null);
  const contentRef  = useRef(null);
  const imagesRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ─── SIMPLE FAST FADE UP + BLUR ─── */
      const label = labelRef.current;
      const titleLines = contentRef.current.querySelectorAll(".about-title .line-wrap");
      const desc = contentRef.current.querySelector(".about-description");
      const sign = contentRef.current.querySelector(".nf9-sign");

      const els = [label, ...titleLines, desc, sign];

      gsap.set(els, { opacity: 0, y: 20, filter: "blur(8px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      tl.to(els, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
      });

      /* ─── IMAGE PARALLAX ─── */
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        const { speed } = IMAGE_CONFIG[i];
        gsap.set(img, { y: speed * -0.5 });
        gsap.to(img, {
          y: speed * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">

      {/* FLOATING IMAGES */}
      <div className="about-images">
        {IMAGE_CONFIG.map(({ src }, i) => (
          <div
            key={i}
            className={`about-image img-${i + 1}`}
            ref={(el) => (imagesRef.current[i] = el)}
          >
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="about-content" ref={contentRef}>

        <div ref={labelRef} className="about-label">
          Our NF9 ↴
        </div>

        <h2 className="about-title steps">
          <SplitLine text="We Listen." />
          <SplitLine text="We Design." />
          <SplitLine text="We Deliver Results." />
        </h2>

        <p className="about-description">
          We design and develop websites, apps, and digital experiences that help
          clients grow, innovate, and transform. We listen, learn, and understand
          before we build. Together, we define goals and use our expertise to find
          the sweet spot of realistic and impactful.
          <span className="nf9-sign">We're NF9!</span>
        </p>

      </div>

    </section>
  );
};

export default About;