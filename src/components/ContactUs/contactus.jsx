import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./contactus.css";

export default function ContactUs() {
  const sectionRef = useRef(null);
  const recaptchaRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // rCAPTCHA site key (prefers env var; fallback for quick local testing)
  const RECAPTCHA_SITE_KEY =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
      "6LfHW4wsAAAAADWstDjbA-TmNDaKLXeI_G17YXXH";

  // API endpoint (prefers env var; fallback to the deployed WP backend)
  const API_CONTACT_URL =
    import.meta.env.VITE_API_CONTACT_URL ||
      "https://backend.nf9.in/wp-json/nf9/v1/contact";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!recaptchaToken) {
      setErrorMessage("Please complete the captcha before submitting.");
      return;
    }

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      recaptchaToken,
    };

    setIsSubmitting(true);

    try {
      console.log("Contact form request:", API_CONTACT_URL, data);

      const response = await fetch(API_CONTACT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result = null;
      let rawBody = "";

      try {
        rawBody = await response.text();
        result = rawBody ? JSON.parse(rawBody) : null;
      } catch (parseErr) {
        // Not JSON — keep raw body for debugging
      }

      console.log("Contact form response", response.status, {
        parsed: result,
        raw: rawBody,
      });

      if (!response.ok) {
        const message =
          (result && (result.error || result.message)) ||
          rawBody ||
          `Submission failed (${response.status}).`;
        setErrorMessage(message);
        return;
      }

      if (result && result.success) {
        setSubmitted(true);
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        e.target.reset();
      } else {
        setErrorMessage((result && (result.error || result.message)) || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-main" ref={sectionRef}>
      <div className="contact-title-row framer-reveal delay-1">
        <h1>Get in touch.</h1>
      </div>

      <div className="contact-content-row">
        <div className="contact-left framer-reveal delay-2">
          <p>
            <strong>Have a project in mind?</strong> Reach out to us, and we’ll
            discuss the best way to move forward.
          </p>
        </div>

        <div className="contact-right framer-reveal delay-3">
          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field framer-reveal delay-4">
                <input name="name" type="text" placeholder="Your name *" required />
                <span className="line"></span>
              </div>

              <div className="field framer-reveal delay-5">
                <input name="email" type="email" placeholder="Email *" required />
                <span className="line"></span>
              </div>

              <div className="field framer-reveal delay-6">
                <input name="phone" type="tel" placeholder="Phone number *" required />
                <span className="line"></span>
              </div>

              <div className="field framer-reveal delay-7">
                <textarea name="message" placeholder="Your message *" required></textarea>
                <span className="line"></span>
              </div>

              <div className="recaptcha-wrapper framer-reveal delay-8">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token)}
                />
              </div>

              {errorMessage && (
                <div className="form-error framer-reveal delay-8">{errorMessage}</div>
              )}

              <button
                className="submit-btn framer-reveal delay-9"
                type="submit"
                disabled={!recaptchaToken || isSubmitting}
              >
                <span className="btn-text top">
                  {isSubmitting ? "Sending..." : "Submit"}
                </span>
                <span className="btn-text bottom">
                  {isSubmitting ? "Sending..." : "Submit"}
                </span>
                <span className="btn-dot"></span>
              </button>

              <p className="terms framer-reveal delay-9">
                By submitting, you agree to our <a href="#">Terms</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>
            </form>
          ) : (
            <div className="success-message framer-reveal delay-4">
              <h3>Thank you for reaching out ✨</h3>
              <p>
                We’ve received your message. Our team will contact you shortly.
                <br />
                Welcome to <strong>NF9</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}