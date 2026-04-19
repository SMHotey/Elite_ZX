// === ELITE ZX - MAIN ENTRY POINT ===
import './styles/main.css'
import { initGame, loadGame, saveGame, getState, dock, travelTo, 
         buyFromMarket, sellToMarket, getCurrentSystem } from './core/engine.js'
import { COMMODITIES, SHIPS, LASERS, SHIELDS, GOVERNMENTS, RANKS } from './core/gameData.js'
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
      <div class="auth-box">
        <h1>ELITE</h1>
        <div class="subtitle">КОСМИЧЕСКАЯ ТОРГОВЛЯ И СРАЖЕНИЯ</div>
        
        <div class="tabs">
          <button class="active" data-tab="login">ВХОД</button>
          <button data-tab="register">РЕГИСТРАЦИЯ</button>
        </div>
        
        <div id="login-form">
          <div class="field">
            <label>ИМЯ ПИЛОТА</label>
            <input type="text" id="username" placeholder="Callsigh" autocomplete="off">
          </div>
          <div class="field">
            <label>ПАРОЛЬ</label>
            <input type="password" id="password" placeholder="Password">
          </div>
          <div class="error" id="login-error"></div>
          <button class="btn btn-primary" onclick="window.doLogin()">ВОЙТИ</button>
        </div>
        
        <div id="register-form" class="hidden">
          <div class="field">
            <label>ИМЯ ПИЛОТА</label>
            <input type="text" id="reg-username" placeholder="Callsigh" autocomplete="off">
          </div>
          <div class="field">
            <label>ПАРОЛЬ</label>
            <input type="password" id="reg-password" placeholder="Password">
          </div>
          <div class="field">
            <label>ПОВТОРИТЕ</label>
            <input type="password" id="reg-password2" placeholder="Confirm">
          </div>
          <div class="error" id="register-error"></div>
          <button class="btn btn-primary" onclick="window.doRegister()">СОЗДАТЬ</button>
        </div>
        
        <button class="btn btn-guest" onclick="window.guestLogin()">
          БЫСТРЫЙ СТАРТ (ГОСТЬ)
        </button>
      </div>
    </div>
  `
  
  // Tab switching
  document.querySelectorAll('.tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      
      const tab = btn.dataset.tab
      document.getElementById('login-form').classList.toggle('hidden', tab !== 'login')
      document.getElementById('register-form').classList.toggle('hidden', tab !== 'register')
    })
  })
  
  // Enter key
  document.getElementById('password')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') window.doLogin()
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
  const system = getCurrentSystem()
  
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
}

function renderPanel(panel) {
  const main = document.getElementById('main-content')
  if (!main) return
  
  const state = getState()
  const player = state.player
  const system = getCurrentSystem()
  
  switch(panel) {
    case 'cockpit':
      main.innerHTML = renderCockpit(state, system)
      initCockpit()
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

function renderCockpit(state, system) {
  const player = state.player
  
  return `
    <div class="panel cockpit">
      <div class="panel-header">
        <span class="panel-title">🚀 КОКПИТ</span>
      </div>
      <div class="starfield">
        <canvas id="cockpit-canvas"></canvas>
        <div class="hud-overlay">
          <div class="hud-item">📍 ${system?.name || '?'}</div>
          <div class="hud-item">⏱️ ${state.docked ? 'СТАНЦИЯ' : 'ПОЛЁТ'}</div>
        </div>
      </div>
      <div class="cockpit-stats">
        <div class="bar">
          <span>ЭНЕРГИЯ</span>
          <div class="statbar"><i style="width: 100%"></i></div>
        </div>
        <div class="bar">
          <span>ЩИТЫ</span>
          <div class="statbar"><i style="width: ${player.shields}%"></i></div>
        </div>
        <div class="bar">
          <span>КОРПУС</span>
          <div class="statbar"><i style="width: ${player.hull}%"></i></div>
        </div>
        <div class="bar">
          <span>ТОПЛИВО</span>
          <div class="statbar"><i style="width: ${player.fuel}%"></i></div>
        </div>
      </div>
    </div>
    
    <div class="panel controls">
      <div class="panel-header">
        <span class="panel-title">УПРАВЛЕНИЕ</span>
      </div>
      <div class="controls-grid">
        <button class="btn btn-primary" onclick="window.launch()">🚀 ПОЛЁТ</button>
        <button class="btn" onclick="window.dockAtStation()">⚓ ШВАРТОВКА</button>
        <button class="btn btn-danger" onclick="window.startCombat()">⚔️ БОЙ</button>
        <button class="btn" onclick="window.activateScoop()">🔥 СБОРКА</button>
      </div>
    </div>
    
    <div class="panel log">
      <div class="panel-header">
        <span class="panel-title">ЖУРНАЛ</span>
      </div>
      <div class="log-content" id="combat-log"></div>
    </div>
  `
}

function initCockpit() {
  const canvas = document.getElementById('cockpit-canvas')
  if (!canvas) return
  
  const container = canvas.parentElement
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
  
  function render(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp
    const dt = timestamp - lastTimestamp
    lastTimestamp = timestamp
    
    // Simple starfield render
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, w, h)
    
    // Stars
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * w
      const y = Math.random() * h
      const size = Math.random() * 1.5 + 0.5
      const alpha = Math.random() * 0.7 + 0.3
      ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`
      ctx.fillRect(x, y, size, size)
    }
    
    animationId = requestAnimationFrame(render)
  }
  
  animationId = requestAnimationFrame(render)
}

window.launch = function() {
  const state = getState()
  if (state.inCombat) {
    showToast('Сначала победа в бою!', 'error')
    return
  }
  
  // Start flight directly
  state.docked = false
  state.speed = 3
  state.flightTime = 0
  
  showToast('Запущен двигатель...', 'info')
  addLog('Двигатели запущены...')
  
  // Render the flight view
  const main = document.getElementById('main-content')
  if (main) {
    main.innerHTML = renderFlight()
    initFlightAnim()
  }
  
  // After 2.5 seconds, check for arrival or combat (random 30% chance)
  setTimeout(() => {
    const s = getState()
    const encounter = Math.random() < 0.3
    
    if (encounter) {
      // Start combat!
      s.inCombat = true
      const enemyCount = Math.floor(Math.random() * 3) + 1
      s.enemies = []
      const names = ['Пират', 'Контрабандист', 'Охотник', 'Убийца']
      for (let i = 0; i < enemyCount; i++) {
        s.enemies.push({
          name: names[Math.floor(Math.random() * names.length)],
          health: 30 + Math.floor(Math.random() * 40),
          maxHealth: 70,
          damage: 5 + Math.floor(Math.random() * 10),
          alive: true
        })
      }
      showToast('⚠️ ВНИМАНИЕ! НАПАЛИ!', 'error')
      addLog(`⚠️ АТАКА! ${enemyCount} врагов!`)
    } else {
      s.docked = true
      showToast('Прибытие: ' + getCurrentSystem()?.name, 'success')
      addLog('Прибытие в ' + getCurrentSystem()?.name)
    }
    renderPanel('cockpit')
  }, 2500)
}

function renderFlight() {
  const state = getState()
  return `
    <div class="panel flight">
      <div class="flight-view">
        <canvas id="flight-canvas"></canvas>
        <div class="flight-hud">
          <div class="flight-status">🚀 ПОЛЁТ</div>
          <div class="flight-enemies" id="flight-enemies"></div>
        </div>
      </div>
    </div>
  `
}

function initFlightAnim() {
  const canvas = document.getElementById('flight-canvas')
  if (!canvas) return
  
  const container = canvas.parentElement
  canvas.width = container.clientWidth || 600
  canvas.height = container.clientHeight || 400
  
  const stars = []
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 800 + 100,
      speed: Math.random() * 3 + 1
    })
  }
  
  const state = getState()
  
  function animate() {
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    
    // Clear
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, w, h)
    
    // Draw stars
    ctx.fillStyle = '#aaf'
    stars.forEach(star => {
      star.z -= star.speed * 2.5
      if (star.z <= 0) {
        star.z = 900
        star.x = Math.random() * w
        star.y = Math.random() * h
      }
      
      const sx = (star.x - w/2) * (400 / star.z) + w/2
      const sy = (star.y - h/2) * (400 / star.z) + h/2
      const sz = Math.max(0.5, (900 - star.z) / 200)
      const sa = Math.min(1, (900 - star.z) / 250)
      
      ctx.globalAlpha = sa
      ctx.fillRect(sx, sy, sz*1.5, sz*1.5)
    })
    ctx.globalAlpha = 1
    
    // Draw station when far
    if (state.docked || state.flightTime > 400) {
      const cx = w/2
      const cy = h/2 - 20
      ctx.strokeStyle = '#0ff'
      ctx.lineWidth = 1.5
      ctx.shadowColor = '#0ff'
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.ellipse(cx, cy, 80, 30, state.flightTime || 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(cx, cy, 30, 12, (state.flightTime || 0) * -1, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0
    }
    
    // Draw enemies in combat
    if (state.inCombat && state.enemies) {
      const enemiesEl = document.getElementById('flight-enemies')
      if (enemiesEl) {
        enemiesEl.textContent = `ВРАГИ: ${state.enemies.filter(e => e.alive).length}`
      }
      
      ctx.strokeStyle = '#f44'
      ctx.shadowColor = '#f44'
      ctx.shadowBlur = 5
      state.enemies.forEach((enemy, i) => {
        if (!enemy.alive) return
        const ex = w/2 + Math.sin(Date.now()/500 + i*2) * 100
        const ey = h/2 + Math.cos(Date.now()/400 + i*3) * 60
        
        ctx.beginPath()
        ctx.moveTo(ex, ey-15)
        ctx.lineTo(ex-10, ey+8)
        ctx.lineTo(ex-5, ey+12)
        ctx.lineTo(ex, ey+4)
        ctx.lineTo(ex+5, ey+12)
        ctx.lineTo(ex+10, ey+8)
        ctx.closePath()
        ctx.stroke()
      })
      ctx.shadowBlur = 0
    }
    
    state.flightTime = (state.flightTime || 0) + 0.01
    animationId = requestAnimationFrame(animate)
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
    // Fire weapon - damage first enemy
    if (state.enemies && state.enemies.length > 0) {
      const target = state.enemies.find(e => e.alive)
      if (target) {
        const damage = LASERS[state.player.laser].damage
        target.health -= damage
        addLog(`Выстрел! -${damage} HP врагу`)
        
        if (target.health <= 0) {
          target.alive = false
          const reward = 100 + Math.floor(Math.random() * 200)
          state.player.credits += reward
          state.player.kills++
          addLog(`Враг уничтожен! +${reward} Cr`)
          
          // Check if all enemies dead
          const alive = state.enemies.filter(e => e.alive).length
          if (alive === 0) {
            showToast('🏆 ПОБЕДА!', 'success')
            addLog('ПОБЕДА! Все враги уничтожены!')
            state.inCombat = false
            state.docked = true
          }
        }
        
        renderPanel('cockpit')
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
    <div class="equip-section">
      <h4>ЛАЗЕР</h4>
      <p>${LASERS[getState().player.laser].name} — ${LASERS[getState().player.laser].damage} урон</p>
      ${getState().player.laser < LASERS.length - 1 ? 
        `<button class="btn btn-primary" onclick="window.buyLaser()">${LASERS[getState().player.laser + 1].name} (${LASERS[getState().player.laser + 1].price} Cr)</button>` : 
        '<p>Максимальный уровень</p>'}
    </div>
    <div class="equip-section">
      <h4>ЩИТ</h4>
      <p>${SHIELDS[getState().player.shield].name} — ур. ${SHIELDS[getState().player.shield].level}</p>
      ${getState().player.shield < SHIELDS.length - 1 ? 
        `<button class="btn btn-primary" onclick="window.buyShield()">${SHIELDS[getState().player.shield + 1].name} (${SHIELDS[getState().player.shield + 1].price} Cr)</button>` : 
        '<p>Максимальный уровень</p>'}
    </div>
    <div class="equip-section">
      <h4>СБОРЩИК</h4>
      <p>${getState().player.hasScoop ? '✓ Установлен' : '✗ Не установлен'}</p>
      ${!getState().player.hasScoop ? 
        '<button class="btn btn-primary" onclick="window.buyScoop()">Купить (5000 Cr)</button>' : ''}
    </div>
    <button class="btn" onclick="window.closeModal()">ЗАКРЫТЬ</button>
  `)
}

window.buyLaser = function() {
  const player = getState().player
  if (player.laser >= LASERS.length - 1) return
  const next = LASERS[player.laser + 1]
  if (player.credits < next.price) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= next.price
  player.laser++
  saveGame()
  showToast('Лазер улучшен!', 'success')
  closeModal()
}

window.buyShield = function() {
  const player = getState().player
  if (player.shield >= SHIELDS.length - 1) return
  const next = SHIELDS[player.shield + 1]
  if (player.credits < next.price) {
    showToast('Недостаточно кредитов!', 'error')
    return
  }
  player.credits -= next.price
  player.shield++
  player.maxShields = 50 + SHIELDS[player.shield].level * 30
  player.shields = player.maxShields
  saveGame()
  showToast('Щит улучшен!', 'success')
  closeModal()
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
  const system = getCurrentSystem()
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
  const system = getCurrentSystem()
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
  const currentSystem = getCurrentSystem()
  
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