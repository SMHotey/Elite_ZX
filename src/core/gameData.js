// === ELITE ZX - GAME DATA ===

// Commodities base prices and variance
export const COMMODITIES = [
  { name: 'Food', basePrice: 40, variance: 15 },
  { name: 'Textiles', basePrice: 80, variance: 30 },
  { name: 'Radioactives', basePrice: 150, variance: 50 },
  { name: 'Slaves', basePrice: 200, variance: 80 },
  { name: 'Liquor', basePrice: 300, variance: 100 },
  { name: 'Luxuries', basePrice: 500, variance: 200 },
  { name: 'Narcotics', basePrice: 2500, variance: 400 },
  { name: 'Computers', basePrice: 100, variance: 40 },
  { name: 'Machinery', basePrice: 500, variance: 150 },
  { name: 'Alloys', basePrice: 800, variance: 200 },
  { name: 'Firearms', basePrice: 1200, variance: 300 },
  { name: 'Furs', basePrice: 1500, variance: 400 },
  { name: 'Minerals', basePrice: 250, variance: 70 },
  { name: 'Ores', basePrice: 60, variance: 20 },
  { name: 'Water', basePrice: 20, variance: 10 }
]

// Ship definitions
export const SHIPS = [
  { name: 'Sidewinder', price: 0, cargo: 15, maxSpeed: 18, laser: 1, shield: 1, description: 'Starter ship' },
  { name: 'Adder', price: 14000, cargo: 20, maxSpeed: 16, laser: 1, shield: 1, description: 'Freighter' },
  { name: 'Mamba', price: 16000, cargo: 15, maxSpeed: 22, laser: 1, shield: 1, description: 'Racer' },
  { name: 'Cobra III', price: 26000, cargo: 20, maxSpeed: 20, laser: 2, shield: 2, description: 'Multi-purpose' },
  { name: 'Anaconda', price: 80000, cargo: 80, maxSpeed: 14, laser: 2, shield: 3, description: 'Heavy freighter' },
  { name: 'Python', price: 120000, cargo: 40, maxSpeed: 20, laser: 3, shield: 3, description: 'Cruiser' },
  { name: 'Fer-de-Lance', price: 200000, cargo: 30, maxSpeed: 28, laser: 3, shield: 4, description: 'Fighter' },
  { name: 'Krait', price: 350000, cargo: 25, maxSpeed: 24, laser: 3, shield: 4, description: 'Hunter' },
  { name: 'Eagle II', price: 500000, cargo: 50, maxSpeed: 30, laser: 4, shield: 5, description: 'Elite fighter' }
]

// Laser types
export const LASERS = [
  { name: 'Pulse', price: 0, damage: 10 },
  { name: 'Beam', price: 5000, damage: 20 },
  { name: 'Military', price: 15000, damage: 35 },
  { name: 'Military II', price: 40000, damage: 50 }
]

// Shield types
export const SHIELDS = [
  { name: 'Mk I', price: 0, level: 1 },
  { name: 'Mk II', price: 8000, level: 2 },
  { name: 'Mk III', price: 20000, level: 3 },
  { name: 'Mk IV', price: 50000, level: 4 },
  { name: 'Mk V', price: 100000, level: 5 }
]

// Government types
export const GOVERNMENTS = [
  { name: 'Anarchy', color: 'g0' },
  { name: 'Feudal', color: 'g1' },
  { name: 'Multi-gov', color: 'g2' },
  { name: 'Dictatorship', color: 'g3' },
  { name: 'Communist', color: 'g4' },
  { name: 'Federation', color: 'g5' },
  { name: 'Democracy', color: 'g6' },
  { name: 'Corporate', color: 'g7' }
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

// Rank names
export const RANKS = [
  { name: 'Harmless', kills: 0 },
  { name: 'Mostly Harmless', kills: 5 },
  { name: 'Poor', kills: 10 },
  { name: 'Average', kills: 20 },
  { name: 'Above Average', kills: 35 },
  { name: 'Competent', kills: 50 },
  { name: 'Dangerous', kills: 75 },
  { name: 'Deadly', kills: 100 },
  { name: 'Elite', kills: 150 }
]

// Enemy types
export const ENEMY_TYPES = [
  { name: 'Pirate', baseHealth: 30, damage: 5 },
  { name: 'Smuggler', baseHealth: 40, damage: 8 },
  { name: 'Hunter', baseHealth: 50, damage: 10 },
  { name: 'Assassin', baseHealth: 70, damage: 15 }
]