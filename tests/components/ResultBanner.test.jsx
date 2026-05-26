import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ResultBanner from '../../src/components/ResultBanner'

const params = { initial: 10000, monthly: 200, rate: 7, years: 20, compound: 12 }

describe('ResultBanner', () => {
  it('affiche un capital final non nul', () => {
    render(<ResultBanner params={params} lang="fr" />)
    const euroEls = screen.getAllByText(/€/)
    expect(euroEls.length).toBeGreaterThan(0)
  })

  it('affiche le label "Capital final estimé" en FR', () => {
    render(<ResultBanner params={params} lang="fr" />)
    expect(screen.getByText(/Capital final estimé/i)).toBeInTheDocument()
  })

  it('affiche le label "Estimated final capital" en EN', () => {
    render(<ResultBanner params={params} lang="en" />)
    expect(screen.getByText(/Estimated final capital/i)).toBeInTheDocument()
  })
})
