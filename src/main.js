// === ELITE ZX - MAIN ENTRY POINT ===
import './styles/main.css'
import { initGame, loadGame, saveGame, getState, dock, travelTo, 
         buyFromMarket, sellToMarket, getCurrentSystemInfo } from './core/engine.js'
import { COMMODITIES, SHIPS, LASERS, SHIELDS, GOVERNMENTS, RANKS, EQUIPMENT } from './core/gameData.js'
import { createPlayer, getCargoAmount, getRankInfo } from './core/player.js'

// App state
let currentPanel = 'cockpit'
let toastTimeout = null
let animationId = null
let lastTimestamp = 0

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderApp()
  checkSavedGame()
})

function checkSavedGame() {
  const savedPlayer = localStorage.getItem('ep_')
  if (savedPlayer) {
    try {
      const data = JSON.parse(savedPlayer)
      if (data.name) {
        showAuthWithSaved(data.name)
        return
      }
    } catch (e) {}
  }
  showAuth()
}

function showAuthWithSaved(username) {
  const authEl = document.getElementById('auth')
  if (authEl) {
    const input = document.getElementById('username')
    if (input) input.value = username
    doLogin()
  } else {
    showAuth()
  }
}

function showAuth() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div id="auth">
      <canvas id="starfield-bg"></canvas>
      <div class="auth-container">
        <div class="auth-box">
          <div class="auth-header">
            <h1 class="title-glow">ELITE ZX</h1>
            <div class="subtitle-animated">КОСМИЧЕСКАЯ ТОРГОВЛЯ И СРАЖЕНИЯ</div>
          </div>
          
          <div class="auth-tabs">
            <button class="tab-btn active" data-tab="login">ВХОД</button>
            <button class="tab-btn" data-tab="register">РЕГИСТРАЦИЯ</button>
          </div>
          
          <div id="login-form" class="auth-form">
            <div class="input-group">
              <input type="text" id="username" placeholder=" " autocomplete="off">
              <label>ИМЯ ПИЛОТА</label>
              <span class="input-line"></span>
            </div>
            <div class="input-group">
              <input type="password" id="password" placeholder=" ">
              <label>ПАРОЛЬ</label>
              <span class="input-line"></span>
            </div>
            <div class="error" id="login-error"></div>
            <button class="btn-auth btn-login" onclick="window.doLogin()">
              <span>ВОЙТИ</span>
              <span class="btn-glow"></span>
            </button>
          </div>
          
          <div id="register-form" class="auth-form hidden">
            <div class="input-group">
              <input type="text" id="reg-username" placeholder=" " autocomplete="off">
              <label>ИМЯ ПИЛОТА</label>
              <span class="input-line"></span>
            </div>
            <div class="input-group">
              <input type="password" id="reg-password" placeholder=" ">
              <label>ПАРОЛЬ</label>
              <span class="input-line"></span>
            </div>
            <div class="input-group">
              <input type="password" id="reg-password2" placeholder=" ">
              <label>ПОВТОРИТЕ</label>
              <span class="input-line"></span>
            </div>
            <div class="error" id="register-error"></div>
            <button class="btn-auth btn-register" onclick="window.doRegister()">
              <span>СОЗДАТЬ АККАУНТ</span>
              <span class="btn-glow"></span>
            </button>
          </div>
          
          <div class="auth-divider">
            <span>или</span>
          </div>
          
          <button class="btn-guest" onclick="window.guestLogin()">
            <span class="guest-icon">⚡</span>
            <span>Быстрый старт</span>
          </button>
        </div>
        
        <div class="auth-footer">
          <span>© 1984 Original Elite • 2024 Elite ZX</span>
        </div>
      </div>
    </div>
  `
  
  // Starfield animation
  initStarfield()
  
  // Tab switching with animation
  document.querySelectorAll('.auth-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.auth-tabs .tab-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      
      const tab = btn.dataset.tab
      const loginForm = document.getElementById('login-form')
      const regForm = document.getElementById('register-form')
      
      if (tab === 'login') {
        loginForm.classList.remove('hidden')
        regForm.classList.add('hidden')
        loginForm.style.opacity = '0'
        loginForm.style.transform = 'translateX(-20px)'
        setTimeout(() => {
          loginForm.style.opacity = '1'
          loginForm.style.transform = 'translateX(0)'
        }, 50)
      } else {
        regForm.classList.remove('hidden')
        loginForm.classList.add('hidden')
        regForm.style.opacity = '0'
        regForm.style.transform = 'translateX(20px)'
        setTimeout(() => {
          regForm.style.opacity = '1'
          regForm.style.transform = 'translateX(0)'
        }, 50)
      }
    })
  })
  
  // Input focus effects
  document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused')
    })
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused')
      }
    })
  })
  
  // Enter key
  document.getElementById('password')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') window.doLogin()
  })
}

function initStarfield() {
  const canvas = document.getElementById('starfield-bg')
  if (!canvas) return
  
  const container = canvas.parentElement
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const stars = []
  const numStars = 200
  
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 2 + 0.5,
      size: Math.random() * 1.5 + 0.5
    })
  }
  
  let mouseX = 0, mouseY = 0
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX - canvas.width / 2) * 0.02
    mouseY = (e.clientY - canvas.height / 2) * 0.02
  })
  
  function animate() {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(5, 8, 16, 0.3)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    stars.forEach(star => {
      star.z -= 0.5
      if (star.z <= 0) {
        star.z = 2.5
        star.x = Math.random() * canvas.width
        star.y = Math.random() * canvas.height
      }
      
      const sx = (star.x + mouseX * star.z) % canvas.width
      const sy = (star.y + mouseY * star.z) % canvas.height
      const size = star.size * star.z
      
      const alpha = Math.min(1, star.z / 2)
      ctx.fillStyle = `rgba(180, 220, 255, ${alpha})`
      ctx.beginPath()
      ctx.arc(sx, sy, size, 0, Math.PI * 2)
      ctx.fill()
    })
    
    requestAnimationFrame(animate)
  }
  animate()
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

window.doLogin = function() {
  const username = document.getElementById('username')?.value.trim()
  const password = document.getElementById('password')?.value
  const errorEl = document.getElementById('login-error')
  
  if (!username || !password) {
    errorEl.textContent = 'Заполните все поля'
    return
  }
  
  // Simple auth check
  const users = JSON.parse(localStorage.getItem('e_u') || '{}')
  if (!users[username] || users[username] !== password) {
    errorEl.textContent = 'Неверный пилот или пароль'
    return
  }
  
  errorEl.textContent = ''
  loadGame(username)
  startGame()
}

window.doRegister = function() {
  const username = document.getElementById('reg-username')?.value.trim()
  const password = document.getElementById('reg-password')?.value
  const password2 = document.getElementById('reg-password2')?.value
  const errorEl = document.getElementById('register-error')
  
  if (username.length < 3) {
    errorEl.textContent = 'Минимум 3 символа'
    return
  }
  if (password.length < 4) {
    errorEl.textContent = 'Минимум 4 символа'
    return
  }
  if (password !== password2) {
    errorEl.textContent = 'Пароли не совпадают'
    return
  }
  
  const users = JSON.parse(localStorage.getItem('e_u') || '{}')
  if (users[username]) {
    errorEl.textContent = 'Имя занято'
    return
  }
  
  users[username] = password
  localStorage.setItem('e_u', JSON.stringify(users))
  
  errorEl.textContent = ''
  showToast('Аккаунт создан!', 'success')
  
  // Switch to login
  document.querySelector('.tabs button[data-tab="login"]').click()
  document.getElementById('username').value = username
  document.getElementById('password').value = password
}

window.guestLogin = function() {
  const guest = 'Guest_' + Math.floor(Math.random() * 9999)
  initGame(guest)
  startGame()
}

function startGame() {
  document.getElementById('auth')?.remove()
  renderGame()
  renderPanel(currentPanel)
  
  // Auto-save every minute
  setInterval(() => {
    const state = getState()
    if (state.player) saveGame()
  }, 60000)
  
  showToast('Добро пожаловать, пилот!', 'success')
}

function renderApp() {
  const app = document.getElementById('app')
  app.innerHTML = ''
}

function renderGame() {
  const app = document.getElementById('app')
  const state = getState()
  const player = state.player
  const system = getCurrentSystemInfo()
  
  app.innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <h1>ELITE ZX</h1>
        
        <div class="sidebar-stats">
          <div class="stat">
            <span class="stat-label">Кредиты</span>
            <span class="stat-value">${player.credits.toLocaleString()} Cr</span>
          </div>
          <div class="stat">
            <span class="stat-label">Ранг</span>
            <span class="stat-value">${getRankInfo(player).name}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Система</span>
            <span class="stat-value">${system?.name || 'Unknown'}</span>
          </div>
        </div>
        
        <nav class="nav">
          <button class="${currentPanel === 'cockpit' ? 'active' : ''}" data-panel="cockpit">
            🚀 КАБИНА
          </button>
          <button class="${currentPanel === 'station' ? 'active' : ''}" data-panel="station">
            🛸 СТАНЦИЯ
          </button>
          <button class="${currentPanel === 'trade' ? 'active' : ''}" data-panel="trade">
            📦 РЫНОК
          </button>
          <button class="${currentPanel === 'galaxy' ? 'active' : ''}" data-panel="galaxy">
            🗺️ КАРТА
          </button>
          <button class="${currentPanel === 'ship' ? 'active' : ''}" data-panel="ship">
            🛩️ КОРАБЛЬ
          </button>
          <button class="${currentPanel === 'rank' ? 'active' : ''}" data-panel="rank">
            ⭐ РАНГ
          </button>
        </nav>
        
        <div class="sidebar-actions">
          <button class="btn" onclick="window.saveGame()">💾 СОХРАНИТЬ</button>
          <button class="btn btn-danger" onclick="window.logout()">✕ ВЫХОД</button>
        </div>
      </aside>
      
      <main class="content" id="main-content">
        <!-- Panel content rendered here -->
      </main>
    </div>
    
    <div id="toast-container"></div>
    <div id="modal" class="modal hidden"></div>
  `
  
  // Navigation
  document.querySelectorAll('.nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPanel = btn.dataset.panel
      document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      renderPanel(currentPanel)
    })
  })
  
  // Render current panel
  renderPanel(currentPanel)
}

function renderPanel(panel) {
  const main = document.getElementById('main-content')
  if (!main) return
  
  const state = getState()
  const player = state.player
  const system = getCurrentSystemInfo()
  
  switch(panel) {
    case 'cockpit':
      main.innerHTML = renderCockpit(state, system)
      initCockpit()
      initScanner()
      break
    case 'station':
      main.innerHTML = renderStation(state, system)
      break
    case 'trade':
      main.innerHTML = renderTrade(state, system)
      break
    case 'galaxy':
      main.innerHTML = renderGalaxy(state)
      break
    case 'ship':
      main.innerHTML = renderShip(state)
      break
    case 'rank':
      main.innerHTML = renderRank(state)
      break
  }
}

// Quick access to game state from anywhere
function getGameState() {
  return getState()
}

function renderCockpit(state, system) {
  const player = state.player
  
  return `
    <div class="panel cockpit-full">
      <!-- Main view -->
      <div class="view-3d">
        <canvas id="cockpit-canvas"></canvas>
        
        <!-- HUD overlay -->
        <div class="hud-3d">
          <div class="hud-top">
            <div class="hud-sys">
              <span class="hud-label">СИСТЕМА</span>
              <span class="hud-val">${system?.name || 'UNKNOWN'}</span>
            </div>
            <div class="hud-status">
              ${state.docked ? '<span class="status-docked">🛸 СТАНЦИЯ</span>' : '<span class="status-fly">🚀 ПОЛЁТ</span>'}
            </div>
            <div class="hud-rank">
              <span class="hud-label">РАНГ</span>
              <span class="hud-val">${getRankInfo(player).name}</span>
            </div>
          </div>
          
          <div class="hud-bottom">
            <div class="ship-stats">
              <div class="sstat">
                <span>ENERGY</span>
                <div class="sbar"><div class="sfill e" style="width: 100%"></div></div>
              </div>
              <div class="sstat">
                <span>SHIELDS</span>
                <div class="sbar"><div class="sfill s" style="width: ${player.shields}%"></div></div>
              </div>
              <div class="sstat">
                <span>HULL</span>
                <div class="sbar"><div class="sfill h" style="width: ${player.hull}%"></div></div>
              </div>
              <div class="sstat">
                <span>FUEL</span>
                <div class="sbar"><div class="sfill f" style="width: ${player.fuel}%"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Local Scanner -->
      <div class="panel local-scanner">
        <div class="panel-header">
          <span class="panel-title">📡 СКАНЕР</span>
        </div>
        <canvas id="scanner-canvas"></canvas>
      </div>
    </div>
    
    <div class="panel controls">
      <div class="panel-header">
        <span class="panel-title">🚀 УПРАВЛЕНИЕ</span>
      </div>
      <div class="controls-grid">
        <button class="btn-fly" onclick="window.launch()">
          <span class="btn-icon">🚀</span>
          <span>ПОЛЁТ</span>
        </button>
        <button class="btn-dock" onclick="window.dockAtStation()">
          <span class="btn-icon">⚓</span>
          <span>СТЫКОВКА</span>
        </button>
        <button class="btn-combat" onclick="window.startCombat()">
          <span class="btn-icon">⚔️</span>
          <span>БОЙ</span>
        </button>
        <button class="btn-scoop" onclick="window.activateScoop()">
          <span class="btn-icon">🔥</span>
          <span>СБОР</span>
        </button>
      </div>
    </div>
    
    <div class="panel console">
      <div class="panel-header">
        <span class="panel-title">📟 КОНСОЛЬ</span>
      </div>
      <div class="console-log" id="cockpit-log"></div>
    </div>
`
}

function initCockpit() {
  const canvas = document.getElementById('cockpit-canvas')
  if (!canvas) return
  
  const container = canvas.parentElement
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
  
  // Create persistent starfield
  const stars = []
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 2 + 0.5,
      speed: Math.random() * 2 + 1
    })
  }
  
  function render(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp
    const dt = timestamp - lastTimestamp
    lastTimestamp = timestamp
    
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    
    // Clear with fade effect
    ctx.fillStyle = 'rgba(0, 5, 10, 0.3)'
    ctx.fillRect(0, 0, w, h)
    
    // Move and draw stars
    stars.forEach(star => {
      star.y += star.speed * star.z
      
      // Reset if off screen
      if (star.y > h) {
        star.y = 0
        star.x = Math.random() * w
      }
      
      const size = star.z * 0.8
      const alpha = Math.min(1, star.z / 2)
      ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`
      ctx.beginPath()
      ctx.arc(star.x, star.y, size, 0, Math.PI * 2)
      ctx.fill()
    })
    
    animationId = requestAnimationFrame(render)
  }
  
  animationId = requestAnimationFrame(render)
}

// Initialize local scanner
function initScanner() {
  const canvas = document.getElementById('scanner-canvas')
  if (!canvas) return
  
  const container = canvas.parentElement
  if (container) {
    canvas.width = Math.min(180, container.clientWidth)
    canvas.height = Math.min(120, container.clientHeight || 120)
  }
  
  const state = getState()
  const system = getCurrentSystemInfo()
  if (!system) return
  
  function render() {
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    
    ctx.fillStyle = 'rgba(0, 10, 20, 0.8)'
    ctx.fillRect(0, 0, w, h)
    
    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 204, 0.15)'
    ctx.lineWidth = 1
    for (let i = 0; i < 5; i++) {
      const x = (i / 4) * w
      const y = (i / 4) * h
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
    
    // Draw current system (center)
    ctx.fillStyle = '#00ffcc'
    ctx.shadowColor = '#00ffcc'
    ctx.shadowBlur = 8
    ctx.beginPath()
    ctx.arc(w/2, h/2, 4, 0, Math.PI * 2)
    ctx.fill()
    
    // Draw nearby systems
    state.galaxy?.forEach(sys => {
      if (!sys || sys.id === system.id) return
      
      const dx = (sys.x - system.x) * 2
      const dy = (sys.y - system.y) * 2
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 30) {
        const sx = w/2 + dx * 0.8
        const sy = h/2 + dy * 0.8
        
        // Dot for nearby systems
        ctx.fillStyle = state.player.visitedSystems?.includes(sys.id) ? '#00ff66' : '#ff8800'
        ctx.shadowBlur = 3
        ctx.beginPath()
        ctx.arc(sx, sy, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    })
    
    ctx.shadowBlur = 0
    
    requestAnimationFrame(render)
  }
  
  render()
}

window.launch = function() {
  const state = getState()
  if (state.inCombat) {
    showToast('Сначала победа в бою!', 'error')
    return
  }
  
  // Go to full screen flight
  state.docked = false
  state.speed = 3
  state.flightTime = 0
  switchToFlight()
}

// ========================================
    // FULL SCREEN FLIGHT VIEW
// ========================================
function renderFlight() {
  return `
  <div id="flight-screen">
    <canvas id="flight-canvas-full"></canvas>
    
    <!-- HUD Overlay -->
    <div class="flight-hud-top">
      <div class="hud-left">
        <span class="hud-label">СИСТЕМА</span>
        <span class="hud-value" id="flight-system">${getCurrentSystemInfo()?.name || 'Unknown'}</span>
      </div>
      <div class="hud-center">
        <span class="flight-status-large">🚀 ПРОКЛАДЫВАЮ КУРС</span>
      </div>
      <div class="hud-right">
        <span class="hud-label">СКОРОСТЬ</span>
        <span class="hud-value" id="flight-speed"> LIGHT YEARS /SEC</span>
      </div>
    </div>
    
    <div class="flight-hud-bottom">
      <div class="hud-stats">
        <div class="stat-box">
          <span class="stat-label">ЭНЕРГИЯ</span>
          <div class="stat-bar"><div class="stat-fill energy" style="width: 100%"></div></div>
        </div>
        <div class="stat-box">
          <span class="stat-label">ЩИТЫ</span>
          <div class="stat-bar"><div class="stat-fill shield" style="width: ${getState().player?.shields || 100}%"></div></div>
        </div>
        <div class="stat-box">
          <span class="stat-label">КОРПУС</span>
          <div class="stat-bar"><div class="stat-fill hull" style="width: ${getState().player?.hull || 100}%"></div></div>
        </div>
        <div class="stat-box">
          <span class="stat-label">ТОПЛИВО</span>
          <div class="stat-bar"><div class="stat-fill fuel" style="width: ${getState().player?.fuel || 100}%"></div></div>
        </div>
      </div>
    </div>
    
    <!-- Combat Controls (shown when enemies present) -->
    <div class="combat-controls" id="combat-controls" style="display: none;">
      <div class="enemy-indicator">
        <span class="blink">⚠️ ВНИМАНИЕ! ВРАГ</span>
      </div>
      <button class="btn-fire" onclick="window.fireWeapon()">
        <span class="fire-icon">🔫</span>
        <span>ОГОНЬ!</span>
      </button>
      <div class="enemy-list" id="enemy-list"></div>
    </div>
    
    <!-- Log panel -->
    <div class="flight-log" id="flight-log"></div>
  </div>
  `
}

// Switch to full screen flight mode
function switchToFlight() {
  const app = document.getElementById('app')
  if (!app) return
  
  // Hide game UI, show full flight
  app.innerHTML = renderFlight()
  
  // Start flight animation
  initFullFlight()
}

let flightAnimRunning = false

function initFullFlight() {
  const canvas = document.getElementById('flight-canvas-full')
  if (!canvas) return
  
  // Full screen canvas
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const state = getState()
  
  // Star field
  const stars = []
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * 800 + 100,
      speed: Math.random() * 4 + 2
    })
  }
  
  let startTime = Date.now()
  let flightProgress = 0
  let encounterTriggered = false
  
  function animate() {
    if (!flightAnimRunning) return
    
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const time = (Date.now() - startTime) / 1000
    
    // Clear with space gradient
    const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w, h))
    gradient.addColorStop(0, '#0a0a18')
    gradient.addColorStop(0.5, '#050510')
    gradient.addColorStop(1, '#020208')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
    
    // Draw and animate stars
    stars.forEach(star => {
      star.z -= star.speed * 2
      
      if (star.z <= 0) {
        star.z = 900
        star.x = (Math.random() - 0.5) * w * 2
        star.y = (Math.random() - 0.5) * h * 2
      }
      
      const sx = (star.x / star.z) * 300 + w/2
      const sy = (star.y / star.z) * 300 + h/2
      const size = Math.max(0.5, (900 - star.z) / 150)
      const alpha = Math.min(1, (900 - star.z) / 200)
      
      ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`
      ctx.fillRect(sx, sy, size * 2, size * 2)
    })
    
    // Draw central tunnel/flight path effect
    ctx.strokeStyle = 'rgba(0, 255, 204, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time * 0.2
      const dist = 50 + Math.sin(time + i) * 20
      ctx.beginPath()
      ctx.moveTo(w/2 + Math.cos(angle) * dist * 2, h/2 + Math.sin(angle) * dist)
      ctx.lineTo(w/2 + Math.cos(angle) * dist * 4, h/2 + Math.sin(angle) * dist * 2)
      ctx.stroke()
    }
    
    // Draw enemies if in combat
    if (state.inCombat && state.enemies) {
      state.enemies.forEach((enemy, i) => {
        if (!enemy.alive) return
        
        // Move enemies in orbit around player
        const angle = time * 0.5 + i * 1.5
        const dist = 120 + Math.sin(time * 2 + i) * 40
        enemy.x = w/2 + Math.cos(angle) * dist
        enemy.y = h/2 + Math.sin(angle * 0.7) * 80 - 20
        
        // Draw enemy ship
        ctx.save()
        ctx.translate(enemy.x, enemy.y)
        
        // Enemy glow
        ctx.shadowColor = enemy.color || '#ff4444'
        ctx.shadowBlur = 15
        
        // Ship body
        ctx.strokeStyle = enemy.color || '#ff4444'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, -15)
        ctx.lineTo(-10, 5)
        ctx.lineTo(0, 10)
        ctx.lineTo(10, 5)
        ctx.closePath()
        ctx.stroke()
        
        // Wings
        ctx.beginPath()
        ctx.moveTo(-8, 0)
        ctx.lineTo(-18, 12)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(8, 0)
        ctx.lineTo(18, 12)
        ctx.stroke()
        
        // Engine glow
        ctx.fillStyle = enemy.color || '#ff4444'
        ctx.beginPath()
        ctx.arc(0, 12, 3, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      })
    }
    
    // Flight progress
    flightProgress += 0.8
    
    // Update speed display
    const speedEl = document.getElementById('flight-speed')
    if (speedEl) {
      speedEl.textContent = ` ${Math.floor(3 + Math.sin(time * 2))} LIGHT YEARS/SEC`
    }
    
    // Update log - 100% combat encounter after initial flight for testing
    if (flightProgress > 100 && !encounterTriggered) {
      encounterTriggered = true
      state.inCombat = true
      startEncounter()
    }
    
    // Don't end flight if in combat - stay until all enemies are defeated
    if (flightProgress > 600 && !state.inCombat) {
      endFlight(true)
      return
    }
    
    // If in combat, keep going until victory or defeat
    if (state.inCombat) {
      // Keep animation running for combat
      flightProgress += 0.5
    }
    
    requestAnimationFrame(animate)
  }
  
  flightAnimRunning = true
  animate()
  
  // Log start
  addFlightLog('━━━━━━━━━━')
  addFlightLog('🚀 ДВИГАТ��ЛИ ЗАПУЩЕНЫ')
  addFlightLog('Курс: ' + getCurrentSystemInfo()?.name)
  addFlightLog('━━━━━━━━━━')
}

function startEncounter() {
  const state = getState()
  const enemyCount = 1 + Math.floor(Math.random() * 3)
  state.inCombat = true
  state.enemies = []
  
  const enemyTypes = ['ПИРАТ', 'КОНТРАБАНДИСТ', 'ОХОТНИК', 'УБИЙЦА']
  const colors = ['#ff4444', '#ff8800', '#ff00ff', '#8800ff']
  
  for (let i = 0; i < enemyCount; i++) {
    const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
    const colorIdx = enemyTypes.indexOf(type)
    state.enemies.push({
      name: type,
      color: colors[colorIdx],
      health: 30 + Math.floor(Math.random() * 40),
      maxHealth: 70,
      alive: true,
      x: 0,
      y: 0
    })
  }
  
  // Show combat UI
  const combatControls = document.getElementById('combat-controls')
  if (combatControls) {
    combatControls.style.display = 'flex'
  }
  
  // Draw enemies on canvas
  drawCombatEnemies()
  
  addFlightLog('⚠️ ВНИМАНИЕ! АТАКА!')
  addFlightLog(`Обнаружено ${enemyCount} вражеских кораблей!`)
}

function drawCombatEnemies() {
  const canvas = document.getElementById('flight-canvas-full')
  if (!canvas) return
  
  const state = getState()
  const w = canvas.width
  const h = canvas.height
  const time = Date.now() / 1000
  
  state.enemies.forEach((enemy, i) => {
    if (!enemy.alive) return
    
    // Orbiting position
    const angle = time * 0.8 + i * 2
    const dist = 100 + Math.sin(time * 2 + i) * 30
    enemy.x = w/2 + Math.cos(angle) * dist
    enemy.y = h/2 + Math.sin(angle * 0.7) * 60 - 20
    
    // Draw enemy ship on canvas (will be drawn in animation loop)
    // For now just set position
  })
  
  // Update enemy list UI
  const enemyList = document.getElementById('enemy-list')
  if (enemyList && state.enemies) {
    enemyList.innerHTML = state.enemies.filter(e => e.alive).map(e => `
      <div class="enemy-item" style="border-color: ${e.color}">
        <span style="color: ${e.color}">${e.name}</span>
        <span>HP: ${e.health}/${e.maxHealth}</span>
      </div>
    `).join('')
  }
}

function fireWeapon() {
  const state = getState()
  if (!state.inCombat || !state.enemies) return
  
  const laserDamage = LASERS[state.player.laser].damage
  let hitEnemy = false
  
  state.enemies.forEach(enemy => {
    if (!enemy.alive) return
    
    enemy.health -= laserDamage
    hitEnemy = true
    
    if (enemy.health <= 0) {
      enemy.alive = false
      const reward = 100 + Math.floor(Math.random() * 200)
      state.player.credits += reward
      state.player.kills++
      addFlightLog(`💥 ${enemy.name} УНИЧТОЖЕН! +${reward} CR`)
    }
  })
  
  if (hitEnemy) {
    addFlightLog(`🔫 ЗАЛП! -${laserDamage} HP`)
    
    // Flash effect
    const canvas = document.getElementById('flight-canvas-full')
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgba(0, 255, 200, 0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }
  
  // Check victory
  const aliveEnemies = state.enemies.filter(e => e.alive).length
  if (aliveEnemies === 0) {
    addFlightLog('🏆 ПОБЕДА! ВСЕ ВРАГИ УНИЧТОЖЕНЫ!')
    state.inCombat = false
    
    const combatControls = document.getElementById('combat-controls')
    if (combatControls) {
      combatControls.style.display = 'none'
    }
  }
}

function endFlight(safeArrival) {
  flightAnimRunning = false
  const state = getState()
  
  if (safeArrival) {
    addFlightLog('✅ ПРИБЫТИЕ В СИСТЕМУ ' + getCurrentSystemInfo()?.name)
    state.docked = true
  }
  
  // Return to COCKPIT, not galaxy
  renderGame()
  renderPanel(currentPanel || 'cockpit')
}

function addFlightLog(msg) {
  const log = document.getElementById('flight-log')
  if (!log) return
  
  const entry = document.createElement('div')
  entry.className = 'log-entry'
  entry.textContent = msg
  log.appendChild(entry)
  log.scrollTop = log.scrollHeight
}

// ========================================
    // STATION DOCKING VIEW
// ========================================
function renderDocking() {
  return `
  <div id="docking-screen">
    <canvas id="docking-canvas"></canvas>
    
    <div class="dock-hud">
      <div class="dock-title">🛸 СТЫКОВКА СО СТАНЦИЕЙ</div>
      <div class="dock-progress">
        <div class="dock-bar"><div class="dock-fill" id="dock-fill"></div></div>
        <div class="dock-percent" id="dock-percent">0%</div>
      </div>
      <div class="dock-message" id="dock-message">Подготовка к стыковке...</div>
    </div>
  </div>
  `
}

function switchToDocking() {
  const app = document.getElementById('app')
  if (!app) return
  
  app.innerHTML = renderDocking()
  initDockingAnimation()
}

function initDockingAnimation() {
  const canvas = document.getElementById('docking-canvas')
  if (!canvas) return
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const w = canvas.width
  const h = canvas.height
  let progress = 0
  
  function animate() {
    const ctx = canvas.getContext('2d')
    
    // Clear
    ctx.fillStyle = '#050810'
    ctx.fillRect(0, 0, w, h)
    
    // Draw station (large rotating space station)
    const cx = w / 2
    const cy = h / 2
    const time = Date.now() / 1000
    
    // Outer ring
    ctx.strokeStyle = '#00ffcc'
    ctx.lineWidth = 2
    ctx.shadowColor = '#00ffcc'
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.ellipse(cx, cy, 150, 60, time * 0.3, 0, Math.PI * 2)
    ctx.stroke()
    
    // Inner ring
    ctx.beginPath()
    ctx.ellipse(cx, cy, 60, 25, time * -0.5, 0, Math.PI * 2)
    ctx.stroke()
    
    // Spokes
    for (let i = 0; i < 6; i++) {
      const angle = time * 0.5 + (i * Math.PI / 3)
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(angle) * 40, cy + Math.sin(angle) * 15)
      ctx.lineTo(cx + Math.cos(angle) * 140, cy + Math.sin(angle) * 55)
      ctx.stroke()
    }
    
    // Center
    ctx.fillStyle = 'rgba(0, 255, 204, 0.3)'
    ctx.beginPath()
    ctx.arc(cx, cy, 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    // Antenna
    ctx.beginPath()
    ctx.moveTo(cx, cy - 15)
    ctx.lineTo(cx, cy - 80)
    ctx.stroke()
    
    ctx.shadowBlur = 0
    
    // Ship approaching (smaller, moving closer)
    const shipDist = 200 - progress * 1.5
    const shipX = cx
    const shipY = cy + shipDist
    
    if (shipDist > 30) {
      // Draw player ship
      ctx.fillStyle = '#00aaff'
      ctx.beginPath()
      ctx.moveTo(shipX, shipY - 8)
      ctx.lineTo(shipX - 6, shipY + 4)
      ctx.lineTo(shipX - 3, shipY + 6)
      ctx.lineTo(shipX, shipY + 2)
      ctx.lineTo(shipX + 3, shipY + 6)
      ctx.lineTo(shipX + 6, shipY + 4)
      ctx.closePath()
      ctx.fill()
      
      // Engine glow
      ctx.fillStyle = '#00ffff'
      ctx.shadowColor = '#00ffff'
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(shipX, shipY + 8, 3 + Math.sin(time * 10) * 1, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }
    
    // Update progress
    progress += 0.5
    
    const progressBar = document.getElementById('dock-fill')
    const progressText = document.getElementById('dock-percent')
    const dockMessage = document.getElementById('dock-message')
    
    if (progressBar) progressBar.style.width = Math.min(100, progress) + '%'
    if (progressText) progressText.textContent = Math.floor(Math.min(100, progress)) + '%'
    if (dockMessage) {
      if (progress < 30) dockMessage.textContent = 'Подготовка к стыковке...'
      else if (progress < 60) dockMessage.textContent = 'Сближение со станцией...'
      else if (progress < 90) dockMessage.textContent = 'Фиксация захватов...'
      else dockMessage.textContent = 'СТЫКОВКА ЗАВЕРШЕНА!'
    }
    
    if (progress < 100) {
      requestAnimationFrame(animate)
    } else {
      // Docking complete - return to game
      setTimeout(() => {
        startGame()
      }, 500)
    }
  }
  
  animate()
}

// Keep existing launch function but make it work properly
window.launch = function() {
  const state = getState()
  if (state.inCombat) {
    showToast('Сначала победа в бою!', 'error')
    return
  }
  
  // Start flight - go to full screen
  state.docked = false
  state.speed = 3
  showToast('🚀 ЗАПУСК ДВИГАТЕЛЕЙ!', 'info')
  
  switchToFlight()
}

window.dockAtStation = function() {
  switchToDocking()
}

// Draw station docking
function drawStation(ctx, w, h, time, distance) {
  const progress = Math.min(1, 1 - distance / 500)
  const cx = w / 2
  const cy = h / 2 - 30
  const size = 40 + progress * 40
  
  ctx.save()
  
  // Outer ring rotating
  ctx.strokeStyle = '#0ff'
  ctx.lineWidth = 2
  ctx.shadowColor = '#0ff'
  ctx.shadowBlur = 10
  ctx.beginPath()
  ctx.ellipse(cx, cy, size * 2, size * 0.7, time * 0.3, 0, Math.PI * 2)
  ctx.stroke()
  
  // Inner ring counter-rotating
  ctx.beginPath()
  ctx.ellipse(cx, cy, size * 0.8, size * 0.3, time * -0.5, 0, Math.PI * 2)
  ctx.stroke()
  
  // Spokes
  for (let i = 0; i < 6; i++) {
    const angle = time * 0.5 + (i * Math.PI / 3)
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(angle) * size * 0.5, cy + Math.sin(angle) * size * 0.2)
    ctx.lineTo(cx + Math.cos(angle) * size * 1.8, cy + Math.sin(angle) * size * 0.6)
    ctx.stroke()
  }
  
  // Center core
  ctx.fillStyle = '#0ff'
  ctx.globalAlpha = 0.3 + Math.sin(time * 5) * 0.1
  ctx.beginPath()
  ctx.arc(cx, cy, size * 0.15, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1
  
  ctx.strokeStyle = '#0ff'
  ctx.beginPath()
  ctx.arc(cx, cy, size * 0.15, 0, Math.PI * 2)
  ctx.stroke()
  
  // Antenna
  ctx.beginPath()
  ctx.moveTo(cx, cy - size * 0.15)
  ctx.lineTo(cx, cy - size * 1.1)
  ctx.stroke()
  
  ctx.shadowBlur = 0
  ctx.restore()
  
  // Docking progress text
  ctx.fillStyle = '#fff'
  ctx.font = '14px monospace'
  ctx.textAlign = 'center'
  ctx.fillText(`СТЫКОВКА: ${Math.floor(progress * 100)}%`, cx, cy + size + 40)
}

function initFlightAnim() {
  const canvas = document.getElementById('flight-canvas')
  if (!canvas) return
  
  const container = canvas.parentElement
  canvas.width = container.clientWidth || 600
  canvas.height = container.clientHeight || 400
  
  const stars = []
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 800 + 100,
      speed: Math.random() * 3 + 1,
      brightness: 0.3 + Math.random() * 0.7
    })
  }
  
  const state = getState()
  let startTime = Date.now()
  let lastShotTime = 0
  
  function animate() {
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const time = (Date.now() - startTime) / 1000
    
    // Clear with space gradient
    const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w)
    gradient.addColorStop(0, '#0a0a15')
    gradient.addColorStop(1, '#000')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
    
    // Draw stars with parallax
    ctx.fillStyle = '#ccd'
    stars.forEach(star => {
      star.z -= star.speed * 2.5
      if (star.z <= 0) {
        star.z = 900
        star.x = Math.random() * w
        star.y = Math.random() * h
      }
      
      const sx = (star.x - w/2) * (400 / star.z) + w/2
      const sy = (star.y - h/2) * (400 / star.z) + h/2
      const sz = Math.max(0.5, (900 - star.z) / 150)
      const sa = Math.min(1, (900 - star.z) / 250) * star.brightness
      
      ctx.globalAlpha = sa
      ctx.fillRect(sx, sy, sz * 1.5, sz * 1.5)
    })
    ctx.globalAlpha = 1
    
    // Draw station when approaching or docked
    const flightProgress = state.flightTime || 0
    if (state.docked || flightProgress > 300) {
      drawStation(ctx, w, h, time, flightProgress)
    }
    
    // Draw enemies in combat with proper rendering
    if (state.inCombat && state.enemies) {
      const enemiesEl = document.getElementById('flight-enemies')
      if (enemiesEl) {
        const alive = state.enemies.filter(e => e.alive).length
        enemiesEl.textContent = alive > 0 ? `ВРАГИ: ${alive}` : ''
        enemiesEl.style.color = alive > 0 ? '#f44' : '#4f4'
      }
      
      state.enemies.forEach((enemy, i) => {
        if (!enemy.alive) return
        
        // Orbiting enemy positions
        const angle = time * 0.8 + i * (Math.PI * 2 / 3)
        const dist = 80 + Math.sin(time * 2 + i) * 30
        const ex = w/2 + Math.cos(angle) * dist
        const ey = h/2 + Math.sin(angle * 0.7) * 50 - 20
        
        // Draw enemy ship
        const colors = { 'Пират': '#ff4444', 'Контрабандист': '#ff8800', 'Охотник': '#ff00ff', 'Убийца': '#8800ff', 'Наёмник': '#00ff88' }
        const color = colors[enemy.name] || '#ff4444'
        
        // Flash white when hit
        let drawColor = color
        if (state.hitFlash && Date.now() - state.hitFlash < 150) {
          drawColor = '#ffffff'
        }
        
        drawEnemyShip(ctx, ex, ey, drawColor, enemy.name, enemy.health, enemy.maxHealth || 50, time)
      })
    }
    
    // Draw lasers when firing
    if (state.lastShot && Date.now() - state.lastShot < 300) {
      const laserColor = state.player && LASERS[state.player.laser] ? LASERS[state.player.laser].color : '#0f0'
      
      // Draw laser from player ship to enemies
      if (state.enemies && state.enemies.find(e => e.alive)) {
        const target = state.enemies.find(e => e.alive)
        const tx = w/2 + Math.sin(Date.now()/500 + state.enemies.indexOf(target)*2) * 80
        const ty = h/2 + Math.cos(Date.now()/400 + state.enemies.indexOf(target)*3) * 60 - 20
        
        // Outer glow
        ctx.strokeStyle = laserColor
        ctx.lineWidth = 8
        ctx.globalAlpha = 0.3
        ctx.shadowColor = laserColor
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.moveTo(w/2, h - 80)
        ctx.lineTo(tx, ty)
        ctx.stroke()
        
        // Inner beam
        ctx.lineWidth = 3
        ctx.globalAlpha = 0.9
        ctx.beginPath()
        ctx.moveTo(w/2, h - 80)
        ctx.lineTo(tx, ty)
        ctx.stroke()
        
        // Hit flash effect
        ctx.fillStyle = laserColor
        ctx.globalAlpha = 0.8
        ctx.beginPath()
        ctx.arc(tx, ty, 15, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // No enemies - fire into space
        ctx.lineWidth = 4
        ctx.strokeStyle = laserColor
        ctx.globalAlpha = 0.7
        ctx.shadowColor = laserColor
        ctx.shadowBlur = 15
        ctx.beginPath()
        ctx.moveTo(w/2, h - 80)
        ctx.lineTo(w/2, 80)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }
    
    // Update flight time
    if (!state.docked) {
      state.flightTime = (state.flightTime || 0) + 1
    }
    
    state.animationId = requestAnimationFrame(animate)
  }
  
  animate()
}

window.dockAtStation = function() {
  dock()
  showToast('Швартовка выполнена!', 'success')
  addLog('Швартовка!')
  renderPanel('cockpit')
}

window.startCombat = function() {
  const state = getState()
  if (state.inCombat) {
    // Fire weapon - set lastShot for laser animation
    state.lastShot = Date.now()
    state.hitFlash = Date.now() // Flash enemies when hit
    
    // Fire at all alive enemies
    if (state.enemies && state.enemies.length > 0) {
      let totalDamage = 0
      state.enemies.forEach(enemy => {
        if (enemy.alive) {
          const damage = LASERS[state.player.laser].damage
          enemy.health -= damage
          totalDamage += damage
          
          if (enemy.health <= 0) {
            enemy.alive = false
            const reward = enemy.reward || (100 + Math.floor(Math.random() * 200))
            state.player.credits += reward
            state.player.kills++
            addLog(`Враг "${enemy.name}" уничтожен! +${reward} Cr`)
          }
        }
      })
      addLog(`Залп! -${totalDamage} HP врагам`)
      
      // Check if all enemies dead
      const alive = state.enemies.filter(e => e.alive).length
      if (alive === 0) {
        showToast('🏆 ПОБЕДА!', 'success')
        addLog('ПОБЕДА! Все враги уничтожены!')
        state.inCombat = false
        state.docked = true
        state.flightTime = 0
      }
    }
    showToast('ОГОНЬ!', 'success')
  } else {
    showToast('Нужно находиться в полёте!', 'info')
    addLog('Сначала нужно взлететь')
  }
}

window.activateScoop = function() {
  const state = getState()
  if (!state.player.hasScoop) {
    showToast('Нужен сборщик!', 'error')
    return
  }
  state.player.fuel = Math.min(state.player.maxFuel, state.player.fuel + 25)
  showToast('Топливо собрано', 'success')
  addLog('Сбор топлива.')
}

function renderStation(state, system) {
  const player = state.player
  
  return `
    <div class="panel station">
      <div class="panel-header">
        <span class="panel-title">🛸 СТАНЦИЯ — ${system?.name || '?'}</span>
      </div>
      <div class="station-info">
        <p>Правительство: <span class="tag ${GOVERNMENTS[system?.government || 0].color}">${GOVERNMENTS[system?.government || 0].name}</span></p>
        <p>Технологии: ${system?.techLevel || 1}</p>
      </div>
    </div>
    
    <div class="panel station-services">
      <div class="panel-header">
        <span class="panel-title">УСЛУГИ</span>
      </div>
      <div class="services-grid">
        <button class="service-btn" onclick="window.showRepair()">
          <span class="service-icon">🔧</span>
          <span>РЕМОНТ</span>
        </button>
        <button class="service-btn" onclick="window.showRefuel()">
          <span class="service-icon">⛽</span>
          <span>ЗАПРАВКА</span>
        </button>
        <button class="service-btn" onclick="window.showEquip()">
          <span class="service-icon">🔩</span>
          <span>ОБОРУДОВ.</span>
        </button>
        <button class="service-btn" onclick="window.showBar()">
          <span class="service-icon">🍺</span>
          <span>БАР</span>
        </button>
      </div>
    </div>
  `
}

window.showRepair = function() {
  const player = getState().player
  const needed = player.maxHull - player.hull
  if (needed <= 0) {
    showToast('Корпус целый!', 'info')
    return
  }
  const cost = needed
  if (player.credits < cost) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= cost
  player.hull = player.maxHull
  saveGame()
  showToast('Ремонт завершён!', 'success')
  renderPanel('cockpit')
}

window.showRefuel = function() {
  const player = getState().player
  const needed = player.maxFuel - player.fuel
  if (needed <= 0) {
    showToast('Бак полный!', 'info')
    return
  }
  const cost = Math.ceil(needed / 10) * 5
  if (player.credits < cost) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= cost
  player.fuel = player.maxFuel
  saveGame()
  showToast('Заправка завершена!', 'success')
  renderPanel('cockpit')
}

window.showEquip = function() {
  showModal('ОБОРУДОВАНИЕ', `
    <div class="equip-tabs">
      <button class="tab-btn active" onclick="showEquipTab('lasers')">ЛАЗЕРЫ</button>
      <button class="tab-btn" onclick="showEquipTab('shields')">ЩИТЫ</button>
      <button class="tab-btn" onclick="showEquipTab('ships')">КОРАБЛИ</button>
      <button class="tab-btn" onclick="showEquipTab('extra')">ДОП. ОБОРУД</button>
    </div>
    <div id="equip-content">
      ${renderLaserShop()}
    </div>
  `)
}

function renderLaserShop() {
  const player = getState().player
  let rows = LASERS.map((laser, i) => {
    const current = i === player.laser
    return `<div class="shop-item ${current ? 'current' : ''}">
      <div class="shop-item-icon" style="color: ${laser.color}">🔫</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${laser.name}</div>
        <div class="shop-item-desc">Урон: ${laser.damage} | Рate: ${laser.rate}ms</div>
        <div class="shop-item-price">${laser.price === 0 ? 'Бесплатно' : laser.price.toLocaleString() + ' Cr'}</div>
      </div>
      <div class="shop-item-action">
        ${current ? '<span class="installed">✓</span>' : 
          i > player.laser ? `<button class="btn btn-sm" onclick="buyLaserUpgrade(${i})">Купить</button>` :
          '<span class="locked">🔒</span>'}
      </div>
    </div>`
  }).join('')
  return `<div class="shop-list">${rows}</div>`
}

function renderShieldShop() {
  const player = getState().player
  let rows = SHIELDS.map((shield, i) => {
    const current = i === player.shield
    return `<div class="shop-item ${current ? 'current' : ''}">
      <div class="shop-item-icon" style="color: ${shield.color}">🛡️</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${shield.name}</div>
        <div class="shop-item-desc">Уровень: ${shield.level} | Перезарядка: ${shield.recharge}/с</div>
        <div class="shop-item-price">${shield.price === 0 ? 'Бесплатно' : shield.price.toLocaleString() + ' Cr'}</div>
      </div>
      <div class="shop-item-action">
        ${current ? '<span class="installed">✓</span>' : 
          i > player.shield ? `<button class="btn btn-sm" onclick="buyShieldUpgrade(${i})">Купить</button>` :
          '<span class="locked">🔒</span>'}
      </div>
    </div>`
  }).join('')
  return `<div class="shop-list">${rows}</div>`
}

function renderShipShop() {
  const player = getState().player
  const currentShip = SHIPS.find(s => s.name === player.currentShip)
  let rows = SHIPS.map((ship, i) => {
    const current = ship.name === player.currentShip
    return `<div class="shop-item ship-item ${current ? 'current' : ''}">
      <div class="shop-item-icon ship-icon" style="color: ${ship.color}">
        <svg viewBox="0 0 24 24" width="32" height="32">${ship.svg.replace('currentColor', ship.color)}</svg>
      </div>
      <div class="shop-item-info">
        <div class="shop-item-name">${ship.name}</div>
        <div class="shop-item-desc">
          <span class="stat">⚡${ship.maxSpeed}</span>
          <span class="stat">📦${ship.cargo}</span>
          <span class="stat">🔫${ship.laser}</span>
          <span class="stat">🛡️${ship.shield}</span>
        </div>
        <div class="shop-item-desc ship-desc">${ship.description}</div>
        <div class="shop-item-price">${ship.price === 0 ? 'Бесплатно' : ship.price.toLocaleString() + ' Cr'}</div>
      </div>
      <div class="shop-item-action">
        ${current ? '<span class="installed">✓ ВАШ</span>' : 
          player.credits >= ship.price ? `<button class="btn btn-sm" onclick="buyNewShip(${i})">Купить</button>` :
          `<button class="btn btn-sm" disabled>Нет Cr</button>`}
      </div>
    </div>`
  }).join('')
  return `<div class="shop-list">${rows}</div>`
}

function renderExtraShop() {
  const player = getState().player
  let html = '<div class="shop-section"><h4>⛽ ДОП. БАКИ</h4>'
  
  EQUIPMENT.fuelTanks.forEach((item, i) => {
    const owned = player.extraFuelTanks && player.extraFuelTanks[i]
    html += `<div class="shop-item ${owned ? 'owned' : ''}">
      <div class="shop-item-icon">${item.icon}</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-desc">${item.description}</div>
        <div class="shop-item-price">${item.price.toLocaleString()} Cr</div>
      </div>
      <div class="shop-item-action">
        ${owned ? '<span class="installed">✓</span>' : 
          player.credits >= item.price ? `<button class="btn btn-sm" onclick="buyExtraFuel(${i})">Купить</button>` : 
          '<button disabled>Нет Cr</button>'}
      </div>
    </div>`
  })
  
  html += '</div><div class="shop-section"><h4>📦 ГРУЗОВЫЕ ОТСЕКИ</h4>'
  EQUIPMENT.cargoRacks.forEach((item, i) => {
    const owned = player.extraCargo && player.extraCargo[i]
    html += `<div class="shop-item ${owned ? 'owned' : ''}">
      <div class="shop-item-icon">${item.icon}</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-desc">${item.description}</div>
        <div class="shop-item-price">${item.price.toLocaleString()} Cr</div>
      </div>
      <div class="shop-item-action">
        ${owned ? '<span class="installed">✓</span>' : 
          player.credits >= item.price ? `<button class="btn btn-sm" onclick="buyExtraCargo(${i})">Купить</button>` : 
          '<button disabled>Нет Cr</button>'}
      </div>
    </div>`
  })
  
  html += '</div><div class="shop-section"><h4>⚡ ЭНЕРГОЯЧЕЙКИ</h4>'
  EQUIPMENT.energy.forEach((item, i) => {
    const owned = player.extraEnergy && player.extraEnergy[i]
    html += `<div class="shop-item ${owned ? 'owned' : ''}">
      <div class="shop-item-icon">${item.icon}</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-desc">${item.description}</div>
        <div class="shop-item-price">${item.price.toLocaleString()} Cr</div>
      </div>
      <div class="shop-item-action">
        ${owned ? '<span class="installed">✓</span>' : 
          player.credits >= item.price ? `<button class="btn btn-sm" onclick="buyExtraEnergy(${i})">Купить</button>` : 
          '<button disabled>Нет Cr</button>'}
      </div>
    </div>`
  })
  html += '</div>'
  
  return html
}

function showEquipTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
  event.target.classList.add('active')
  
  const content = document.getElementById('equip-content')
  if (!content) return
  
  switch(tab) {
    case 'lasers': content.innerHTML = renderLaserShop(); break
    case 'shields': content.innerHTML = renderShieldShop(); break
    case 'ships': content.innerHTML = renderShipShop(); break
    case 'extra': content.innerHTML = renderExtraShop(); break
  }
}

window.buyLaserUpgrade = function(idx) {
  const player = getState().player
  if (idx <= player.laser) return
  const laser = LASERS[idx]
  if (!laser || player.credits < laser.price) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= laser.price
  player.laser = idx
  saveGame()
  showToast(`Лазер "${laser.name}" установлен!`, 'success')
  showEquipTab('lasers')
}

window.buyShieldUpgrade = function(idx) {
  const player = getState().player
  if (idx <= player.shield) return
  const shield = SHIELDS[idx]
  if (!shield || player.credits < shield.price) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= shield.price
  player.shield = idx
  player.maxShields = 50 + shield.level * 30
  player.shields = player.maxShields
  saveGame()
  showToast(`Щит "${shield.name}" установлен!`, 'success')
  showEquipTab('shields')
}

window.buyNewShip = function(idx) {
  const player = getState().player
  const ship = SHIPS[idx]
  if (!ship || player.credits < ship.price) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= ship.price
  player.currentShip = ship.name
  player.cargoCapacity = ship.cargo
  player.maxHull = 100
  player.maxShields = 50 + ship.shield * 30
  player.hull = player.maxHull
  player.shields = player.maxShields
  player.maxFuel = 100
  player.fuel = player.maxFuel
  player.laser = Math.min(player.laser, ship.laser)
  player.shield = Math.min(player.shield, ship.shield)
  saveGame()
  showToast(`Корабль "${ship.name}" куплен!`, 'success')
  showEquipTab('ships')
}

window.buyExtraFuel = function(idx) {
  const player = getState().player
  const item = EQUIPMENT.fuelTanks[idx]
  if (!item || player.credits < item.price) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= item.price
  player.maxFuel += item.capacity
  player.fuel += item.capacity
  player.extraFuelTanks = player.extraFuelTanks || []
  player.extraFuelTanks[idx] = true
  saveGame()
  showToast(`Бак "${item.name}" установлен!`, 'success')
  showEquipTab('extra')
}

window.buyExtraCargo = function(idx) {
  const player = getState().player
  const item = EQUIPMENT.cargoRacks[idx]
  if (!item || player.credits < item.price) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= item.price
  player.cargoCapacity += item.capacity
  player.extraCargo = player.extraCargo || []
  player.extraCargo[idx] = true
  saveGame()
  showToast(`Грузовой отсек установлен!`, 'success')
  showEquipTab('extra')
}

window.buyExtraEnergy = function(idx) {
  const player = getState().player
  const item = EQUIPMENT.energy[idx]
  if (!item || player.credits < item.price) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= item.price
  player.maxShields += item.capacity
  player.shields += item.capacity
  player.extraEnergy = player.extraEnergy || []
  player.extraEnergy[idx] = true
  saveGame()
  showToast(`Энергоячейка установлена!`, 'success')
  showEquipTab('extra')
}

window.buyScoop = function() {
  const player = getState().player
  if (player.credits < 5000) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= 5000
  player.hasScoop = true
  saveGame()
  showToast('Сборщик куплен!', 'success')
  closeModal()
}

window.showBar = function() {
  const state = getState()
  const rumors = [
    `Цены на алмазы в ${state.galaxy[(state.currentSystem + 1) % 32].name} высокие!`,
    'Пираты в секторе!',
    `Дешёвая еда в ${state.galaxy[(state.currentSystem + 3) % 32].name}`,
    `Артефакты в ${state.galaxy[(state.currentSystem + 5) % 32].name}!`,
    `Платина в ${state.galaxy[(state.currentSystem + 2) % 32].name} x3 цены.`
  ]
  const rumor = rumors[Math.floor(Math.random() * rumors.length)]
  
  showModal('🍺 БАР', `
    <p class="rumor">"${rumor}"</p>
    <p class="bar-drink">Напиток: 50 Cr (+5 HP)</p>
    <button class="btn btn-primary" onclick="window.buyDrink()">ПИТЬ</button>
    <button class="btn" onclick="window.closeModal()">ВЫЙТИ</button>
  `)
}

window.buyDrink = function() {
  const player = getState().player
  if (player.credits < 50) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= 50
  player.hull = Math.min(player.maxHull, player.hull + 5)
  saveGame()
  showToast('+5 HP', 'success')
  closeModal()
}

function renderTrade(state, system) {
  const player = state.player
  const currentCargo = getCargoAmount(player)
  
  let rows = COMMODITIES.map((cm, i) => {
    const price = system?.prices[i] || cm.basePrice
    const inCargo = player.cargo[i] || 0
    const sellPrice = Math.floor(price * 0.7)
    
    return `
      <tr>
        <td>${cm.name}</td>
        <td class="price-buy">${price}</td>
        <td class="price-sell">${sellPrice}</td>
        <td>${inCargo}</td>
        <td>
          <button class="btn" onclick="window.buyCommodity(${i}, 1)">+1</button>
          <button class="btn" onclick="window.buyCommodity(${i}, 5)">+5</button>
          <button class="btn btn-danger" onclick="window.sellCommodity(${i}, 1)">-1</button>
        </td>
      </tr>
    `
  }).join('')
  
  return `
    <div class="panel trade">
      <div class="panel-header">
        <span class="panel-title">📦 РЫНОК — ${system?.name || '?'}</span>
      </div>
      <p class="cargo-info">Груз: ${currentCargo}/${player.cargoCapacity}</p>
      <table class="table">
        <thead>
          <tr>
            <th>ТОВАР</th>
            <th>ПОКУПКА</th>
            <th>ПРОДАЖА</th>
            <th>В ТРЮМЕ</th>
            <th>ДЕЙСТВИЕ</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `
}

window.buyCommodity = function(id, qty) {
  const state = getState()
  const system = getCurrentSystemInfo()
  const player = state.player
  const currentCargo = getCargoAmount(player)
  
  if (currentCargo >= player.cargoCapacity) {
    showToast('Нет места в трюме!', 'error')
    return
  }
  
  const price = system?.prices[id] || COMMODITIES[id].basePrice
  const canBuy = Math.min(qty, player.cargoCapacity - currentCargo)
  const cost = price * canBuy
  
  if (player.credits < cost) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  
  const result = buyFromMarket(id, canBuy, price)
  if (result.success) {
    showToast(`Куплено ${result.quantity} ${COMMODITIES[id].name}`, 'success')
    renderPanel('trade')
  } else {
    showToast(result.error, 'error')
  }
}

window.sellCommodity = function(id, qty) {
  const state = getState()
  const system = getCurrentSystemInfo()
  const player = state.player
  
  if (!player.cargo[id] || player.cargo[id] <= 0) {
    showToast('Нет товара!', 'error')
    return
  }
  
  const price = Math.floor((system?.prices[id] || COMMODITIES[id].basePrice) * 0.7)
  const result = sellToMarket(id, qty, price)
  
  if (result.success) {
    showToast(`Продано ${result.quantity} за ${result.revenue} Cr`, 'success')
    renderPanel('trade')
  }
}

function renderGalaxy(state) {
  const player = state.player
  const currentSystem = getCurrentSystemInfo()
  
  let cards = state.galaxy.map((sys, idx) => {
    const dist = Math.sqrt(Math.pow(sys.x - currentSystem.x, 2) + Math.pow(sys.y - currentSystem.y, 2)).toFixed(1)
    const fuel = Math.ceil(dist * 2)
    const canTravel = player.fuel >= fuel
    const isCurrent = idx === state.currentSystem
    
    return `
      <div class="card ${isCurrent ? 'current' : ''}">
        <div class="card-header">
          <span class="card-name">${sys.name}</span>
          <span class="card-distance">${dist} св.л.</span>
        </div>
        <div class="card-info">
          <p>${GOVERNMENTS[sys.government].name}</p>
          <p>Тех ${sys.techLevel}</p>
        </div>
        <div class="card-action">
          ${isCurrent ? 
            '<span class="current-label">ЗДЕСЬ</span>' : 
            `<button class="btn btn-sm" onclick="window.travelTo(${idx})" ${!canTravel ? 'disabled' : ''}>
              ${canTravel ? 'ЛЕТЕТЬ' : 'НЕТ ТОПЛИВА'}
            </button>`}
        </div>
      </div>
    `
  }).join('')
  
  return `
    <div class="panel galaxy">
      <div class="panel-header">
        <span class="panel-title">🗺️ КАРТА ГАЛАКТИКИ</span>
      </div>
      <p class="fuel-info">Топливо: ${player.fuel}%</p>
      <div class="galaxy-grid">${cards}</div>
    </div>
  `
}

window.travelTo = function(systemId) {
  const result = travelTo(systemId)
  if (result.success) {
    showToast(result.encounter ? 'НАПАЛИ!' : `Прибытие в ${result.systemName}`, result.encounter ? 'error' : 'success')
    if (result.encounter) {
      renderPanel('cockpit')
    } else {
      renderPanel('galaxy')
    }
  } else {
    showToast(result.error, 'error')
  }
}

function renderShip(state) {
  const player = state.player
  const ship = SHIPS.find(s => s.name === player.currentShip) || SHIPS[0]
  const currentCargo = getCargoAmount(player)
  
  let cargoList = Object.entries(player.cargo)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => `<tr><td>${COMMODITIES[id].name}</td><td>${qty}</td></tr>`)
    .join('')
  
  return `
    <div class="panel ship-info">
      <div class="panel-header">
        <span class="panel-title">🛩️ ${player.currentShip}</span>
      </div>
      <div class="ship-stats">
        <p><strong>Тип:</strong> ${ship.description}</p>
        <p><strong>Трюм:</strong> ${currentCargo}/${player.cargoCapacity}</p>
        <p><strong>Щиты:</strong> ${player.shields}/${player.maxShields}</p>
        <p><strong>Лазер:</strong> ${LASERS[player.laser].name}</p>
      </div>
    </div>
    
    <div class="panel cargo">
      <div class="panel-header">
        <span class="panel-title">ГРУЗ</span>
      </div>
      ${cargoList ? 
        `<table class="table"><tbody>${cargoList}</tbody></table>` : 
        '<p class="empty">Пусто</p>'}
    </div>
  `
}

function renderRank(state) {
  const player = state.player
  const rankInfo = getRankInfo(player)
  
  let rows = RANKS.map((rank, i) => {
    const achieved = i <= player.rank
    const isCurrent = i === player.rank
    
    return `
      <tr class="${isCurrent ? 'current' : ''} ${achieved ? 'achieved' : ''}">
        <td>${rank.name}</td>
        <td>${achieved ? '✓' : '🔒'} ${rank.kills}</td>
      </tr>
    `
  }).join('')
  
  return `
    <div class="panel rank">
      <div class="panel-header">
        <span class="panel-title">⭐ РАНГ</span>
      </div>
      <div class="rank-display">
        <div class="rank-icon">🏆</div>
        <div class="rank-name">${rankInfo.name}</div>
        <div class="rank-kills">${player.kills} убийств</div>
      </div>
      <table class="table">
        <tbody>${rows}</tbody>
      </table>
    </div>
  `
}

// Toast notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container')
  if (!container) return
  
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = message
  container.appendChild(toast)
  
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.remove()
  }, 3000)
}

function addLog(message) {
  const log = document.getElementById('combat-log')
  if (!log) return
  
  const entry = document.createElement('div')
  entry.className = 'log-entry'
  entry.textContent = `[${new Date().toLocaleTimeString('ru')}] ${message}`
  log.appendChild(entry)
  log.scrollTop = log.scrollHeight
}

// Modal
function showModal(title, content) {
  const modal = document.getElementById('modal')
  if (!modal) return
  
  modal.innerHTML = `
    <div class="dialog">
      <h3>${title}</h3>
      <div class="modal-content">${content}</div>
    </div>
  `
  modal.classList.remove('hidden')
}

window.closeModal = function() {
  document.getElementById('modal')?.classList.add('hidden')
}

window.saveGame = function() {
  saveGame()
  showToast('Сохранено!', 'success')
}

window.logout = function() {
  if (animationId) cancelAnimationFrame(animationId)
  const state = getState()
  state.user = null
  state.player = null
  showAuth()
}