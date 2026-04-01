import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [bgText, setBgText] = useState('NF9');
  const backgroundTextRef = useRef(null);
  const hamburgerRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  const navigate = useNavigate();

  const scrollToHash = (hash) => {
    if (!hash) return
    const id = hash.startsWith('#') ? hash.slice(1) : hash
    const attempt = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return true
      }
      return false
    }
    if (attempt()) return
    let tries = 0
    const maxTries = 20
    const timer = window.setInterval(() => {
      tries += 1
      if (attempt() || tries >= maxTries) {
        window.clearInterval(timer)
      }
    }, 50)
  }

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

  useEffect(() => {
    if (isMenuActive) {
      setTimeout(() => {
        if (firstMenuItemRef.current) {
          firstMenuItemRef.current.blur()
          firstMenuItemRef.current.focus({ preventScroll: true })
        }
      }, 100);
    } else {
      if (hamburgerRef.current) {
        hamburgerRef.current.blur()
      }
    }
  }, [isMenuActive]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuActive) {
        toggleMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuActive]);

  const menuItems = [
    { id: 1, text: 'Start Here', to: { pathname: '/', hash: '#hero' } },
    { id: 2, text: 'Services', to: '/services' },
    { id: 3, text: 'Our Work', to: { pathname: '/', hash: '#works' } },
    { id: 4, text: 'About NF9', to: { pathname: '/', hash: '#about' } },
    { id: 5, text: 'Careers', to: { pathname: '/', hash: '#together' } },
    { id: 6, text: 'Contact Us', to: '/contact-us' }
  ];

  return (
    <>
      {/* Header */}
      <header className={`fixed main-header left-0 right-0 flex justify-between items-center px-5 md:px-10  z-[1000] ${isMenuActive ? 'header-active' : ''}`}>
        
        <Link to="/" className="center-text">
          NF9
        </Link>

        <div
          ref={hamburgerRef}
          className={`hamburger ${isMenuActive ? 'active' : ''}`}
          onClick={toggleMenu}
          role="button"
          aria-label={isMenuActive ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuActive}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMenu();
            }
          }}
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
                {menuItems.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      ref={index === 0 ? firstMenuItemRef : null}
                      to={item.to}
                      onClick={() => {
                        toggleMenu()
                        navigate(item.to)
                        if (item.to?.hash) scrollToHash(item.to.hash)
                      }}
                      onMouseEnter={() => handleMouseEnter(item.text)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.text}
                    </Link>
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
                href="https://www.instagram.com/nf9.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="mailto:support@nf9.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/7093493897?text=did%20you%20get%20it%3F"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.616 13.706c-.271-.136-1.603-.79-1.852-.88-.248-.091-.428-.136-.607.136-.181.273-.707.88-.866 1.061-.16.181-.316.205-.588.068-.271-.136-1.144-.421-2.18-1.345-.806-.718-1.35-1.605-1.51-1.876-.158-.273-.017-.42.121-.556.124-.124.273-.321.409-.482.137-.16.181-.273.273-.455.091-.181.046-.34-.023-.476-.068-.136-.607-1.462-.831-2.005-.219-.528-.444-.456-.607-.465-.156-.008-.334-.01-.512-.01-.178 0-.466.066-.71.339-.248.273-.95.928-.95 2.257 0 1.328.974 2.614 1.11 2.795.136.181 1.918 2.904 4.65 4.072.651.28 1.158.446 1.553.57.652.205 1.246.176 1.713.107.522-.078 1.603-.655 1.832-1.286.229-.631.229-1.174.16-1.286-.068-.109-.248-.181-.52-.318z"/>
                  <path d="M12.013 2C6.489 2 2 6.483 2 12c0 2.114.626 4.073 1.708 5.72L2 22l4.456-1.17A9.966 9.966 0 0 0 12.014 22c5.524 0 10.014-4.483 10.014-10S17.538 2 12.014 2zm0 18.74c-1.785 0-3.434-.533-4.835-1.445l-.345-.204-2.657.697.71-2.59-.22-.356A7.923 7.923 0 0 1 4 12.002C4 7.589 7.6 4 12.015 4c2.137 0 4.146.83 5.657 2.342 1.511 1.514 2.35 3.523 2.35 5.66 0 4.414-3.6 8.037-8.009 8.037z"/>
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