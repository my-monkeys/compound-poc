export function encodeParams({ initial, monthly, rate, years, compound }) {
  const p = new URLSearchParams()
  p.set('i', String(initial))
  p.set('m', String(monthly))
  p.set('r', String(rate))
  p.set('y', String(years))
  p.set('c', String(compound))
  return p.toString()
}

export function decodeParams(search) {
  const p = new URLSearchParams(search)
  const initial = Number(p.get('i'))
  const monthly = Number(p.get('m') ?? 0)
  const rate = Number(p.get('r'))
  const years = Number(p.get('y'))
  const compound = Number(p.get('c'))
  if (!initial || !rate || !years || !compound) return null
  return { initial, monthly, rate, years, compound }
}
