import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ color: '#2e3545', fontSize: 48, fontWeight: 700 }}>404</div>
      <Link to="/" style={{ color: '#4a5568', fontSize: 12, textDecoration: 'none' }}>← Retour</Link>
    </div>
  )
}
