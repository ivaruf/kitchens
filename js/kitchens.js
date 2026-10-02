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

/*
 * Three facts the dish sets (js/sets.js) need, kept here beside each kitchen so
 * they can be read and argued with in one place:
 *
 *   courses   what each dish is at a table: "main", "side", "starter" (a meze,
 *             a salad, a fresh roll) or "sauce" (served with something else,
 *             never a course of its own). Greek soups and ladera are mains —
 *             that is how they are eaten.
 *   spoils    the ingredients that will not keep a week once bought: fresh
 *             herbs, leaves, soft vegetables, meat and fish. Everything else —
 *             onions, garlic, potatoes, citrus, dried goods, bottles, spices —
 *             is assumed to keep, which is what "use it up this week" is about.
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
    staples: ["fishsauce", "neutraloil", "sugar", "blackpepper"],
    courses: { pho: "main", cakho: "main", raumuong: "side", goicuon: "starter", nuoccham: "sauce" },
    spoils: [
      "thaibasil", "coriander", "mint", "springonion", "chilli", "beansprouts",
      "lettuce", "waterspinach", "beef", "prawns", "fish",
    ],
  }),
];

export const KITCHEN_BY_ID = Object.fromEntries(KITCHENS.map((k) => [k.id, k]));
