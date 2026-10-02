/*
 * nb.js — the bokmål overlays for every kitchen, gathered in one place.
 *
 * Each file under js/nb/ mirrors one content file by id (and recipe steps by
 * position); js/i18n.js lays them over the English at runtime. To translate a
 * new dish, add it to the matching file there — anything missing simply shows
 * in English and is named once in the console.
 */

import { NB_GREEK_PANTRY } from "./nb/greek-pantry.js";
import { NB_GREEK_RECIPES_1 } from "./nb/greek-recipes-1.js";
import { NB_GREEK_RECIPES_2 } from "./nb/greek-recipes-2.js";
import { NB_VIETNAM } from "./nb/vietnam.js";

export const NB = {
  greek: { ...NB_GREEK_PANTRY, recipes: { ...NB_GREEK_RECIPES_1, ...NB_GREEK_RECIPES_2 } },
  vietnam: NB_VIETNAM,
};
