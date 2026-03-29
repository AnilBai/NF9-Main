import { useEffect, useRef, useState } from "react";
import "./contactus.css";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function ContactUs() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_CONTACT_URL =
  import.meta.env.VITE_API_CONTACT_URL; 
  
  // Intersection observer for animations
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

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    const existing = document.querySelector(`script[src*="recaptcha"]`);
    if (existing) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const getRecaptchaToken = () => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject(new Error("reCAPTCHA not loaded"));
        return;
      }
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
            action: "contact",
          });
          resolve(token);
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      let recaptcha_token = "";
      if (RECAPTCHA_SITE_KEY) {
        recaptcha_token = await getRecaptchaToken();
      }

      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        recaptcha_token,
      };

      const response = await fetch(API_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result = null;
      let rawBody = "";

      try {
        rawBody = await response.text();
        result = rawBody ? JSON.parse(rawBody) : null;
      } catch (parseErr) {
        // Not JSON
      }

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
        e.target.reset();
      } else {
        setErrorMessage(
          (result && (result.error || result.message)) ||
          "Submission failed. Please try again."
        );
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
            <strong>Have a project in mind?</strong> Reach out to us, and we'll
            discuss the best way to move forward.
          </p>
        </div>

        <div className="contact-right framer-reveal delay-3">
          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field framer-reveal delay-4">
                <label htmlFor="name" className="sr-only">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name *"
                  required
                  aria-required="true"
                />
                <span className="line"></span>
              </div>

              <div className="field framer-reveal delay-5">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email *"
                  required
                  aria-required="true"
                />
                <span className="line"></span>
              </div>

              <div className="field framer-reveal delay-6">
                <label htmlFor="phone" className="sr-only">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone number *"
                  required
                  aria-required="true"
                />
                <span className="line"></span>
              </div>

              <div className="field framer-reveal delay-7">
                <label htmlFor="message" className="sr-only">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message *"
                  required
                  aria-required="true"
                ></textarea>
                <span className="line"></span>
              </div>

              {errorMessage && (
                <div className="form-error framer-reveal delay-8" role="alert">
                  {errorMessage}
                </div>
              )}

              <button
                className="submit-btn framer-reveal delay-9"
                type="submit"
                disabled={isSubmitting}
                aria-label={isSubmitting ? 'Sending message' : 'Submit contact form'}
              >
                <span className="btn-text top">
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </span>
                <span className="btn-text bottom">
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </span>
                <span className="btn-dot"></span>
              </button>

              <p className="terms framer-reveal delay-9">
                By submitting, you agree to our <a href="#">Terms</a> and{' '}
                <a href="#">Privacy Policy</a>.
              </p>
            </form>
          ) : (
            <div className="success-message framer-reveal delay-4">
              <h3>Thank you for reaching out </h3>
              <p>
                We've received your message. Our team will contact you shortly.
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