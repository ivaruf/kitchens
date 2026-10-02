/*
 * main.js — the house: the pantry shelves, the counter, the ingredient card,
 * the recipe page, the table settings and the corner's language flags.
 *
 * THE IDEA IN ONE LINE: browsing, not filling in. Nothing here asks the player
 * a question. They look along painted shelves, tap what catches their eye to
 * read about it, put what tempts them on the counter, and the counter answers
 * with the dishes those things could become — what they already have, and the
 * little that is missing. A recipe is a page to read, with the reason behind
 * every step one tap away.
 *
 * Content lives in js/pantry.js and js/recipes.js; every picture comes from
 * js/art.js. This file only arranges them and keeps the counter.
 *
 * A DISH CAN LIGHT UP THE PANTRY: from its recipe page, every jar and
 * vegetable it uses glows on the shelves, and one button carries them all to
 * the counter. And any recipe can be cooked along with, one illustrated step
 * at a time (js/cookalong.js).
 *
 * SCREENS are sibling <section>s and exactly one is visible. The ingredient
 * card is a sheet over whatever screen is showing.
 */

import { loadDiet, saveDiet, loadCounter, saveCounter, NEEDS } from "./store.js";
import { dishesWith, suggest, containsOf } from "./recipes.js";
import { KITCHENS, KITCHEN_BY_ID } from "./kitchens.js";
import { ingredient, dish } from "./art.js";
import { CookAlong } from "./cookalong.js";
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
/* The kitchen being browsed, and its counter. Every kitchen keeps its own. */
let K = localize(KITCHENS[0]);
let counter = loadCounter(K.id, new Set(Object.keys(K.byId)));

/* ---------------------------------------------------------------- screens */

const SCREENS = ["home", "table", "pantry", "recipe", "cook"];
let current = "home";
const cameFrom = {};

function show(id, from) {
  if (from) cameFrom[id] = from;
  for (const s of SCREENS) $(s).hidden = s !== id;
  current = id;
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
    for (const item of K.ingredients.filter((i) => i.shelf === shelf.id)) {
      const b = el("button", "item");
      b.type = "button";
      b.dataset.id = item.id;
      b.append(art("item-art", ingredient(item.id)));
      const tag = el("span", "tag", item.name);
      if (clashes(item).length) {
        tag.classList.add("clash");
        tag.append(el("span", "sr", t("containsSr", clashes(item))));
      }
      b.append(tag);
      b.addEventListener("click", () => openCard(item.id));
      row.append(b);
    }
    sec.append(head, row);
    list.append(sec);
  }
  markShelves();
}

/*
 * Which jars are on the counter, which the counter's best idea still wants,
 * and — when a dish has lit up the pantry — which ones that dish uses.
 */
let lit = null;

function markShelves() {
  const ideas = suggest(K.recipes, counter);
  const wanted = new Set(ideas.length ? ideas[0].missing : []);
  const uses = lit ? new Set(K.recipeById[lit].ingredients.map((i) => i.id)) : null;
  $("pantry").classList.toggle("lighting", !!uses);
  for (const b of document.querySelectorAll("#shelf-list .item")) {
    const on = counter.has(b.dataset.id);
    b.classList.toggle("on", on);
    b.classList.toggle("lit", !!uses && uses.has(b.dataset.id));
    b.classList.toggle("wanted", !uses && !on && wanted.has(b.dataset.id));
    b.setAttribute("aria-label", `${K.byId[b.dataset.id].name}${on ? t("onCounter") : ""}`);
  }
}

/* ------------------------------------------------------------ the counter */

function paintCounter() {
  const items = $("counter-items");
  items.replaceChildren();
  const ids = [...counter];
  if (!ids.length) {
    items.append(el("p", "hint", t("counter.empty")));
  }
  for (const id of ids) {
    const hit = clashes(K.byId[id]);
    const b = el("button", `counter-item${hit.length ? " clash" : ""}`);
    b.type = "button";
    b.title = t("putBackTitle", K.byId[id].name);
    b.setAttribute("aria-label", t("putBackLabel", K.byId[id].name));
    b.append(art("mini", ingredient(id)));
    b.addEventListener("click", () => {
      counter.delete(id);
      changed();
    });
    items.append(b);
  }
  // Anything here this table cannot eat is said once, plainly, under the board.
  const board = $("counter-items").parentElement;
  board.querySelector(".counter-warn")?.remove();
  const off = ids.filter((id) => clashes(K.byId[id]).length);
  if (off.length) {
    const names = listOf(off.map((id) => K.byId[id].name.toLowerCase()));
    const needs = [...new Set(off.flatMap((id) => clashes(K.byId[id])))];
    board.append(el("p", "counter-warn", t("counterWarn", needs, names)));
  }
  $("counter-clear").hidden = !ids.length;
  $("counter-count").textContent = ids.length ? `${ids.length}` : "";

  // The tray's closed face on a narrow screen: a peek at what is there.
  const peek = $("counter-peek");
  peek.replaceChildren(...ids.slice(-5).map((id) => art("peek", ingredient(id))));

  // The ideas: what the counter could become.
  const ideas = $("ideas");
  ideas.replaceChildren();
  const found = suggest(K.recipes, counter);
  if (!ids.length) {
    ideas.append(el("p", "hint", t("ideas.empty")));
  } else if (!found.length) {
    ideas.append(el("p", "hint", t("ideas.none")));
  }
  for (const s of found.slice(0, 4)) ideas.append(ideaCard(s));

  const all = $("all-dishes");
  all.replaceChildren(...K.recipes.map((r) => dishLink(r)));
  markShelves();
}

/* A dish the counter could become: what is there, and what is still missing. */
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
  saveCounter(K.id, counter);
  paintCounter();
}

$("counter-clear").addEventListener("click", () => {
  counter.clear();
  changed();
});

/* Upright, the counter is a tray along the bottom that opens into a sheet. */
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
  const r = K.recipeById[lit];
  $("lit-art").innerHTML = dish(r);
  $("lit-title").textContent = t("litTitle", r.name);
  const have = r.ingredients.filter((i) => counter.has(i.id)).length;
  $("lit-note").textContent = note || t("litNote", r.ingredients.length, have);
}

/*
 * Everything a dish uses, onto the counter — except what this table cannot
 * eat, which stays on the shelf and is named, so nothing is quietly dropped.
 */
function putAll(recipe) {
  const left = [];
  for (const ing of recipe.ingredients) {
    if (clashes(K.byId[ing.id]).length) left.push(K.byId[ing.id].name.toLowerCase());
    else counter.add(ing.id);
  }
  changed();
  return left.length ? t("putLeft", listOf(left)) : t("putOk");
}

function lightUp(id) {
  lit = id;
  paintPantry();
  show("pantry");
  // The first lit jar, brought into view so the glow is seen and not missed.
  const first = document.querySelector("#shelf-list .item.lit");
  if (first) first.scrollIntoView({ block: "center", behavior: "smooth" });
}

$("lit-all").addEventListener("click", () => paintLitBar(putAll(K.recipeById[lit])));
$("lit-recipe").addEventListener("click", () => openRecipe(lit));
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
  paintPut();
  openSheet($("card"));
}

function paintPut() {
  const on = counter.has(cardId);
  const put = $("card-put");
  put.setAttribute("aria-pressed", String(on));
  put.textContent = on ? t("card.on") : t("card.put");
}

/*
 * Putting something on the counter closes the card at once: the player has
 * decided, and what they want to see now is the counter answering. Putting
 * it back leaves the card open, since they are still reading about it.
 */
$("card-put").addEventListener("click", () => {
  if (counter.has(cardId)) {
    counter.delete(cardId);
    changed();
    paintPut();
    return;
  }
  counter.add(cardId);
  changed();
  closeSheets();
});
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
      p.append(el("b", null, t("tableNo", need)), r.table[need] || t("asWritten", need));
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
  if (!inPlace) $("recipe-all-note").textContent = "";

  // The ingredients, as pictures. What is on the counter is ticked.
  const tiles = $("recipe-ingredients");
  tiles.replaceChildren();
  for (const ing of r.ingredients) {
    const item = K.byId[ing.id];
    const b = el("button", `tile${counter.has(ing.id) ? " have" : ""}${clashes(item).length ? " clash" : ""}`);
    b.type = "button";
    b.append(art("tile-art", ingredient(ing.id)));
    const words = el("span", "tile-words");
    words.append(el("b", null, item.name), el("span", null, ing.amount));
    b.append(words);
    if (counter.has(ing.id)) b.append(el("span", "sr", t("tile.on")));
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
  if (!inPlace) show("recipe");
}

let recipeId = null;

$("recipe-back").addEventListener("click", () => {
  paintPantry();
  show("pantry");
});
$("recipe-cook").addEventListener("click", () => {
  show("cook");
  cookAlong.start(K.recipeById[recipeId]);
});
$("recipe-light").addEventListener("click", () => lightUp(recipeId));
$("recipe-all").addEventListener("click", () => {
  $("recipe-all-note").textContent = putAll(K.recipeById[recipeId]);
  openRecipe(recipeId, true);
});

const cookAlong = new CookAlong({
  openCard: (id) => openCard(id),
  byId: () => K.byId,
  onExit: () => openRecipe(cookAlong.recipe.id),
});

/* -------------------------------------------------------------- the doors */

/* Walk into a kitchen: its pantry, its counter, its colours. */
function enterKitchen(id) {
  if (K.id !== id) {
    K = localize(KITCHEN_BY_ID[id]);
    counter = loadCounter(K.id, new Set(Object.keys(K.byId)));
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
$("pantry-home").addEventListener("click", () => {
  // The front door belongs to no kitchen, so it takes back the house colours.
  delete document.documentElement.dataset.kitchen;
  show("home");
});
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
 * the counter keeps what is on it — because the content is only re-read,
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
  if (!$("card").hidden && cardId) openCard(cardId);
}

paintStatic();
paintFlags();
paintTable();
