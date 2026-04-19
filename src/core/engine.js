// === GAME ENGINE ===
import { createPlayer, getCargoAmount, calculateRank, getLaserDamage, getShieldLevel, calculateMaxShields, calculateMaxHull } from './player.js'
import { generateGalaxy, generatePrices, distance, fuelCost, getSystemById } from './galaxy.js'
import { ENEMY_TYPES } from './gameData.js'

const STORAGE_KEY_USER = 'e_u'
const storage_KEY_GALAXY = 'eg'
const STORAGE_KEY_PLAYER = 'ep_'

// Game state singleton
let gameState = {
  user: null,
  player: null,
  galaxy: [],
  currentSystem: 0,
  docked: true,
  inCombat: false,
  speed: 0,
  flightTime: 0,
  enemies: [],
  projectiles: [],
  stars: [],
  animationId: null,
  lastUpdate: 0
}

// Initialize game
export function initGame(username) {
  const galaxy = generateGalaxy()
  
  gameState = {
    ...gameState,
    user: username,
    player: createPlayer(username),
    galaxy: galaxy,
    currentSystem: 0,
    docked: true,
    inCombat: false,
    speed: 0,
    flightTime: 0,
    enemies: [],
    projectiles: [],
    stars: []
  }
  
  return gameState
}

// Load saved game
export function loadGame(username) {
  try {
    const savedGalaxy = localStorage.getItem(storage_KEY_GALAXY)
    if (savedGalaxy) {
      gameState.galaxy = JSON.parse(savedGalaxy)
    } else {
      gameState.galaxy = generateGalaxy()
    }
    
    const savedPlayer = localStorage.getItem(STORAGE_KEY_PLAYER + username)
    if (savedPlayer) {
      gameState.player = JSON.parse(savedPlayer)
    } else {
      gameState.player = createPlayer(username)
    }
    
    gameState.user = username
    gameState.currentSystem = gameState.player.visitedSystems[0] || 0
    
    // Regenerate prices if needed
    gameState.galaxy.forEach(sys => {
      sys.prices = generatePrices(sys.economy, sys.techLevel)
    })
    
  } catch (e) {
    console.error('Load error:', e)
    gameState.player = createPlayer(username)
    gameState.galaxy = generateGalaxy()
  }
  
  return gameState
}

// Save game
export function saveGame() {
  if (!gameState.player || !gameState.user) return
  
  try {
    localStorage.setItem(storage_KEY_PLAYER + gameState.user, JSON.stringify(gameState.player))
    localStorage.setItem(storage_KEY_GALAXY, JSON.stringify(gameState.galaxy))
  } catch (e) {
    console.warn('Save failed:', e)
  }
}

// Get current state
export function getState() {
  return gameState
}

// Travel to system
export function travelTo(systemId) {
  const fromSystem = getSystemById(gameState.galaxy, gameState.currentSystem)
  const toSystem = getSystemById(gameState.galaxy, systemId)
  
  if (!fromSystem || !toSystem) {
    return { success: false, error: 'Invalid system' }
  }
  
  if (systemId === gameState.currentSystem) {
    return { success: false, error: 'Already there' }
  }
  
  const fuelNeeded = fuelCost(fromSystem, toSystem)
  
  if (gameState.player.fuel < fuelNeeded) {
    return { success: false, error: `Need ${fuelNeeded}% fuel` }
  }
  
  // Deduct fuel
  gameState.player.fuel -= fuelNeeded
  
  // Mark system as visited
  if (!gameState.player.visitedSystems.includes(systemId)) {
    gameState.player.visitedSystems.push(systemId)
  }
  
  // Random encounter
  const encounter = Math.random() < 0.3
  
  gameState.currentSystem = systemId
  gameState.docked = !encounter
  gameState.inCombat = encounter
  
  if (encounter) {
    startCombat()
  }
  
  saveGame()
  
  return {
    success: true,
    encounter: encounter,
    systemName: toSystem.name
  }
}

// Start combat
function startCombat() {
  const enemyCount = Math.floor(Math.random() * 3) + 1
  gameState.enemies = []
  
  for (let i = 0; i < enemyCount; i++) {
    const type = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)]
    gameState.enemies.push({
      ...type,
      health: type.baseHealth + Math.floor(Math.random() * 40),
      maxHealth: type.baseHealth + Math.floor(Math.random() * 40),
      alive: true,
      lastAttack: 0
    })
  }
  
  gameState.inCombat = true
  gameState.docked = false
  gameState.speed = 2
  gameState.projectiles = []
}

// Combat update
export function updateCombat(timestamp) {
  if (!gameState.inCombat) return
  
  const player = gameState.player
  const dt = timestamp - gameState.lastUpdate
  
  // Enemy attacks
  gameState.enemies.forEach(enemy => {
    if (!enemy.alive) return
    
    const attackInterval = 30000 + Math.random() * 40000
    if (timestamp - enemy.lastAttack > attackInterval) {
      enemy.lastAttack = timestamp
      
      const damage = Math.max(0, enemy.damage - getShieldLevel(player) * 3)
      const shieldAbsorb = Math.min(player.shields, damage * 0.6)
      
      player.shields -= shieldAbsorb
      player.hull -= (damage - shieldAbsorb)
      
      if (player.hull <= 0) {
        player.hull = 0
        endCombat(false)
      }
    }
  })
  
  // Check for victory
  if (gameState.enemies.every(e => !e.alive)) {
    endCombat(true)
  }
  
  // Update max values
  player.maxShields = calculateMaxShields(player)
  player.maxHull = calculateMaxHull(player)
}

// Fire weapon
export function fireWeapon() {
  if (!gameState.inCombat) return
  
  const damage = getLaserDamage(gameState.player)
  
  gameState.projectiles.push({
    x: 0,
    y: 0,
    damage: damage,
    life: 30,
    isEnemy: false
  })
  
  // Damage enemies
  gameState.enemies.forEach(enemy => {
    if (!enemy.alive) return
    
    enemy.health -= damage
    
    if (enemy.health <= 0) {
      enemy.alive = false
      gameState.player.kills++
      
      const reward = 100 + Math.floor(Math.random() * 200)
      gameState.player.credits += reward
      
      // Update rank
      const newRank = calculateRank(gameState.player.kills)
      if (newRank > gameState.player.rank) {
        gameState.player.rank = newRank
      }
    }
  })
}

// End combat
function endCombat(victory) {
  gameState.inCombat = false
  gameState.speed = 0
  gameState.enemies = []
  gameState.projectiles = []
  
  if (victory) {
    // Bonus reward already added in fireWeapon
  } else {
    // Destroyed - penalty
    gameState.player.credits = Math.max(0, gameState.player.credits - 500)
    gameState.player.hull = 50
    gameState.player.shields = 50
  }
  
  gameState.docked = true
  saveGame()
}

// Dock at station
export function dock() {
  gameState.docked = true
  gameState.speed = 0
  gameState.inCombat = false
  gameState.enemies = []
  gameState.projectiles = []
  
  // Recharge shields
  gameState.player.shields = Math.min(
    gameState.player.maxShields,
    gameState.player.shields + Math.floor(gameState.player.maxShields * 0.1)
  )
  
  saveGame()
}

// Start flying
export function launch() {
  if (gameState.inCombat) return
  
  gameState.docked = false
  gameState.speed = 3
  gameState.flightTime = 0
}

// Update stars
export function updateStars(canvas, timestamp) {
  const stars = gameState.stars
  
  if (stars.length === 0 || stars.length !== 200) {
    // Initialize stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        speed: Math.random() * 2 + 0.5
      })
    }
  }
  
  const ctx = canvas.getContext('2d')
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  
  // Clear and draw
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  stars.forEach(star => {
    star.z -= star.speed * (gameState.speed + 0.5)
    
    if (star.z <= 0) {
      star.z = 1000
      star.x = Math.random() * canvas.width
      star.y = Math.random() * canvas.height
    }
    
    const sx = (star.x - cx) * (500 / star.z) + cx
    const sy = (star.y - cy) * (500 / star.z) + cy
    const sz = Math.max(0.5, (1000 - star.z) / 400)
    
    const alpha = Math.min(1, (1000 - star.z) / 300)
    ctx.fillStyle = `rgba(180, 200, 240, ${alpha})`
    ctx.fillRect(sx, sy, sz, sz)
  })
  
  // Draw station if docked
  if (gameState.docked || gameState.flightTime > 600) {
    gameState.flightTime += 0.004
    drawStation(ctx, cx, cy - 15, 45, gameState.flightTime)
  }
  
  // Draw enemies
  if (gameState.inCombat) {
    gameState.enemies.forEach((enemy, idx) => {
      if (enemy.alive) {
        drawEnemy(ctx, cx + Math.sin(gameState.flightTime * 3 + idx * 2) * 120, cy - 15 + Math.cos(gameState.flightTime * 2 + idx * 3) * 60, enemy)
      }
    })
  }
  
  // Draw projectiles
  gameState.projectiles = gameState.projectiles.filter(p => p.life > 0)
  gameState.projectiles.forEach(p => {
    ctx.strokeStyle = p.isEnemy ? '#ff3344' : '#00ffcc'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
    ctx.lineTo(p.x + p.dx * 8, p.y + p.dy * 8)
    ctx.stroke()
    p.x += p.dx
    p.y += p.dy
    p.life--
  })
}

function drawStation(ctx, cx, cy, size, angle) {
  ctx.strokeStyle = '#00ffcc'
  ctx.lineWidth = 1.5
  ctx.shadowColor = '#00ffcc'
  ctx.shadowBlur = 6
  
  // Main ring
  ctx.beginPath()
  ctx.ellipse(cx, cy, size * 2, size * 0.6, angle, 0, Math.PI * 2)
  ctx.stroke()
  
  // Inner ring
  ctx.beginPath()
  ctx.ellipse(cx, cy, size * 0.8, size * 0.3, -angle, 0, Math.PI * 2)
  ctx.stroke()
  
  // Spokes
  for (let i = 0; i < 4; i++) {
    const an = angle + Math.PI / 2 * i
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(an) * size * 0.5, cy + Math.sin(an) * size * 0.2)
    ctx.lineTo(cx + Math.cos(an) * size * 2, cy + Math.sin(an) * size * 0.6)
    ctx.stroke()
  }
  
  // Center
  ctx.beginPath()
  ctx.arc(cx, cy, size * 0.15, 0, Math.PI * 2)
  ctx.stroke()
  
  // Antenna
  ctx.beginPath()
  ctx.moveTo(cx, cy - size * 0.2)
  ctx.lineTo(cx, cy - size * 1.1)
  ctx.stroke()
  
  ctx.shadowBlur = 0
}

function drawEnemy(ctx, cx, cy, enemy) {
  ctx.strokeStyle = '#ff3344'
  ctx.lineWidth = 1.5
  ctx.shadowColor = '#ff3344'
  ctx.shadowBlur = 5
  
  // Ship body
  ctx.beginPath()
  ctx.moveTo(cx, cy - 15)
  ctx.lineTo(cx - 11, cy + 7)
  ctx.lineTo(cx - 6, cy + 11)
  ctx.lineTo(cx, cy + 3)
  ctx.lineTo(cx + 6, cy + 11)
  ctx.lineTo(cx + 11, cy + 7)
  ctx.closePath()
  ctx.stroke()
  
  // Wings
  ctx.beginPath()
  ctx.moveTo(cx - 6, cy + 3)
  ctx.lineTo(cx - 18, cy + 14)
  ctx.lineTo(cx - 11, cy + 7)
  ctx.stroke()
  
  ctx.beginPath()
  ctx.moveTo(cx + 6, cy + 3)
  ctx.lineTo(cx + 18, cy + 14)
  ctx.lineTo(cx + 11, cy + 7)
  ctx.stroke()
  
  // Engine glow
  ctx.fillStyle = '#ff6644'
  ctx.beginPath()
  ctx.arc(cx - 3, cy + 12, 2, 0, Math.PI * 2)
  ctx.arc(cx + 3, cy + 12, 2, 0, Math.PI * 2)
  ctx.fill()
  
  ctx.shadowBlur = 0
}

// Get current system
export function getCurrentSystem() {
  return getSystemById(gameState.galaxy, gameState.currentSystem)
}

// Buy commodity from market
export function buyFromMarket(commodityId, quantity, price) {
  const player = gameState.player
  const currentCargo = getCargoAmount(player)
  const availableSpace = player.cargoCapacity - currentCargo
  
  if (availableSpace <= 0) {
    return { success: false, error: 'No cargo space' }
  }
  
  const buyQuantity = Math.min(quantity, availableSpace)
  const cost = price * buyQuantity
  
  if (player.credits < cost) {
    return { success: false, error: 'Not enough credits' }
  }
  
  player.credits -= cost
  player.cargo[commodityId] = (player.cargo[commodityId] || 0) + buyQuantity
  
  saveGame()
  
  return { success: true, quantity: buyQuantity, cost: cost }
}

// Sell commodity to market
export function sellToMarket(commodityId, quantity, price) {
  const player = gameState.player
  
  if (!player.cargo[commodityId] || player.cargo[commodityId] <= 0) {
    return { success: false, error: 'No cargo' }
  }
  
  const sellQuantity = Math.min(quantity, player.cargo[commodityId])
  const revenue = price * sellQuantity
  
  player.cargo[commodityId] -= sellQuantity
  if (player.cargo[commodityId] <= 0) {
    delete player.cargo[commodityId]
  }
  
  player.credits += revenue
  
  saveGame()
  
  return { success: true, quantity: sellQuantity, revenue: revenue }
}