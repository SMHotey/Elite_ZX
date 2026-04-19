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

// Ship definitions with visual descriptions
export const SHIPS = [
  { name: 'Sidewinder', price: 0, cargo: 15, maxSpeed: 18, laser: 1, shield: 1, description: 'Стартовый корабль', color: '#4a9eff', shape: 'fighter' },
  { name: 'Adder', price: 14000, cargo: 20, maxSpeed: 16, laser: 1, shield: 1, description: 'Фреighter', color: '#6aff6a', shape: 'freighter' },
  { name: 'Mamba', price: 16000, cargo: 15, maxSpeed: 22, laser: 1, shield: 1, description: 'Гонщик', color: '#ff6b6b', shape: 'racer' },
  { name: 'Cobra III', price: 26000, cargo: 20, maxSpeed: 20, laser: 2, shield: 2, description: 'Универсальный', color: '#ffa500', shape: 'multi' },
  { name: 'Anaconda', price: 80000, cargo: 80, maxSpeed: 14, laser: 2, shield: 3, description: 'Тяжёлый фрахтовщик', color: '#9370db', shape: 'heavy' },
  { name: 'Python', price: 120000, cargo: 40, maxSpeed: 20, laser: 3, shield: 3, description: 'Крейсер', color: '#ff69b4', shape: 'cruiser' },
  { name: 'Fer-de-Lance', price: 200000, cargo: 30, maxSpeed: 28, laser: 3, shield: 4, description: 'Истребитель', color: '#00ced1', shape: 'fighter' },
  { name: 'Krait', price: 350000, cargo: 25, maxSpeed: 24, laser: 3, shield: 4, description: 'Охотник', color: '#da70d6', shape: 'hunter' },
  { name: 'Eagle II', price: 500000, cargo: 50, maxSpeed: 30, laser: 4, shield: 5, description: 'Элитный истребитель', color: '#ffd700', shape: 'elite' }
]

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
]

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