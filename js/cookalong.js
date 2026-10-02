/*
 * cookalong.js — a recipe walked through one step at a time, with pictures.
 *
 * SEMI-INTERACTIVE, ON PURPOSE. Each step shows its ingredients as they come
 * off the shelf; tap one and it is prepared before your eyes — the onion
 * becomes a chopped pile on the board, the tomatoes a bowl of grated pulp.
 * Then they go into the pot, the pot fills, the sauce changes colour, and the
 * flame under it shows the heat. By the last step the pot looks like the dish.
 *
 * Nothing is ever a test. "Do it" prepares whatever has not been tapped and
 * finishes the step, so a reader who only wants to watch can watch; tapping
 * the ingredients one by one is there for whoever enjoys it. And nothing is
 * timed — a step that takes an hour in the kitchen says so and takes a tap.
 *
 * Everything shown is derived from the recipe's own method data (`prep`,
 * `add`, `heat`, `wait`, `sauce` in js/recipes.js), so the cook-along and the
 * recipe page can never tell two different stories.
 */

import { BY_ID } from "./pantry.js";
import { ingredient, prepared, cooking, dish } from "./art.js";

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

const HEAT_WORDS = ["Off the heat", "Low heat", "Medium heat", "High heat"];
const INTO = { pot: "Into the pot", tin: "Into the tin", bowl: "Into the bowl" };

export class CookAlong {
  /**
   * @param {object} o
   * @param {(id: string) => void} o.openCard   shows an ingredient's card
   * @param {() => void} o.onExit               back to the recipe page
   */
  constructor({ openCard, onExit }) {
    this.openCard = openCard;
    this.onExit = onExit;
    this.root = document.getElementById("cook");
    this.vesselEl = document.getElementById("cook-vessel");
    this.stageEl = document.getElementById("cook-stage");
    this.heatEl = document.getElementById("cook-heat");
    this.countEl = document.getElementById("cook-count");
    this.dotsEl = document.getElementById("cook-dots");
    this.textEl = document.getElementById("cook-text");
    this.boardEl = document.getElementById("cook-board");
    this.whyEl = document.getElementById("cook-why");
    this.goEl = document.getElementById("cook-go");
    this.backEl = document.getElementById("cook-prev");
    this.titleEl = document.getElementById("cook-title");

    this.goEl.addEventListener("click", () => this.go());
    this.backEl.addEventListener("click", () => (this.index > 0 ? this.show(this.index - 1) : this.onExit()));
  }

  start(recipe) {
    this.recipe = recipe;
    this.titleEl.textContent = recipe.name;
    this.show(0);
  }

  /*
   * The state of the kitchen at the START of step i: everything earlier done
   * in full. Replaying from the top every time makes "previous step" exact
   * with no undo bookkeeping — a recipe is short enough for that to be free.
   */
  stateAt(i) {
    const st = { prepped: new Set(), added: [], sauce: null, heat: 0 };
    for (const step of this.recipe.method.slice(0, i)) this.apply(st, step);
    return st;
  }

  apply(st, step) {
    for (const id of Object.keys(step.prep || {})) st.prepped.add(id);
    for (const id of step.add || []) st.added.push(id);
    if (step.sauce) st.sauce = step.sauce;
    if (step.heat !== undefined) st.heat = step.heat;
  }

  show(i) {
    this.index = i;
    this.done = false;
    this.st = this.stateAt(i);
    this.finished = false;
    this.root.classList.remove("finished");
    const r = this.recipe;
    const step = r.method[i];

    this.countEl.textContent = `Step ${i + 1} of ${r.method.length}`;
    this.dotsEl.replaceChildren(
      ...r.method.map((_, j) => el("i", j < i ? "past" : j === i ? "now" : "")),
    );
    this.textEl.textContent = step.text;
    this.whyEl.hidden = !step.why;
    this.whyEl.open = false;
    this.whyEl.querySelector("p").textContent = step.why || "";
    this.backEl.textContent = i > 0 ? "Previous step" : "Back to the recipe";

    this.paintBoard(step);
    this.paintVessel(this.st);
    this.paintHeat(step.heat !== undefined ? step.heat : this.st.heat, step.wait);

    const preps = Object.keys(step.prep || {});
    const adds = step.add || [];
    this.goEl.textContent = adds.length
      ? INTO[this.kind()]
      : preps.length
        ? "Prepare them"
        : step.heat === "oven"
          ? "Into the oven"
          : step.wait
            ? "Let it cook"
            : "Done";
    this.goEl.disabled = false;
    this.root.querySelector(".cook-card").scrollTop = 0;
  }

  kind() {
    return this.recipe.vessel || "pot";
  }

  /* The step's ingredients: the ones to prepare, and the ones going in. */
  paintBoard(step) {
    const board = this.boardEl;
    board.replaceChildren();
    const prep = step.prep || {};
    const ids = [...new Set([...Object.keys(prep), ...(step.add || [])])];
    this.chips = new Map();
    for (const id of ids) {
      const how = prep[id];
      const ready = !how && this.st.prepped.has(id);
      const b = el("button", "prep");
      b.type = "button";
      const pic = art("prep-art", ready ? prepared(id, this.howBefore(id)) : ingredient(id));
      const words = el("span", "prep-words");
      const name = el("b", null, BY_ID[id].name);
      const state = el("span", "prep-state", how ? `tap to prepare — ${how}` : ready ? this.howBefore(id) || "ready" : "goes in as it is");
      words.append(name, state);
      b.append(pic, words);
      if (how) {
        b.classList.add("todo");
        b.addEventListener("click", () => this.prepare(id));
      } else {
        b.addEventListener("click", () => this.openCard(id));
      }
      board.append(b);
      this.chips.set(id, { b, pic, state, how });
    }
    board.hidden = !ids.length;
  }

  /* How an ingredient was prepared in an earlier step, for its label. */
  howBefore(id) {
    for (const step of this.recipe.method.slice(0, this.index)) {
      if (step.prep && step.prep[id]) return step.prep[id];
    }
    return "";
  }

  prepare(id) {
    const chip = this.chips.get(id);
    if (!chip || !chip.how || chip.b.classList.contains("ready")) return;
    chip.pic.innerHTML = prepared(id, chip.how);
    chip.b.classList.remove("todo");
    chip.b.classList.add("ready", "chop");
    chip.state.textContent = chip.how;
    setTimeout(() => chip.b.classList.remove("chop"), 400);
  }

  paintVessel(st) {
    this.vesselEl.innerHTML = cooking({ recipe: this.recipe, added: st.added, sauce: st.sauce, heat: typeof st.heat === "number" ? st.heat : 0 });
  }

  paintHeat(heat, wait) {
    const words = heat === "oven" ? "In the oven" : HEAT_WORDS[heat || 0];
    this.heatEl.textContent = wait ? `${words} · ${wait}` : words;
    this.stageEl.classList.toggle("oven", heat === "oven");
  }

  /* "Do it": prepare what is left, then put in what goes in, then move on. */
  go() {
    if (this.finished) {
      this.onExit();
      return;
    }
    if (this.done) {
      if (this.index < this.recipe.method.length - 1) this.show(this.index + 1);
      else this.finish();
      return;
    }
    const step = this.recipe.method[this.index];
    this.goEl.disabled = true;
    const pending = [...this.chips.entries()].filter(([, c]) => c.how && !c.b.classList.contains("ready"));
    let t = 0;
    for (const [id] of pending) {
      setTimeout(() => this.prepare(id), t);
      t += 160;
    }
    setTimeout(() => {
      for (const id of step.add || []) {
        const chip = this.chips.get(id);
        if (chip) chip.b.classList.add("into");
      }
      this.apply(this.st, step);
      setTimeout(() => {
        this.paintVessel(this.st);
        if (step.why) this.whyEl.open = true;
        this.done = true;
        this.goEl.disabled = false;
        this.goEl.textContent = this.index < this.recipe.method.length - 1 ? "Next step" : "To the table";
      }, (step.add || []).length ? 380 : 120);
    }, t + (pending.length ? 250 : 0));
  }

  /* The end: the finished dish, as it comes to the table. */
  finish() {
    this.finished = true;
    this.root.classList.add("finished");
    this.vesselEl.innerHTML = dish(this.recipe);
    this.heatEl.textContent = "Ready";
    this.stageEl.classList.remove("oven");
    this.countEl.textContent = "At the table";
    this.dotsEl.replaceChildren(...this.recipe.method.map(() => el("i", "past")));
    this.textEl.textContent = `To serve: ${this.recipe.serve}`;
    this.boardEl.hidden = true;
    this.whyEl.hidden = true;
    this.backEl.textContent = "Previous step";
    this.goEl.textContent = "Back to the recipe";
    this.index = this.recipe.method.length;
  }
}
