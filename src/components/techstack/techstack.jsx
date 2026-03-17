import "./techstack.css";

// Real tech stack icons from CDN
const ROW_TOP = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",        alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",      alt: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",      alt: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",        alt: "Figma" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",       alt: "GraphQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",    alt: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",      alt: "Docker" },
];

const ROW_BOTTOM = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", alt: "AWS" },  
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", alt: "GCP" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", alt: "Firebase" },
  { src: "https://cdn.simpleicons.org/shopify/96BF48", alt: "Shopify" },
  { src: "https://cdn.simpleicons.org/wordpress/21759B", alt: "WordPress" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", alt: "Kubernetes" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",        alt: "Redis" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",      alt: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",        alt: "Vue.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",        alt: "Swift" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",      alt: "Kotlin" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",        alt: "Nginx" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",            alt: "Git" },
];

// Duplicate 4× for seamless infinite loop
const makeTrack = (arr) => [...arr, ...arr, ...arr, ...arr];

export default function OurTech() {
  const topTrack    = makeTrack(ROW_TOP);
  const bottomTrack = makeTrack(ROW_BOTTOM);

  return (
    <section className="ourtech">

      {/* Eyebrow */}
      <div className="ourtech-badge">
        <span>Our Tech Stack</span>
      </div>

      {/* Title — overlaps visual area */}
      <h2 className="ourtech-title">
        Built on Modern,
        <span className="outline">Trusted Tech.</span>
      </h2>

      {/* Visual Area */}
      <div className="ourtech-visual">

        {/* Rotating Globe */}
        <div className="ourtech-globe" aria-hidden="true">
          <div className="framer-bg-wrapper">
            <img
              src="https://framerusercontent.com/images/jLPVBIsLpIQ3tZJZiCCEC1Jz7Ow.png"
              alt=""
            />
          </div>
        </div>

        {/* Top marquee — scrolls left */}
        <div className="marquee marquee-top" aria-hidden="true">
          <div className="marquee-mask">
            <div className="marquee-track">
              {topTrack.map((icon, i) => (
                <div className="icon-glass" key={`top-${i}`}>
                  <img src={icon.src} alt={icon.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom marquee — scrolls right */}
        <div className="marquee marquee-bottom" aria-hidden="true">
          <div className="marquee-mask">
            <div className="marquee-track">
              {bottomTrack.map((icon, i) => (
                <div className="icon-glass" key={`bottom-${i}`}>
                  <img src={icon.src} alt={icon.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer note */}
      <div className="ourtech-footer">
        <p className="ourtech-note">
          We pick the right tool for every job, not the trendiest one.
          Every stack choice is intentional, scalable, and battle-tested.
        </p>
      </div>

    </section>
  );
}