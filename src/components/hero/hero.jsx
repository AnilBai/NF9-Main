import React, { useEffect, useRef } from "react";
import "./hero.css";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Force play via javascript for better mobile support
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <section id="hero" className="homeWrap">
      <div className="hero">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="heroVideo"
          autoPlay
          muted
          defaultMuted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="metadata"
          style={{ pointerEvents: "none" }}
        >
          <source
            src="https://nf9.in/wp-content/uploads/2026/04/NF9banner.mp4"
            type="video/mp4; codecs=avc1"
          />
          <source
            src="https://nf9.in/wp-content/uploads/2026/04/NF9banner.mp4"
            type="video/quicktime"
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