import { calculateFV } from '../lib/compound'
import { t } from '../lib/i18n'

const fmt = n => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

export default function ResultBanner({ params, lang }) {
  const total = calculateFV(params)
  const contributed = params.initial + params.monthly * params.compound * params.years
  const interest = total - contributed

  return (
    <div className="result-banner" style={{ background: '#131e2c', border: '1px solid #243345', borderLeft: '2px solid #e2cb9555', borderRadius: 6, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
      <div>
        <div style={{ color: '#6b7a8d', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>
          {t(lang, 'finalCapital')}
        </div>
        <div style={{ color: '#fff', fontSize: 26, fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1 }}>
          {fmt(total)}
        </div>
        <div style={{ color: '#667585', fontSize: 11, marginTop: 6 }}>
          <span style={{ color: '#7a9e6e', fontWeight: 500 }}>+{fmt(interest)}</span>
          {' '}{t(lang, 'interest').toLowerCase()}
        </div>
      </div>
      <div className="result-banner-stats" style={{ display: 'flex', gap: 20, flexShrink: 0 }}>
        {[
          [t(lang, 'totalContributed'), fmt(contributed), false],
          [t(lang, 'totalInterest'), fmt(interest), true],
        ].map(([label, val, positive]) => (
          <div key={label}>
            <div style={{ color: '#526878', fontSize: 10, marginBottom: 2 }}>{label}</div>
            <div style={{ color: positive ? '#7a9e6e' : '#8b949e', fontSize: 13, fontWeight: 500 }}>{positive ? '+' : ''}{val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
