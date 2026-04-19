// === GALAXY GENERATION ===
import { COMMODITIES, GOVERNMENTS, STAR_NAMES } from './gameData.js'

const GALAXY_SIZE = 32

// Generate prices for a single system
export function generatePrices(eco, tech) {
  const prices = {}
  COMMODITIES.forEach((cm, i) => {
    let price = cm.basePrice +
      (tech - 7) * 10 +
      (eco - 4) * 5 +
      (Math.random() - 0.5) * cm.variance
    prices[i] = Math.max(10, Math.floor(price))
  })
  return prices
}

// Generate galaxy with all systems
export function generateGalaxy() {
  const systems = []
  const usedNames = new Set()
  
  for (let i = 0; i < GALAXY_SIZE; i++) {
    let name
    do {
      name = STAR_NAMES[i % STAR_NAMES.length] + (i >= 24 ? '-' + Math.floor(i / 24) : '')
    } while (usedNames.has(name))
    usedNames.add(name)
    
    systems.push({
      id: i,
      name: name,
      government: Math.floor(Math.random() * 8),
      economy: Math.floor(Math.random() * 8),
      techLevel: Math.floor(Math.random() * 14) + 1,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      prices: generatePrices(Math.floor(Math.random() * 8), Math.floor(Math.random() * 14) + 1)
    })
  }
  
  return systems
}

// Calculate distance between two systems
export function distance(systemA, systemB) {
  const dx = systemB.x - systemA.x
  const dy = systemB.y - systemA.y
  return Math.sqrt(dx * dx + dy * dy)
}

// Get fuel cost for jump
export function fuelCost(fromSystem, toSystem) {
  return Math.ceil(distance(fromSystem, toSystem) * 2)
}

// Get system by ID
export function getSystemById(galaxy, id) {
  return galaxy.find(s => s.id === id)
}

// Bar rumors
export function generateRumors(galaxy, currentSystemId) {
  const rumors = [
    `High prices for Gold in ${galaxy[(currentSystemId + 1) % 32].name}!`,
    `Pirates in sector!`,
    `Cheap Food in ${galaxy[(currentSystemId + 3) % 32].name}`,
    `Artifacts in ${galaxy[(currentSystemId + 5) % 32].name}!`,
    `Platinum in ${galaxy[(currentSystemId + 2) % 32].name} x3 normal price.`,
    `War has broken out in ${galaxy[(currentSystemId + 4) % 32].name}`,
    ` Cheap Tech in ${galaxy[(currentSystemId + 7) % 32].name}`,
    `Police activity high in ${galaxy[(currentSystemId + 6) % 32].name}`
  ]
  return rumors[Math.floor(Math.random() * rumors.length)]
}