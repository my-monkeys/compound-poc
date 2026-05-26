const KEY = 'compound_v1'
const MAX = 20

export function createSimulation(name, params) {
  return { id: crypto.randomUUID(), name, createdAt: Date.now(), params }
}

export function listSimulations() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function saveSimulation(sim) {
  const next = [sim, ...listSimulations().filter(s => s.id !== sim.id)].slice(0, MAX)
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function deleteSimulation(id) {
  const next = listSimulations().filter(s => s.id !== id)
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function getSimulation(id) {
  return listSimulations().find(s => s.id === id) ?? null
}
