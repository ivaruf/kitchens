/*
 * main.js — the house: the pantry shelves, what is at home, the ingredient card,
 * the recipe page, the table settings and the corner's language flags.
 *
 * THE IDEA IN ONE LINE: browsing, not filling in. Nothing here asks the player
 * a question. They look along painted shelves, tap what catches their eye to
 * read about it, and tick what they already have at home — and the panel
 * beside the shelves answers with the dishes that could use it, and the
 * little each still needs. A recipe is a page to read, with the reason behind
 * every step one tap away.
 *
 * Content lives in js/pantry.js and js/recipes.js; every picture comes from
 * js/art.js. This file only arranges them and keeps the list of what is at
 * home — one list for the whole house, which the planner and every shopping
 * list read too.
 *
 * A DISH CAN LIGHT UP THE PANTRY: from its recipe page, every jar and
 * vegetable it uses glows on the shelves, and one button carries them all to
 * nothing else. And any recipe can be cooked along with, one illustrated step
 * at a time (js/cookalong.js).
 *
 * AND DISHES COME IN SETS (js/sets.js): a recipe page offers two or three
 * dishes that share their shopping — a meal for one
 * evening, or a week built around what spoils — with one shopping list and
 * the whole set lit up in the pantry in a tap.
 *
 * AND A WEEK CAN BE PLANNED WITHOUT CHOOSING A KITCHEN (js/planner.js): from
 * the front door, a kitchen mood and a number of dinners give a week, each
 * dinner a main with a plain side and a veg from the everyday kitchen.
 *
 * SCREENS are sibling <section>s and exactly one is visible. The ingredient
 * card is a sheet over whatever screen is showing.
 */

import { loadDiet, saveDiet, loadHome, saveHome, NEEDS } from "./store.js";
import { dishesWith, suggest, containsOf } from "./recipes.js";
import { KITCHENS, KITCHEN_BY_ID } from "./kitchens.js";
import { ingredient, dish } from "./art.js";
import { CookAlong } from "./cookalong.js";
import { bestSet } from "./sets.js";
import { planWeek, swapMain, swapSide, weekList } from "./planner.js";
import { t, list as listOf, localize, getLang, setLang, paintStatic } from "./i18n.js";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};
const art = (cls, markup) => {
  const n = el("span", cls);
  n.innerHTML = markup;
  return n;
};

let diet = loadDiet();
/* The kitchen being browsed, and what is at home — one list for the house. */
let K = localize(KITCHENS[0]);
const home = loadHome();

/* ---------------------------------------------------------------- screens */

const SCREENS = ["home", "table", "pantry", "recipe", "cook", "set", "plan"];
let current = "home";
const cameFrom = {};

function show(id, from) {
  if (from) cameFrom[id] = from;
  for (const s of SCREENS) $(s).hidden = s !== id;
  current = id;
  $("home-btn").hidden = id === "home";
  window.scrollTo(0, 0);
  const heading = $(id).querySelector("h1, h2");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

/* ------------------------------------------------------------- the table */

const activeNeeds = () => NEEDS.filter((n) => diet[n]);

const tableWords = () => t("table", activeNeeds());

function paintTable() {
  for (const b of document.querySelectorAll(".need")) {
    b.setAttribute("aria-pressed", String(!!diet[b.dataset.need]));
  }
  $("table-summary").textContent = `${tableWords()}.`;
  $("table-chip").textContent = tableWords();
}

for (const b of document.querySelectorAll(".need")) {
  b.addEventListener("click", () => {
    diet = { ...diet, [b.dataset.need]: !diet[b.dataset.need] };
    saveDiet(diet);
    plan.week = null;
    paintTable();
  });
}

document.querySelector("#table .back-btn").addEventListener("click", () => {
  const to = cameFrom.table || "home";
  if (to === "pantry") paintPantry();
  show(to);
});

/* Does this ingredient clash with the table? Returns the needs it breaks. */
const clashes = (item) => (item.contains || []).filter((n) => diet[n]);

/* ------------------------------------------------------------ the shelves */

function paintShelves() {
  const list = $("shelf-list");
  list.replaceChildren();
  for (const shelf of K.shelves) {
    const sec = el("section", `shelf shelf-${shelf.id}`);
    const head = el("header", "shelf-head");
    head.append(el("h3", null, shelf.name), el("p", null, shelf.note));
    const row = el("div", "items");
    /*
     * Each thing on the shelf is two controls side by side: the picture opens
     * its card, and the small tick in its corner says "I have this at home".
     */
    for (const item of K.ingredients.filter((i) => i.shelf === shelf.id)) {
      const slot = el("div", "item");
      slot.dataset.id = item.id;
      const b = el("button", "item-open");
      b.type = "button";
      b.append(art("item-art", ingredient(item.id)));
      const tag = el("span", "tag", item.name);
      if (clashes(item).length) {
        tag.classList.add("clash");
        tag.append(el("span", "sr", t("containsSr", clashes(item))));
      }
      b.append(tag);
      b.addEventListener("click", () => openCard(item.id));
      const tick = el("button", "item-have");
      tick.type = "button";
      tick.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>';
      tick.addEventListener("click", () => {
        if (home.has(item.id)) home.delete(item.id);
        else home.add(item.id);
        changed();
      });
      slot.append(b, tick);
      row.append(slot);
    }
    sec.append(head, row);
    list.append(sec);
  }
  markShelves();
}

/*
 * Which jars are at home, which the best idea for tonight still wants,
 * and — when a dish or a set has lit up the pantry — which ones it uses.
 * `lit` is { ids: [recipe ids], set: the set it came from, or null }.
 */
let lit = null;
const litRecipes = () => (lit ? lit.ids.map((id) => K.recipeById[id]) : []);

function markShelves() {
  const ideas = suggest(K.recipes, home);
  const wanted = new Set(ideas.length ? ideas[0].missing : []);
  const uses = lit ? new Set(litRecipes().flatMap((r) => r.ingredients.map((i) => i.id))) : null;
  $("pantry").classList.toggle("lighting", !!uses);
  for (const b of document.querySelectorAll("#shelf-list .item")) {
    const item = K.byId[b.dataset.id];
    const on = home.has(item.id);
    b.classList.toggle("on", on);
    b.classList.toggle("lit", !!uses && uses.has(item.id));
    b.classList.toggle("wanted", !uses && !on && wanted.has(item.id));
    b.querySelector(".item-open").setAttribute("aria-label", `${item.name}${on ? t("onCounter") : ""}`);
    const tick = b.querySelector(".item-have");
    tick.setAttribute("aria-pressed", String(on));
    tick.setAttribute("aria-label", t("haveLabel", item.name));
    tick.title = t("haveLabel", item.name);
  }
}

/* ----------------------------------------------------------- at home */

function paintCounter() {
  const items = $("counter-items");
  items.replaceChildren();
  // What is at home that this kitchen's shelves hold; the rest of the house's
  // list (another kitchen's jars) is kept, just not drawn here.
  const ids = [...home].filter((id) => K.byId[id]);
  if (!ids.length) {
    items.append(el("p", "hint", t("counter.empty")));
  }
  /*
   * Each thing at home is two controls side by side, never one inside
   * the other: the picture opens its card exactly as the shelf does (its name
   * as the tooltip), and a small ✕ in its corner puts it back. The ✕ shows on
   * hover or focus with a mouse, and always on a touch screen, which has no
   * hover to reveal it.
   */
  for (const id of ids) {
    const item = K.byId[id];
    const slot = el("span", `counter-slot${clashes(item).length ? " clash" : ""}`);
    const b = el("button", "counter-item");
    b.type = "button";
    b.title = item.name;
    b.setAttribute("aria-label", item.name);
    b.append(art("mini", ingredient(id)));
    b.addEventListener("click", () => openCard(id));
    const x = el("button", "counter-x", "×");
    x.type = "button";
    x.title = t("putBackLabel", item.name);
    x.setAttribute("aria-label", t("putBackLabel", item.name));
    x.addEventListener("click", () => {
      home.delete(id);
      changed();
    });
    slot.append(b, x);
    items.append(slot);
  }
  $("counter-clear").hidden = !ids.length;
  $("counter-count").textContent = ids.length ? `${ids.length}` : "";

  // The tray's closed face on a narrow screen: a peek at what is there.
  const peek = $("counter-peek");
  peek.replaceChildren(...ids.slice(-5).map((id) => art("peek", ingredient(id))));

  // You could cook: the dishes that use the most of what is at home.
  const ideas = $("ideas");
  ideas.replaceChildren();
  const found = suggest(K.recipes, home);
  if (!ids.length) {
    ideas.append(el("p", "hint", t("ideas.empty")));
  } else if (!found.length) {
    ideas.append(el("p", "hint", t("ideas.none")));
  }
  for (const s of found.slice(0, 3)) ideas.append(ideaCard(s));

  const all = $("all-dishes");
  all.replaceChildren(...K.recipes.map((r) => dishLink(r)));
  markShelves();
}

/* A dish you could cook: what is at home, and what it still needs. */
function ideaCard({ recipe, have, missing }) {
  const b = el("button", `idea${missing.length ? "" : " ready"}`);
  b.type = "button";
  b.append(art("idea-art", dish(recipe)));
  const text = el("span", "idea-text");
  text.append(el("b", null, recipe.name));
  text.append(
    el(
      "span",
      "idea-score",
      missing.length ? t("score", have.length, recipe.key.length) : t("idea.ready"),
    ),
  );
  if (missing.length) {
    const need = el("span", "idea-missing");
    for (const id of missing) {
      const m = art("missing", ingredient(id));
      m.title = K.byId[id].name;
      need.append(m);
    }
    need.append(el("span", "sr", listOf(missing.map((id) => K.byId[id].name.toLowerCase()))));
    text.append(need);
  }
  clashMark(recipe, text);
  b.append(text);
  b.addEventListener("click", () => openRecipe(recipe.id));
  return b;
}

/* A small mark on a dish card when the dish brings something the table cannot eat. */
function clashMark(recipe, into) {
  const hit = containsOf(recipe, K.byId).filter((n) => diet[n]);
  if (!hit.length) return;
  const m = el("span", "dish-clash", t("dishClash", hit));
  into.append(m);
}

function dishLink(recipe) {
  const b = el("button", "idea small");
  b.type = "button";
  b.append(art("idea-art", dish(recipe)));
  const text = el("span", "idea-text");
  text.append(el("b", null, recipe.name), el("span", "idea-score", recipe.line));
  clashMark(recipe, text);
  b.append(text);
  b.addEventListener("click", () => openRecipe(recipe.id));
  return b;
}

function changed() {
  saveHome(home);
  paintCounter();
  // A new list of what is at home is a new best week; make it next time.
  plan.week = null;
}

$("counter-clear").addEventListener("click", () => {
  for (const id of [...home]) if (K.byId[id]) home.delete(id);
  changed();
});

/* Upright, the panel is a tray along the bottom that opens into a sheet. */
const counterEl = $("counter");
$("counter-toggle").addEventListener("click", () => {
  const open = !counterEl.classList.contains("open");
  counterEl.classList.toggle("open", open);
  $("counter-toggle").setAttribute("aria-expanded", String(open));
});

/* The bar across the top of the pantry while a dish is lighting it up. */
function paintLitBar(note = "") {
  const bar = $("lit-bar");
  bar.hidden = !lit;
  if (!lit) return;
  const rs = litRecipes();
  $("lit-art").innerHTML = dish(rs[0]);
  $("lit-title").textContent = t("litTitle", listOf(rs.map((r) => r.name)));
  const ids = new Set(rs.flatMap((r) => r.ingredients.map((i) => i.id)));
  const have = [...ids].filter((id) => home.has(id)).length;
  $("lit-note").textContent = note || t("litNote", ids.size, have);
  $("lit-recipe").textContent = lit.set ? t("lit.set") : t("lit.recipe");
}

function lightUp(ids, set = null) {
  lit = { ids, set };
  paintPantry();
  show("pantry");
  // The first lit jar, brought into view so the glow is seen and not missed.
  const first = document.querySelector("#shelf-list .item.lit");
  if (first) first.scrollIntoView({ block: "center", behavior: "smooth" });
}

$("lit-recipe").addEventListener("click", () => (lit.set ? openSet(lit.set) : openRecipe(lit.ids[0])));
$("lit-off").addEventListener("click", () => {
  lit = null;
  paintLitBar();
  markShelves();
});

function paintPantry() {
  paintTable();
  paintShelves();
  paintCounter();
  paintLitBar();
}

/* --------------------------------------------------------- the card sheet */

const scrim = $("scrim");
let sheetFrom = null;
let cardId = null;

function openSheet(sheet) {
  for (const s of document.querySelectorAll(".sheet")) s.hidden = s !== sheet;
  sheetFrom = sheetFrom || document.activeElement;
  scrim.hidden = false;
  sheet.hidden = false;
  sheet.scrollTop = 0;
  sheet.focus({ preventScroll: true });
}

function closeSheets() {
  for (const s of document.querySelectorAll(".sheet")) s.hidden = true;
  scrim.hidden = true;
  if (sheetFrom && sheetFrom.focus && document.contains(sheetFrom)) sheetFrom.focus({ preventScroll: true });
  sheetFrom = null;
}
scrim.addEventListener("click", closeSheets);

function openCard(id) {
  const item = K.byId[id];
  cardId = id;
  $("card-art").innerHTML = ingredient(id);
  $("card-greek").textContent = item.native;
  $("card-greek").lang = K.lang;
  $("card-title").textContent = item.name;
  $("card-info").textContent = item.info;

  const contains = $("card-contains");
  const c = item.contains || [];
  contains.hidden = !c.length;
  if (c.length) {
    const hit = clashes(item);
    contains.textContent = t("cardContains", c, hit);
    contains.classList.toggle("clash", !!hit.length);
  }

  /*
   * Don't have it? The stand-ins, best first, each saying what to use, how
   * much and what it changes — in the reader's language, and flagged when a
   * stand-in brings something this table cannot eat.
   */
  const swaps = $("card-swaps");
  swaps.replaceChildren(el("p", "kicker", t("card.swaps")));
  const options = (K.swaps && K.swaps[id]) || [];
  if (!options.length) swaps.append(el("p", "hint small", t("card.noSwap")));
  for (const o of options) {
    const words = o[getLang()] || o.en;
    const hit = (o.contains || []).filter((n) => diet[n]);
    const row = el("div", `swap${hit.length ? " clash" : ""}`);
    const head = el("p", "swap-head");
    head.append(el("b", null, words.use));
    // "Leave it out" has no quantity; its amount is a dash, which is not shown.
    if (words.amount && words.amount !== "—") head.append(el("span", "swap-amount", words.amount));
    row.append(head, el("p", "swap-changes", words.changes));
    if (hit.length) row.append(el("p", "swap-clash", t("swapClash", hit)));
    swaps.append(row);
  }

  const dishes = $("card-dishes");
  dishes.replaceChildren();
  const into = dishesWith(K.recipes, id);
  if (!into.length) dishes.append(el("p", "hint small", t("card.alongside")));
  for (const r of into) {
    const b = el("button", "dish-chip");
    b.type = "button";
    b.append(art("chip-art", dish(r)), el("span", null, r.name));
    b.addEventListener("click", () => {
      closeSheets();
      openRecipe(r.id);
    });
    dishes.append(b);
  }
  openSheet($("card"));
}

$("card-close").addEventListener("click", closeSheets);

/* ------------------------------------------------------------ the recipe */

function openRecipe(id, inPlace = false) {
  const r = K.recipeById[id];
  $("recipe-art").innerHTML = dish(r);
  $("recipe-greek").textContent = r.native;
  $("recipe-greek").lang = K.lang;
  $("recipe-title").textContent = r.name;
  $("recipe-line").textContent = r.line;
  $("recipe-meta").textContent = t("meta", r.serves, r.time);
  $("recipe-story").textContent = r.story;

  // What this dish means for this table, said plainly.
  const box0 = $("recipe-table");
  box0.replaceChildren();
  const needs = activeNeeds();
  if (r.fasting) {
    const d = el("details", "note fasting");
    d.append(el("summary", null, t("fasting.summary")), el("p", null, K.fastingNote));
    box0.append(d);
  }
  if (needs.length) {
    const box = el("div", "note table-note");
    box.append(el("p", "kicker", t("table.for")));
    for (const need of needs) {
      const p = el("p");
      p.append(el("b", null, t("tableNo", need)), (r.table || {})[need] || t("asWritten", need));
      box.append(p);
    }
    box0.append(box);
  }

  // Anything in the dish itself this table cannot eat, said before the list.
  const hit = containsOf(r, K.byId).filter((n) => diet[n]);
  if (hit.length) {
    const offenders = r.ingredients.filter((i) => clashes(K.byId[i.id]).length).map((i) => K.byId[i.id].name.toLowerCase());
    box0.prepend(el("p", "note clash-note", t("clashNote", listOf(offenders), hit)));
  }

  recipeId = id;

  // The ingredients, as pictures. What is at home is ticked.
  const tiles = $("recipe-ingredients");
  tiles.replaceChildren();
  for (const ing of r.ingredients) {
    const item = K.byId[ing.id];
    const b = el("button", `tile${home.has(ing.id) ? " have" : ""}${clashes(item).length ? " clash" : ""}`);
    b.type = "button";
    b.append(art("tile-art", ingredient(ing.id)));
    const words = el("span", "tile-words");
    words.append(el("b", null, item.name), el("span", null, ing.amount));
    b.append(words);
    if (home.has(ing.id)) b.append(el("span", "sr", t("tile.on")));
    b.addEventListener("click", () => openCard(ing.id));
    tiles.append(b);
  }

  // The method: the step, and the reason behind it one tap away.
  const ol = $("recipe-method");
  ol.replaceChildren();
  for (const step of r.method) {
    const li = el("li");
    li.append(el("p", null, step.text));
    if (step.why) {
      const d = el("details", "why");
      d.append(el("summary", null, t("why")), el("p", null, step.why));
      li.append(d);
    }
    ol.append(li);
  }
  $("recipe-serve").textContent = t("serve", r.serve);
  paintSetPeek("recipe");
  if (!inPlace) show("recipe");
}

let recipeId = null;

$("recipe-back").addEventListener("click", () => {
  if (recipeReturn === "plan") {
    recipeReturn = null;
    openPlan();
    return;
  }
  paintPantry();
  show("pantry");
});
$("recipe-cook").addEventListener("click", () => {
  show("cook");
  cookAlong.start(K.recipeById[recipeId]);
});
$("recipe-light").addEventListener("click", () => lightUp([recipeId]));

/* ------------------------------------------------------------- the week */

/*
 * The plan lives here and nowhere else: nothing is saved to the device yet
 * (TODO.md). It holds ids only, so a language switch simply redraws it.
 */
const plan = { mood: "greek", n: 5, week: null };
let recipeReturn = null;
const everyKitchen = () => KITCHENS.map(localize);
const kitchenNow = (id) => everyKitchen().find((k) => k.id === id);

function openPlan() {
  delete document.documentElement.dataset.kitchen;
  if (!plan.week) plan.week = planWeek(everyKitchen(), { mood: plan.mood, n: plan.n, diet, home });
  paintPlan();
  show("plan");
}

function remake() {
  plan.week = planWeek(everyKitchen(), { mood: plan.mood, n: plan.n, diet, home });
  paintPlan();
}

/* From the pantry: a week in this kitchen, built around what is at home. */
$("plan-from-home").addEventListener("click", () => {
  plan.mood = K.id === "everyday" ? "mix" : K.id;
  plan.week = null;
  openPlan();
});

/* Open a dish from the plan in its own kitchen; its Back comes home to the plan. */
function openFromPlan(part) {
  if (K.id !== part.kitchen) {
    K = localize(KITCHEN_BY_ID[part.kitchen]);
    lit = null;
  }
  document.documentElement.dataset.kitchen = K.id;
  recipeReturn = "plan";
  openRecipe(part.recipe);
}

function paintPlan() {
  const ks = everyKitchen();
  // The moods: a week in one kitchen, or a mix. The everyday kitchen is not
  // a mood — it is where every dinner's plain side comes from.
  const moods = $("plan-moods");
  moods.replaceChildren(
    ...[...ks.filter((k) => k.id !== "everyday").map((k) => ({ id: k.id, name: k.name, sub: k.native, lang: k.lang, art: k.door })), {
      id: "mix",
      name: t("plan.mix"),
      sub: t("plan.mixSub"),
      art: [ks[0].door[0], ks[1].door[1], ks[0].door[2], ks[1].door[3]],
    }].map((m) => {
      const b = el("button", `door door-${m.id}`);
      b.type = "button";
      b.setAttribute("aria-pressed", String(plan.mood === m.id));
      const pics = el("span", "door-art");
      pics.setAttribute("aria-hidden", "true");
      pics.append(...m.art.map((id) => art("door-item", ingredient(id))));
      const words = el("span", "door-words");
      const sub = el("span", "greek-inline", m.sub);
      if (m.lang) sub.lang = m.lang;
      words.append(el("b", null, m.name), sub);
      b.append(pics, words);
      b.addEventListener("click", () => {
        plan.mood = m.id;
        remake();
      });
      return b;
    }),
  );

  const nBox = $("plan-n");
  nBox.replaceChildren(
    ...[3, 4, 5, 6, 7].map((n) => {
      const b = el("button", "chip", String(n));
      b.type = "button";
      b.setAttribute("aria-pressed", String(plan.n === n));
      b.addEventListener("click", () => {
        plan.n = n;
        remake();
      });
      return b;
    }),
  );

  const w = plan.week;
  const notes = [t("plan.hint")];
  if (w.borrowed) notes.push(t("planBorrowed", w.borrowed));
  if (w.short) notes.push(t("planShort", w.days.length));
  $("plan-note").textContent = notes.join(" ");

  // The days: the main large, the plain side and the veg beside it.
  const days = $("plan-days");
  days.replaceChildren();
  w.days.forEach((d, i) => {
    const li = el("li", "plan-day");
    li.append(el("p", "kicker", t("weekday")[i]));
    const main = kitchenNow(d.main.kitchen);
    const r = main.recipeById[d.main.recipe];
    const mainBtn = el("button", "plan-main");
    mainBtn.type = "button";
    const mWords = el("span", "plan-words");
    const kTag = el("small", null, main.name);
    mWords.append(el("b", null, r.name), kTag);
    mainBtn.append(art("plan-art", dish(r)), mWords);
    mainBtn.addEventListener("click", () => openFromPlan(d.main));
    const swapM = swapBtn(t("plan.swapMain"), () => {
      plan.week = swapMain(everyKitchen(), plan.week, i, diet, home);
      paintPlan();
    });

    const extras = el("div", "plan-extras");
    for (const [which, label, swapLabel] of [["side", t("plan.plain"), t("plan.swapSide")], ["veg", t("plan.veg"), t("plan.swapVeg")]]) {
      const ek = kitchenNow(d[which].kitchen);
      const er = ek.recipeById[d[which].recipe];
      const box = el("span", "plan-extra");
      const b = el("button", "plan-extra-dish");
      b.type = "button";
      const words = el("span", "plan-words");
      words.append(el("small", null, label), el("b", null, er.name));
      // The plain sides are written the ordinary way, for the children; say
      // when one carries what this table cooks without (its recipe has the
      // free version).
      const hit = containsOf(er, ek.byId).filter((n) => diet[n]);
      if (hit.length) words.append(el("span", "dish-clash", t("dishClash", hit)));
      b.append(art("plan-extra-art", dish(er)), words);
      b.addEventListener("click", () => openFromPlan(d[which]));
      box.append(
        b,
        swapBtn(swapLabel, () => {
          plan.week = swapSide(plan.week, i, which);
          paintPlan();
        }),
      );
      extras.append(box);
    }
    const top = el("div", "plan-top");
    top.append(mainBtn, swapM);
    li.append(top, extras);
    days.append(li);
  });

  paintPlanList();
}

/* A small round "another one" button: the same glyph for every swap. */
function swapBtn(label, onClick) {
  const b = el("button", "icon-button swap-btn");
  b.type = "button";
  b.setAttribute("aria-label", label);
  b.title = label;
  b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" /></svg>';
  b.addEventListener("click", onClick);
  return b;
}

/* The week's one shopping list: fresh first, each dinner's amounts beneath. */
function paintPlanList() {
  const { fresh, keeps } = weekList(everyKitchen(), plan.week);
  const list = $("plan-list");
  list.replaceChildren();
  for (const [key, lines] of listGroups(fresh, keeps)) {
    if (!lines.length) continue;
    const group = el("div", `shop-group${key === "set.listHome" ? " at-home" : ""}`);
    group.append(el("p", "kicker", t(key)));
    const ul = el("ul");
    for (const line of lines) {
      const li = el("li");
      li.append(art("shop-art", ingredient(line.id)));
      const words = el("span", "shop-words");
      words.append(el("b", null, line.item.name));
      for (const a of line.amounts) words.append(el("small", null, `${t("weekday")[a.day]} · ${a.dish}: ${a.amount}`));
      li.append(words);
      ul.append(li);
    }
    group.append(ul);
    list.append(group);
  }
}

function planText() {
  const { fresh, keeps } = weekList(everyKitchen(), plan.week);
  const out = [t("plan.title"), ""];
  plan.week.days.forEach((d, i) => {
    const name = (part) => kitchenNow(part.kitchen).recipeById[part.recipe].name;
    out.push(`${t("weekday")[i]}: ${name(d.main)} + ${name(d.side)} + ${name(d.veg)}`);
  });
  out.push("", t("set.list"));
  for (const [key, lines] of listGroups(fresh, keeps).slice(0, 2)) {
    if (!lines.length) continue;
    out.push("", t(key));
    for (const l of lines) out.push(`- ${l.item.name} — ${l.amounts.map((a) => `${a.dish}: ${a.amount}`).join("; ")}`);
  }
  return out.join("\n");
}

$("open-plan").addEventListener("click", openPlan);
$("plan-again").addEventListener("click", remake);
$("plan-copy").addEventListener("click", () => {
  const say = (key) => ($("plan-copy-note").textContent = t(key));
  try {
    navigator.clipboard.writeText(planText()).then(() => say("set.copied"), () => say("set.copyFail"));
  } catch {
    say("set.copyFail");
  }
});
$("plan-door-art").replaceChildren(...["rice", "potato", "carrot", "lemon", "staranise"].map((id) => art("door-item", ingredient(id))));

/* ------------------------------------------------------------- the sets */

/*
 * A set is always rebuilt from where it started — a dish and a mode — never
 * stored as dishes, which lets a language switch redraw it in the new words.
 */
const setMode = { recipe: "meal" };
let openSetFrom = null; // { from: "recipe", mode, anchor }

function setFor(from, mode = setMode[from]) {
  return bestSet(K, { mode, anchor: K.recipeById[recipeId] });
}

/* The two tabs, a meal or this week, and under them the set they make. */
function paintSetPeek(from) {
  const tabs = document.querySelector(`.set-tabs[data-for="${from}"]`);
  tabs.replaceChildren(
    ...["meal", "week"].map((mode) => {
      const b = el("button", "chip", t(mode === "meal" ? "sets.meal" : "sets.week"));
      b.type = "button";
      b.setAttribute("aria-pressed", String(setMode[from] === mode));
      b.addEventListener("click", () => {
        setMode[from] = mode;
        paintSetPeek(from);
      });
      return b;
    }),
  );
  const box = $("recipe-set");
  box.replaceChildren();
  const set = setFor(from);
  if (!set) {
    box.append(el("p", "hint small", t("sets.none")));
    return;
  }
  box.append(el("p", "hint small", t(setMode[from] === "meal" ? "sets.mealHint" : "sets.weekHint")));
  const row = el("div", "peek-dishes");
  for (const r of set.dishes) {
    const d = el("span", `peek-dish${from === "recipe" && r.id === recipeId ? " this" : ""}`);
    d.append(art("peek-art", dish(r)), el("b", null, r.name), el("small", null, t("course")[r.course]));
    row.append(d);
  }
  const go = el("button", "primary", t("sets.see"));
  go.type = "button";
  go.addEventListener("click", () => {
    openSetFrom = { from, mode: setMode[from], anchor: recipeId };
    openSet(set);
  });
  box.append(row, go);
}

/* The set page: the dishes, what they share, and the list to shop with. */
function openSet(set) {
  const week = set.mode === "week";
  $("set-kicker").textContent = t(week ? "set.kickerWeek" : "set.kickerMeal");
  $("set-title").textContent = t(week ? "set.titleWeek" : "set.titleMeal");
  $("set-hint").textContent = t(week ? "sets.weekHint" : "sets.mealHint");
  $("set-note").textContent = "";

  const dishes = $("set-dishes");
  dishes.replaceChildren(
    ...set.dishes.map((r) => {
      const b = el("button", "set-dish");
      b.type = "button";
      b.append(art("set-dish-art", dish(r)), el("b", null, r.name), el("small", null, t("course")[r.course]));
      b.addEventListener("click", () => openRecipe(r.id));
      return b;
    }),
  );

  const shared = $("set-shared");
  shared.replaceChildren();
  if (!set.shared.length) shared.append(el("p", "hint", t("set.nothingShared")));
  for (const s of set.shared) {
    const b = el("button", `share${s.spoils ? " fresh" : ""}`);
    b.type = "button";
    b.append(art("share-art", ingredient(s.id)));
    const words = el("span", "share-words");
    words.append(el("b", null, K.byId[s.id].name), el("small", null, t("sharedIn", s.n)));
    if (s.spoils) words.append(el("span", "fresh-tag", t("set.fresh")));
    b.append(words);
    b.addEventListener("click", () => openCard(s.id));
    shared.append(b);
  }

  // For a week, the honest line: did everything fresh get used more than once?
  const freshNote = $("set-fresh-note");
  const once = set.fresh.filter((l) => l.amounts.length === 1).map((l) => K.byId[l.id].name.toLowerCase());
  freshNote.hidden = !week;
  freshNote.textContent = once.length ? t("freshOnce", listOf(once)) : t("set.freshAll");
  freshNote.classList.toggle("good", !once.length);

  // The shopping list: fresh first, then the cupboard; every dish's amount.
  const list = $("set-list");
  list.replaceChildren();
  for (const [key, lines] of listGroups(set.fresh, set.keeps)) {
    if (!lines.length) continue;
    const group = el("div", `shop-group${key === "set.listHome" ? " at-home" : ""}`);
    group.append(el("p", "kicker", t(key)));
    const ul = el("ul");
    for (const line of lines) {
      const item = K.byId[line.id];
      const li = el("li", clashes(item).length ? "clash" : "");
      li.append(art("shop-art", ingredient(line.id)));
      const words = el("span", "shop-words");
      words.append(el("b", null, item.name));
      if (clashes(item).length) words.append(el("em", null, ` — ${t("set.notForTable")}`));
      for (const a of line.amounts) words.append(el("small", null, `${a.dish.name}: ${a.amount}`));
      li.append(words);
      ul.append(li);
    }
    group.append(ul);
    list.append(group);
  }

  currentSet = set;
  show("set");
}

let currentSet = null;

/*
 * Every shopping list in three groups: fresh, from the cupboard — and what
 * is already at home, set apart at the end so it is not bought twice.
 */
function listGroups(fresh, keeps) {
  const need = (l) => !home.has(l.id);
  return [
    ["set.listFresh", fresh.filter(need)],
    ["set.listKeeps", keeps.filter(need)],
    ["set.listHome", [...fresh, ...keeps].filter((l) => !need(l))],
  ];
}

/* The list as plain text, for the clipboard and anyone pasting it into a note. */
function listText(set) {
  const out = [t("set.list"), ""];
  for (const [key, lines] of listGroups(set.fresh, set.keeps).slice(0, 2)) {
    if (!lines.length) continue;
    out.push(t(key));
    for (const line of lines) {
      const item = K.byId[line.id];
      const amounts = line.amounts.map((a) => `${a.dish.name}: ${a.amount}`).join("; ");
      out.push(`- ${item.name}${clashes(item).length ? ` (${t("set.notForTable")})` : ""} — ${amounts}`);
    }
    out.push("");
  }
  return out.join("\n").trim();
}

$("set-copy").addEventListener("click", () => {
  const say = (key) => ($("set-note").textContent = t(key));
  try {
    navigator.clipboard.writeText(listText(currentSet)).then(() => say("set.copied"), () => say("set.copyFail"));
  } catch {
    // No clipboard here (an iframe without the permission, an old browser).
    // The list on the page is selectable text, so the reader can still copy it.
    say("set.copyFail");
  }
});
$("set-light").addEventListener("click", () => lightUp(currentSet.dishes.map((r) => r.id), currentSet));
$("set-back").addEventListener("click", () => {
  openRecipe(openSetFrom.anchor);
});

const cookAlong = new CookAlong({
  openCard: (id) => openCard(id),
  byId: () => K.byId,
  onExit: () => openRecipe(cookAlong.recipe.id),
});

/* -------------------------------------------------------------- the doors */

/* Walk into a kitchen: its pantry and its colours. */
function enterKitchen(id) {
  if (K.id !== id) {
    K = localize(KITCHEN_BY_ID[id]);
    lit = null;
  }
  document.documentElement.dataset.kitchen = K.id;
  paintPantryHead();
  paintPantry();
  show("pantry", "home");
}

function paintPantryHead() {
  $("pantry-kicker").replaceChildren(K.name + " ", Object.assign(el("span", "greek-inline", `· ${K.native}`), { lang: K.lang }));
  $("pantry-intro").textContent = K.intro;
}

/* The front door: one door per kitchen, each a few things off its shelves. */
function paintDoors() {
  $("doors").replaceChildren(...KITCHENS.map((base) => {
    const k = localize(base);
    const b = el("button", `door door-${k.id}`);
    b.type = "button";
    const pics = el("span", "door-art");
    pics.setAttribute("aria-hidden", "true");
    pics.append(...k.door.map((id) => art("door-item", ingredient(id))));
    const words = el("span", "door-words");
    words.append(el("b", null, k.name), Object.assign(el("span", "greek-inline", k.native), { lang: k.lang }));
    b.append(pics, words);
    b.addEventListener("click", () => enterKitchen(k.id));
    return b;
  }));
}
paintDoors();
/* Home, from the pantry's Back or from the house top left, anywhere. */
function goHome() {
  closeSheets();
  // The front door belongs to no kitchen, so it takes back the house colours.
  delete document.documentElement.dataset.kitchen;
  show("home");
}
$("pantry-home").addEventListener("click", goHome);
$("home-btn").addEventListener("click", goHome);
$("open-table").addEventListener("click", () => {
  paintTable();
  show("table", "home");
});
$("table-chip").addEventListener("click", () => {
  paintTable();
  show("table", "pantry");
});

/*
 * The way back to the arcade. exit.js decides what quitting does; these
 * buttons appear only when it has turned up AND there is somewhere to go —
 * a launcher framing us, or an installed window that can really close.
 */
function wireExits() {
  const exit = window.ArcadeExit;
  if (!exit || !(exit.framed() || exit.standalone())) return;
  for (const b of document.querySelectorAll(".exit-btn")) {
    b.hidden = false;
    b.textContent = exit.verb({ arcade: t("exit"), app: t("close") });
    if (!b.dataset.wired) b.addEventListener("click", () => exit.quit());
    b.dataset.wired = "1";
  }
}
wireExits();

/* Escape closes the ingredient card; there is no menu for it to open. */
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$("card").hidden) closeSheets();
});

/* ------------------------------------------------------------ language */

/*
 * English or Norsk, from the two flags in the corner. Switching repaints
 * whatever is on screen in place — the recipe stays open at the same step,
 * what is at home stays ticked — because the content is only re-read,
 * never reloaded.
 */
function paintFlags() {
  for (const b of document.querySelectorAll("#corner .flag")) {
    b.setAttribute("aria-pressed", String(getLang() === b.dataset.lang));
  }
}
for (const b of document.querySelectorAll("#corner .flag")) {
  b.addEventListener("click", () => switchLang(b.dataset.lang));
}

function switchLang(id) {
  if (id === getLang()) return;
  setLang(id);
  K = localize(KITCHEN_BY_ID[K.id]);
  paintStatic();
  paintFlags();
  paintDoors();
  paintTable();
  wireExits();
  if (current === "pantry") {
    paintPantryHead();
    paintPantry();
  }
  if (current === "recipe" && recipeId) openRecipe(recipeId, true);
  if (current === "cook") cookAlong.relang(K.recipeById[cookAlong.recipe.id]);
  if (current === "set" && openSetFrom) {
    if (openSetFrom.from === "recipe") recipeId = openSetFrom.anchor;
    const again = setFor(openSetFrom.from, openSetFrom.mode);
    if (again) openSet(again);
  }
  if (!$("card").hidden && cardId) openCard(cardId);
  if (current === "plan") paintPlan();
}

paintStatic();
paintFlags();
paintTable();
