import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ParamFields from '../../src/components/ParamFields'

const defaultParams = { initial: 1000, monthly: 100, rate: 7, years: 20, compound: 12 }

describe('ParamFields', () => {
  it('affiche les valeurs initiales', () => {
    render(<ParamFields params={defaultParams} onChange={vi.fn()} lang="fr" />)
    expect(screen.getByDisplayValue('1000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('7')).toBeInTheDocument()
  })

  it('appelle onChange avec le bon champ mis à jour', () => {
    const onChange = vi.fn()
    render(<ParamFields params={defaultParams} onChange={onChange} lang="fr" />)
    const input = screen.getByDisplayValue('1000')
    fireEvent.change(input, { target: { value: '5000' } })
    expect(onChange).toHaveBeenCalledWith({ ...defaultParams, initial: 5000 })
  })
})
