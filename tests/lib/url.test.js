import { describe, it, expect } from 'vitest'
import { encodeParams, decodeParams } from '../../src/lib/url.js'

const params = { initial: 10000, monthly: 200, rate: 7, years: 20, compound: 12 }

describe('encodeParams', () => {
  it('produit une query string avec i, m, r, y, c', () => {
    const qs = encodeParams(params)
    expect(qs).toContain('i=10000')
    expect(qs).toContain('m=200')
    expect(qs).toContain('r=7')
    expect(qs).toContain('y=20')
    expect(qs).toContain('c=12')
  })
})

describe('decodeParams', () => {
  it('reconstruit les params depuis la query string', () => {
    const qs = encodeParams(params)
    expect(decodeParams('?' + qs)).toEqual(params)
  })

  it('retourne null si params incomplets', () => {
    expect(decodeParams('?i=1000')).toBeNull()
  })

  it('retourne null si query string vide', () => {
    expect(decodeParams('')).toBeNull()
  })

  it('monthly peut être 0', () => {
    const p = { ...params, monthly: 0 }
    expect(decodeParams('?' + encodeParams(p))).toEqual(p)
  })
})
