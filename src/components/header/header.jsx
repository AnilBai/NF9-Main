import React, { useState, useEffect, useRef } from 'react';
import './header.css';

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [bgText, setBgText] = useState('NF9');
  const backgroundTextRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleMouseEnter = (text) => {
    setBgText(text);
  };

  const handleMouseLeave = () => {
    setBgText('NF9');
  };

  useEffect(() => {
    const updateBounceDistance = () => {
      if (backgroundTextRef.current) {
        const textElement = backgroundTextRef.current;
        const textWidth = textElement.offsetWidth;
        if (textWidth > 0) {
          const viewportWidth = window.innerWidth;
          const maxTranslateX = viewportWidth - textWidth;
          textElement.style.setProperty('--bounce-distance', `${maxTranslateX}px`);
        }
      }
    };

    if (isMenuActive) {
      // Try immediately first
      updateBounceDistance();
      // Also try after a short delay to ensure text is fully rendered
      const timeoutId = setTimeout(updateBounceDistance, 100);
      window.addEventListener('resize', updateBounceDistance);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', updateBounceDistance);
      };
    }
  }, [isMenuActive, bgText]);

  const menuItems = [
    { id: 1, text: 'Start Here', href: '#home' },
    { id: 2, text: 'Services', href: '#about' },
    { id: 3, text: 'Our Work', href: '#services' },
    { id: 4, text: 'About NF9', href: '#portfolio' },
    { id: 5, text: 'Careers', href: '#careers' },
    { id: 6, text: 'Contact Us', href: '#contact' }
  ];

  return (
    <>
      {/* Header */}
      <header className={`fixed main-header left-0 right-0 flex justify-between items-center px-5 md:px-10  z-[1000] ${isMenuActive ? 'header-active' : ''}`}>
        
        <div className="center-text">
          NF9
        </div>

        <div
          className={`hamburger ${isMenuActive ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`overlay ${isMenuActive ? 'active' : ''}`}
        onClick={toggleMenu}
      ></div>

      {/* Menu */}
      <nav className={`menu ${isMenuActive ? 'active' : ''}`}>
        <div className="dropdown-container">
          <div className="menu-container">
            <nav>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={toggleMenu}
                      onMouseEnter={() => handleMouseEnter(item.text)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <span ref={backgroundTextRef} className="background-text">{bgText}</span>
          </div>
          <div className="menu-divider"></div>
          <div className="social-container">
            <h1>Reach Out Us</h1>
            <div className="social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="mailto:contact@nf9.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
