import { useNavigate } from 'react-router-dom';
import "./footer.css";

export default function Footer() {
  const navigate = useNavigate();

  const scrollToHash = (hash) => {
    if (!hash) return;
    const id = hash.startsWith('#') ? hash.slice(1) : hash;

    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (attempt()) return;

    let tries = 0;
    const maxTries = 20;
    const timer = window.setInterval(() => {
      tries += 1;
      if (attempt() || tries >= maxTries) {
        window.clearInterval(timer);
      }
    }, 50);
  };

  const links = [
    { label: 'Home', to: { pathname: '/', hash: '#hero' } },
    { label: 'Services', to: '/services' },
    { label: 'Our Work', to: { pathname: '/', hash: '#works' } },
    { label: 'About NF9', to: { pathname: '/', hash: '#about' } },
    { label: 'Careers', to: { pathname: '/', hash: '#together' } },
    { label: 'Contact us', to: '/contact-us' },
  ];

  return (
    <footer className="nf9-footer">
      <div className="nf9-container">

        {/* ================= TOP ================= */}
        <div className="nf9-top">

          <div className="nf9-contact">
            <span className="nf9-plus">+</span>
            <p className="nf9-phone">+91 9666959785</p>
            <a href="mailto:support@nf9.com" className="nf9-email">
              <span className="nf9-plus-circle">+</span>
              <span className="nf9-email-text">support@nf9.in</span>
            </a>
          </div>

          <div className="nf9-nav">
            <span className="nf9-plus">+</span>
            <p className="nf9-label">Navigation</p>
            <div className="nf9-social-row">
              {links.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(link.to);
                    if (typeof link.to === 'object' && link.to.hash) {
                      scrollToHash(link.to.hash);
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="nf9-social">
            <span className="nf9-plus">+</span>
            <p className="nf9-label">Social</p>
            <div className="nf9-social-row">
              <a
                href="https://wa.me/919666959785?text=Hello%2C%20I%20need%20a%20website%20to%20develop%2C%20really%20wanna%20connect%20to%20the%20NF9%20team"
                target="_blank"
                rel="noopener noreferrer"
                className="nf9-social-link"
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/nf9.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="nf9-social-link"
              >
                Instagram
              </a>
              <a href="#" className="nf9-social-link">
                LinkedIn 
              </a>
            </div>
          </div>

        </div>

        {/* ================= LOGO ================= */}
        <div className="nf9-logo">
          <h1>NEXT FRONTIER 9</h1>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="nf9-bottom">
          <div className="nf9-bottom-left">
            © 2025 NF9 Studio. All rights reserved.
            </div>
          <div className="nf9-bottom-right">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
