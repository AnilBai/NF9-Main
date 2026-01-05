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

/* =====================================================
   TUNING CONTROLS (SAFE TO ADJUST)
===================================================== */
const getStep = () => {
  const w = window.innerWidth;
  if (w <= 468)  return 0;
  if (w <= 768)  return 0;
  if (w <= 1024) return 0;
  if (w <= 1440) return 0;
  return 5;
};

const getStartOffset = () => {
  const w = window.innerWidth;
  if (w <= 468)  return 0;
  if (w <= 768)  return 20;
  if (w <= 1024) return 20;
  return 20;
};

const getEndOffset = () => {
  const w = window.innerWidth;
  if (w <= 468)  return 20;
  if (w <= 768)  return 40;
  if (w <= 1024) return 60;
  return 100;
};

export default function Services() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".nf9-services-item");
      const images = gsap.utils.toArray(".nf9-services-image");
      const imageWrap = imageWrapRef.current;

      gsap.set(images, { opacity: 0, scale: 0.96 });
      gsap.set(imageWrap, { autoAlpha: 1, y: 0 });

      function activate(index) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const itemRect = items[index].getBoundingClientRect();

        const step = getStep();
        const startOffset = getStartOffset();
        const endOffset = getEndOffset();

        let targetY =
          itemRect.top -
          sectionRect.top +
          itemRect.height / 2 -
          imageWrap.offsetHeight / 2;

        /* STEP DRIFT */
        targetY += index * step;

        /* START ADJUSTMENT */
        if (index === 0) targetY -= startOffset;

        /* STOP ADJUSTMENT */
        if (index === items.length - 1) targetY -= endOffset;

        images.forEach((img, i) => {
          gsap.to(img, {
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 0.96,
            duration: 0.4,
            ease: "power3.out",
          });
        });

        items.forEach((el, i) => {
          gsap.to(el, {
            opacity: i === index ? 1 : 0.35,
            duration: 0.3,
          });
        });

        gsap.to(imageWrap, {
          y: targetY,
          x: window.innerWidth < 768 ? 14 : 40,
          rotateX: -4,
          rotateY: 3,
          duration: 0.65,
          ease: "power3.out",
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        onEnter: () => activate(0),
        onEnterBack: () => activate(0),
      });

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => activate(index),
          onEnterBack: () => activate(index),
        });
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