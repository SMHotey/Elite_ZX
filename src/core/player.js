// === PLAYER STATE MANAGEMENT ===
import { SHIPS, LASERS, SHIELDS, RANKS } from './gameData.js'
import { generateGalaxy } from './galaxy.js'

// Default player state
export function createPlayer(name) {
  return {
    name: name,
    credits: 1000,
    rank: 0,
    kills: 0,
    currentShip: 'Sidewinder',
    cargo: {},           // commodityId -> quantity
    cargoCapacity: 15,
    fuel: 100,
    maxFuel: 100,
    hull: 100,
    maxHull: 100,
    shields: 100,
    maxShields: 100,
    laser: 0,          // index in LASERS
    shield: 0,        // index in SHIELDS
    hasScoop: false,
    visitedSystems: [0]
  }
}

// Get current ship stats
export function getShipStats(player) {
  return SHIPS.find(s => s.name === player.currentShip) || SHIPS[0]
}

// Calculate max shields based on ship and shield unit
export function calculateMaxShields(player) {
  const ship = getShipStats(player)
  return 50 + ship.shield * 30
}

// Calculate max hull based on ship
export function calculateMaxHull(player) {
  return 100
}

// Get laser damage
export function getLaserDamage(player) {
  return LASERS[player.laser].damage
}

// Get shield level
export function getShieldLevel(player) {
  return SHIELDS[player.shield].level
}

// Get current cargo amount
export function getCargoAmount(player) {
  return Object.values(player.cargo).reduce((a, b) => a + b, 0)
}

// Get rank info
export function getRankInfo(player) {
  return RANKS.find((r, i) => i === player.rank) || RANKS[0]
}

// Calculate rank from kills
export function calculateRank(kills) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (kills >= RANKS[i].kills) return i
  }
  return 0
}

// Buy ship
export function buyShip(player, shipName) {
  const ship = SHIPS.find(s => s.name === shipName)
  if (!ship) return { success: false, error: 'Ship not found' }
  if (player.credits < ship.price) return { success: false, error: 'Not enough credits' }
  
  return {
    success: true,
    player: {
      ...player,
      credits: player.credits - ship.price,
      currentShip: ship.name,
      cargoCapacity: ship.cargo,
      maxHull: calculateMaxHull(player),
      maxShields: calculateMaxShields(player),
      hull: calculateMaxHull(player),
      shields: calculateMaxShields(player),
      cargo: {}
    }
  }
}

// Buy laser upgrade
export function buyLaser(player) {
  if (player.laser >= LASERS.length - 1) {
    return { success: false, error: 'Already at max level' }
  }
  const nextLaser = LASERS[player.laser + 1]
  if (player.credits < nextLaser.price) {
    return { success: false, error: 'Not enough credits' }
  }
  return {
    success: true,
    player: {
      ...player,
      credits: player.credits - nextLaser.price,
      laser: player.laser + 1
    }
  }
}

// Buy shield upgrade
export function buyShield(player) {
  if (player.shield >= SHIELDS.length - 1) {
    return { success: false, error: 'Already at max level' }
  }
  const nextShield = SHIELDS[player.shield + 1]
  if (player.credits < nextShield.price) {
    return { success: false, error: 'Not enough credits' }
  }
  const newShieldLevel = nextShield.level
  const newMaxShields = 50 + newShieldLevel * 30
  return {
    success: true,
    player: {
      ...player,
      credits: player.credits - nextShield.price,
      shield: player.shield + 1,
      maxShields: newMaxShields,
      shields: newMaxShields
    }
  }
}

// Buy cargo expansion
export function buyCargoExpansion(player) {
  if (player.credits < 3000) {
    return { success: false, error: 'Not enough credits' }
  }
  return {
    success: true,
    player: {
      ...player,
      credits: player.credits - 3000,
      cargoCapacity: player.cargoCapacity + 5
    }
  }
}

// Buy scoop
export function buyScoop(player) {
  if (player.hasScoop) {
    return { success: false, error: 'Already have scoop' }
  }
  if (player.credits < 5000) {
    return { success: false, error: 'Not enough credits' }
  }
  return {
    success: true,
    player: {
      ...player,
      credits: player.credits - 5000,
      hasScoop: true
    }
  }
}

// Repair hull
export function repairHull(player, amount) {
  const needed = player.maxHull - player.hull
  if (needed <= 0) return { success: false, error: 'Already full' }
  
  const repairAmount = Math.min(needed, amount)
  const cost = repairAmount
  
  if (player.credits < cost) {
    // Repair what we can afford
    const affordable = Math.min(repairAmount, player.credits)
    return {
      success: true,
      player: {
        ...player,
        credits: 0,
        hull: player.hull + affordable
      },
      cost: affordable
    }
  }
  
  return {
    success: true,
    player: {
      ...player,
      credits: player.credits - cost,
      hull: player.maxHull
    },
    cost: cost
  }
}

// Refuel
export function refuel(player, amount) {
  const needed = player.maxFuel - player.fuel
  if (needed <= 0) return { success: false, error: 'Already full' }
  
  const fuelAmount = Math.min(needed, amount)
  const cost = Math.ceil(fuelAmount / 10) * 5
  
  if (player.credits < cost) {
    const affordable = Math.floor(player.credits / 5) * 10
    const actualFuel = Math.min(needed, affordable)
    return {
      success: true,
      player: {
        ...player,
        credits: Math.max(0, player.credits - Math.ceil(actualFuel / 10) * 5),
        fuel: player.fuel + actualFuel
      },
      cost: Math.ceil(actualFuel / 10) * 5
    }
  }
  
  return {
    success: true,
    player: {
      ...player,
      credits: player.credits - cost,
      fuel: player.maxFuel
    },
    cost: cost
  }
}

// Buy commodity
export function buyCommodity(player, commodityId, quantity) {
  const currentCargo = getCargoAmount(player)
  const availableSpace = player.cargoCapacity - currentCargo
  
  if (availableSpace <= 0) {
    return { success: false, error: 'No cargo space' }
  }
  
  const buyQuantity = Math.min(quantity, availableSpace)
  // Price would come from system prices - this is handled by the game state
  
  return {
    success: true,
    quantity: buyQuantity
  }
}

// Sell commodity
export function sellCommodity(player, commodityId, quantity) {
  if (!player.cargo[commodityId] || player.cargo[commodityId] <= 0) {
    return { success: false, error: 'No cargo' }
  }
  
  const sellQuantity = Math.min(quantity, player.cargo[commodityId])
  
  return {
    success: true,
    quantity: sellQuantity
  }
}