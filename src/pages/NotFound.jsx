import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 24px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Helmet>
        <title>404 — Page Not Found | NF9</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <p style={{
        fontSize: '14px',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: '24px',
      }}>
        404
      </p>

      <h1 style={{
        fontSize: 'clamp(48px, 10vw, 120px)',
        fontWeight: '800',
        letterSpacing: '-0.04em',
        lineHeight: '0.92',
        color: '#ffffff',
        marginBottom: '32px',
      }}>
        Page not<br />found.
      </h1>

      <p style={{
        fontSize: '18px',
        fontWeight: '300',
        color: 'rgba(255,255,255,0.5)',
        maxWidth: '400px',
        lineHeight: '1.7',
        marginBottom: '48px',
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 32px',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#ffffff',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          fontWeight: '500',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'border-color 0.3s, background 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
        }}
      >
        Back to home
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}

export default NotFound