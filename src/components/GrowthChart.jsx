import { calculateBreakdown } from '../lib/compound'
import { t } from '../lib/i18n'

function toPath(points, key, chartH, padT, maxVal) {
  return points.map((p, i) => {
    const y = padT + chartH - (p[key] / maxVal) * chartH
    return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

export default function GrowthChart({ params, lang }) {
  const breakdown = calculateBreakdown(params)
  const W = 760, H = 120
  const padT = 4, padB = 18
  const chartH = H - padT - padB
  const maxVal = breakdown[breakdown.length - 1]?.total ?? 1

  const points = breakdown.map((d, i) => ({
    x: (i / Math.max(breakdown.length - 1, 1)) * W,
    total: d.total,
    contributed: d.contributed,
  }))

  const totalPath = toPath(points, 'total', chartH, padT, maxVal)
  const contribPath = toPath(points, 'contributed', chartH, padT, maxVal)
  const totalArea = `${totalPath} L${W} ${H - padB} L0 ${H - padB} Z`
  const contribArea = `${contribPath} L${W} ${H - padB} L0 ${H - padB} Z`

  const milestones = [0.25, 0.5, 0.75].map(f => Math.round(params.years * f))

  return (
    <div style={{ background: '#0a0c11', border: '1px solid #1a1e2a', borderRadius: 6, padding: '12px 14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ color: '#4a5568', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em' }}>
          {t(lang, 'evolutionChart')}
        </span>
        <div style={{ display: 'flex', gap: 12 }}>
          {[['#4a5568', t(lang, 'contributed')], ['#e2cb95', lang === 'en' ? 'Total capital' : 'Capital total']].map(([color, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#3a4455', fontSize: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: 'block', height: 110 }}>
        <defs>
          <linearGradient id="g-total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2cb95" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#e2cb95" stopOpacity="0.02"/>
          </linearGradient>
          <linearGradient id="g-contrib" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a5568" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#4a5568" stopOpacity="0.04"/>
          </linearGradient>
        </defs>
        {milestones.map(yr => {
          const x = (yr / params.years) * W
          return <line key={yr} x1={x} y1={0} x2={x} y2={H - padB} stroke="#1a1e2a" strokeWidth="0.5"/>
        })}
        <path d={contribArea} fill="url(#g-contrib)"/>
        <path d={contribPath} stroke="#2e3545" strokeWidth="1" fill="none"/>
        <path d={totalArea} fill="url(#g-total)"/>
        <path d={totalPath} stroke="#e2cb95" strokeWidth="1.5" fill="none"/>
        {milestones.map(yr => (
          <text key={yr} x={(yr / params.years) * W} y={H - 2} fill="#2e3545" fontSize="9" textAnchor="middle">
            {yr} {t(lang, 'years')}
          </text>
        ))}
        <text x={W - 4} y={H - 2} fill="#2e3545" fontSize="9" textAnchor="end">
          {params.years} {t(lang, 'years')}
        </text>
      </svg>
    </div>
  )
}
