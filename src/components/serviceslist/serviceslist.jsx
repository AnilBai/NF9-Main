import "./serviceslist.css";

const SERVICES = [
  {
    id: "01",
    name: "UI/UX Design",
    badge: "Design",
    desc: "Crafting intuitive, modern, and user-centric digital experiences that convert visitors into loyal customers.",
    subs: [
      "UX Research & Wireframing",
      "UI Design — Web & Mobile",
      "Prototyping",
      "Design Systems",
      "Interaction Design",
      "Product Design",
      "Branding-Aligned UI Kits",
    ],
  },
  {
    id: "02",
    name: "Website Development",
    badge: "Web",
    desc: "Beautiful, fast, secure, and SEO-optimized websites built for growth and long-term performance.",
    subs: [
      "Business Websites",
      "eCommerce & WooCommerce",
      "WordPress Development",
      "Custom Web Applications",
      "CMS & Headless CMS",
      "Landing Pages",
      "Performance Optimization",
    ],
  },
  {
    id: "03",
    name: "eCommerce & SaaS",
    badge: "Platform",
    desc: "Scalable digital products that help businesses sell, grow, and automate operations end-to-end.",
    subs: [
      "WooCommerce & Shopify",
      "Headless eCommerce",
      "Multi-Vendor Marketplace",
      "SaaS Product Development",
      "Subscription & Billing",
      "Web Portals & Dashboards",
      "Custom Feature Development",
    ],
  },
  {
    id: "04",
    name: "Application Development",
    badge: "Apps",
    desc: "High-performing apps engineered for usability, functionality, and scale across every platform.",
    subs: [
      "Mobile App — Android & iOS",
      "Full-Stack Web Apps",
      "API Development & Integration",
      "Cross-Platform Development",
      "Custom Software Solutions",
      "Backend Architecture",
      "Product Maintenance",
    ],
  },
  {
    id: "05",
    name: "Cloud & DevOps",
    badge: "Infra",
    desc: "Reliable, secure, and scalable infrastructure to keep your business running 24/7 without compromise.",
    subs: [
      "Cloud Setup & Migration",
      "DevOps & CI/CD Pipelines",
      "Server Security & Hardening",
      "Monitoring & Alerting",
      "Performance Tuning",
      "Backup & Disaster Recovery",
      "SRE & Infra Automation",
    ],
  },
  {
    id: "06",
    name: "Branding & Marketing",
    badge: "Brand",
    desc: "Helping brands grow through creative identity, strategic visibility, and performance-driven marketing.",
    subs: [
      "Logo & Brand Identity",
      "Brand Positioning & Strategy",
      "SEO — On-Page & Technical",
      "Social Media Management",
      "Paid Ads — Google & Meta",
      "Copywriting & Content",
      "Marketing Automation",
    ],
  },
];

function ServiceCard({ svc }) {
  return (
    <div className="svc__card">
      <span className="svc__card-bg-num" aria-hidden="true">{svc.id}</span>

      <div className="svc__card-top">
        <span className="svc__card-index">{svc.id}</span>
        <span className="svc__card-badge">{svc.badge}</span>
      </div>

      <h3 className="svc__card-name">{svc.name}</h3>
      <p className="svc__card-desc">{svc.desc}</p>

      <div className="svc__card-subs-label">Includes</div>
      <div className="svc__card-tags">
        {svc.subs.map((sub) => (
          <span key={sub} className="svc__tag">{sub}</span>
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="svc">

      {/* Top label bar */}
      <div className="svc__topbar">
        <span className="svc__topbar-label">Our Services</span>
        <span className="svc__topbar-count">06 Capabilities</span>
      </div>

      {/* Hero title */}
      <div className="svc__hero">
        <div className="svc__hero-inner">
          <h2 className="svc__hero-title">
            Ideas.
            <span className="outline">Engineered.</span>
          </h2>
          <div className="svc__hero-right">
            <p className="svc__hero-note">
              End-to-end digital solutions — design, development,
              infrastructure, and growth. Everything your brand
              needs to move fast.
            </p>
          </div>
        </div>
      </div>

      {/* 2-col card grid */}
      <div className="svc__grid">
        {SERVICES.map((svc) => (
          <ServiceCard key={svc.id} svc={svc} />
        ))}
      </div>

      {/* CTA band */}
      <div className="svc__cta">
        <div className="svc__cta-left">
         
        </div>
        <div className="svc__cta-right">
          
        
        </div>
      </div>

    </section>
  );
}