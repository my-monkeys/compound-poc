import SimCard from './SimCard'
import { Plus } from 'lucide-react'
import { t } from '../lib/i18n'

export default function Sidebar({ simulations, activeId, onSelect, onDelete, onNew, lang }) {
  return (
    <div style={{
      width: 188,
      flexShrink: 0,
      background: '#090b10',
      borderRight: '1px solid #161b26',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Brand */}
      <div style={{ padding: '14px 14px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #161b26' }}>
        <div style={{ width: 20, height: 20, background: '#e2cb9520', border: '1px solid #e2cb9440', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#e2cb95" strokeWidth="1.5">
            <path d="M2 10 C2 6 6 6 6 3 C6 6 10 6 10 10" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ color: '#e8eaf0', fontSize: 13, fontWeight: 600, letterSpacing: '-.01em' }}>Compound</span>
      </div>

      {/* List */}
      <div style={{ padding: '16px 10px 4px', flex: 1, overflowY: 'auto' }}>
        <div style={{ color: '#2e3545', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', padding: '0 4px', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
          <span>{t(lang, 'simulationsLabel')}</span>
          <span style={{ color: '#3a4455' }}>{simulations.length}</span>
        </div>
        {simulations.map(sim => (
          <SimCard
            key={sim.id}
            sim={sim}
            active={sim.id === activeId}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* New button */}
      <div style={{ padding: '0 10px 12px' }}>
        <button
          onClick={onNew}
          style={{ width: '100%', padding: '6px 8px', background: 'none', border: '1px dashed #1e2535', borderRadius: 5, color: '#3a4455', fontSize: 11, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Plus size={10} />
          {t(lang, 'newSimulation')}
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding: 10, borderTop: '1px solid #161b26', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#2e3545', fontSize: 10 }}>FR · EUR</span>
      </div>
    </div>
  )
}
