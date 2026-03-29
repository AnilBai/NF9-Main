import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./services.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { title: "UI/UX Design",   image: "https://nf9.in/wp-content/uploads/2026/03/nf9image1.avif" },
  { title: "Website",        image: "https://nf9.in/wp-content/uploads/2026/03/nf9image10.avif" },
  { title: "eCommerce",      image: "https://nf9.in/wp-content/uploads/2026/03/nf9image6.avif" },
  { title: "Applications",   image: "https://nf9.in/wp-content/uploads/2026/03/nf9image2.avif" },
  { title: "Infrastructure", image: "https://nf9.in/wp-content/uploads/2026/03/nf9image8.avif" },
  { title: "Branding",       image: "https://nf9.in/wp-content/uploads/2026/03/nf9image7.avif" },
];

export default function Services() {
  const navigate = useNavigate();
  const sectionRef   = useRef(null);
  const imageColRef  = useRef(null);
  const imageWrapRef = useRef(null);

  // Smooth movement
  const targetY  = useRef(0);
  const currentY = useRef(0);
  const rafId    = useRef(null);
  const isMoving = useRef(false);

  // Mouse tilt
  const mouse   = useRef({ x: 0, y: 0 });
  const tilt    = useRef({ rx: 0, ry: 0, dx: 0, dy: 0 });
  const tiltRAF = useRef(null);

  /* ── Apply transform ── */
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

  /* ── Ultra smooth lerp ── */
  function startLerp() {
    if (isMoving.current) return;
    isMoving.current = true;

    function step() {
      const diff = targetY.current - currentY.current;

      if (Math.abs(diff) < 0.1) {
        currentY.current = targetY.current;
        isMoving.current = false;
        applyTransform();
        return;
      }

      // Smooth easing (premium feel)
      currentY.current += diff * 0.14;

      applyTransform();
      rafId.current = requestAnimationFrame(step);
    }

    rafId.current = requestAnimationFrame(step);
  }

  /* ── Mouse tilt ── */
  useEffect(() => {
    const col = imageColRef.current;

    const MAX_RX = 14;
    const MAX_RY = 20;
    const MAX_DX = 36;
    const MAX_DY = 20;
    const LERP   = 0.07;

    const onMove = (e) => {
      const r = col.getBoundingClientRect();
      mouse.current = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
      };
    };

    const onLeave = () => {
      mouse.current = { x: 0, y: 0 };
    };

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

    col.addEventListener("mousemove", onMove);
    col.addEventListener("mouseleave", onLeave);
    tiltRAF.current = requestAnimationFrame(tick);

    return () => {
      col.removeEventListener("mousemove", onMove);
      col.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(tiltRAF.current);
    };
  }, []);

  /* ── Scroll triggers ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items  = gsap.utils.toArray(".nf9-services-item");
      const images = gsap.utils.toArray(".nf9-services-image");

      gsap.set(images, { opacity: 0, scale: 0.96 });

      function activate(index) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const itemRect    = items[index].getBoundingClientRect();

        let newY =
          itemRect.top -
          sectionRect.top +
          itemRect.height / 2 -
          imageWrapRef.current.offsetHeight / 2;

        // Prevent micro-jumps
        if (Math.abs(targetY.current - newY) > 2) {
          targetY.current = newY;
          startLerp();
        }

        // Smooth image transition
        images.forEach((img, i) => {
          gsap.to(img, {
            opacity:  i === index ? 1 : 0,
            scale:    i === index ? 1 : 0.96,
            duration: 0.6,
            ease:     "power4.out",
          });
        });

        // Text opacity
        items.forEach((el, i) => {
          gsap.to(el, {
            opacity:  i === index ? 1 : 0.35,
            duration: 0.3,
          });
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

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section id="services" className="nf9-services-section" ref={sectionRef}>
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
          <div className="nf9-services-label">
            <span>Our Services</span>
          </div>

          <div className="nf9-services-list">
            {SERVICES.map((s, i) => (
              <button
                key={i}
                className="nf9-services-item"
                onClick={() => navigate("/services")}
              >
                {s.title}
              </button>
            ))}
            <div className="nf9-services-spacer" />
          </div>
        </div>

      </div>
    </section>
  );
}