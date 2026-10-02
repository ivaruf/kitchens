/*
 * main.js — the house: which screen is showing, the corner, the menu, the
 * table settings, the dish board, the notebook and the meal at the end.
 *
 * The cooking itself is js/cook.js running a dish file (js/stifado.js) against
 * the pot model (js/pot.js), drawn by js/draw.js. This file never reaches into
 * a step; it starts a cook, and is told when the cook sits down to eat.
 *
 * SCREENS are sibling <section>s and exactly one is visible. The recipe, the
 * notebook and the table settings can be opened from more than one place, so
 * each remembers where it was opened from and its Back goes there.
 */

import { loadDiet, saveDiet, loadNotebook, saveNotebook, loadSound, saveSound, NEEDS } from "./store.js";
import { DISHES, LESSONS, NEED_LABEL, STIFADO_RECIPE } from "./dishes.js";
import { STIFADO, verdict } from "./stifado.js";
import { Stove } from "./draw.js";
import { Cook } from "./cook.js";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

let diet = loadDiet();
const notebook = loadNotebook();
const sound = loadSound();

/* ---------------------------------------------------------------- screens */

const SCREENS = ["home", "table", "dishes", "kitchen", "result", "recipe", "notebook"];
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

for (const btn of document.querySelectorAll(".back-btn")) {
  const screen = btn.closest(".screen").id;
  btn.addEventListener("click", () => {
    const to = cameFrom[screen] || "home";
    if (screen === "table") paintBoard();
    show(to);
  });
}

/* ------------------------------------------------------------- the table */

function activeNeeds() {
  return NEEDS.filter((n) => diet[n]);
}

function paintTable() {
  for (const b of document.querySelectorAll(".need")) {
    b.setAttribute("aria-pressed", String(!!diet[b.dataset.need]));
  }
  const needs = activeNeeds();
  $("table-summary").textContent = needs.length
    ? `Cooking without ${listOf(needs.map((n) => NEED_LABEL[n]))}.`
    : "Cooking for a table that eats everything.";
}

for (const b of document.querySelectorAll(".need")) {
  b.addEventListener("click", () => {
    diet = { ...diet, [b.dataset.need]: !diet[b.dataset.need] };
    saveDiet(diet);
    paintTable();
  });
}

function listOf(words) {
  if (words.length < 2) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
}

/* ------------------------------------------------------------- the board */

function paintBoard() {
  const fasting = $("fasting");
  fasting.replaceChildren(el("summary", null, LESSONS.fasting.title), el("p", null, LESSONS.fasting.body));
  // Reading it is learning it: the one lesson the board teaches, not the stove.
  fasting.ontoggle = () => fasting.open && learn("fasting");

  const board = $("board");
  board.replaceChildren();
  const needs = activeNeeds();
  for (const dish of DISHES) {
    const card = el("article", `dish${dish.playable ? "" : " later"}`);
    const head = el("header");
    head.append(el("h3", null, dish.name), el("span", "greek", dish.greek));
    card.append(head, el("p", null, dish.line), el("p", "teaches", `Teaches: ${dish.teaches}`));

    // What this dish means for this table, need by need.
    const fit = el("ul", "fit");
    for (const need of needs) {
      const how = dish.freeBy[need];
      const li = el("li", how ? "care" : "free");
      li.append(el("b", null, how ? `${cap(NEED_LABEL[need])}-free with care` : `${cap(NEED_LABEL[need])}-free as it is`));
      if (how) li.append(el("span", null, ` — ${how}`));
      fit.append(li);
    }
    if (needs.length) card.append(fit);

    const actions = el("div", "pair");
    if (dish.playable) {
      const cook = el("button", "primary", "Cook it");
      cook.type = "button";
      cook.addEventListener("click", () => startCook());
      const rec = el("button", "ghost", "The real recipe");
      rec.type = "button";
      rec.addEventListener("click", () => openRecipe("dishes"));
      actions.append(cook, rec);
    } else {
      actions.append(el("p", "hint small", "Not on the stove yet."));
    }
    card.append(actions);
    board.append(card);
  }
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ------------------------------------------------------------ the recipe */

function openRecipe(from) {
  const r = STIFADO_RECIPE;
  $("recipe-meta").textContent = `Serves ${r.serves} · ${r.time}`;
  const ul = $("recipe-ingredients");
  ul.replaceChildren();
  for (const item of r.ingredients) {
    const li = el("li", null, item.text);
    for (const need of activeNeeds()) {
      if (item.note && item.note[need]) li.append(el("span", "note", item.note[need]));
    }
    ul.append(li);
  }
  $("recipe-method").replaceChildren(...r.method.map((m) => el("li", null, m)));
  $("recipe-serve").textContent = r.serve;
  show("recipe", from);
}

/* ---------------------------------------------------------- the notebook */

function paintNotebook() {
  const all = Object.keys(LESSONS);
  const have = all.filter((id) => notebook.has(id));
  $("notebook-count").textContent = `${have.length} of ${all.length} learned`;
  const list = $("notebook-list");
  list.replaceChildren();
  if (!have.length) list.append(el("p", "hint", "Nothing yet. Cook something."));
  for (const id of have) {
    const d = el("details", "lesson");
    d.append(el("summary", null, LESSONS[id].title), el("p", null, LESSONS[id].body));
    list.append(d);
  }
  if (have.length < all.length) {
    list.append(el("p", "hint small", `${all.length - have.length} still to find.`));
  }
}

function learn(id) {
  if (notebook.has(id)) return false;
  notebook.add(id);
  saveNotebook(notebook);
  return true;
}

/* -------------------------------------------------------------- the cook */

const stove = new Stove($("stove"));
const cook = new Cook({
  stove,
  diet: () => diet,
  learn,
  onFinish: (pot, learned) => showResult(pot, learned),
});

function startCook() {
  show("kitchen");
  cook.start(STIFADO);
}

function showResult(pot, learned) {
  const v = $("verdict");
  v.replaceChildren();
  for (const row of verdict(pot)) {
    const r = el("div", `verdict-row ${row.good ? "good" : "off"}`);
    r.append(el("b", null, row.label), el("span", null, row.text));
    v.append(r);
  }

  // The table check: every need this table has, said plainly.
  const t = $("table-check");
  t.replaceChildren();
  const needs = activeNeeds();
  if (needs.length) {
    t.append(el("p", "kicker", "For this table"));
    for (const need of needs) {
      const hits = pot.conflicts.filter((c) => c.need === need);
      const p = el("p", `say ${hits.length ? "bad" : "good"}`);
      p.textContent = hits.length
        ? `Not ${NEED_LABEL[need]}-free: ${listOf([...new Set(hits.map((h) => h.why))])}.`
        : `${cap(NEED_LABEL[need])}-free, all of it.`;
      t.append(p);
    }
    if (needs.includes("gluten") && !pot.conflicts.some((c) => c.need === "gluten")) {
      t.append(el("p", "hint small", "Still read the label on the tomato paste and the wine vinegar — this game can vouch for the dish, not for a brand."));
    }
  }

  const l = $("result-lessons");
  l.replaceChildren(el("p", "kicker", `In your notebook from this cook: ${learned.length}`));
  for (const id of learned) l.append(el("p", "lesson-line", LESSONS[id].title));

  show("result");
}

$("again").addEventListener("click", () => startCook());
$("result-recipe").addEventListener("click", () => openRecipe("result"));
$("result-board").addEventListener("click", () => {
  paintBoard();
  show("dishes");
});

/* -------------------------------------------------------------- the doors */

$("enter").addEventListener("click", () => {
  paintBoard();
  show("dishes", "home");
});
$("open-table").addEventListener("click", () => {
  paintTable();
  show("table", "home");
});
$("open-notebook").addEventListener("click", () => {
  paintNotebook();
  show("notebook", "home");
});

/*
 * The way back to the arcade. exit.js decides what quitting does; these
 * buttons only appear when it has turned up AND there is somewhere to go —
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

const menu = $("menu");
const scrim = $("menu-scrim");
let menuFrom = null;

function openMenu() {
  const cooking = current === "kitchen";
  cook.paused = true;
  $("menu-kicker").textContent = cooking ? "The pot will wait" : "Kitchens";
  $("menu-close").textContent = cooking ? "Back to the stove" : "Back";
  $("menu-leave").hidden = !cooking;
  menuFrom = document.activeElement;
  menu.hidden = false;
  scrim.hidden = false;
  menu.focus();
}

function closeMenu() {
  menu.hidden = true;
  scrim.hidden = true;
  cook.paused = false;
  if (menuFrom && menuFrom.focus) menuFrom.focus({ preventScroll: true });
}

$("menu-open").addEventListener("click", () => (menu.hidden ? openMenu() : closeMenu()));
$("menu-close").addEventListener("click", closeMenu);
scrim.addEventListener("click", closeMenu);
$("menu-leave").addEventListener("click", () => {
  closeMenu();
  cook.stop();
  paintBoard();
  show("dishes");
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") menu.hidden ? openMenu() : closeMenu();
});

/* Mute: a toggle and nothing else — no panel, no pause, no focus moved. */
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

/* The two levels. Real and persisted, waiting for the kitchen to have sound. */
for (const [key, id] of [["music", "music-vol"], ["sfx", "sfx-vol"]]) {
  const input = $(id);
  const out = $(`${id}-out`);
  input.value = String(Math.round(sound[key] * 100));
  out.textContent = input.value;
  input.addEventListener("input", () => {
    sound[key] = Number(input.value) / 100;
    // Moving a level lifts the mute: a fader silently cancelled by a switch
    // elsewhere is worse than no fader (hub §2).
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
