import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./services.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { title: "UI/UX Design", image: "https://framerusercontent.com/images/xvbmP2RETgW6oOPW5kTmPh6busg.jpg" },
  { title: "Website", image: "https://framerusercontent.com/images/BwCmxlMIwWfqxkz8nvxIQfKBgk.jpg" },
  { title: "eCommerce", image: "https://framerusercontent.com/images/4WNOPai8HNpbkzXGrHQZwYWmibA.jpg" },
  { title: "Applications", image: "https://framerusercontent.com/images/xYeTN1Bn52IZWANLkSiNFVPy0jY.jpg" },
  { title: "Infrastructure", image: "https://framerusercontent.com/images/1QkHnDWCstFb6jXN6WFLV6yDZB0.jpg" },
  { title: "Branding", image: "https://framerusercontent.com/images/36wvwfIbrnOBnFSzVzIZ4BEv9ms.jpeg" },
];

export default function Services() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".nf9-services-item");
      const images = gsap.utils.toArray(".nf9-services-image");
      const imageWrap = imageWrapRef.current;

      /* ---------------- INITIAL ---------------- */
      gsap.set(images, { opacity: 0, scale: 0.96 });
      gsap.set(imageWrap, {
        autoAlpha: 0,
        y: -120,
        rotateX: -3,
        rotateY: 2,
      });

      /* ---------------- ENTER / EXIT ---------------- */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () =>
          gsap.to(imageWrap, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          }),
        onLeaveBack: () =>
          gsap.to(imageWrap, {
            autoAlpha: 0,
            y: -120,
            duration: 0.6,
            ease: "power3.in",
          }),
      });

      /* ---------------- SCROLL IMAGE FOLLOW ---------------- */
      function activate(index) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const itemRect = items[index].getBoundingClientRect();

        const targetY =
          itemRect.top -
          sectionRect.top +
          itemRect.height / 2 -
          imageWrap.offsetHeight / 2;

        images.forEach((img, i) => {
          gsap.to(img, {
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 0.96,
            duration: 0.35,
            ease: "power3.out",
          });
        });

        items.forEach((el, i) => {
          gsap.to(el, {
            opacity: i === index ? 1 : 0.35,
            duration: 0.25,
          });
        });

        /* 🔑 Smooth slide (no stepping) */
        gsap.to(imageWrap, {
          y: targetY,
          duration: 1.1,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => activate(index),
          onEnterBack: () => activate(index),
        });
      });

      /* ---------------- CURSOR (TILT ONLY) ---------------- */
      function onMouseMove(e) {
        const b = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width - 0.5;
        const y = (e.clientY - b.top) / b.height - 0.5;

        gsap.to(imageWrap, {
          rotateY: x * 6,
          rotateX: -y * 6,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      function resetMouse() {
        gsap.to(imageWrap, {
          rotateX: -3,
          rotateY: 2,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          sectionRef.current.addEventListener("mousemove", onMouseMove);
          sectionRef.current.addEventListener("mouseleave", resetMouse);
        },
        onLeave: () => {
          sectionRef.current.removeEventListener("mousemove", onMouseMove);
          sectionRef.current.removeEventListener("mouseleave", resetMouse);
        },
        onEnterBack: () => {
          sectionRef.current.addEventListener("mousemove", onMouseMove);
          sectionRef.current.addEventListener("mouseleave", resetMouse);
        },
        onLeaveBack: () => {
          sectionRef.current.removeEventListener("mousemove", onMouseMove);
          sectionRef.current.removeEventListener("mouseleave", resetMouse);
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="nf9-services-section" ref={sectionRef}>
      <div className="nf9-services-grid">

        {/* IMAGE */}
        <div className="nf9-services-image-col">
          <div className="nf9-services-image-stage">
            <div className="nf9-services-image-wrap" ref={imageWrapRef}>
              {SERVICES.map((s, i) => (
                <img
                  key={i}
                  src={s.image}
                  alt={s.title}
                  className="nf9-services-image"
                />
              ))}
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div className="nf9-services-content">
          <div className="nf9-services-label">Our Services ↴</div>
          <div className="nf9-services-list">
            {SERVICES.map((s, i) => (
              <h1 key={i} className="nf9-services-item">
                {s.title}
              </h1>
            ))}
            <div className="nf9-services-spacer" />
          </div>
        </div>

      </div>
    </section>
  );
}
