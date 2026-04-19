export default function StatusBadge() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 80,
        right: 30,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 18px',
        background: 'rgba(0, 255, 100, 0.1)',
        border: '1px solid rgba(0, 255, 100, 0.4)',
        borderRadius: 20,
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        color: '#00ff64',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#00ff64',
          boxShadow: '0 0 8px #00ff64',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
      Open to Work
    </div>
  )
}
