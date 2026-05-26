export default function SimCard({ sim, active, onSelect, onDelete }) {
  const { name, params } = sim

  return (
    <div
      onClick={() => onSelect(sim)}
      style={{
        padding: '7px 8px',
        borderRadius: 5,
        marginBottom: 1,
        cursor: 'pointer',
        background: active ? '#161b26' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: active ? '#e2cb95' : '#6b7a8d' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: active ? '#e8eaf0' : '#c9d1d9', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </div>
        <div style={{ color: active ? '#6b7a8d' : '#5e7080', fontSize: 10, marginTop: 1 }}>
          {params.years} ans
        </div>
      </div>
      {active && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(sim.id) }}
          style={{ background: 'none', border: 'none', color: '#526878', fontSize: 14, lineHeight: 1, padding: '0 2px' }}
          aria-label="Supprimer"
        >×</button>
      )}
    </div>
  )
}
