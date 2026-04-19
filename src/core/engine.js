// === GAME ENGINE ===
import { createPlayer, getCargoAmount, calculateRank, getLaserDamage, getShieldLevel, calculateMaxShields, calculateMaxHull } from './player.js'
import { generateGalaxy, generatePrices, distance, fuelCost, getSystemById } from './galaxy.js'
import { ENEMY_TYPES, LASERS, SHIELDS, POLICE_LEVELS, RANKS } from './gameData.js'

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
  particles: [],
  animationId: null,
  lastUpdate: 0,
  policeLevel: 0,
  missions: [],
  combatLog: []
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
    stars: [],
    particles: [],
    policeLevel: 0,
    missions: [],
    combatLog: []
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

// Start combat with enhanced enemy AI
function startCombat() {
  const system = getCurrentSystem()
  const gov = system ? gameState.galaxy[system.id]?.government || 0 : 0
  
  // Determine enemy count based on rank and government
  const baseEnemyCount = Math.floor(Math.random() * 3) + 1
  const rankBonus = Math.floor(gameState.player.rank / 2)
  const enemyCount = Math.min(5, baseEnemyCount + rankBonus)
  
  gameState.enemies = []
  gameState.particles = []
  
  for (let i = 0; i < enemyCount; i++) {
    const type = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)]
    const healthBonus = gameState.player.rank * 5
    gameState.enemies.push({
      ...type,
      id: i,
      health: type.baseHealth + healthBonus + Math.floor(Math.random() * 40),
      maxHealth: type.baseHealth + healthBonus + Math.floor(Math.random() * 40),
      alive: true,
      lastAttack: 0,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 150,
      vx: (Math.random() - 0.5) * type.speed,
      vy: (Math.random() - 0.5) * type.speed,
      targetX: 0,
      targetY: 0
    })
  }
  
  gameState.inCombat = true
  gameState.docked = false
  gameState.speed = 2
  gameState.projectiles = []
  gameState.lastUpdate = Date.now()
  
  addCombatLog(`⚠️ АТАКА! ${enemyCount} врагов приближаются!`)
}

// Add combat log entry
function addCombatLog(message) {
  gameState.combatLog.push({
    time: Date.now(),
    message
  })
  if (gameState.combatLog.length > 50) {
    gameState.combatLog.shift()
  }
}

// Combat update with enhanced AI and particle effects
export function updateCombat(timestamp) {
  if (!gameState.inCombat) return
  
  const player = gameState.player
  const dt = timestamp - gameState.lastUpdate
  gameState.lastUpdate = timestamp
  
  // Update enemy AI and movement
  gameState.enemies.forEach(enemy => {
    if (!enemy.alive) return
    
    // Move towards player
    const dx = -enemy.x
    const dy = -enemy.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    if (dist > 0) {
      enemy.vx += (dx / dist) * 0.05 * enemy.aggression
      enemy.vy += (dy / dist) * 0.05 * enemy.aggression
    }
    
    // Apply velocity with damping
    enemy.x += enemy.vx
    enemy.y += enemy.vy
    enemy.vx *= 0.98
    enemy.vy *= 0.98
    
    // Keep enemies in bounds
    enemy.x = Math.max(-150, Math.min(150, enemy.x))
    enemy.y = Math.max(-100, Math.min(100, enemy.y))
    
    // Enemy attacks
    const attackInterval = 30000 / enemy.aggression + Math.random() * 40000
    if (timestamp - enemy.lastAttack > attackInterval) {
      enemy.lastAttack = timestamp
      
      const baseDamage = enemy.damage
      const shieldLevel = getShieldLevel(player)
      const shieldAbsorb = Math.min(player.shields, baseDamage * 0.6 * (shieldLevel * 0.2))
      
      player.shields -= shieldAbsorb
      const hullDamage = baseDamage - shieldAbsorb
      player.hull -= Math.max(0, hullDamage)
      
      addCombatLog(`💥 Враг атакует! -${Math.floor(hullDamage)} HP`)
      
      // Create hit particle
      gameState.particles.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 20,
        color: '#ff4444',
        size: 3
      })
      
      if (player.hull <= 0) {
        player.hull = 0
        endCombat(false)
      }
    }
  })
  
  // Update particles
  gameState.particles = gameState.particles.filter(p => {
    p.x += p.vx
    p.y += p.vy
    p.vx *= 0.95
    p.vy *= 0.95
    p.life--
    p.size *= 0.95
    return p.life > 0
  })
  
  // Check for victory
  if (gameState.enemies.every(e => !e.alive)) {
    endCombat(true)
  }
  
  // Update max values
  player.maxShields = calculateMaxShields(player)
  player.maxHull = calculateMaxHull(player)
}

// Fire weapon with enhanced effects
export function fireWeapon(targetEnemyId = null) {
  if (!gameState.inCombat) return
  
  const laser = LASERS[gameState.player.laser]
  const damage = laser.damage * (1 + RANKS[gameState.player.rank]?.bonus || 0)
  
  // Create projectile
  gameState.projectiles.push({
    x: 0,
    y: 0,
    dx: 0,
    dy: -1,
    damage: damage,
    life: 30,
    isEnemy: false,
    color: laser.color
  })
  
  // Find target - either specified or first alive enemy
  let target = null
  if (targetEnemyId !== null) {
    target = gameState.enemies.find(e => e.id === targetEnemyId && e.alive)
  }
  if (!target) {
    target = gameState.enemies.find(e => e.alive)
  }
  
  if (target) {
    // Damage enemy
    target.health -= damage
    
    // Create hit particles
    for (let i = 0; i < 5; i++) {
      gameState.particles.push({
        x: target.x,
        y: target.y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 15 + Math.random() * 10,
        color: target.color || '#ff4444',
        size: 2 + Math.random() * 3
      })
    }
    
    addCombatLog(`🎯 Выстрел! -${Math.floor(damage)} HP ${target.name}`)
    
    if (target.health <= 0) {
      target.alive = false
      gameState.player.kills++
      
      const rankBonus = RANKS[gameState.player.rank]?.bonus || 0
      const reward = Math.floor(target.reward * (1 + rankBonus))
      gameState.player.credits += reward
      
      addCombatLog(`💀 ${target.name} уничтожен! +${reward} Cr`)
      
      // Update rank
      const newRank = calculateRank(gameState.player.kills)
      if (newRank > gameState.player.rank) {
        gameState.player.rank = newRank
        addCombatLog(`⭐ ПОВЫШЕНИЕ! ${RANKS[newRank].name}!`)
      }
    }
  }
}

// End combat with rewards and penalties
function endCombat(victory) {
  gameState.inCombat = false
  gameState.speed = 0
  gameState.projectiles = []
  
  if (victory) {
    // Victory bonus
    const victoryBonus = 50 + Math.floor(Math.random() * 100)
    gameState.player.credits += victoryBonus
    addCombatLog(`🏆 ПОБЕДА! Бонус: +${victoryBonus} Cr`)
    
    // Chance to find cargo from wreckage
    if (Math.random() < 0.3) {
      const commodityId = Math.floor(Math.random() * 5)
      const quantity = Math.floor(Math.random() * 3) + 1
      gameState.player.cargo[commodityId] = (gameState.player.cargo[commodityId] || 0) + quantity
      addCombatLog(`📦 Найдено в обломках: ${quantity} ${COMMODITIES[commodityId].name}`)
    }
  } else {
    // Defeated - penalty
    const penalty = Math.min(500, gameState.player.credits)
    gameState.player.credits -= penalty
    gameState.player.hull = 20
    gameState.player.shields = 10
    addCombatLog(`💀 ПОРАЖЕНИЕ! Потеряно ${penalty} Cr`)
  }
  
  gameState.enemies = []
  gameState.docked = true
  saveGame()
}

// Dock at station with enhanced services
export function dock() {
  gameState.docked = true
  gameState.speed = 0
  gameState.inCombat = false
  gameState.enemies = []
  gameState.projectiles = []
  
  // Recharge shields based on shield level
  const shieldRecharge = SHIELDS[gameState.player.shield]?.recharge || 0.5
  const rechargeAmount = Math.floor(gameState.player.maxShields * shieldRecharge)
  gameState.player.shields = Math.min(
    gameState.player.maxShields,
    gameState.player.shields + rechargeAmount
  )
  
  addCombatLog('⚓ Швартовка на станции')
  saveGame()
}

// Get combat log
export function getCombatLog() {
  return gameState.combatLog
}

// Get particles
export function getParticles() {
  return gameState.particles
}

// Start flying
export function launch() {
  if (gameState.inCombat) return
  
  gameState.docked = false
  gameState.speed = 3
  gameState.flightTime = 0
}

// Update stars with enhanced graphics and particle effects
export function updateStars(canvas, timestamp) {
  const stars = gameState.stars
  
  if (stars.length === 0 || stars.length !== 200) {
    // Initialize stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        speed: Math.random() * 2 + 0.5,
        twinkle: Math.random() * Math.PI * 2
      })
    }
  }
  
  const ctx = canvas.getContext('2d')
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  
  // Clear with gradient background
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width)
  gradient.addColorStop(0, '#0a1628')
  gradient.addColorStop(1, '#000000')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Draw stars with twinkling effect
  stars.forEach(star => {
    star.z -= star.speed * (gameState.speed + 0.5)
    star.twinkle += 0.05
    
    if (star.z <= 0) {
      star.z = 1000
      star.x = Math.random() * canvas.width
      star.y = Math.random() * canvas.height
    }
    
    const sx = (star.x - cx) * (500 / star.z) + cx
    const sy = (star.y - cy) * (500 / star.z) + cy
    const sz = Math.max(0.5, (1000 - star.z) / 400)
    
    const alpha = Math.min(1, (1000 - star.z) / 300) * (0.7 + 0.3 * Math.sin(star.twinkle))
    ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`
    ctx.beginPath()
    ctx.arc(sx, sy, sz, 0, Math.PI * 2)
    ctx.fill()
  })
  
  // Draw station if docked or arriving
  if (gameState.docked || gameState.flightTime > 600) {
    gameState.flightTime += 0.004
    drawStation(ctx, cx, cy - 15, 45, gameState.flightTime)
  }
  
  // Draw enemies in combat
  if (gameState.inCombat) {
    gameState.enemies.forEach((enemy, idx) => {
      if (enemy.alive) {
        drawEnemy(ctx, cx + enemy.x, cy + enemy.y, enemy, gameState.flightTime)
      }
    })
    
    // Draw particles
    gameState.particles.forEach(p => {
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.life / 20
      ctx.beginPath()
      ctx.arc(cx + p.x, cy + p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
    })
  }
  
  // Draw projectiles
  gameState.projectiles = gameState.projectiles.filter(p => p.life > 0)
  gameState.projectiles.forEach(p => {
    ctx.strokeStyle = p.color || (p.isEnemy ? '#ff3344' : '#00ffcc')
    ctx.lineWidth = 3
    ctx.shadowColor = p.color || (p.isEnemy ? '#ff3344' : '#00ffcc')
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.moveTo(cx + p.x, cy + p.y)
    ctx.lineTo(cx + p.x + p.dx * 8, cy + p.y + p.dy * 8)
    ctx.stroke()
    ctx.shadowBlur = 0
    p.x += p.dx * 5
    p.y += p.dy * 5
    p.life--
  })
}

// Draw enhanced station with more detail
function drawStation(ctx, cx, cy, size, angle) {
  ctx.save()
  
  // Outer glow
  ctx.shadowColor = '#00ffcc'
  ctx.shadowBlur = 20
  
  // Main ring with gradient
  const ringGradient = ctx.createLinearGradient(cx - size * 2, cy, cx + size * 2, cy)
  ringGradient.addColorStop(0, 'rgba(0, 255, 204, 0.3)')
  ringGradient.addColorStop(0.5, 'rgba(0, 255, 204, 1)')
  ringGradient.addColorStop(1, 'rgba(0, 255, 204, 0.3)')
  
  ctx.strokeStyle = ringGradient
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.ellipse(cx, cy, size * 2, size * 0.7, angle, 0, Math.PI * 2)
  ctx.stroke()
  
  // Inner ring
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)'
  ctx.beginPath()
  ctx.ellipse(cx, cy, size * 0.9, size * 0.35, -angle, 0, Math.PI * 2)
  ctx.stroke()
  
  // Rotating spokes
  for (let i = 0; i < 6; i++) {
    const an = angle + Math.PI / 3 * i
    ctx.strokeStyle = `rgba(0, 255, 204, ${0.5 + 0.5 * Math.sin(Date.now() / 500 + i)})`
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(an) * size * 0.6, cy + Math.sin(an) * size * 0.25)
    ctx.lineTo(cx + Math.cos(an) * size * 2, cy + Math.sin(an) * size * 0.7)
    ctx.stroke()
  }
  
  // Center hub with glow
  ctx.fillStyle = '#00ffcc'
  ctx.shadowBlur = 15
  ctx.beginPath()
  ctx.arc(cx, cy, size * 0.2, 0, Math.PI * 2)
  ctx.fill()
  
  // Antenna array
  ctx.strokeStyle = '#00aaff'
  ctx.shadowBlur = 8
  ctx.beginPath()
  ctx.moveTo(cx, cy - size * 0.25)
  ctx.lineTo(cx, cy - size * 1.2)
  ctx.stroke()
  
  // Antenna tip
  ctx.fillStyle = '#ff6600'
  ctx.beginPath()
  ctx.arc(cx, cy - size * 1.2, 3, 0, Math.PI * 2)
  ctx.fill()
  
  ctx.restore()
}

// Draw enhanced enemy ship with animations
function drawEnemy(ctx, cx, cy, enemy, time) {
  ctx.save()
  
  // Enemy glow based on health
  const healthRatio = enemy.health / enemy.maxHealth
  ctx.shadowColor = enemy.color || '#ff4444'
  ctx.shadowBlur = 10 + 5 * (1 - healthRatio)
  
  // Ship body with color based on type
  ctx.strokeStyle = enemy.color || '#ff4444'
  ctx.lineWidth = 2
  
  // Pulsing effect when damaged
  const pulse = 1 + 0.2 * Math.sin(time * 10) * (1 - healthRatio)
  
  ctx.beginPath()
  ctx.moveTo(cx, cy - 15 * pulse)
  ctx.lineTo(cx - 12 * pulse, cy + 8 * pulse)
  ctx.lineTo(cx - 7 * pulse, cy + 12 * pulse)
  ctx.lineTo(cx, cy + 4 * pulse)
  ctx.lineTo(cx + 7 * pulse, cy + 12 * pulse)
  ctx.lineTo(cx + 12 * pulse, cy + 8 * pulse)
  ctx.closePath()
  ctx.stroke()
  
  // Wings with animation
  const wingAngle = Math.sin(time * 5) * 0.2
  ctx.save()
  ctx.translate(cx - 6 * pulse, cy + 4 * pulse)
  ctx.rotate(wingAngle)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(-12 * pulse, 10 * pulse)
  ctx.lineTo(-7 * pulse, 4 * pulse)
  ctx.stroke()
  ctx.restore()
  
  ctx.save()
  ctx.translate(cx + 6 * pulse, cy + 4 * pulse)
  ctx.rotate(-wingAngle)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(12 * pulse, 10 * pulse)
  ctx.lineTo(7 * pulse, 4 * pulse)
  ctx.stroke()
  ctx.restore()
  
  // Engine glow with flicker
  const engineFlicker = 0.8 + 0.4 * Math.random()
  ctx.fillStyle = `rgba(255, 100, 50, ${engineFlicker})`
  ctx.beginPath()
  ctx.arc(cx - 4 * pulse, cy + 13 * pulse, 2.5 * pulse, 0, Math.PI * 2)
  ctx.arc(cx + 4 * pulse, cy + 13 * pulse, 2.5 * pulse, 0, Math.PI * 2)
  ctx.fill()
  
  // Health bar above enemy
  const barWidth = 40
  const barHeight = 4
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
  ctx.fillRect(cx - barWidth / 2, cy - 25, barWidth, barHeight)
  ctx.fillStyle = healthRatio > 0.5 ? '#00ff00' : healthRatio > 0.25 ? '#ffff00' : '#ff0000'
  ctx.fillRect(cx - barWidth / 2, cy - 25, barWidth * healthRatio, barHeight)
  
  ctx.restore()
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