import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ShareButton from '../../src/components/ShareButton'

describe('ShareButton', () => {
  it('affiche "Partager" en FR', () => {
    render(<ShareButton params={{}} lang="fr" />)
    expect(screen.getByText('Partager')).toBeInTheDocument()
  })

  it('change le label en "Copié !" après le clic', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
    render(<ShareButton params={{ initial: 1000, monthly: 0, rate: 5, years: 10, compound: 12 }} lang="fr" />)
    fireEvent.click(screen.getByText('Partager'))
    await waitFor(() => expect(screen.getByText('Copié !')).toBeInTheDocument())
  })
})
