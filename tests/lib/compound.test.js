import { describe, it, expect } from 'vitest'
import { calculateFV, calculateBreakdown } from '../../src/lib/compound.js'

describe('calculateFV', () => {
  it('retourne le capital initial si taux = 0 et pas de versements', () => {
    expect(calculateFV({ initial: 1000, monthly: 0, rate: 0, years: 10, compound: 12 })).toBe(1000)
  })

  it('calcule correctement les intérêts composés mensuels', () => {
    // 1000 € à 12%/an composé mensuellement pendant 1 an ≈ 1126.83 €
    const result = calculateFV({ initial: 1000, monthly: 0, rate: 12, years: 1, compound: 12 })
    expect(result).toBeCloseTo(1126.83, 1)
  })

  it('inclut les versements mensuels', () => {
    // 0 initial + 100 €/mois à 0% pendant 1 an = 1200 €
    expect(calculateFV({ initial: 0, monthly: 100, rate: 0, years: 1, compound: 12 })).toBeCloseTo(1200, 0)
  })

  it('calcule 10000 € à 7% / 200 €/mois / 20 ans', () => {
    const result = calculateFV({ initial: 10000, monthly: 200, rate: 7, years: 20, compound: 12 })
    expect(result).toBeCloseTo(144573, -2)
  })
})

describe('calculateBreakdown', () => {
  it('retourne un tableau de longueur égale à la durée', () => {
    const bd = calculateBreakdown({ initial: 1000, monthly: 0, rate: 5, years: 5, compound: 12 })
    expect(bd).toHaveLength(5)
  })

  it('chaque entrée a year, total, contributed, interest', () => {
    const bd = calculateBreakdown({ initial: 1000, monthly: 0, rate: 5, years: 1, compound: 12 })
    expect(bd[0]).toMatchObject({ year: 1, total: expect.any(Number), contributed: expect.any(Number), interest: expect.any(Number) })
  })

  it('interest = total - contributed', () => {
    const bd = calculateBreakdown({ initial: 1000, monthly: 100, rate: 7, years: 3, compound: 12 })
    bd.forEach(d => expect(d.interest).toBeCloseTo(d.total - d.contributed, 5))
  })
})
