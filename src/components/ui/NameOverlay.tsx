import { useArenaTheme } from '../../context/ArenaThemeContext'
import { useScrollProgress } from '../../hooks/useScrollStore'

export default function NameOverlay() {
  const { theme } = useArenaTheme()
  const progress = useScrollProgress()
  const opacity = Math.max(0, 1 - progress * 5)

  if (opacity <= 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 80,
        left: 40,
        zIndex: 10,
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 0.1s ease',
      }}
    >
      <h1
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 900,
          letterSpacing: '0.05em',
          color: '#fff',
          lineHeight: 1.1,
          textShadow: `0 0 40px ${theme.accentColor}44`,
          margin: 0,
        }}
      >
        HUZAYFA JASAT
      </h1>
      <p
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(12px, 1.5vw, 18px)',
          fontWeight: 400,
          letterSpacing: '0.3em',
          color: theme.accentColor,
          marginTop: 8,
          textTransform: 'uppercase',
        }}
      >
        Software Engineer
      </p>
      <a
        href="/Huzayfa_Jasat_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: 16,
          padding: '8px 20px',
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(10px, 1.2vw, 14px)',
          fontWeight: 600,
          letterSpacing: '0.15em',
          color: theme.accentColor,
          border: `1px solid ${theme.accentColor}66`,
          background: `${theme.accentColor}15`,
          textDecoration: 'none',
          textTransform: 'uppercase',
          cursor: 'pointer',
          pointerEvents: 'auto',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${theme.accentColor}30`
          e.currentTarget.style.borderColor = theme.accentColor
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = `${theme.accentColor}15`
          e.currentTarget.style.borderColor = `${theme.accentColor}66`
        }}
      >
        View Resume
      </a>
      <div
        style={{
          display: 'flex',
          gap: 14,
          marginTop: 14,
          pointerEvents: 'auto',
        }}
      >
        {[
          {
            href: 'https://www.linkedin.com/in/huzayfa-jasat/',
            label: 'LinkedIn',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            ),
          },
          {
            href: 'https://github.com/huzayfa-jasat',
            label: 'GitHub',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            ),
          },
          {
            href: 'https://x.com/HuzayfaJasat',
            label: 'X',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            ),
          },
          {
            href: 'mailto:huzayfajasat@gmail.com',
            label: 'Email',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            ),
          },
        ].map(({ href, label, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              color: theme.accentColor,
              opacity: 0.7,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  )
}
