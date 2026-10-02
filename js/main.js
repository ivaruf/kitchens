/*
 * main.js — the house: the pantry shelves, the counter, the ingredient card,
 * the recipe page, the table settings, the corner and the menu.
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
 * SCREENS are sibling <section>s and exactly one is visible. The ingredient
 * card and the menu are sheets over whatever screen is showing.
 */

import { loadDiet, saveDiet, loadCounter, saveCounter, loadSound, saveSound, NEEDS } from "./store.js";
import { INGREDIENTS, SHELVES, BY_ID } from "./pantry.js";
import { RECIPES, RECIPE_BY_ID, dishesWith, suggest, FASTING_NOTE } from "./recipes.js";
import { ingredient, dish } from "./art.js";

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

const NEED_WORD = { dairy: "dairy", egg: "egg", gluten: "gluten" };

let diet = loadDiet();
const counter = loadCounter(new Set(Object.keys(BY_ID)));
const sound = loadSound();

/* ---------------------------------------------------------------- screens */

const SCREENS = ["home", "table", "pantry", "recipe"];
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

function listOf(words) {
  if (words.length < 2) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
}

function tableWords() {
  const needs = activeNeeds();
  return needs.length ? `Cooking without ${listOf(needs.map((n) => NEED_WORD[n]))}` : "Cooking for everyone";
}

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
  for (const shelf of SHELVES) {
    const sec = el("section", `shelf shelf-${shelf.id}`);
    const head = el("header", "shelf-head");
    head.append(el("h3", null, shelf.name), el("p", null, shelf.note));
    const row = el("div", "items");
    for (const item of INGREDIENTS.filter((i) => i.shelf === shelf.id)) {
      const b = el("button", "item");
      b.type = "button";
      b.dataset.id = item.id;
      b.append(art("item-art", ingredient(item.id)));
      const tag = el("span", "tag", item.name);
      if (clashes(item).length) {
        tag.classList.add("clash");
        tag.append(el("span", "sr", ` — contains ${listOf(clashes(item))}`));
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

/* Which jars are on the counter, and which the counter's best idea still wants. */
function markShelves() {
  const ideas = suggest(counter);
  const wanted = new Set(ideas.length ? ideas[0].missing : []);
  for (const b of document.querySelectorAll("#shelf-list .item")) {
    const on = counter.has(b.dataset.id);
    b.classList.toggle("on", on);
    b.classList.toggle("wanted", !on && wanted.has(b.dataset.id));
    b.setAttribute("aria-label", `${BY_ID[b.dataset.id].name}${on ? ", on the counter" : ""}`);
  }
}

/* ------------------------------------------------------------ the counter */

function paintCounter() {
  const items = $("counter-items");
  items.replaceChildren();
  const ids = [...counter];
  if (!ids.length) {
    items.append(el("p", "hint", "Nothing yet. Pick whatever tempts you from the shelves."));
  }
  for (const id of ids) {
    const hit = clashes(BY_ID[id]);
    const b = el("button", `counter-item${hit.length ? " clash" : ""}`);
    b.type = "button";
    b.title = `${BY_ID[id].name} — tap to put back`;
    b.setAttribute("aria-label", `${BY_ID[id].name}, put back on the shelf`);
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
  const off = ids.filter((id) => clashes(BY_ID[id]).length);
  if (off.length) {
    const names = listOf(off.map((id) => BY_ID[id].name.toLowerCase()));
    const needs = listOf([...new Set(off.flatMap((id) => clashes(BY_ID[id])))]);
    board.append(el("p", "counter-warn", `Not for a ${needs}-free plate: ${names}. Serve it on its own plate, or leave it out.`));
  }
  $("counter-clear").hidden = !ids.length;
  $("counter-count").textContent = ids.length ? `${ids.length}` : "";

  // The tray's closed face on a narrow screen: a peek at what is there.
  const peek = $("counter-peek");
  peek.replaceChildren(...ids.slice(-5).map((id) => art("peek", ingredient(id))));

  // The ideas: what the counter could become.
  const ideas = $("ideas");
  ideas.replaceChildren();
  const found = suggest(counter);
  if (!ids.length) {
    ideas.append(el("p", "hint", "Put a few things on the counter and the dishes they could become will gather here."));
  } else if (!found.length) {
    ideas.append(el("p", "hint", "Nothing in this kitchen starts from these alone. Try adding an onion — almost everything does."));
  }
  for (const s of found.slice(0, 4)) ideas.append(ideaCard(s));

  const all = $("all-dishes");
  all.replaceChildren(...RECIPES.map((r) => dishLink(r)));
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
      missing.length ? `${have.length} of ${recipe.key.length} — still wants` : "Everything it needs is here",
    ),
  );
  if (missing.length) {
    const need = el("span", "idea-missing");
    for (const id of missing) {
      const m = art("missing", ingredient(id));
      m.title = BY_ID[id].name;
      need.append(m);
    }
    need.append(el("span", "sr", listOf(missing.map((id) => BY_ID[id].name.toLowerCase()))));
    text.append(need);
  }
  b.append(text);
  b.addEventListener("click", () => openRecipe(recipe.id));
  return b;
}

function dishLink(recipe) {
  const b = el("button", "idea small");
  b.type = "button";
  b.append(art("idea-art", dish(recipe)));
  const text = el("span", "idea-text");
  text.append(el("b", null, recipe.name), el("span", "idea-score", recipe.line));
  b.append(text);
  b.addEventListener("click", () => openRecipe(recipe.id));
  return b;
}

function changed() {
  saveCounter(counter);
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

function paintPantry() {
  paintTable();
  paintShelves();
  paintCounter();
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
  const item = BY_ID[id];
  cardId = id;
  $("card-art").innerHTML = ingredient(id);
  $("card-greek").textContent = item.greek;
  $("card-title").textContent = item.name;
  $("card-info").textContent = item.info;

  const contains = $("card-contains");
  const c = item.contains || [];
  contains.hidden = !c.length;
  if (c.length) {
    const hit = clashes(item);
    contains.textContent = hit.length
      ? `Contains ${listOf(c)} — not for a ${listOf(hit)}-free plate.`
      : `Contains ${listOf(c)}.`;
    contains.classList.toggle("clash", !!hit.length);
  }

  const dishes = $("card-dishes");
  dishes.replaceChildren();
  const into = dishesWith(id);
  if (!into.length) dishes.append(el("p", "hint small", "Served alongside rather than cooked in — see the recipes' table notes."));
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
  put.textContent = on ? "On the counter ✓ — put it back" : "Put on the counter";
}

$("card-put").addEventListener("click", () => {
  if (counter.has(cardId)) counter.delete(cardId);
  else counter.add(cardId);
  changed();
  paintPut();
});
$("card-close").addEventListener("click", closeSheets);

/* ------------------------------------------------------------ the recipe */

function openRecipe(id) {
  const r = RECIPE_BY_ID[id];
  $("recipe-art").innerHTML = dish(r);
  $("recipe-greek").textContent = r.greek;
  $("recipe-title").textContent = r.name;
  $("recipe-line").textContent = r.line;
  $("recipe-meta").textContent = `Serves ${r.serves} · ${r.time}`;
  $("recipe-story").textContent = r.story;

  // What this dish means for this table, said plainly.
  const t = $("recipe-table");
  t.replaceChildren();
  const needs = activeNeeds();
  if (r.fasting) {
    const d = el("details", "note fasting");
    d.append(el("summary", null, "A fasting dish — dairy-free and egg-free by tradition"), el("p", null, FASTING_NOTE));
    t.append(d);
  }
  if (needs.length) {
    const box = el("div", "note table-note");
    box.append(el("p", "kicker", "For your table"));
    for (const need of needs) {
      const p = el("p");
      p.append(el("b", null, `No ${NEED_WORD[need]}. `), r.table[need] || `${cap(NEED_WORD[need])}-free as written.`);
      box.append(p);
    }
    t.append(box);
  }

  // The ingredients, as pictures. What is on the counter is ticked.
  const tiles = $("recipe-ingredients");
  tiles.replaceChildren();
  for (const ing of r.ingredients) {
    const item = BY_ID[ing.id];
    const b = el("button", `tile${counter.has(ing.id) ? " have" : ""}`);
    b.type = "button";
    b.append(art("tile-art", ingredient(ing.id)));
    const words = el("span", "tile-words");
    words.append(el("b", null, item.name), el("span", null, ing.amount));
    b.append(words);
    if (counter.has(ing.id)) b.append(el("span", "sr", ", on your counter"));
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
      d.append(el("summary", null, "Why?"), el("p", null, step.why));
      li.append(d);
    }
    ol.append(li);
  }
  $("recipe-serve").textContent = `To serve: ${r.serve}`;
  show("recipe");
}

$("recipe-back").addEventListener("click", () => {
  paintPantry();
  show("pantry");
});

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* -------------------------------------------------------------- the doors */

$("enter").addEventListener("click", () => {
  paintPantry();
  show("pantry", "home");
});
$("pantry-home").addEventListener("click", () => show("home"));
$("open-table").addEventListener("click", () => {
  paintTable();
  show("table", "home");
});
$("table-chip").addEventListener("click", () => {
  paintTable();
  show("table", "pantry");
});

// A handful of things off the shelves, on the front door.
$("home-art").replaceChildren(
  ...["lemon", "oil", "oregano", "tomato", "chickpeas", "garlic", "aubergine"].map((id) => art("home-item", ingredient(id))),
);

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
    b.textContent = exit.verb({ arcade: "Back to arcade", app: "Close" });
    b.addEventListener("click", () => exit.quit());
  }
}
wireExits();

/* ------------------------------------------------------- menu and corner */

/* Nothing in a pantry moves on its own, so the menu has nothing to pause. */
$("menu-open").addEventListener("click", () => ($("menu").hidden ? openSheet($("menu")) : closeSheets()));
$("menu-close").addEventListener("click", closeSheets);
window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const open = [...document.querySelectorAll(".sheet")].some((s) => !s.hidden);
  if (open) closeSheets();
  else openSheet($("menu"));
});

/* Mute: a toggle and nothing else — no panel, no focus moved. */
const mute = $("mute-toggle");
function paintMute() {
  mute.setAttribute("aria-pressed", String(sound.muted));
  const label = sound.muted ? "Unmute" : "Mute";
  mute.setAttribute("aria-label", label);
  mute.title = label;
}
mute.addEventListener("click", () => {
  sound.muted = !sound.muted;
  saveSound(sound);
  paintMute();
});

/* The two levels: real and persisted, waiting for the kitchen to have sound. */
for (const [key, id] of [["music", "music-vol"], ["sfx", "sfx-vol"]]) {
  const input = $(id);
  const out = $(`${id}-out`);
  input.value = String(Math.round(sound[key] * 100));
  out.textContent = input.value;
  input.addEventListener("input", () => {
    sound[key] = Number(input.value) / 100;
    // Moving a level lifts the mute (hub §2).
    if (sound.muted) {
      sound.muted = false;
      paintMute();
    }
    out.textContent = input.value;
    saveSound(sound);
  });
}

paintMute();
paintTable();
