import { t } from '../lib/i18n'

function Field({ label, fieldKey, params, onChange, opts = {} }) {
  return (
    <div style={{ background: '#0a0c11', border: '1px solid #1a1e2a', borderRadius: 5, padding: '9px 11px', cursor: 'text' }}>
      <div style={{ color: '#2e3545', fontSize: 9, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 3 }}>{label}</div>
      {opts.select ? (
        <select
          value={params[fieldKey]}
          onChange={e => onChange({ ...params, [fieldKey]: Number(e.target.value) })}
          style={{ background: 'transparent', border: 'none', color: '#e2cb95', fontSize: 14, fontWeight: 600, width: '100%', outline: 'none' }}
        >
          {opts.select.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input
          type="number"
          value={params[fieldKey]}
          min={opts.min ?? 0}
          max={opts.max}
          step={opts.step ?? 1}
          onChange={e => onChange({ ...params, [fieldKey]: Number(e.target.value) })}
          style={{ background: 'transparent', border: 'none', color: '#e2cb95', fontSize: 14, fontWeight: 600, width: '100%', outline: 'none', letterSpacing: '-.01em' }}
        />
      )}
    </div>
  )
}

export default function ParamFields({ params, onChange, lang }) {
  const compoundOptions = [
    { value: 12, label: t(lang, 'monthly') },
    { value: 1, label: t(lang, 'yearly') },
    { value: 365, label: t(lang, 'daily') },
  ]

  return (
    <div className="param-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 8 }}>
      <Field label={t(lang, 'initialCapital')} fieldKey="initial" params={params} onChange={onChange} opts={{ min: 0 }} />
      <Field label={t(lang, 'monthlyContribution')} fieldKey="monthly" params={params} onChange={onChange} opts={{ min: 0 }} />
      <Field label={t(lang, 'annualRate')} fieldKey="rate" params={params} onChange={onChange} opts={{ min: 0, max: 100, step: 0.1 }} />
      <Field label={t(lang, 'duration')} fieldKey="years" params={params} onChange={onChange} opts={{ min: 1, max: 50 }} />
      <Field label={t(lang, 'compounding')} fieldKey="compound" params={params} onChange={onChange} opts={{ select: compoundOptions }} />
    </div>
  )
}
