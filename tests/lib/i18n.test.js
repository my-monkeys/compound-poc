import { describe, it, expect } from 'vitest'
import { detectLang, t } from '../../src/lib/i18n.js'

describe('detectLang', () => {
  it('retourne "en" pour /en/pea', () => expect(detectLang('/en/pea')).toBe('en'))
  it('retourne "fr" pour /pea', () => expect(detectLang('/pea')).toBe('fr'))
  it('retourne "fr" pour /', () => expect(detectLang('/')).toBe('fr'))
})

describe('t', () => {
  it('retourne la string FR par défaut', () => expect(t('fr', 'share')).toBe('Partager'))
  it('retourne la string EN', () => expect(t('en', 'share')).toBe('Share'))
  it('retourne la clé si introuvable', () => expect(t('fr', 'cle_inconnue')).toBe('cle_inconnue'))
})
