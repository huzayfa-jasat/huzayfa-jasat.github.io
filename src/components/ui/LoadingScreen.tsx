import { useProgress, Html } from '@react-three/drei'

export default function LoadingScreen() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          color: '#fff',
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '0.1em' }}>
          HUZAYFA JASAT
        </div>
        <div
          style={{
            width: 200,
            height: 3,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#00d4ff',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)' }}>
          LOADING ARENA
        </div>
      </div>
    </Html>
  )
}
