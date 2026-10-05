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

import { loadTable, saveTable, loadHome, saveHome, NEEDS } from "./store.js";
import { dishesWith, suggest, containsOf } from "./recipes.js";
import { KITCHENS, KITCHEN_BY_ID } from "./kitchens.js";
import { ingredient, dish } from "./art.js";
import { CookAlong } from "./cookalong.js";
import { bestSet } from "./sets.js";
import { SOURCES } from "./sources.js";
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

/*
 * The table: adults and children, no names, each with their own needs. What
 * the rest of the cookbook calls `diet` is what the whole table must cook
 * without — every need anyone has — and `childNeeds` is what the children's
 * plain sides must avoid, since those are made for them.
 */
const table = loadTable();
let diet = {};
let childNeeds = {};
function deriveDiet() {
  diet = {};
  childNeeds = {};
  for (const p of table.people) {
    for (const n of NEEDS) {
      if (!p.needs[n]) continue;
      diet[n] = true;
      if (p.kind === "child") childNeeds[n] = true;
    }
  }
}
deriveDiet();
/* The kitchen being browsed, and what is at home — one list for the house. */
let K = localize(KITCHENS[0]);
const home = loadHome();

/* ---------------------------------------------------------------- screens */

const SCREENS = ["home", "table", "pantry", "recipe", "cook", "set", "plan"];
let current = "home";

/* Show one screen. Only render() calls this: the address decides the page. */
function show(id) {
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

const tableWords = () => t("tableShort", table.people, activeNeeds());

/* "Adult 1", "Child 2": numbered within their kind, in the reader's language. */
function personLabel(i) {
  const p = table.people[i];
  const n = table.people.slice(0, i + 1).filter((q) => q.kind === p.kind).length;
  return t(p.kind === "child" ? "personChild" : "personAdult", n);
}

/* Who at the table has a need, as words: "adult 1 and child 2". */
function whoNeeds(need) {
  return whoAny([need]);
}

/* Who has any of these needs, each person named once. */
function whoAny(needs) {
  return listOf(table.people.map((p, i) => (needs.some((n) => p.needs[n]) ? personLabel(i).toLowerCase() : null)).filter(Boolean));
}

function tableChanged() {
  saveTable(table);
  deriveDiet();
  plan.week = null;
  paintTable();
}

/*
 * The table screen: how many adults and children, then one row per person
 * with their three needs as toggles. Adding a person adds a row with no
 * needs; taking one away takes the last of that kind.
 */
function paintTable() {
  const counts = $("table-counts");
  counts.replaceChildren(
    ...["adult", "child"].map((kind) => {
      const n = table.people.filter((p) => p.kind === kind).length;
      const row = el("div", "count-row");
      const less = el("button", "chip step", "−");
      less.type = "button";
      less.disabled = n === 0 || table.people.length === 1;
      less.setAttribute("aria-label", t(kind === "child" ? "lessChild" : "lessAdult"));
      less.addEventListener("click", () => {
        const at = table.people.map((p) => p.kind).lastIndexOf(kind);
        if (at >= 0) table.people.splice(at, 1);
        tableChanged();
      });
      const more = el("button", "chip step", "+");
      more.type = "button";
      more.disabled = table.people.length >= 12;
      more.setAttribute("aria-label", t(kind === "child" ? "moreChild" : "moreAdult"));
      more.addEventListener("click", () => {
        const needs = Object.fromEntries(NEEDS.map((x) => [x, false]));
        // A new adult goes after the adults, a new child at the end.
        const at = kind === "adult" ? table.people.filter((p) => p.kind === "adult").length : table.people.length;
        table.people.splice(at, 0, { kind, needs });
        tableChanged();
      });
      row.append(el("span", "label", t(kind === "child" ? "children" : "adults")), less, el("b", "count", String(n)), more);
      return row;
    }),
  );

  const people = $("table-people");
  people.replaceChildren(
    ...table.people.map((p, i) => {
      const row = el("div", `person person-${p.kind}`);
      const name = el("span", "person-name", personLabel(i));
      const needs = el("div", "person-needs");
      needs.setAttribute("role", "group");
      needs.setAttribute("aria-label", t("cooksWithout", personLabel(i)));
      for (const need of NEEDS) {
        const b = el("button", "chip need-chip", t(`need.${need}`));
        b.type = "button";
        b.setAttribute("aria-pressed", String(p.needs[need]));
        b.addEventListener("click", () => {
          p.needs[need] = !p.needs[need];
          tableChanged();
        });
        needs.append(b);
      }
      row.append(name, needs);
      return row;
    }),
  );
  $("table-summary").textContent = `${tableWords()}.`;
  $("table-summary-big").textContent = `${tableWords()}.`;
  $("table-chip").textContent = tableWords();
}

document.querySelector("#table .back-btn").addEventListener("click", () => goBack("/"));

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
      b.addEventListener("click", () => openItem(item.id));
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
    b.addEventListener("click", () => openItem(id));
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
  b.addEventListener("click", () => go(`/${K.id}/${recipe.id}`));
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
  b.addEventListener("click", () => go(`/${K.id}/${recipe.id}`));
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

$("lit-recipe").addEventListener("click", () => go(lit.set ? `/${K.id}/${lit.set}` : `/${K.id}/${lit.ids[0]}`));
$("lit-off").addEventListener("click", () => go(`/${K.id}`, {}, { replace: true }));

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
scrim.addEventListener("click", closeItem);

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
    b.addEventListener("click", () => go(`/${K.id}/${r.id}`));
    dishes.append(b);
  }
  openSheet($("card"));
}

$("card-close").addEventListener("click", closeItem);

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
      p.append(el("b", null, t("tableFor", need, whoNeeds(need))), (r.table || {})[need] || t("asWritten", need));
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
    b.addEventListener("click", () => openItem(ing.id));
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
  paintSources(r);
  paintSetPeek("recipe");
  if (!inPlace) show("recipe");
}

let recipeId = null;

/*
 * Where a recipe came from, at the foot of its page (CLAUDE.md: every recipe
 * names its sources). A researched dish lists every recipe it was built from,
 * with links, native cooks first; a favourite names its own source, or the
 * dish it is our version of; anything else says plainly that it was written
 * from general knowledge. Folded away, so it is there without being in the way.
 */
function paintSources(r) {
  const box = $("recipe-sources");
  box.replaceChildren();
  const status = $("recipe-status");
  status.hidden = !r.favourite;
  if (r.favourite) {
    status.textContent = t(`status.${r.status}`) || "";
    status.className = `status status-${r.status}`;
  }
  const [baseKitchen, baseId] = r.base ? r.base.split("/") : [K.id, r.id];
  const research = SOURCES[baseKitchen] && SOURCES[baseKitchen][baseId];
  const lines = [];
  if (r.favourite && r.base) {
    const base = KITCHEN_BY_ID[baseKitchen] && localize(KITCHEN_BY_ID[baseKitchen]).recipeById[baseId];
    lines.push(el("p", null, t("src.basedOn", base ? base.name : r.base)));
  }
  if (r.source) {
    const p = el("p");
    p.append(t("src.from") + " ");
    const a = el("a", null, r.source.name);
    a.href = r.source.url;
    a.target = "_blank";
    a.rel = "noopener";
    p.append(a);
    lines.push(p);
  }
  let summary;
  if (research) {
    summary = t("src.built", research.sources.length);
    lines.push(el("p", "hint small", t("src.how")));
    const ol = el("ol", "source-list");
    for (const s of research.sources.slice().sort((a, b) => b.weight - a.weight)) {
      const li = el("li");
      const a = el("a", null, s.name);
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      li.append(a);
      if (s.weight >= 2) li.append(el("span", "native", t("src.native")));
      ol.append(li);
    }
    lines.push(ol);
  } else if (r.source) {
    summary = t("src.one");
  } else {
    summary = t("src.knowledgeShort");
    lines.push(el("p", "hint small", t("src.knowledge")));
  }
  box.append(el("summary", null, summary), ...lines);
}

$("recipe-back").addEventListener("click", () => go(recipeReturn === "plan" ? planPath() : `/${K.id}`));
$("recipe-cook").addEventListener("click", () => go(`/${K.id}/${recipeId}/cook/1`));
$("recipe-light").addEventListener("click", () => go(`/${K.id}`, { lit: recipeId }));

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
  if (!plan.week) plan.week = planWeek(everyKitchen(), { mood: plan.mood, n: plan.n, diet, childNeeds, home });
  paintPlan();
  show("plan");
}

function remake() {
  plan.week = planWeek(everyKitchen(), { mood: plan.mood, n: plan.n, diet, childNeeds, home });
  paintPlan();
}

/* From the pantry: a week in this kitchen, built around what is at home. */
$("plan-from-home").addEventListener("click", () => {
  plan.mood = K.id === "everyday" ? "mix" : K.id;
  plan.week = null;
  go(`/plan/${plan.mood}/${plan.n}`);
});

/* Open a dish from the plan in its own kitchen; its Back comes home to the plan. */
function openFromPlan(part) {
  go(`/${part.kitchen}/${part.recipe}`, { from: "plan" });
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
        plan.week = null;
        go(`/plan/${plan.mood}/${plan.n}`, {}, { replace: true });
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
        plan.week = null;
        go(`/plan/${plan.mood}/${plan.n}`, {}, { replace: true });
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
      keepPlanInAddress();
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
      if (hit.length) words.append(el("span", "dish-clash", t("sideClash", hit, whoAny(hit))));
      b.append(art("plan-extra-art", dish(er)), words);
      b.addEventListener("click", () => openFromPlan(d[which]));
      box.append(
        b,
        swapBtn(swapLabel, () => {
          plan.week = swapSide(everyKitchen(), plan.week, i, which, childNeeds);
          paintPlan();
          keepPlanInAddress();
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

$("open-plan").addEventListener("click", () => go(`/plan/${plan.mood}/${plan.n}`));
$("plan-again").addEventListener("click", () => {
  remake();
  keepPlanInAddress();
});
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
  go.addEventListener("click", () => navigate(`/${K.id}/${recipeId}/set/${setMode[from]}`));
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
      b.addEventListener("click", () => navigate(`/${K.id}/${r.id}`));
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
    b.addEventListener("click", () => openItem(s.id));
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
$("set-light").addEventListener("click", () =>
  go(`/${K.id}`, { lit: currentSet.dishes.map((r) => r.id).join(","), set: `${openSetFrom.anchor}/set/${openSetFrom.mode}` }),
);
$("set-back").addEventListener("click", () => go(`/${K.id}/${openSetFrom.anchor}`));

const cookAlong = new CookAlong({
  openCard: (id) => openItem(id),
  byId: () => K.byId,
  onExit: () => go(`/${K.id}/${cookAlong.recipe.id}`),
  // Every step keeps its own address, replaced rather than stacked, so a
  // reload or a shared link lands on the same step without filling history.
  onStep: (i) => go(`/${K.id}/${cookAlong.recipe.id}/cook/${i + 1}`, {}, { replace: true, quiet: true }),
});

/* -------------------------------------------------------------- the doors */

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
    b.addEventListener("click", () => go(`/${k.id}`));
    return b;
  }));
}
paintDoors();


$("pantry-home").addEventListener("click", () => go("/"));
$("home-btn").addEventListener("click", () => go("/"));
$("open-table").addEventListener("click", () => go("/table"));
$("table-chip").addEventListener("click", () => go("/table"));

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
  if (e.key === "Escape" && !$("card").hidden) closeItem();
});

/* ------------------------------------------------------------ addresses */

/*
 * EVERY PLACE HAS AN ADDRESS, after the # so it works on a static host:
 *
 *   #/                              the front door
 *   #/table                         who is eating
 *   #/greek                         a kitchen's pantry          ?lit=a,b  lit up
 *   #/greek/stifado                 a recipe                    ?from=plan
 *   #/greek/stifado/cook/3          the cook-along, at step 3
 *   #/greek/stifado/set/week        a dish's meal or week set
 *   #/plan/greek/5?w=…              the planner — mood, dinners, and the week
 *                                   itself, so a plan can be sent as a link
 *
 * and on any of them ?item=onion opens that ingredient's card, ?lang=nb picks
 * the language. Clicks change the address and the address draws the page —
 * one path for a click, a bookmark, a shared link and the back button.
 *
 * INSIDE THE ARCADE the addresses are REPLACED, never stacked: the arcade
 * owns the back button there (its #play entry is how a player leaves a game,
 * arcade/exit.js), and a pile of our entries above it would make back step
 * through the cookbook instead of out of it. On its own the cookbook pushes
 * every move, so back and forward walk through it like any site.
 */
const framed = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();
let depth = 0; // our own entries above where the reader came in

function parseRoute() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, qs] = raw.split("?");
  return {
    seg: path.split("/").filter(Boolean).map((x) => decodeURIComponent(x)),
    q: Object.fromEntries(new URLSearchParams(qs || "")),
  };
}

function hashFor(path, q = {}) {
  const qs = new URLSearchParams(Object.entries(q).filter(([, v]) => v != null && v !== "")).toString();
  return `#${path}${qs ? `?${qs}` : ""}`;
}

/**
 * Go somewhere. `replace` swaps this address for the new one instead of
 * adding to history; `quiet` changes the address without redrawing (the
 * cook-along telling the address which step it is already on).
 */
function go(path, q = {}, { replace = false, quiet = false } = {}) {
  const hash = hashFor(path, q);
  if (hash === location.hash) {
    if (!quiet) render();
    return;
  }
  if (replace || framed) history.replaceState(null, "", hash);
  else {
    history.pushState(null, "", hash);
    depth++;
  }
  if (!quiet) render();
}
const navigate = go;

/* Back to where the reader was, if it was here; otherwise to `fallback`. */
function goBack(fallback) {
  if (depth > 0 && !framed) history.back();
  else go(fallback, {}, { replace: true });
}

window.addEventListener("popstate", () => {
  depth = Math.max(0, depth - 1);
  render();
});
window.addEventListener("hashchange", () => render());

/* The ingredient card is part of the address too, over whatever page is open. */
function openItem(id) {
  const { seg, q } = parseRoute();
  go(`/${seg.join("/")}`, { ...q, item: id });
}
function closeItem() {
  const { seg, q } = parseRoute();
  const rest = { ...q };
  delete rest.item;
  if (q.item) go(`/${seg.join("/")}`, rest, { replace: true });
  else closeSheets();
}

/* Make `id` the kitchen being shown: its words, its colours. */
function useKitchen(id) {
  if (K.id !== id) {
    K = localize(KITCHEN_BY_ID[id]);
    lit = null;
  }
  document.documentElement.dataset.kitchen = K.id;
}

/* ------- the planner's week, as a word in the address (no storage needed) */

const planPath = () => (plan.week ? `/plan/${plan.mood}/${plan.n}?w=${encodeWeek(plan.week)}` : `/plan/${plan.mood}/${plan.n}`);

function encodeWeek(week) {
  return week.days.map((d) => [d.main.kitchen, d.main.recipe, d.side.recipe, d.veg.recipe].join(".")).join("~");
}

function decodeWeek(text, mood, n) {
  const ks = Object.fromEntries(everyKitchen().map((k) => [k.id, k]));
  const days = [];
  for (const part of String(text).split("~")) {
    const [mk, mr, sr, vr] = part.split(".");
    const ed = ks.everyday;
    if (!ks[mk] || !ks[mk].recipeById[mr] || !ed.recipeById[sr] || !ed.recipeById[vr]) return null;
    days.push({ main: { kitchen: mk, recipe: mr }, side: { kitchen: "everyday", recipe: sr }, veg: { kitchen: "everyday", recipe: vr } });
  }
  if (!days.length) return null;
  const borrowed = mood === "mix" || mood === "favourites" ? 0 : days.filter((d) => d.main.kitchen !== mood && d.main.kitchen !== "favourites").length;
  return { mood, n, days, borrowed, short: days.length < n, childNeeds };
}

function keepPlanInAddress() {
  go(`/plan/${plan.mood}/${plan.n}`, { w: encodeWeek(plan.week) }, { replace: true, quiet: true });
  paintCrumbs();
}

const MOODS = () => [...KITCHENS.filter((k) => k.id !== "everyday").map((k) => k.id), "mix"];

/* ------------------------------------------------------------ drawing */

/* Draw whatever the address says. Anything it cannot find falls back to the
   nearest place that exists, and the address is corrected to match. */
function render() {
  const { seg, q } = parseRoute();
  if (q.lang && q.lang !== getLang() && (q.lang === "en" || q.lang === "nb")) switchLang(q.lang, false);
  closeSheets();
  const [a, b, c, d] = seg;

  if (!a) {
    delete document.documentElement.dataset.kitchen;
    show("home");
  } else if (a === "table") {
    paintTable();
    show("table");
  } else if (a === "plan") {
    const mood = MOODS().includes(b) ? b : plan.mood;
    const n = Math.min(7, Math.max(3, parseInt(c, 10) || plan.n));
    const changed = mood !== plan.mood || n !== plan.n;
    plan.mood = mood;
    plan.n = n;
    const fromLink = q.w ? decodeWeek(q.w, mood, n) : null;
    if (fromLink) plan.week = fromLink;
    else if (changed || !plan.week) plan.week = null;
    openPlan();
    if (!q.w || !fromLink) keepPlanInAddress();
  } else if (KITCHEN_BY_ID[a]) {
    useKitchen(a);
    const r = b && K.recipeById[b];
    if (b && !r) return go(`/${a}`, {}, { replace: true });
    if (!b) {
      const ids = (q.lit || "").split(",").filter((id) => K.recipeById[id]);
      lit = ids.length ? { ids, set: q.set || null } : null;
      paintPantryHead();
      paintPantry();
      show("pantry");
      const first = lit && document.querySelector("#shelf-list .item.lit");
      if (first) first.scrollIntoView({ block: "center" });
    } else if (c === "cook") {
      recipeId = b;
      show("cook");
      const step = Math.max(1, Math.min(r.method.length + 1, parseInt(d, 10) || 1));
      cookAlong.open(r, step - 1);
    } else if (c === "set") {
      recipeId = b;
      const mode = d === "week" ? "week" : "meal";
      setMode.recipe = mode;
      openSetFrom = { from: "recipe", mode, anchor: b };
      const set = setFor("recipe", mode);
      if (set) openSet(set);
      else return go(`/${a}/${b}`, {}, { replace: true });
    } else {
      recipeReturn = q.from === "plan" ? "plan" : null;
      openRecipe(b);
    }
    if (q.item && K.byId[q.item]) openCard(q.item);
  } else {
    return go("/", {}, { replace: true });
  }
  paintCrumbs();
}

/*
 * The trail top left, beside the house: where you are, each step back up
 * one tap away. "Home › The Greek kitchen › Stifado › Step 3".
 */
function paintCrumbs() {
  const { seg } = parseRoute();
  const [a, b, c, d] = seg;
  const trail = [];
  if (a === "table") trail.push([t("home.table"), "/table"]);
  else if (a === "plan") trail.push([t("plan.door"), planPath()]);
  else if (a && KITCHEN_BY_ID[a]) {
    trail.push([K.name, `/${a}`]);
    const r = b && K.recipeById[b];
    if (r) {
      trail.push([r.name, `/${a}/${b}`]);
      if (c === "cook") trail.push([t("step", parseInt(d, 10) || 1, r.method.length), null]);
      if (c === "set") trail.push([t(d === "week" ? "sets.week" : "sets.meal"), null]);
    }
  }
  const nav = $("crumbs");
  nav.hidden = !trail.length;
  nav.replaceChildren();
  trail.forEach(([label, path], i) => {
    if (i) nav.append(el("span", "crumb-sep", "›"));
    const last = i === trail.length - 1;
    if (last || !path) {
      const here = el("span", "crumb here", label);
      if (last) here.setAttribute("aria-current", "page");
      nav.append(here);
    } else {
      const b2 = el("button", "crumb", label);
      b2.type = "button";
      b2.addEventListener("click", () => go(path));
      nav.append(b2);
    }
  });
}

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

function switchLang(id, repaint = true) {
  if (id === getLang()) return;
  setLang(id);
  if (!repaint) {
    K = localize(KITCHEN_BY_ID[K.id]);
    paintStatic();
    paintFlags();
    paintDoors();
    wireExits();
    return;
  }
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
  paintCrumbs();
}

paintStatic();
paintFlags();
paintTable();
// The address the reader arrived at decides the first page.
render();
