import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <section id="hero" className="homeWrap">
      <div className="hero">
        {/* Video Background */}
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="https://nf9.in/wp-content/uploads/2026/03/My-Movie-1.mov"
            type="video/mp4"
          />
        </video>
        {/* Center Text */}
        <div className="heroContent">
          <h1 className="heroTitle">IDEAS. ENGINEERED. </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;