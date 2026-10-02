/*
 * store.js — everything this game remembers, and nothing it sends anywhere.
 *
 * Three things persist, all in localStorage, all under the `kitchens.` prefix
 * (hub CLAUDE.md §6: every game on ivaruf.github.io shares one namespace, and
 * anything at all may have written there, so every read is defensive):
 *
 *   kitchens.diet.v1       who is at the table: { dairy, egg, gluten } booleans,
 *                          true meaning "cook without it". This is health
 *                          information about somebody's family, which is the
 *                          strongest possible reason it never leaves the device.
 *   kitchens.counter.v1    what is on the counter, as pantry ids, so a browse
 *                          can be picked up where it was left.
 *   kitchens.vol.*.v1      the two sound levels and the mute (hub §2). The
 *                          kitchen is silent for now; the levels are real so the
 *                          day it is not, it arrives at the level already chosen.
 *
 * Every access is wrapped: private windows throw, quotas run out, and a
 * missing store must leave the game fully playable with defaults.
 */

const DIET_KEY = "kitchens.diet.v1";
const COUNTER_KEY = "kitchens.counter.v1";
const MUSIC_KEY = "kitchens.vol.music.v1";
const SFX_KEY = "kitchens.vol.sfx.v1";
const MUTED_KEY = "kitchens.muted.v1";

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Not remembered this time. The game carries on with what it has.
  }
}

/** The three needs this kitchen knows how to cook around. */
export const NEEDS = ["dairy", "egg", "gluten"];

export function loadDiet() {
  const saved = read(DIET_KEY);
  const diet = { dairy: false, egg: false, gluten: false };
  if (saved && typeof saved === "object") {
    for (const need of NEEDS) diet[need] = saved[need] === true;
  }
  return diet;
}

export function saveDiet(diet) {
  write(DIET_KEY, { dairy: !!diet.dairy, egg: !!diet.egg, gluten: !!diet.gluten });
}

/** The counter, filtered to ids the pantry still has. */
export function loadCounter(known) {
  const saved = read(COUNTER_KEY);
  return new Set(Array.isArray(saved) ? saved.filter((id) => typeof id === "string" && known.has(id)) : []);
}

export function saveCounter(set) {
  write(COUNTER_KEY, [...set]);
}

/** A level 0..1, rejecting anything non-finite somebody else may have left. */
function level(key, fallback) {
  const v = read(key);
  return typeof v === "number" && Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : fallback;
}

export function loadSound() {
  return {
    music: level(MUSIC_KEY, 0.6),
    sfx: level(SFX_KEY, 0.8),
    muted: read(MUTED_KEY) === true,
  };
}

export function saveSound(sound) {
  write(MUSIC_KEY, sound.music);
  write(SFX_KEY, sound.sfx);
  write(MUTED_KEY, !!sound.muted);
}
