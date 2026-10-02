/*
 * sets.js — dishes that share their ingredients, so one shop makes several.
 *
 * Two kinds of set, as the owner scoped them (TODO.md, 2026-10-02):
 *
 *   MEAL   one evening's table, by course: a main, a side and a starter
 *          (meze, salad, fresh rolls) that share as much as possible. Flexible:
 *          when a kitchen has no side, or no starter, that fits, it settles for
 *          fewer courses, and when even that fails it offers the best pair.
 *   WEEK   three dishes for a few days, built around what spoils: the bunch of
 *          dill, the head of celery, the spinach, used up across the week
 *          rather than half thrown away. What keeps (onions, dried beans,
 *          bottles) does not count either way.
 *
 * Each can start from a dish (the recipe page: "goes well with this") or from
 * the counter (whatever is on it, used as fully as possible).
 *
 * Plain search over the dish list, not a solver: a kitchen has at most a few
 * dozen dishes, so trying every pair and triple is instant. Staples (salt,
 * oil, fish sauce) are left out of every comparison — everyone has them, so
 * sharing them proves nothing.
 *
 * Pure functions; nothing here touches the page.
 */

/* The ingredients of a dish that say something about it: no staples. */
function telling(k, r) {
  const staples = new Set(k.staples || []);
  return new Set(r.ingredients.map((i) => i.id).filter((id) => !staples.has(id)));
}

/* How many times each ingredient is used across a set of dishes. */
function uses(k, dishes) {
  const count = new Map();
  for (const r of dishes) for (const id of telling(k, r)) count.set(id, (count.get(id) || 0) + 1);
  return count;
}

/*
 * A set's worth. For a meal, every ingredient used by more than one dish
 * scores; for a week, perishables used more than once score well and
 * perishables bought for a single dish count against it. Either way, every
 * counter item the set uses is worth more than anything else: that is what
 * "from my counter" means.
 */
function score(k, dishes, mode, counter) {
  const count = uses(k, dishes);
  let s = 0;
  for (const [id, n] of count) {
    const spoils = k.byId[id] && k.byId[id].spoils;
    if (mode === "meal") {
      if (n > 1) s += (n - 1) * 2;
    } else if (spoils) {
      s += n > 1 ? (n - 1) * 3 : -1;
    }
    if (counter && counter.has(id)) s += 10;
  }
  // Variety: two dishes that are nearly the same dish (soufico and briam
  // share almost everything) make a dull week and a strange meal.
  const sets = dishes.map((r) => telling(k, r));
  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      const both = [...sets[i]].filter((id) => sets[j].has(id)).length;
      const either = new Set([...sets[i], ...sets[j]]).size;
      if (both / either > 0.45) s -= 16;
    }
  }
  return s;
}

/* Does anything get used by more than one dish in this set? */
function sharesAnything(k, dishes) {
  for (const n of uses(k, dishes).values()) if (n > 1) return true;
  return false;
}

/* Every combination of `n` items from `list`. Small lists only. */
function combos(list, n, start = 0, acc = [], out = []) {
  if (acc.length === n) {
    out.push(acc.slice());
    return out;
  }
  for (let i = start; i < list.length; i++) {
    acc.push(list[i]);
    combos(list, n, i + 1, acc, out);
    acc.pop();
  }
  return out;
}

/* The shapes a meal may take, best first: the flexible part. */
const MEAL_SHAPES = [
  ["main", "side", "starter"],
  ["main", "starter"],
  ["main", "side"],
];

function fitsShape(dishes, shape) {
  const courses = dishes.map((r) => r.course).sort();
  return courses.join() === shape.slice().sort().join();
}

/**
 * The best set of dishes for `mode` ("meal" | "week"), starting from a dish
 * (`anchor`, which must be in the set) or from the counter (`counter`, a Set
 * of ids). Returns null when nothing sensible can be made.
 */
export function bestSet(k, { mode, anchor = null, counter = null }) {
  const pool = k.recipes.filter((r) => r.course !== "sauce" || (anchor && anchor.id === r.id));
  const keep = (dishes) => !anchor || dishes.some((r) => r.id === anchor.id);
  // From the counter, a set must use at least one thing on it.
  const usesCounter = (dishes) => !counter || dishes.some((r) => r.ingredients.some((i) => counter.has(i.id)));

  /*
   * The best set scoring above zero, and — so that no dish is a dead end —
   * the best of the rest that shares at least something, to fall back on.
   */
  let best = null;
  let spare = null;
  const consider = (dishes) => {
    if (!keep(dishes) || !usesCounter(dishes)) return;
    const s = score(k, dishes, mode, counter);
    if (s > 0) {
      if (!best || s > best.score) best = { dishes, score: s };
    } else if (sharesAnything(k, dishes) && (!spare || s > spare.score)) {
      spare = { dishes, score: s };
    }
  };

  if (mode === "meal") {
    for (const shape of MEAL_SHAPES) {
      for (const dishes of combos(pool, shape.length)) if (fitsShape(dishes, shape)) consider(dishes);
      if (best) break;
    }
    if (!best) for (const dishes of combos(pool, 2)) consider(dishes);
  } else {
    // A week: three different dishes, not three starters.
    for (const dishes of combos(pool, 3)) if (dishes.some((r) => r.course === "main")) consider(dishes);
    if (!best) for (const dishes of combos(pool, 2)) consider(dishes);
  }
  const found = best || spare;
  return found ? describe(k, order(found.dishes), mode) : null;
}

/* Courses in the order they come to the table. */
const COURSE_ORDER = { starter: 0, main: 1, side: 2, veg: 3, sauce: 4 };
function order(dishes) {
  return dishes.slice().sort((a, b) => COURSE_ORDER[a.course] - COURSE_ORDER[b.course]);
}

/**
 * Everything the set view shows: the dishes, what they share (and which of
 * those spoil), and the shopping list — each ingredient once, with every
 * dish's own amount beneath it rather than a sum, because the amounts are
 * free text in two languages.
 */
export function describe(k, dishes, mode) {
  const count = uses(k, dishes);
  const shared = [...count.entries()]
    .filter(([, n]) => n > 1)
    .map(([id, n]) => ({ id, n, spoils: !!k.byId[id].spoils, dishes: dishes.filter((r) => r.ingredients.some((i) => i.id === id)) }))
    .sort((a, b) => b.spoils - a.spoils || b.n - a.n);

  // The shopping list, in shelf order so it reads like walking the pantry.
  const shelfOrder = new Map(k.shelves.map((s, i) => [s.id, i]));
  const lines = new Map();
  for (const r of dishes) {
    for (const ing of r.ingredients) {
      if (!lines.has(ing.id)) lines.set(ing.id, { id: ing.id, amounts: [] });
      lines.get(ing.id).amounts.push({ dish: r, amount: ing.amount });
    }
  }
  const list = [...lines.values()].sort(
    (a, b) =>
      shelfOrder.get(k.byId[a.id].shelf) - shelfOrder.get(k.byId[b.id].shelf) ||
      k.ingredients.indexOf(k.byId[a.id]) - k.ingredients.indexOf(k.byId[b.id]),
  );
  const fresh = list.filter((l) => k.byId[l.id].spoils);
  const keeps = list.filter((l) => !k.byId[l.id].spoils);

  return { mode, dishes, shared, fresh, keeps, ids: [...lines.keys()] };
}
