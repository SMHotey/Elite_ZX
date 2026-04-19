// === ELITE ZX - TESTS ===
// This file tests game functions directly

import { COMMODITIES, SHIPS, LASERS, SHIELDS, GOVERNMENTS, RANKS, ENEMY_TYPES, STAR_NAMES, EQUIPMENT } from '../src/core/gameData.js'
import { generateGalaxy, fuelCost } from '../src/core/galaxy.js'
import { createPlayer, getCargoAmount, calculateRank } from '../src/core/player.js'
import { initGame, getState, saveGame, dock, travelTo } from '../src/core/engine.js'

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    console.log(`✓ ${name}`)
    passed++
  } catch (e) {
    console.log(`✗ ${name}: ${e.message}`)
    failed++
  }
}

function expect(val) {
  return {
    toBe: (expected) => {
      if (val !== expected) throw new Error(`Expected ${expected}, got ${val}`)
    },
    toHaveLength: (len) => {
      if (val.length !== len) throw new Error(`Expected length ${len}, got ${val.length}`)
    },
    toBeGreaterThan: (val) => {
      if (!(val > val)) throw new Error(`Expected ${val} to be greater than`)
    },
    toBeGreaterThanOrEqual: (val) => {
      if (!(val >= val)) throw new Error(`Expected ${val} to be >=`)
    },
    toBeTruthy: () => {
      if (!val) throw new Error(`Expected truthy value`)
    }
  }
}

console.log('=== Testing Game Data ===\n')

test('COMMODITIES has 15 items', () => expect(COMMODITIES.length).toBe(15))
test('COMMODITIES have valid prices', () => COMMODITIES.forEach(cm => { expect(cm.basePrice).toBeGreaterThan(0); expect(cm.variance).toBeGreaterThan(0) }))
test('SHIPS has 9 ships', () => expect(SHIPS.length).toBe(9))
test('SHIPS have valid prices', () => SHIPS.forEach(s => expect(s.price).toBeGreaterThanOrEqual(0)))
test('SHIPS have SVG', () => SHIPS.forEach(s => expect(s.svg).toBeTruthy()))
test('LASERS has 4 types', () => expect(LASERS.length).toBe(4))
test('SHIELDS has 5 levels', () => expect(SHIELDS.length).toBe(5))
test('EQUIPMENT has fuel tanks', () => expect(EQUIPMENT.fuelTanks.length).toBe(3))
test('EQUIPMENT has cargo racks', () => expect(EQUIPMENT.cargoRacks.length).toBe(3))
test('EQUIPMENT has energy', () => expect(EQUIPMENT.energy.length).toBe(3))
test('STAR_NAMES has 64 names', () => expect(STAR_NAMES.length).toBe(64))
test('ENEMY_TYPES has 5 types', () => expect(ENEMY_TYPES.length).toBe(5))
test('GOVERNMENTS has 8 types', () => expect(GOVERNMENTS.length).toBe(8))
test('RANKS has 9 ranks', () => expect(RANKS.length).toBe(9))

console.log('\n=== Testing Galaxy ===\n')

test('generateGalaxy creates 32 systems', () => expect(generateGalaxy().length).toBe(32))
test('systems have prices', () => {
  const galaxy = generateGalaxy()
  galaxy.forEach(sys => expect(sys.prices).toBeTruthy())
})
test('systems have names', () => {
  const galaxy = generateGalaxy()
  galaxy.forEach(sys => expect(sys.name).toBeTruthy())
})
test('fuelCost is positive', () => {
  const galaxy = generateGalaxy()
  expect(fuelCost(galaxy[0], galaxy[1])).toBeGreaterThan(0)
})

console.log('\n=== Testing Player ===\n')

test('createPlayer has defaults', () => {
  const player = createPlayer('TestPilot')
  expect(player.name).toBe('TestPilot')
  expect(player.credits).toBe(1000)
})
test('createPlayer default ship', () => {
  const player = createPlayer('Test')
  expect(player.currentShip).toBe('Sidewinder')
})
test('getCargoAmount works', () => {
  const player = createPlayer('Test')
  player.cargo = { 0: 5, 1: 3 }
  expect(getCargoAmount(player)).toBe(8)
})
test('calculateRank works', () => {
  expect(calculateRank(0)).toBe(0)
  expect(calculateRank(5)).toBe(1)
  expect(calculateRank(150)).toBe(8)
})

console.log('\n=== Testing Engine ===\n')

test('initGame creates state', () => {
  initGame('TestPilot')
  const state = getState()
  expect(state.user).toBe('TestPilot')
  expect(state.player).toBeTruthy()
  expect(state.galaxy.length).toBe(32)
})
test('initial state docked', () => {
  initGame('Test2')
  const state = getState()
  expect(state.docked).toBe(true)
})
test('saveGame works', () => {
  initGame('TestSave')
  saveGame() // Should not throw
})
test('dock works', () => {
  initGame('TestDock')
  dock()
  const state = getState()
  expect(state.docked).toBe(true)
})

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`)

if (failed > 0) {
  process.exit(1)
}