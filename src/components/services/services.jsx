import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./services.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { title: "UI/UX Design",   image: "https://framerusercontent.com/images/xvbmP2RETgW6oOPW5kTmPh6busg.jpg" },
  { title: "Website",        image: "https://framerusercontent.com/images/BwCmxlMIwWfqxkz8nvxIQfKBgk.jpg" },
  { title: "eCommerce",      image: "https://framerusercontent.com/images/4WNOPai8HNpbkzXGrHQZwYWmibA.jpg" },
  { title: "Applications",   image: "https://framerusercontent.com/images/xYeTN1Bn52IZWANLkSiNFVPy0jY.jpg" },
  { title: "Infrastructure", image: "https://framerusercontent.com/images/1QkHnDWCstFb6jXN6WFLV6yDZB0.jpg" },
  { title: "Branding",       image: "https://framerusercontent.com/images/36wvwfIbrnOBnFSzVzIZ4BEv9ms.jpeg" },
];

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
  const sectionRef   = useRef(null);
  const imageColRef  = useRef(null);
  const imageWrapRef = useRef(null);

  // Smooth Y lerp
  const targetY  = useRef(0);
  const currentY = useRef(0);
  const rafId    = useRef(null);
  const isMoving = useRef(false);

  // Mouse tilt + drift
  const mouse   = useRef({ x: 0, y: 0 });
  const tilt    = useRef({ rx: 0, ry: 0, dx: 0, dy: 0 });
  const tiltRAF = useRef(null);

  /* ── apply combined transform ── */
  function applyTransform() {
    const wrap = imageWrapRef.current;
    if (!wrap) return;
    const { rx, ry, dx, dy } = tilt.current;
    wrap.style.transform = `
      translateX(calc(-50% + ${dx}px))
      translateY(${currentY.current + dy}px)
      perspective(900px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
    `;
  }

  /* ── smooth Y lerp loop ── */
  function startLerp() {
    if (isMoving.current) return;
    isMoving.current = true;
    function step() {
      const diff = targetY.current - currentY.current;
      if (Math.abs(diff) < 0.15) {
        currentY.current = targetY.current;
        isMoving.current = false;
        applyTransform();
        return;
      }
      currentY.current += diff * 0.09;
      applyTransform();
      rafId.current = requestAnimationFrame(step);
    }
    rafId.current = requestAnimationFrame(step);
  }

  /* ── 3D tilt + left/right drift ── */
  useEffect(() => {
    const col = imageColRef.current;

    const MAX_RX = 14;
    const MAX_RY = 20;
    const MAX_DX = 36;
    const MAX_DY = 20;
    const LERP   = 0.07;

    const onMove  = (e) => {
      const r = col.getBoundingClientRect();
      mouse.current = {
        x: ((e.clientX - r.left) / r.width)  * 2 - 1,
        y: ((e.clientY - r.top)  / r.height) * 2 - 1,
      };
    };
    const onLeave = () => { mouse.current = { x: 0, y: 0 }; };

    const tick = () => {
      const { x, y } = mouse.current;
      const t = tilt.current;
      t.rx += ((-y * MAX_RX) - t.rx) * LERP;
      t.ry += (( x * MAX_RY) - t.ry) * LERP;
      t.dx += (( x * MAX_DX) - t.dx) * LERP;
      t.dy += (( y * MAX_DY) - t.dy) * LERP;
      applyTransform();
      tiltRAF.current = requestAnimationFrame(tick);
    };

    col.addEventListener("mousemove",  onMove);
    col.addEventListener("mouseleave", onLeave);
    tiltRAF.current = requestAnimationFrame(tick);

    return () => {
      col.removeEventListener("mousemove",  onMove);
      col.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(tiltRAF.current);
    };
  }, []);

  /* ── scroll triggers (your original logic, untouched) ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items     = gsap.utils.toArray(".nf9-services-item");
      const images    = gsap.utils.toArray(".nf9-services-image");
      const imageWrap = imageWrapRef.current;

      gsap.set(images,    { opacity: 0, scale: 0.96 });
      gsap.set(imageWrap, { autoAlpha: 1 });

      function activate(index) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const itemRect    = items[index].getBoundingClientRect();

        const step        = getStep();
        const startOffset = getStartOffset();
        const endOffset   = getEndOffset();

        let newY =
          itemRect.top -
          sectionRect.top +
          itemRect.height / 2 -
          imageWrap.offsetHeight / 2;

        newY += index * step;
        if (index === 0)               newY -= startOffset;
        if (index === items.length - 1) newY -= endOffset;

        // Hand Y to the lerp — no GSAP tween on position
        targetY.current = newY;
        startLerp();

        // Image crossfade — your original
        images.forEach((img, i) => {
          gsap.to(img, {
            opacity:  i === index ? 1 : 0,
            scale:    i === index ? 1 : 0.96,
            duration: 0.4,
            ease:     "power3.out",
          });
        });

        // Text opacity — your original
        items.forEach((el, i) => {
          gsap.to(el, {
            opacity:  i === index ? 1 : 0.35,
            duration: 0.3,
          });
        });
      }

      ScrollTrigger.create({
        trigger:     sectionRef.current,
        start:       "top top",
        onEnter:     () => activate(0),
        onEnterBack: () => activate(0),
      });

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger:     item,
          start:       "top center",
          end:         "bottom center",
          onEnter:     () => activate(index),
          onEnterBack: () => activate(index),
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section className="nf9-services-section" ref={sectionRef}>
      <div className="nf9-services-grid">

        <div className="nf9-services-image-col" ref={imageColRef}>
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