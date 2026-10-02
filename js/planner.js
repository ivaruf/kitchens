/*
 * planner.js — a week of dinners, across kitchens, with the plain food beside.
 *
 * As the owner scoped it (TODO.md, 2026-10-02): start from a kitchen mood —
 * one kitchen's week, or "mix it up" — and a number of dinners, three to
 * seven. Every dinner is a main, a plain side and a veg. The side and the veg
 * come from the everyday kitchen, whatever the main is, because the children
 * at the table eat plain rice and carrots even on stifado night; the veg is
 * served every day whether or not it gets eaten. The plain sides are written
 * the ordinary way, for children who eat egg, milk and gluten; when a child at
 * the table does not, the sides that carry it are skipped for them. Nothing is saved yet: a plan
 * lives as long as the page does, while the layout is being found.
 *
 * Choosing the mains is the same idea as js/sets.js, a week built around what
 * spoils: each next dinner is the one that reuses the most fresh things
 * already bought, never a near-copy of one already in the week, with a little
 * chance in it so "another week" gives another week. "Mix it up" also leans
 * away from two nights running in the same kitchen.
 *
 * What is at home counts too: a dinner that uses up something already in the
 * fridge scores higher, fresh things most of all, so "what I have" turns into
 * a week rather than sitting there.
 *
 * A plan holds ids only ({ kitchen, recipe }), never dish objects, so it can
 * be redrawn in whichever language is current. Pure functions; the page is
 * drawn by js/main.js.
 */

const EVERYDAY = "everyday";

/* Which plain sides sit best beside a kitchen's mains, best first. */
const SIDES_FOR = {
  greek: ["boiledpotatoes", "ovenchips", "mash", "pasta", "plainrice"],
  vietnam: ["plainrice", "plainnoodles", "friedrice"],
};
const VEG = ["vegsticks", "peascorn", "corncobs", "vegsticks"];

/* The fresh, telling ingredients of a dish: what a week should share. */
function freshOf(k, r) {
  const staples = new Set(k.staples || []);
  return r.ingredients.map((i) => i.id).filter((id) => !staples.has(id) && k.byId[id] && k.byId[id].spoils);
}
function tellingOf(k, r) {
  const staples = new Set(k.staples || []);
  return new Set(r.ingredients.map((i) => i.id).filter((id) => !staples.has(id)));
}

/* How well one more main fits the week so far. */
function fit(byKitchen, week, cand, mood, home) {
  const k = byKitchen[cand.kitchen];
  const r = k.recipeById[cand.recipe];
  const bought = new Map();
  for (const d of week) {
    const dk = byKitchen[d.kitchen];
    for (const id of freshOf(dk, dk.recipeById[d.recipe])) bought.set(id, (bought.get(id) || 0) + 1);
  }
  let s = 0;
  for (const id of freshOf(k, r)) s += bought.has(id) || (home && home.has(id)) ? 3 : -1;
  if (home) for (const ing of r.ingredients) if (home.has(ing.id)) s += k.byId[ing.id].spoils ? 3 : 1;
  // Never a near-copy of a dish already in the week.
  const mine = tellingOf(k, r);
  for (const d of week) {
    const dk = byKitchen[d.kitchen];
    const theirs = tellingOf(dk, dk.recipeById[d.recipe]);
    const both = [...mine].filter((id) => theirs.has(id)).length;
    const either = new Set([...mine, ...theirs]).size;
    if (both / either > 0.45) s -= 16;
  }
  if (mood === "mix" && week.length && week[week.length - 1].kitchen === cand.kitchen) s -= 12;
  return s + Math.random() * 2.5;
}

/*
 * Every main a mood can draw on, without the ones this table cannot eat.
 * A kitchen with too few mains for the week borrows the rest from the others
 * and says so, rather than repeating a dish.
 */
function mainsFor(kitchens, mood, diet) {
  const ok = (k, r) => !r.ingredients.some((i) => (k.byId[i.id].contains || []).some((n) => diet[n]));
  const pick = (k) => k.recipes.filter((r) => r.course === "main" && ok(k, r)).map((r) => ({ kitchen: k.id, recipe: r.id }));
  const cooking = kitchens.filter((k) => k.id !== EVERYDAY);
  const own = mood === "mix" ? cooking.flatMap(pick) : pick(cooking.find((k) => k.id === mood));
  const others = mood === "mix" ? [] : cooking.filter((k) => k.id !== mood).flatMap(pick);
  return { own, others };
}

/** A fresh week: `n` dinners for `mood` ("greek" | "vietnam" | "mix"). */
export function planWeek(kitchens, { mood, n, diet, childNeeds = null, home = null }) {
  const byKitchen = Object.fromEntries(kitchens.map((k) => [k.id, k]));
  const { own, others } = mainsFor(kitchens, mood, diet);
  const week = [];
  let borrowed = 0;
  while (week.length < n) {
    const used = new Set(week.map((d) => d.kitchen + "/" + d.recipe));
    let pool = own.filter((c) => !used.has(c.kitchen + "/" + c.recipe));
    if (!pool.length) {
      pool = others.filter((c) => !used.has(c.kitchen + "/" + c.recipe));
      if (pool.length) borrowed++;
    }
    if (!pool.length) break;
    let best = pool[0];
    let bestScore = -Infinity;
    for (const c of pool) {
      const s = fit(byKitchen, week, c, mood, home);
      if (s > bestScore) [best, bestScore] = [c, s];
    }
    week.push(best);
  }
  const days = [];
  week.forEach((main, i) => {
    const list = sidesOk(kitchens, childNeeds, SIDES_FOR[main.kitchen] || SIDES_FOR.greek);
    const side = sideFor(main, i, i ? days[i - 1].side.recipe : null, list);
    days.push({ main, side, veg: { kitchen: EVERYDAY, recipe: VEG[i % VEG.length] } });
  });
  return { mood, n, days, borrowed, short: days.length < n, childNeeds };
}

/* The plain sides a child at this table can eat: none that carry what a child cannot. */
function sidesOk(kitchens, childNeeds, list) {
  const ed = kitchens.find((k) => k.id === EVERYDAY);
  if (!ed || !childNeeds) return list;
  const ok = list.filter((id) => !ed.recipeById[id].ingredients.some((i) => (ed.byId[i.id].contains || []).some((n) => childNeeds[n])));
  return ok.length ? ok : list;
}

/* A plain side to suit the main, round its kitchen's list, never the same as the night before. */
function sideFor(main, i, prev, list = SIDES_FOR[main.kitchen] || SIDES_FOR.greek) {
  let recipe = list[i % list.length];
  if (recipe === prev && list.length > 1) recipe = list[(i + 1) % list.length];
  return { kitchen: EVERYDAY, recipe };
}

/** Another main for day `i`: the best fit not already in the week. */
export function swapMain(kitchens, plan, i, diet, home = null) {
  const byKitchen = Object.fromEntries(kitchens.map((k) => [k.id, k]));
  const { own, others } = mainsFor(kitchens, plan.mood, diet);
  const used = new Set(plan.days.map((d) => d.main.kitchen + "/" + d.main.recipe));
  const rest = plan.days.filter((_, j) => j !== i).map((d) => d.main);
  const pool = [...own, ...others].filter((c) => !used.has(c.kitchen + "/" + c.recipe));
  if (!pool.length) return plan;
  let best = pool[0];
  let bestScore = -Infinity;
  for (const c of pool) {
    const s = fit(byKitchen, rest, c, plan.mood, home) + (own.includes(c) ? 3 : 0);
    if (s > bestScore) [best, bestScore] = [c, s];
  }
  const days = plan.days.slice();
  const list = sidesOk(kitchens, plan.childNeeds, SIDES_FOR[best.kitchen] || SIDES_FOR.greek);
  days[i] = { ...days[i], main: best, side: sideFor(best, i, i ? days[i - 1].side.recipe : null, list) };
  return { ...plan, days };
}

/** The next plain side (or veg) for day `i`, round the list of what the children can eat. */
export function swapSide(kitchens, plan, i, which, childNeeds = null) {
  const days = plan.days.slice();
  const d = days[i];
  const list = sidesOk(kitchens, childNeeds, which === "veg" ? [...new Set(VEG)] : SIDES_FOR[d.main.kitchen] || SIDES_FOR.greek);
  const at = list.indexOf(d[which].recipe);
  days[i] = { ...d, [which]: { kitchen: EVERYDAY, recipe: list[(at + 1) % list.length] } };
  return { ...plan, days };
}

/**
 * One shopping list for the whole week, across kitchens: each ingredient
 * once (garlic is garlic in any kitchen), fresh first, with every dish's own
 * amount beneath it, and which dinner it is for.
 */
export function weekList(kitchens, plan) {
  const byKitchen = Object.fromEntries(kitchens.map((k) => [k.id, k]));
  const lines = new Map();
  plan.days.forEach((d, day) => {
    for (const part of [d.main, d.side, d.veg]) {
      const k = byKitchen[part.kitchen];
      const r = k.recipeById[part.recipe];
      for (const ing of r.ingredients) {
        const item = k.byId[ing.id];
        if (!lines.has(ing.id)) lines.set(ing.id, { id: ing.id, item, kitchen: k.id, spoils: !!item.spoils, amounts: [] });
        const line = lines.get(ing.id);
        line.spoils = line.spoils || !!item.spoils;
        line.amounts.push({ day, dish: r.name, amount: ing.amount });
      }
    }
  });
  const all = [...lines.values()].sort((a, b) => a.item.name.localeCompare(b.item.name));
  return { fresh: all.filter((l) => l.spoils), keeps: all.filter((l) => !l.spoils) };
}
