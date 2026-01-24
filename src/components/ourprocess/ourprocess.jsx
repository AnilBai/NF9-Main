import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ourprocess.css";

gsap.registerPlugin(ScrollTrigger);

const PROCESS = [
  {
    step: "01",
    label: "Discovery",
    title: "Understand\nThe Problem",
    desc: "We deep dive into your business, users, and goals to define a clear direction before design or code."
  },
  {
    step: "02",
    label: "Strategy",
    title: "Plan\nThe Experience",
    desc: "Wireframes, flows, and structure designed to convert users and communicate clearly."
  },
  {
    step: "03",
    label: "Design",
    title: "Visual\nIdentity",
    desc: "Pixel-perfect UI with motion in mind. Clean, bold, and conversion-focused."
  },
  {
    step: "04",
    label: "Development",
    title: "Build\nFast & Clean",
    desc: "Modern frontend with smooth animations, optimized performance, and scalability."
  },
  {
    step: "05",
    label: "Launch",
    title: "Test &\nDeploy",
    desc: "QA, performance checks, and a smooth launch — ready to scale."
  }
];

export default function OurProcess() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
  
    let ctx = gsap.context(() => {
      const getScrollAmount = () =>
        track.scrollWidth - window.innerWidth;
  
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none", // ⬅️ scrub handles smoothness
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1.2,                 // ⬅️ smoother glide
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }, section);
  
    return () => ctx.revert();
  }, []);  
  
  return (
    <section className="ourprocess" ref={sectionRef}>
      <div className="ourprocess-track" ref={trackRef}>

        {/* INTRO */}
        <div className="process-intro">
          <h1>
            Our<br />Process
          </h1>
          <p>
            A structured approach that transforms ideas into high-impact digital products.
          </p>
        </div>

        {/* CARDS */}
        {PROCESS.map((item, index) => (
          <div className="process-card" key={index}>
            <span className="process-step">{item.step}</span>
            <span className="process-label">{item.label}</span>

            <h2>
              {item.title.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>

            <p className="process-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
