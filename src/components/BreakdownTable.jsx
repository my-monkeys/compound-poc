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

  const thStyle = { color: '#526878', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', fontWeight: 500, padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1e2a3c' }

  return (
    <div className="table-scroll" style={{ background: '#111825', border: '1px solid #1e2a3c', borderRadius: 6, overflow: 'hidden' }}>
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
                <td style={{ padding: '6px 12px', fontSize: 11, borderBottom: '1px solid #161e2c', color: isLast ? '#c9d1d9' : '#5e7080' }}>{d.year} {t(lang, 'years')}</td>
                <td style={{ padding: '6px 12px', fontSize: 11, borderBottom: '1px solid #161e2c', color: isLast ? '#c9d1d9' : '#6b7a8d' }}>{fmt(d.contributed)}</td>
                <td style={{ padding: '6px 12px', fontSize: 11, borderBottom: '1px solid #161e2c', color: '#7a9e6e', fontWeight: isLast ? 600 : 400 }}>+{fmt(d.interest)}</td>
                <td style={{ padding: '6px 12px', fontSize: isLast ? 13 : 11, borderBottom: '1px solid #161e2c', color: '#e2cb95', fontWeight: isLast ? 600 : 400 }}>{fmt(d.total)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
