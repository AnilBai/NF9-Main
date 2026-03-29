import "./socialmedia.css";

export default function SocialFollow() {
  return (
    <section className="social-follow-section">
      <div className="social-follow-card">

        {/* Background layer (clipped) */}
        <div className="social-follow-bg"></div>

        {/* Phone Image (allowed to overflow) */}
        <div className="social-follow-image">
        </div>

        {/* Content */}
        <div className="social-follow-content">
          <div className="social-follow-text">
            <h3>
              Follow us on <br />
              <span className="muted">Instagram</span>
              <br />
              <span className="muted">Linkedin</span>
            </h3>
          </div>

          <div className="social-follow-actions">
            <a
              href="https://www.instagram.com/nf9.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/nf9"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
