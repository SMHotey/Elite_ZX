# ELITE ZX - Agent Instructions

## Project Overview

- **Type**: Browser-based game (Elite clone for ZX Spectrum style)
- **Tech**: Vite + PWA, Vanilla JS, Canvas rendering
- **Entry**: `src/main.js` (~2150 lines - all game logic)
- **Build**: `npm run build` → `dist/`

## Commands

```bash
npm run dev       # Development server (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview built app (localhost:4173)
```

## Critical Architecture Notes

### 1. DUPLICATE FUNCTION BUG
**Common mistake**: Functions defined twice (e.g., `startGame` appeared at lines 298 AND 380).
- Always check for duplicates after code edits
- Use regex search to find duplicates before build

### 2. ORPHANED CODE BUG
**Common mistake**: Random code snippets "orphaned" in the middle of functions without closing braces.
- Example: Lines 609 had orphaned code that broke the build
- Always verify function boundaries after edits

### 3. EXPORT ISSUES
- Internal functions in engine.js must be exported for main.js to use
- Pattern: `export function getCurrentSystemInfo()` at end of engine.js
- Check imports in main.js match exports in engine.js

### 4. ONCLICK HANDLERS
- Functions must be on `window` for inline onclick to work
- Pattern: `window.launch = function() {...}` NOT just `function launch() {...}`
- Console check: Type `typeof window.launch` - should be "function"

### 5. PANEL STATE
- `currentPanel` tracks which panel is active (cockpit, station, trade, galaxy, ship, rank)
- Must use same variable on return: `renderPanel(currentPanel || 'cockpit')`
- Bug: Often resets to 'cockpit' causing wrong panel after transitions

### 6. COMBAT STATE
- Uses `state.inCombat` flag
- Combat uses Canvas (not DOM elements) - lasers drawn on canvas
- Key state variables: `state.lastShot`, `state.hitFlash`, `state.enemies`
- Animation loop must check `state.inCombat` and keep running

### 7. FLIGHT PROGRESSION
- `flightProgress` increments in animation loop
- Combat triggers at `flightProgress > 100`
- Flight ends at `flightProgress > 600` (or when combat ends)
- **Don't use random() in animation loops** - causes inconsistent behavior

### 8. CANVAS DIMENSIONS
- Canvas must be sized in JS: `canvas.width = container.clientWidth`
- Missing sizing = black canvas
- Size is set in `init...()` functions (initCockpit, initFlight, etc.)

## Code Structure

```
src/
├── main.js           # Entry + all UI rendering + onclick handlers
├── core/
│   ├── engine.js    # Game state, combat logic, exports getState, etc.
│   ├── galaxy.js    # Galaxy generation, prices
│   └── player.js   # Player creation
├── styles/
│   └── main.css     # All styles
└── core/
    └── gameData.js # Static data (ships, commodities, etc.)
```

## Testing with Playwright

```bash
# Start server in background, then test
npm run preview

# In Playwright:
await page.goto('http://localhost:4173')
# Click "БыСТРЫЙ СТАРТ (ГОСТЬ)" button
# Then test flight: window.launch()
```

## Common Issues to Avoid

1. **Don't forget `initCockpit()` after rendering cockpit panel** - Canvas won't animate
2. **Don't call `renderPanel()` after combat fire** - stays in full screen
3. **Don't use `getState()` without importing** from engine.js
4. **Check for `animationId`** before starting new animation - cancel old ones
5. **Build succeeds ≠ runtime works** - always verify with Playwright/browser

## Verified Working Features (as of 2026-04)

- Login/guest login → main game ✓
- Cockpit with animated starfield ✓
- Scanner panel (local map) ✓
- Full-screen flight with warp effect ✓  
- Combat with enemies appearing (100% chance) ✓
- Laser beams when firing ✓
- Hit flash effect on enemies ✓
- Docking screen with station animation ✓
- Return to cockpit after combat ✓