/*
 * store.js — everything this game remembers, and nothing it sends anywhere.
 *
 * Two things persist, all in localStorage, all under the `kitchens.` prefix
 * (hub CLAUDE.md §6: every game on ivaruf.github.io shares one namespace, and
 * anything at all may have written there, so every read is defensive):
 *
 *   kitchens.diet.v1       who is at the table: { dairy, egg, gluten } booleans,
 *                          true meaning "cook without it". This is health
 *                          information about somebody's family, which is the
 *                          strongest possible reason it never leaves the device.
 *   kitchens.home.v1       what is already at home, as one list of ingredient
 *                          ids for the whole house: garlic is garlic in every
 *                          kitchen. The planner prefers dinners that use it up
 *                          and every shopping list leaves it off.
 *
 * Every access is wrapped: private windows throw, quotas run out, and a
 * missing store must leave the game fully playable with defaults.
 */

const DIET_KEY = "kitchens.diet.v1";
const HOME_KEY = "kitchens.home.v1";

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

/** What is at home: any string ids, since a stray one simply matches nothing. */
export function loadHome() {
  const saved = read(HOME_KEY);
  return new Set(Array.isArray(saved) ? saved.filter((id) => typeof id === "string") : []);
}

export function saveHome(set) {
  write(HOME_KEY, [...set]);
}
