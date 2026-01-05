import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imagesRef = useRef([]);




  useEffect(() => {
    const ctx = gsap.context(() => {
  
      /* ================= INITIAL STATE ================= */
      gsap.set(labelRef.current, {
        opacity: 0,
        filter: "blur(4px)"
      });
  
      gsap.set(
        [
          ...titleRef.current.querySelectorAll("span"),
          ...descRef.current.querySelectorAll("span")
        ],
        {
          opacity: 0,
          filter: "blur(8px)"
        }
      );
  
      /* ================= FAST FRAMER REVEAL ================= */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
  
      // Label (quick hint)
      tl.to(labelRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.25,
        ease: "power1.out"
      });
  
      // Title + Description TOGETHER
      tl.to(
        [
          ...titleRef.current.querySelectorAll("span"),
          ...descRef.current.querySelectorAll("span")
        ],
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: {
            each: 0.008,
            from: "start"
          },
          ease: "power1.out"
        },
        "-=0.1"
      );
  
      /* ================= IMAGE PARALLAX (UNCHANGED) ================= */
      imagesRef.current.forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: i % 2 === 0 ? 60 : -60 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1
            }
          }
        );
      });
  
    }, sectionRef);
  
    return () => ctx.revert();
  }, []);
  
  
  

  const splitWords = (text) =>
    text.split(" ").map((word, i) => (
      <span key={i}>&nbsp;{word}</span>
    ));

  return (
    <section ref={sectionRef} id="about" className="about-section">
      {/* FLOATING IMAGES */}
      <div className="about-images">
        {[
          "https://framerusercontent.com/images/c2XLEwqGOghXJ5c7lBcb090p6A.png",
          "https://framerusercontent.com/images/e0LAGcGE4nkhyHBpdtiWjTlfc8.png",
          "https://framerusercontent.com/images/k9PQmRbDHccgBBeupUCYnhcGw0.png",
          "https://framerusercontent.com/images/YM4vbK7504gqynWVsNUdp6nG84.png",
          "https://framerusercontent.com/images/8RvSjvFQKjEyXTQffVuKZrfnk.png",
          "https://framerusercontent.com/images/Czwk5ntg08zcZtYUvlcOe79oshk.png",
        ].map((src, i) => (
          <div
            key={i}
            className={`about-image img-${i + 1}`}
            ref={(el) => (imagesRef.current[i] = el)}
          >
            <img src={src} alt="" />
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="about-content">
        <div ref={labelRef} className="about-label">
          Our NF9 <span>↴</span>
        </div>

        <h2 ref={titleRef} className="about-title">
          {splitWords("Listening First. Designing Smart. Building What Works.")}
        </h2>

        <p ref={descRef} className="about-description">
          {splitWords(
            "We design and develop websites, apps, and digital experiences that help clients grow, innovate, and transform. We listen, learn, and understand before we build. Together, we define goals and use our expertise to find the sweet spot of realistic and impactful. We’re NF9."
          )}
        </p>
      </div>
    </section>
  );
};

export default About;