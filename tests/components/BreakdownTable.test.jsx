import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BreakdownTable from '../../src/components/BreakdownTable'

const params = { initial: 10000, monthly: 200, rate: 7, years: 20, compound: 12 }

describe('BreakdownTable', () => {
  it('affiche 4 lignes de données (3 jalons + final)', () => {
    render(<BreakdownTable params={params} lang="fr" />)
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(5) // 1 header + 4 data rows
  })

  it('la dernière ligne correspond à la durée totale', () => {
    render(<BreakdownTable params={params} lang="fr" />)
    expect(screen.getByText('20 ans')).toBeInTheDocument()
  })
})
