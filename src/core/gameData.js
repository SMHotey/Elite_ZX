// === ELITE ZX - GAME DATA ===

// Commodities base prices and variance
export const COMMODITIES = [
  { name: 'Food', basePrice: 40, variance: 15, icon: '🌾' },
  { name: 'Textiles', basePrice: 80, variance: 30, icon: '🧵' },
  { name: 'Radioactives', basePrice: 150, variance: 50, icon: '☢️' },
  { name: 'Slaves', basePrice: 200, variance: 80, icon: '⛓️' },
  { name: 'Liquor', basePrice: 300, variance: 100, icon: '🍷' },
  { name: 'Luxuries', basePrice: 500, variance: 200, icon: '💎' },
  { name: 'Narcotics', basePrice: 2500, variance: 400, icon: '💊' },
  { name: 'Computers', basePrice: 100, variance: 40, icon: '💻' },
  { name: 'Machinery', basePrice: 500, variance: 150, icon: '⚙️' },
  { name: 'Alloys', basePrice: 800, variance: 200, icon: '🔩' },
  { name: 'Firearms', basePrice: 1200, variance: 300, icon: '🔫' },
  { name: 'Furs', basePrice: 1500, variance: 400, icon: '🦊' },
  { name: 'Minerals', basePrice: 250, variance: 70, icon: '🪨' },
  { name: 'Ores', basePrice: 60, variance: 20, icon: 'ite' },
  { name: 'Water', basePrice: 20, variance: 10, icon: '💧' }
]

// Ship definitions with visual descriptions and SVG paths
export const SHIPS = [
  { name: 'Sidewinder', price: 0, cargo: 15, maxSpeed: 18, laser: 1, shield: 1, description: 'Стартовый корабль', color: '#4a9eff', 
    svg: '<path d="M16 2 L22 8 L22 12 L18 10 L18 18 L14 18 L14 10 L10 12 L10 8 Z" fill="currentColor"/>',
    stats: { agility: 8, cargo: 15,Lasers: 1, shields: 1, speed: 18 } },
  { name: 'Adder', price: 14000, cargo: 20, maxSpeed: 16, laser: 1, shield: 1, description: 'Грузовой корабль', color: '#6aff6a',
    svg: '<path d="M16 2 L24 8 L26 14 L24 20 L22 22 L18 20 L18 14 L14 14 L14 20 L10 22 L8 20 L6 14 L8 8 Z" fill="currentColor"/>',
    stats: { agility: 5, cargo: 20, lasers: 1, shields: 1, speed: 16 } },
  { name: 'Mamba', price: 16000, cargo: 15, maxSpeed: 22, laser: 1, shield: 1, description: 'Гоночный корабль', color: '#ff6b6b',
    svg: '<path d="M16 2 L20 6 L22 8 L20 12 L18 8 L18 18 L14 18 L14 8 L12 12 L10 8 L8 6 Z" fill="currentColor"/>',
    stats: { agility: 9, cargo: 15, lasers: 1, shields: 1, speed: 22 } },
  { name: 'Cobra III', price: 26000, cargo: 20, maxSpeed: 20, laser: 2, shield: 2, description: 'Универсальный корабль', color: '#ffa500',
    svg: '<path d="M16 2 L24 6 L24 10 L26 14 L24 18 L22 22 L18 20 L18 12 L14 12 L14 20 L10 22 L8 18 L6 14 L8 10 L8 6 Z" fill="currentColor"/>',
    stats: { agility: 7, cargo: 20, lasers: 2, shields: 2, speed: 20 } },
  { name: 'Anaconda', price: 80000, cargo: 80, maxSpeed: 14, laser: 2, shield: 3, description: 'Тяжёлый грузовик', color: '#9370db',
    svg: '<path d="M12 2 L20 4 L24 8 L26 14 L26 20 L24 24 L20 26 L12 26 L8 26 L4 24 L2 20 L2 14 L4 8 L8 4 Z M12 8 L16 10 L16 18 L12 20 Z" fill="currentColor"/>',
    stats: { agility: 3, cargo: 80, lasers: 2, shields: 3, speed: 14 } },
  { name: 'Python', price: 120000, cargo: 40, maxSpeed: 20, laser: 3, shield: 3, description: 'Военный крейсер', color: '#ff69b4',
    svg: '<path d="M12 2 L20 4 L24 8 L24 12 L28 16 L26 22 L22 24 L16 24 L14 20 L16 16 L16 12 L14 12 L14 16 L12 20 L10 24 L4 24 L2 22 L2 16 L6 12 L6 8 L8 4 Z" fill="currentColor"/>',
    stats: { agility: 5, cargo: 40, lasers: 3, shields: 3, speed: 20 } },
  { name: 'Fer-de-Lance', price: 200000, cargo: 30, maxSpeed: 28, laser: 3, shield: 4, description: 'Элитный истребитель', color: '#00ced1',
    svg: '<path d="M16 2 L20 6 L22 8 L20 12 L18 10 L18 18 L14 18 L14 10 L12 12 L10 8 L8 6 Z M10 12 L6 14 L6 16 L10 16 Z M22 12 L26 14 L26 16 L22 16 Z" fill="currentColor"/>',
    stats: { agility: 9, cargo: 30, lasers: 3, shields: 4, speed: 28 } },
  { name: 'Krait', price: 350000, cargo: 25, maxSpeed: 24, laser: 3, shield: 4, description: 'Охотник за головами', color: '#da70d6',
    svg: '<path d="M16 2 L22 8 L22 12 L24 16 L22 22 L18 20 L18 14 L16 14 L16 20 L12 22 L10 16 L12 12 L12 8 Z M14 14 L18 14 L18 18 L14 18 Z" fill="currentColor"/>',
    stats: { agility: 8, cargo: 25, lasers: 3, shields: 4, speed: 24 } },
  { name: 'Eagle II', price: 500000, cargo: 50, maxSpeed: 30, laser: 4, shield: 5, description: 'Элитный боевой', color: '#ffd700',
    svg: '<path d="M16 2 L22 6 L22 10 L26 14 L24 22 L20 24 L16 24 L12 24 L8 22 L6 14 L10 10 L10 6 Z M12 10 L16 12 L20 10 L16 16 Z" fill="currentColor"/>',
    stats: { agility: 10, cargo: 50, lasers: 4, shields: 5, speed: 30 } }
]

// Extra equipment types
export const EQUIPMENT = {
  fuelTanks: [
    { name: 'Доп. бак I', price: 1500, capacity: 20, description: '+20 к топливу', icon: '⛽' },
    { name: 'Доп. бак II', price: 3500, capacity: 40, description: '+40 к топливу', icon: '⛽' },
    { name: 'Доп. бак III', price: 7000, capacity: 60, description: '+60 к топливу', icon: '⛽' }
  ],
  cargoRacks: [
    { name: 'Грузовой отсек +5', price: 2000, capacity: 5, description: '+5 к грузу', icon: '📦' },
    { name: 'Грузовой отсек +10', price: 4500, capacity: 10, description: '+10 к грузу', icon: '📦' },
    { name: 'Грузовой отсек +20', price: 10000, capacity: 20, description: '+20 к грузу', icon: '📦' }
  ],
  energy: [
    { name: 'Энергоячейка I', price: 2500, capacity: 20, description: '+20 энергия щитов', icon: '⚡' },
    { name: 'Энергоячейка II', price: 6000, capacity: 40, description: '+40 энергия щитов', icon: '⚡' },
    { name: 'Энергоячейка III', price: 12000, capacity: 60, description: '+60 энергия щитов', icon: '⚡' }
  ]
}

// Laser types
export const LASERS = [
  { name: 'Импульсный', price: 0, damage: 10, color: '#00ff00', rate: 500 },
  { name: 'Лучевой', price: 5000, damage: 20, color: '#00ffff', rate: 400 },
  { name: 'Военный', price: 15000, damage: 35, color: '#ff6600', rate: 300 },
  { name: 'Военный II', price: 40000, damage: 50, color: '#ff00ff', rate: 200 }
]

// Shield types
export const SHIELDS = [
  { name: 'Mk I', price: 0, level: 1, color: '#4a9eff', recharge: 0.5 },
  { name: 'Mk II', price: 8000, level: 2, color: '#6aff6a', recharge: 0.8 },
  { name: 'Mk III', price: 20000, level: 3, color: '#ffa500', recharge: 1.2 },
  { name: 'Mk IV', price: 50000, level: 4, color: '#ff69b4', recharge: 1.8 },
  { name: 'Mk V', price: 100000, level: 5, color: '#ffd700', recharge: 2.5 }
]

// Government types with behavior
export const GOVERNMENTS = [
  { name: 'Анархия', color: 'g0', aggression: 0.8, police: 0.1 },
  { name: 'Феодализм', color: 'g1', aggression: 0.5, police: 0.4 },
  { name: 'Мульти-прав', color: 'g2', aggression: 0.3, police: 0.5 },
  { name: 'Диктатура', color: 'g3', aggression: 0.4, police: 0.7 },
  { name: 'Коммунизм', color: 'g4', aggression: 0.2, police: 0.6 },
  { name: 'Федерация', color: 'g5', aggression: 0.1, police: 0.9 },
  { name: 'Демократия', color: 'g6', aggression: 0.15, police: 0.8 },
  { name: 'Корпорация', color: 'g7', aggression: 0.35, police: 0.5 }
]

// Star names from original Elite
export const STAR_NAMES = [
  'Alphix', 'Bethe', 'Gammix', 'Deltix', 'Epsilon', 'Zeta', 'Eta', 'Theta',
  'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau',
  'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'Andor', 'Betel', 'Caph', 'Deneb',
  'Elara', 'Fomal', 'Gienah', 'Hadar', 'Izar', 'Kocab', 'Markab', 'Nunki',
  'Orion', 'Polaris', 'Rigel', 'Sirius', 'Vega', 'Altair', 'Achernar', 'Canopus',
  'Castor', 'Denebola', 'Elnath', 'Fenir', 'Aldebaran', 'Arcturus', 'Capella', 'Procyon',
  'Spica', 'Regulus', 'Pollux', 'Mirfak', 'Shaula', 'Wezen', 'Hamal', 'Menkar'
].filter(n => n) // Remove empty entries

// Rank names with bonuses
export const RANKS = [
  { name: 'Безвредный', kills: 0, bonus: 0 },
  { name: 'Почти безвредный', kills: 5, bonus: 0.05 },
  { name: 'Бедняк', kills: 10, bonus: 0.1 },
  { name: 'Средний', kills: 20, bonus: 0.15 },
  { name: 'Выше среднего', kills: 35, bonus: 0.2 },
  { name: 'Компетентный', kills: 50, bonus: 0.25 },
  { name: 'Опасный', kills: 75, bonus: 0.3 },
  { name: 'Смертельный', kills: 100, bonus: 0.4 },
  { name: 'Элита', kills: 150, bonus: 0.5 }
]

// Enemy types with behaviors
export const ENEMY_TYPES = [
  { name: 'Пират', baseHealth: 30, damage: 5, speed: 1.0, reward: 150, color: '#ff4444', aggression: 0.8 },
  { name: 'Контрабандист', baseHealth: 40, damage: 8, speed: 1.2, reward: 200, color: '#ff8800', aggression: 0.5 },
  { name: 'Охотник', baseHealth: 50, damage: 10, speed: 0.9, reward: 300, color: '#ff00ff', aggression: 0.9 },
  { name: 'Убийца', baseHealth: 70, damage: 15, speed: 1.1, reward: 500, color: '#8800ff', aggression: 1.0 },
  { name: 'Наёмник', baseHealth: 60, damage: 12, speed: 1.0, reward: 400, color: '#00ff88', aggression: 0.7 }
]

// Mission types
export const MISSION_TYPES = [
  { name: 'Доставка груза', type: 'delivery', minReward: 500, maxReward: 2000 },
  { name: 'Уничтожение цели', type: 'assassinate', minReward: 800, maxReward: 3000 },
  { name: 'Разведка', type: 'scout', minReward: 300, maxReward: 1000 },
  { name: 'Защита конвоя', type: 'escort', minReward: 600, maxReward: 2500 }
]

// Police levels
export const POLICE_LEVELS = [
  { name: 'Нет', threshold: 0, response: 0 },
  { name: 'Низкий', threshold: 1, response: 0.3 },
  { name: 'Средний', threshold: 3, response: 0.6 },
  { name: 'Высокий', threshold: 5, response: 0.9 },
  { name: 'Максимальный', threshold: 10, response: 1.0 }
]