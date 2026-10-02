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

function kitchen(k) {
  return {
    ...k,
    byId: Object.fromEntries(k.ingredients.map((i) => [i.id, i])),
    recipeById: Object.fromEntries(k.recipes.map((r) => [r.id, r])),
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
  }),
];

export const KITCHEN_BY_ID = Object.fromEntries(KITCHENS.map((k) => [k.id, k]));
