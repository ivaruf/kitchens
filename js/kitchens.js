/*
 * kitchens.js — the kitchens this cookbook has, and what makes each its own.
 *
 * A kitchen is a pantry (shelves and ingredients), its dishes, and its look.
 * Everything else — the shelves, the counter, the recipe page, the
 * cook-along — is shared and reads the current kitchen from here. A third
 * kitchen is one more entry and one more content file.
 *
 * Ingredient ids are only unique within a kitchen: "garlic" in Greece and
 * "garlic" in Vietnam are two entries with their own words, sharing one
 * picture. Each kitchen keeps its own counter for the same reason.
 */

import { SHELVES, INGREDIENTS } from "./pantry.js";
import { RECIPES, FASTING_NOTE } from "./recipes.js";
import { VN_SHELVES, VN_INGREDIENTS, VN_RECIPES } from "./vietnam.js";
import { SWAPS_GREEK } from "./swaps/greek.js";
import { SWAPS_VIETNAM } from "./swaps/vietnam.js";
import { ED_SHELVES, ED_INGREDIENTS, ED_RECIPES, ED_KITCHEN_INTRO } from "./everyday.js";
import { SWAPS_EVERYDAY } from "./swaps/everyday.js";
import { FAV_PANTRY, FAV_SHELVES, FAVOURITES } from "./favourites.js";
import { NB } from "./nb.js";

/*
 * Three facts the dish sets (js/sets.js) need, kept here beside each kitchen so
 * they can be read and argued with in one place:
 *
 *   courses   what each dish is at a table: "main", "side", "starter" (a meze,
 *             a salad, a fresh roll), "sauce" (served with something else,
 *             never a course of its own) or "veg" (the everyday kitchen's
 *             plain vegetables, served beside every planned dinner). Greek soups and ladera are mains —
 *             that is how they are eaten.
 *   spoils    the ingredients that will not keep a week once bought: fresh
 *             herbs, leaves, soft vegetables, meat and fish. Everything else —
 *             onions, garlic, potatoes, citrus, dried goods, bottles, spices —
 *             is assumed to keep, which is what "use it up this week" is about.
 *   swaps     stand-ins for when you do not have it (js/swaps/), shown on
 *             each ingredient's card. Bilingual in their own files.
 *   staples   what nearly every dish uses and every kitchen already has (salt,
 *             pepper, the cooking oil, fish sauce). Sharing them says nothing
 *             about two dishes belonging together, so they are not counted.
 */
function kitchen(k) {
  const recipes = k.recipes.map((r) => ({ ...r, course: k.courses[r.id] || "main" }));
  const spoils = new Set(k.spoils);
  const ingredients = k.ingredients.map((i) => ({ ...i, spoils: spoils.has(i.id) }));
  return {
    ...k,
    recipes,
    ingredients,
    byId: Object.fromEntries(ingredients.map((i) => [i.id, i])),
    recipeById: Object.fromEntries(recipes.map((r) => [r.id, r])),
  };
}

export const KITCHENS = [
  kitchen({
    id: "greek",
    name: "The Greek kitchen",
    native: "η κουζίνα",
    lang: "el",
    intro: "Olive oil by the glassful, lemon at the end, oregano dried and cinnamon in the meat. Tap anything to read about it.",
    door: ["lemon", "oil", "oregano", "tomato", "chickpeas"],
    shelves: SHELVES,
    ingredients: INGREDIENTS,
    recipes: RECIPES,
    fastingNote: FASTING_NOTE,
    swaps: SWAPS_GREEK,
    staples: ["salt", "blackpepper", "oil"],
    courses: {
      fasolada: "main", fakes: "main", avgolemono: "main", tahinosoupa: "main",
      revithada: "main", fasolakia: "main", spanakorizo: "main", soufico: "main",
      gemista: "main", gigantes: "main", briam: "main", stifado: "main",
      lemonates: "side",
      horiatiki: "starter", fava: "starter", melitzanosalata: "starter", skordalia: "starter",
    },
    spoils: [
      "parsley", "dill", "mint", "tomato", "celery", "aubergine", "courgette", "pepper",
      "cucumber", "spinach", "greenbeans", "springonion", "beef", "chicken", "feta", "bread",
    ],
  }),
  kitchen({
    id: "vietnam",
    name: "The Vietnamese kitchen",
    native: "bếp Việt",
    lang: "vi",
    intro: "Salty, sour, sweet and hot, balanced in every bowl — and herbs by the plateful. Tap anything to read about it.",
    door: ["staranise", "lime", "chilli", "fishsauce", "thaibasil"],
    shelves: VN_SHELVES,
    ingredients: VN_INGREDIENTS,
    recipes: VN_RECIPES,
    fastingNote: "",
    swaps: SWAPS_VIETNAM,
    staples: ["fishsauce", "neutraloil", "sugar", "blackpepper"],
    courses: { pho: "main", cakho: "main", raumuong: "side", goicuon: "starter", nuoccham: "sauce" },
    spoils: [
      "thaibasil", "coriander", "mint", "springonion", "chilli", "beansprouts",
      "lettuce", "waterspinach", "beef", "prawns", "fish",
    ],
  }),
  /*
   * The everyday kitchen: plain rice, potatoes, pasta and simple veg, for the
   * ones at the table who want the boring thing. Every planned dinner takes
   * its side and its veg from here (js/planner.js). Its "native" language is
   * Norwegian, the language of the kitchen it was written for.
   */
  kitchen({
    id: "everyday",
    name: "The everyday kitchen",
    native: "hverdagskjøkkenet",
    lang: "nb",
    intro: ED_KITCHEN_INTRO,
    door: ["rice", "potato", "ketchup", "carrot", "gfpasta"],
    shelves: ED_SHELVES,
    ingredients: ED_INGREDIENTS,
    recipes: ED_RECIPES,
    fastingNote: "",
    swaps: SWAPS_EVERYDAY,
    staples: ["salt", "oil"],
    courses: {
      plainrice: "side", friedrice: "side", boiledpotatoes: "side", mash: "side", ovenchips: "side",
      pasta: "side", plainnoodles: "side", vegsticks: "veg", peascorn: "veg", corncobs: "veg",
    },
    spoils: ["cucumber", "pepper", "corncob", "springonion", "milk"],
  }),
];

/*
 * OUR FAVOURITES, built from js/favourites.js — the one content file written
 * by hand, so it is shaped for the writer, not for the code. This turns it
 * into the same shape as every other kitchen, plus a bokmål overlay:
 *
 *   - a borrowed ingredient (onion: "greek") takes its words, picture,
 *     contents and keeps-or-spoils from its home kitchen, English and bokmål;
 *   - an "own" favourite becomes a recipe from its two language blocks and
 *     its shared steps;
 *   - a "tweak" copies its base dish (in both languages), changes the amounts
 *     it names, leaves out what it lists, and puts our notes first.
 *
 * A mistake in the file (an unknown id, a missing base) is named in the
 * console and that favourite skipped, so one typo never blanks the kitchen.
 */
function buildFavourites(kitchens) {
  const byKitchen = Object.fromEntries(kitchens.map((k) => [k.id, k]));
  const warn = (msg) => console.warn(`Kitchens favourites: ${msg}`);
  const ingredients = [];
  const nbIngredients = {};
  const swaps = {};
  for (const [id, entry] of Object.entries(FAV_PANTRY)) {
    if (typeof entry === "string") {
      const home = byKitchen[entry];
      const item = home && home.byId[id];
      if (!item) {
        warn(`"${id}" is not in the ${entry} pantry`);
        continue;
      }
      ingredients.push({ ...item, shelf: FAV_SHELVES.some((sh) => sh.id === item.shelf) ? item.shelf : guessShelf(item) });
      const nb = NB[entry] && NB[entry].ingredients && NB[entry].ingredients[id];
      if (nb) nbIngredients[id] = nb;
      if (home.swaps && home.swaps[id]) swaps[id] = home.swaps[id];
    } else {
      ingredients.push({ id, native: entry.nb.name, shelf: entry.shelf, contains: entry.contains, spoils: !!entry.spoils, name: entry.en.name, info: entry.en.info });
      nbIngredients[id] = { name: entry.nb.name, info: entry.nb.info };
      if (entry.swaps) swaps[id] = entry.swaps;
    }
  }
  const known = new Set(ingredients.map((i) => i.id));

  const recipes = [];
  const nbRecipes = {};
  const courses = {};
  for (const f of FAVOURITES) {
    const meta = { status: f.status, added: f.added, source: f.source || null, cuisine: f.cuisine || null, favourite: true };
    if (f.kind === "tweak") {
      const [kid, rid] = String(f.base || "").split("/");
      const base = byKitchen[kid] && byKitchen[kid].recipeById[rid];
      if (!base) {
        warn(`"${f.id}" tweaks "${f.base}", which does not exist`);
        continue;
      }
      const missing = base.ingredients.map((i) => i.id).filter((i) => !known.has(i));
      if (missing.length) {
        warn(`"${f.id}" needs ${missing.join(", ")} in FAV_PANTRY`);
        continue;
      }
      const without = new Set(f.without || []);
      const en = f.en || {};
      const recipe = {
        ...base,
        ...meta,
        id: f.id,
        base: f.base,
        cuisine: f.cuisine || kid,
        name: en.name || base.name,
        story: en.notes ? `${en.notes} ${base.story}` : base.story,
        ingredients: base.ingredients.filter((i) => !without.has(i.id)).map((i) => ({ ...i, amount: (f.amounts && f.amounts[i.id] && f.amounts[i.id].en) || i.amount })),
        method: base.method.map((st) => ({
          ...st,
          add: st.add && st.add.filter((x) => !without.has(x)),
          prep: st.prep && Object.fromEntries(Object.entries(st.prep).filter(([x]) => !without.has(x))),
        })),
      };
      recipes.push(recipe);
      courses[f.id] = base.course || "main";
      const bnb = (NB[kid] && NB[kid].recipes && NB[kid].recipes[rid]) || {};
      const nb = f.nb || {};
      nbRecipes[f.id] = {
        ...bnb,
        name: nb.name || bnb.name,
        story: nb.notes ? `${nb.notes} ${bnb.story || ""}`.trim() : bnb.story,
        ingredients: Object.fromEntries(
          recipe.ingredients.map((i) => [i.id, (f.amounts && f.amounts[i.id] && f.amounts[i.id].nb) || (bnb.ingredients && bnb.ingredients[i.id]) || i.amount]),
        ),
      };
      continue;
    }
    // An own recipe: two language blocks and one list of steps for both.
    const unknown = f.ingredients.filter((i) => !known.has(i));
    if (unknown.length) {
      warn(`"${f.id}" uses ${unknown.join(", ")}, which FAV_PANTRY does not have`);
      continue;
    }
    const step = (lang, n) => ({ ...(f.steps[n] || {}), text: f[lang].steps[n].text, why: f[lang].steps[n].why });
    recipes.push({
      ...meta,
      id: f.id,
      name: f.en.name,
      native: f.nb.name,
      line: f.en.line,
      story: f.en.story,
      serves: f.serves,
      time: f.en.time,
      vessel: f.vessel || "pot",
      key: f.key || f.ingredients.slice(0, 3),
      look: f.look,
      ingredients: f.ingredients.map((id) => ({ id, amount: f.en.amounts[id] || "" })),
      method: f.en.steps.map((_, n) => step("en", n)),
      serve: f.en.serve,
      table: f.en.table || {},
    });
    courses[f.id] = f.course || "main";
    nbRecipes[f.id] = {
      name: f.nb.name,
      line: f.nb.line,
      story: f.nb.story,
      serves: f.serves,
      time: f.nb.time,
      serve: f.nb.serve,
      ingredients: f.nb.amounts,
      method: f.nb.steps.map((st, n) => ({ text: st.text, why: st.why, prep: (f.steps[n] || {}).prep })),
      table: f.nb.table || {},
    };
  }

  // The bokmål overlay, registered beside the other kitchens' (js/nb.js).
  NB.favourites = {
    kitchen: { name: "Våre favoritter", intro: "Retter vi har laget, endret og likt — og noen vi skal prøve. Hver er lagt inn med git, og står med kilden sin." },
    shelves: Object.fromEntries(FAV_SHELVES.map((sh) => [sh.id, sh.nb])),
    ingredients: nbIngredients,
    recipes: nbRecipes,
  };

  return kitchen({
    id: "favourites",
    name: "Our favourites",
    native: "våre favoritter",
    lang: "nb",
    intro: "Dishes we have cooked, changed and liked — and a few we mean to try. Each is added through git, with where it came from.",
    door: ["rosemary", "lentils", "tomato", "oil", "gnocchi"],
    shelves: FAV_SHELVES.map((sh) => ({ id: sh.id, ...sh.en })),
    ingredients,
    recipes,
    fastingNote: "",
    swaps,
    staples: ["salt", "blackpepper", "oil"],
    courses,
    spoils: ingredients.filter((i) => i.spoils).map((i) => i.id),
  });
}

/* A borrowed ingredient on a shelf this kitchen has, by what it is. */
function guessShelf(item) {
  if (item.shelf === "spices") return item.spoils ? "herbs" : "spices";
  if (["dry", "cupboard", "freezer", "fridge"].includes(item.shelf)) return "pulses";
  if (item.shelf === "cold") return "market";
  return "market";
}

KITCHENS.push(buildFavourites(KITCHENS));

export const KITCHEN_BY_ID = Object.fromEntries(KITCHENS.map((k) => [k.id, k]));
