export function calculateFV({ initial, monthly, rate, years, compound }) {
  const r = rate / 100
  const n = compound
  const t = years

  if (r === 0) return initial + monthly * n * t

  const monthlyRate = r / n
  const factor = Math.pow(1 + monthlyRate, n * t)
  return initial * factor + monthly * ((factor - 1) / monthlyRate)
}

export function calculateBreakdown({ initial, monthly, rate, years, compound }) {
  return Array.from({ length: years }, (_, i) => {
    const year = i + 1
    const total = calculateFV({ initial, monthly, rate, years: year, compound })
    const contributed = initial + monthly * compound * year
    return { year, total, contributed, interest: total - contributed }
  })
}
