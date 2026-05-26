import { describe, it, expect, beforeEach } from 'vitest'
import { listSimulations, saveSimulation, deleteSimulation, getSimulation, createSimulation } from '../../src/lib/storage.js'

beforeEach(() => localStorage.clear())

const mockSim = (name = 'Test') => createSimulation(name, { initial: 1000, monthly: 100, rate: 7, years: 20, compound: 12 })

describe('createSimulation', () => {
  it('retourne un objet avec id, name, createdAt, params', () => {
    const sim = mockSim('PEA')
    expect(sim).toMatchObject({ name: 'PEA', params: expect.any(Object) })
    expect(typeof sim.id).toBe('string')
    expect(typeof sim.createdAt).toBe('number')
  })
})

describe('listSimulations', () => {
  it('retourne un tableau vide si localStorage est vide', () => {
    expect(listSimulations()).toEqual([])
  })
})

describe('saveSimulation', () => {
  it('sauvegarde et retrouve une simulation', () => {
    const sim = mockSim()
    saveSimulation(sim)
    expect(listSimulations()).toHaveLength(1)
    expect(listSimulations()[0].id).toBe(sim.id)
  })

  it('met à jour une simulation existante (même id)', () => {
    const sim = mockSim()
    saveSimulation(sim)
    saveSimulation({ ...sim, name: 'Modifié' })
    const list = listSimulations()
    expect(list).toHaveLength(1)
    expect(list[0].name).toBe('Modifié')
  })

  it('place la simulation sauvegardée en premier', () => {
    const a = mockSim('A')
    const b = mockSim('B')
    saveSimulation(a)
    saveSimulation(b)
    expect(listSimulations()[0].id).toBe(b.id)
  })
})

describe('deleteSimulation', () => {
  it('supprime la simulation par id', () => {
    const sim = mockSim()
    saveSimulation(sim)
    deleteSimulation(sim.id)
    expect(listSimulations()).toHaveLength(0)
  })
})

describe('getSimulation', () => {
  it('retourne la simulation par id', () => {
    const sim = mockSim()
    saveSimulation(sim)
    expect(getSimulation(sim.id)?.id).toBe(sim.id)
  })

  it('retourne null si introuvable', () => {
    expect(getSimulation('inexistant')).toBeNull()
  })
})
