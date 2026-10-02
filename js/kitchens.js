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
    spoils: ["cucumber", "pepper", "corncob", "springonion"],
  }),
];

export const KITCHEN_BY_ID = Object.fromEntries(KITCHENS.map((k) => [k.id, k]));
