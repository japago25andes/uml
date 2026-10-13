import { LEVELS } from './levels.js';

export const MAX_HEARTS = 3;
export const STAR_BONUS = 50;
export const STREAK_STEP = 10;
export const STREAK_CAP = 5;

// Rangos inspirados en el viaje en el tiempo.
export const RANKS = [
  { min: 0, name: 'Pintor/a rupestre', icon: '🪨' },
  { min: 900, name: 'Escriba', icon: '📜' },
  { min: 2200, name: 'Cartógrafo/a', icon: '🗺️' },
  { min: 3800, name: 'Ingeniero/a de planos', icon: '📐' },
  { min: 5400, name: 'Modelador/a UML', icon: '💻' },
  { min: 7000, name: 'Leyenda UML', icon: '👑' },
];

export function rankFor(xp) {
  let i = 0;
  while (i + 1 < RANKS.length && xp >= RANKS[i + 1].min) i++;
  const current = RANKS[i];
  const next = RANKS[i + 1] || null;
  const progress = next ? (xp - current.min) / (next.min - current.min) : 1;
  return { current, next, progress };
}

export function totalXp(p) {
  return Object.values(p.levels).reduce((s, l) => s + (l.bestXp || 0), 0);
}

export function totalStars(p) {
  return Object.values(p.levels).reduce((s, l) => s + (l.stars || 0), 0);
}

export function completedCount(p) {
  return Object.values(p.levels).filter((l) => l.completed).length;
}

export const MAX_STARS = LEVELS.length * 3;

const starsIn = (p, id) => p.levels[id]?.stars || 0;

export const BADGES = [
  { id: 'viajero', icon: '🕰️', name: 'Viajero/a del tiempo', desc: 'Completa el viaje de la máquina del tiempo.', test: (p) => !!p.prologueSeen },
  { id: 'primer-paso', icon: '🚀', name: 'Primer paso', desc: 'Completa tu primer nivel.', test: (p) => completedCount(p) >= 1 },
  { id: 'en-racha', icon: '🔥', name: 'En racha', desc: 'Consigue 5 aciertos seguidos.', test: (p) => p.bestStreak >= 5 },
  { id: 'imparable', icon: '⚡', name: 'Imparable', desc: 'Consigue 12 aciertos seguidos.', test: (p) => p.bestStreak >= 12 },
  { id: 'perfeccionista', icon: '💎', name: 'Perfeccionista', desc: 'Consigue 3 estrellas en un nivel.', test: (p) => Object.values(p.levels).some((l) => l.stars === 3) },
  { id: 'media-mision', icon: '🧭', name: 'Media misión', desc: 'Completa 4 niveles.', test: (p) => completedCount(p) >= 4 },
  { id: 'historiador', icon: '📜', name: 'Historiador/a', desc: 'Consigue 3 estrellas en «La guerra de los métodos».', test: (p) => starsIn(p, 'metodos') === 3 },
  { id: 'arquitecto', icon: '🏛️', name: 'Arquitecto/a de clases', desc: 'Consigue 3 estrellas en «Diagrama de clases».', test: (p) => starsIn(p, 'clases') === 3 },
  { id: 'director', icon: '🎼', name: 'Director/a de orquesta', desc: 'Consigue 3 estrellas en «Diagrama de secuencia».', test: (p) => starsIn(p, 'secuencia') === 3 },
  { id: 'cazajefes', icon: '👾', name: 'Cazador/a de jefes', desc: 'Derrota al jefe final.', test: (p) => !!p.levels.jefe?.completed },
  { id: 'coleccionista', icon: '🌟', name: 'Coleccionista', desc: `Consigue las ${MAX_STARS} estrellas.`, test: (p) => totalStars(p) >= MAX_STARS },
  { id: 'leyenda', icon: '👑', name: 'Leyenda UML', desc: 'Alcanza el rango máximo.', test: (p) => totalXp(p) >= RANKS[RANKS.length - 1].min },
];

export function earnedBadges(p) {
  return BADGES.filter((b) => b.test(p)).map((b) => b.id);
}

export function isUnlocked(p, index) {
  return index === 0 || !!p.levels[LEVELS[index - 1].id]?.completed;
}

// La siguiente misión del curso: el juego de casos de uso.
export const NEXT_MISSION_URL = 'http://localhost:8080';
