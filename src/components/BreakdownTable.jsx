import { calculateBreakdown } from '../lib/compound'
import { t } from '../lib/i18n'

const fmt = n => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

export default function BreakdownTable({ params, lang }) {
  const all = calculateBreakdown(params)
  const milestones = [
    Math.round(params.years * 0.25),
    Math.round(params.years * 0.5),
    Math.round(params.years * 0.75),
    params.years,
  ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0)

  const rows = milestones.map(y => all[y - 1]).filter(Boolean)

  const thStyle = { color: '#2e3545', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', fontWeight: 500, padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1a1e2a' }

  return (
    <div className="table-scroll" style={{ background: '#0a0c11', border: '1px solid #1a1e2a', borderRadius: 6, overflow: 'hidden' }}>
      <table style={{ width: '100%', minWidth: 360, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>{t(lang, 'year')}</th>
            <th style={thStyle}>{t(lang, 'totalContributed')}</th>
            <th style={thStyle}>{t(lang, 'totalInterest')}</th>
            <th style={thStyle}>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d, i) => {
            const isLast = i === rows.length - 1
            return (
              <tr key={d.year}>
                <td style={{ padding: '6px 12px', fontSize: 11, borderBottom: '1px solid #111520', color: isLast ? '#c9d1d9' : '#3a4455' }}>{d.year} {t(lang, 'years')}</td>
                <td style={{ padding: '6px 12px', fontSize: 11, borderBottom: '1px solid #111520', color: isLast ? '#c9d1d9' : '#4a5568' }}>{fmt(d.contributed)}</td>
                <td style={{ padding: '6px 12px', fontSize: 11, borderBottom: '1px solid #111520', color: '#7a9e6e', fontWeight: isLast ? 600 : 400 }}>+{fmt(d.interest)}</td>
                <td style={{ padding: '6px 12px', fontSize: isLast ? 13 : 11, borderBottom: '1px solid #111520', color: '#e2cb95', fontWeight: isLast ? 600 : 400 }}>{fmt(d.total)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
