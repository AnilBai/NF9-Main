import { useEffect, useRef, useState } from "react";
import "./contactus.css";

export default function ContactUs() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

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
    
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value,
      message: e.target[3].value
    };
  
    try {
      const apiUrl = import.meta.env.VITE_API_CONTACT_URL;
      if (!apiUrl) {
        throw new Error('API endpoint is not configured');
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section className="contact-main" ref={sectionRef}>
      {/* ROW 1 */}
      <div className="contact-title-row framer-reveal delay-1">
        <h1>Get in touch.</h1>
      </div>

      {/* ROW 2 */}
      <div className="contact-content-row">
        {/* LEFT */}
        <div className="contact-left framer-reveal delay-2">
          <p>
            <strong>Have a project in mind?</strong> Reach out to us, and we’ll
            discuss the best way to move forward.
          </p>
        </div>

        {/* RIGHT */}
        <div className="contact-right framer-reveal delay-3">
          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field framer-reveal delay-4">
                <input type="text" placeholder="Your name *" required />
                <span className="line"></span>
              </div>

              <div className="field framer-reveal delay-5">
                <input type="email" placeholder="Email *" required />
                <span className="line"></span>
              </div>

              {/* PHONE FIELD */}
              <div className="field framer-reveal delay-6">
                <input
                  type="tel"
                  placeholder="Phone number *"
                  required
                />
                <span className="line"></span>
              </div>

              <div className="field framer-reveal delay-7">
                <textarea
                  placeholder="Your message *"
                  required
                ></textarea>
                <span className="line"></span>
              </div>

              <button
                className="submit-btn framer-reveal delay-8"
                type="submit"
              >
                <span className="btn-text top">Submit</span>
                <span className="btn-text bottom">Submit</span>
                <span className="btn-dot"></span>
              </button>

              <p className="terms framer-reveal delay-9">
                By submitting, you agree to our{" "}
                <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
              </p>
            </form>
          ) : (
            /* SUCCESS MESSAGE */
            <div className="success-message framer-reveal delay-4">
              <h3>Thank you for reaching out ✨</h3>
              <p>
                We’ve received your message.  
                Our team will contact you shortly.
                <br />
                Welcome to <strong>NF9</strong> — where ideas turn into
                beautiful digital experiences.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}