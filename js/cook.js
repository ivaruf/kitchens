/*
 * cook.js — puts one step of a dish on the recipe card and runs it.
 *
 * The dish file (js/stifado.js) says WHAT happens; this file says how it looks
 * and what the buttons do, for the five kinds of step it knows. Every step goes
 * through the same two beats, which is the rhythm of the whole game:
 *
 *   DO     the step's own controls, and one primary button to commit
 *   AFTER  what yiayia says about how it went, the lessons now in the
 *          notebook, and the button to the next step
 *
 * Nothing is timed against the player. The meters move while you watch, but
 * only because browning really is a thing that happens while you watch — and
 * they stop dead while the menu is open (`paused`), like everything else.
 */

import { LESSONS, NEED_LABEL } from "./dishes.js";
import { freshPot, simmer, forkTest, heatName, tasteOf, TASTE_BANDS } from "./pot.js";
import { simmerLine, tasteNotes } from "./stifado.js";

/* What each zone on a meter looks like, by the name the dish gives it. */
const ZONE_COLOUR = {
  grey: "#9a7f72",
  golden: "#c9954a",
  "deep brown": "#6b3b1d",
  scorched: "#241510",
  raw: "#efe6d2",
  translucent: "#e6d6a2",
  burnt: "#33201a",
  "bright red": "#d6342a",
  "brick red": "#963a22",
};

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

export class Cook {
  /**
   * @param {object} o
   * @param {import('./draw.js').Stove} o.stove
   * @param {() => {dairy:boolean,egg:boolean,gluten:boolean}} o.diet
   * @param {(id:string) => boolean} o.learn  adds a lesson; true if it was new
   * @param {(pot:object, learned:string[]) => void} o.onFinish
   */
  constructor({ stove, diet, learn, onFinish }) {
    this.stove = stove;
    this.diet = diet;
    this.learn = learn;
    this.onFinish = onFinish;
    this.paused = false;

    this.countEl = document.getElementById("step-count");
    this.titleEl = document.getElementById("step-title");
    this.noteEl = document.getElementById("step-note");
    this.bodyEl = document.getElementById("step-body");
    this.afterEl = document.getElementById("step-after");
    this.goEl = document.getElementById("step-go");
    this.lineEl = document.getElementById("pot-line");
    this.cardEl = document.getElementById("card");

    this.goEl.addEventListener("click", () => this.onGo && this.onGo());
    this.tick = this.tick.bind(this);
  }

  start(dish) {
    this.dish = dish;
    this.pot = freshPot();
    this.index = 0;
    this.learned = [];
    this.stove.start();
    this.show();
  }

  stop() {
    this.stove.stop();
    this.meter = null;
  }

  get step() {
    return this.dish.steps[this.index];
  }

  /* ------------------------------------------------------------ the frame */

  show() {
    const step = this.step;
    const total = this.dish.steps.length;
    this.countEl.textContent = `Step ${this.index + 1} of ${total}`;
    this.titleEl.textContent = step.title;
    this.noteEl.textContent = step.note;
    this.bodyEl.replaceChildren();
    this.afterEl.replaceChildren();
    this.afterEl.hidden = true;
    this.bodyEl.hidden = false;
    this.lineEl.textContent = "";
    this.goEl.disabled = false;
    this.cardEl.scrollTop = 0;

    if (step.scene) this.stove.setScene(step.scene(this.pot, 0));
    const kind = step.kind === "serve" ? "choose" : step.kind;
    this[`do_${kind}`](step);
  }

  /* AFTER: say how it went, file the lessons, offer the next step. */
  after(notes) {
    const step = this.step;
    this.bodyEl.hidden = true;
    this.afterEl.hidden = false;
    for (const n of notes) {
      this.afterEl.append(el("p", `say ${n.tone}`, n.text));
    }
    const fresh = [];
    for (const id of step.lessons || []) {
      if (!LESSONS[id]) continue;
      const isNew = this.learn(id);
      if (!this.learned.includes(id)) this.learned.push(id);
      fresh.push({ id, isNew });
    }
    if (fresh.length) {
      const box = el("div", "lessons");
      box.append(el("p", "kicker", "In your notebook"));
      for (const { id, isNew } of fresh) {
        const d = el("details", "lesson");
        const s = el("summary", null, LESSONS[id].title);
        if (isNew) s.append(el("span", "new", "new"));
        d.append(s, el("p", null, LESSONS[id].body));
        box.append(d);
      }
      this.afterEl.append(box);
    }
    const last = this.index === this.dish.steps.length - 1;
    this.goEl.disabled = false;
    this.goEl.textContent = last ? "Sit down and eat" : "Next step";
    this.onGo = () => {
      if (last) {
        this.stop();
        this.onFinish(this.pot, this.learned);
        return;
      }
      this.index++;
      this.show();
    };
    this.goEl.focus({ preventScroll: true });
  }

  /* The table check, said at the moment it happens rather than at the end. */
  record(option) {
    const diet = this.diet();
    const notes = [];
    for (const need of option.contains || []) {
      if (!diet[need]) continue;
      if (option.side) {
        notes.push({
          tone: "warn",
          text: `Fine for a ${NEED_LABEL[need]}-free plate, as long as ${option.why} never meets it — its own dish, its own spoon.`,
        });
        continue;
      }
      this.pot.conflicts.push({ need, why: option.why, maybe: !!option.maybe });
      notes.push({
        tone: "bad",
        text: option.maybe
          ? `Possibly not ${NEED_LABEL[need]}-free any more: ${option.why}.`
          : `Not ${NEED_LABEL[need]}-free any more: ${option.why}.`,
      });
    }
    return notes;
  }

  /* --------------------------------------------------------------- choose */

  do_choose(step) {
    const picks = {};
    const diet = this.diet();
    for (const group of step.groups) {
      const row = el("div", "row");
      const label = el("span", "label", group.label);
      label.id = `g-${step.id}-${group.id}`;
      const seg = el("div", "options");
      seg.dataset.count = String(group.options.length);
      seg.setAttribute("role", "group");
      seg.setAttribute("aria-labelledby", label.id);
      for (const opt of group.options) {
        const b = el("button", "option");
        b.type = "button";
        b.setAttribute("aria-pressed", "false");
        b.append(el("b", null, opt.label), el("small", null, opt.detail));
        for (const need of opt.contains || []) {
          const tag = el("span", `tag${diet[need] ? " clash" : ""}`, opt.maybe ? `may contain ${need}` : need);
          b.append(tag);
        }
        b.addEventListener("click", () => {
          picks[group.id] = opt;
          for (const other of seg.children) other.setAttribute("aria-pressed", String(other === b));
          this.goEl.disabled = Object.keys(picks).length < step.groups.length;
        });
        seg.append(b);
      }
      row.append(label, seg);
      this.bodyEl.append(row);
    }
    this.goEl.textContent = step.kind === "serve" ? "Serve it" : "Do it";
    this.goEl.disabled = true;
    this.onGo = () => {
      let notes = [];
      for (const group of step.groups) {
        const opt = picks[group.id];
        if (opt.apply) opt.apply(this.pot);
        notes = notes.concat(this.record(opt));
      }
      if (step.kind === "serve") this.pot.served = picks;
      if (step.scene) this.stove.setScene(step.scene(this.pot, 1));
      this.after(notes.concat(step.after ? step.after(this.pot) : []));
    };
  }

  /* ---------------------------------------------------------------- meter */

  do_meter(step) {
    const runs = step.runs(this.pot);
    const values = [];
    const zones = step.zones;

    const label = el("p", "run-label");
    const bar = el("div", "meter");
    bar.setAttribute("role", "img");
    let from = 0;
    const stops = zones.map((z) => {
      const c = ZONE_COLOUR[z.name] || "#999";
      const s = `${c} ${from * 100}% ${z.to * 100}%`;
      from = z.to;
      return s;
    });
    bar.style.background = `linear-gradient(90deg, ${stops.join(", ")})`;
    const sweet = el("i", "sweet");
    sweet.style.left = `${step.sweet[0] * 100}%`;
    sweet.style.width = `${(step.sweet[1] - step.sweet[0]) * 100}%`;
    const mark = el("i", "mark");
    bar.append(sweet, mark);
    const zoneName = el("p", "zone");
    zoneName.setAttribute("aria-live", "polite");
    this.bodyEl.append(label, bar, zoneName);

    const paint = (v) => {
      mark.style.left = `${v * 100}%`;
      const capped = this.meter && this.meter.cap < 1 && v >= this.meter.cap - 1e-6;
      const z = zones.find((zz) => v <= zz.to) || zones[zones.length - 1];
      const name = capped && step.capName ? step.capName : v === 0 ? "—" : z.name;
      zoneName.textContent = name;
      bar.setAttribute("aria-label", `Now ${name}`);
    };

    const finishRun = () => {
      if (!this.meter) return;
      this.meter.running = false;
      values.push(this.meter.v);
      if (values.length < runs) {
        startRun();
        return;
      }
      this.meter = null;
      step.commit(this.pot, values);
      this.after(step.after ? step.after(this.pot) : []);
    };

    const startRun = () => {
      this.meter = {
        v: 0,
        running: false,
        step,
        cap: step.cap(this.pot),
        speed: step.speed(this.pot),
        paint,
        finish: finishRun,
      };
      label.textContent = step.runLabel(values.length, runs);
      paint(0);
      this.stove.setScene(step.scene(this.pot, 0));
      this.goEl.textContent = values.length ? "Next batch in" : "Into the pot";
      this.onGo = () => {
        this.meter.running = true;
        this.meter.last = performance.now();
        this.goEl.textContent = step.action;
        this.onGo = finishRun;
        requestAnimationFrame(this.tick);
      };
    };

    startRun();
  }

  /* One frame of a running meter. */
  tick(now) {
    const m = this.meter;
    if (!m || !m.running) return;
    const dt = Math.min(0.05, (now - m.last) / 1000);
    m.last = now;
    if (!this.paused) {
      m.v = Math.min(m.cap, m.v + m.speed * dt);
      m.paint(m.v);
      this.stove.setScene(m.step.scene(this.pot, m.v));
      // Left on until black: the pan does not wait to be told.
      if (m.v >= 1) {
        m.finish();
        return;
      }
    }
    requestAnimationFrame(this.tick);
  }

  /* --------------------------------------------------------------- simmer */

  do_simmer() {
    const pot = this.pot;
    pot.heat = 1;
    pot.lid = "on";

    const clock = el("p", "clock");
    const gauges = el("div", "gauges");
    const g = (name) => {
      const row = el("div", "gauge");
      const lab = el("span", "label", name);
      const track = el("div", "track");
      const fill = el("i");
      track.append(fill);
      row.append(lab, track);
      gauges.append(row);
      return { row, fill };
    };
    const gCollagen = g("Collagen melted");
    const gLiquid = g("Liquid");
    const gOnion = g("Onions holding shape");

    const seg = (labelText, values, get, set) => {
      const row = el("div", "row");
      row.append(el("span", "label", labelText));
      const box = el("div", "options compact");
      box.setAttribute("role", "group");
      const buttons = values.map(([value, text]) => {
        const b = el("button", "option", text);
        b.type = "button";
        b.addEventListener("click", () => {
          set(value);
          paintAll();
        });
        box.append(b);
        return [value, b];
      });
      row.append(box);
      return { row, paint: () => buttons.forEach(([v, b]) => b.setAttribute("aria-pressed", String(get() === v))) };
    };
    const heat = seg("Heat", [[0, "Barely"], [1, "Lazy bubble"], [2, "Boil"]], () => pot.heat, (v) => (pot.heat = v));
    const lid = seg("Lid", [["on", "On"], ["ajar", "Ajar"], ["off", "Off"]], () => pot.lid, (v) => (pot.lid = v));

    const tools = el("div", "tools");
    const wait = el("button", "option", "Let it cook 30 minutes");
    const onions = el("button", "option", "Onions back in");
    const fork = el("button", "option", "Fork test");
    for (const b of [wait, onions, fork]) b.type = "button";
    tools.append(wait, onions, fork);

    const log = el("div", "log");
    log.setAttribute("aria-live", "polite");
    const say = (text, tone = "") => {
      log.prepend(el("p", `say ${tone}`, text));
      while (log.children.length > 3) log.lastChild.remove();
    };

    this.bodyEl.append(clock, gauges, heat.row, lid.row, tools, log);

    const paintAll = () => {
      const h = Math.floor(pot.minutes / 60);
      const m = pot.minutes % 60;
      clock.textContent = `${h} h ${String(m).padStart(2, "0")} min on the stove`;
      gCollagen.fill.style.width = `${pot.collagen * 100}%`;
      gLiquid.fill.style.width = `${Math.min(1, pot.liquid / 1.6) * 100}%`;
      gOnion.row.hidden = !pot.onionsIn;
      gOnion.fill.style.width = `${pot.onionShape * 100}%`;
      heat.paint();
      lid.paint();
      onions.disabled = pot.onionsIn;
      wait.disabled = pot.minutes >= 300;
      this.goEl.disabled = pot.minutes < 30;
      this.lineEl.textContent = `${heatName(pot.heat)}, lid ${pot.lid}`;
      this.stove.setScene(this.simmerScene());
    };

    wait.addEventListener("click", () => {
      say(simmerLine(pot));
      for (const n of simmer(pot)) say(n.text, n.tone);
      if (pot.minutes >= 300) say("Five hours. Whatever it is going to be, it is now.", "warn");
      paintAll();
    });
    onions.addEventListener("click", () => {
      pot.onionsIn = true;
      pot.onionsAt = pot.minutes;
      say("The onions go back in, nestled between the pieces of meat.");
      paintAll();
    });
    fork.addEventListener("click", () => say(forkTest(pot)));

    this.goEl.textContent = "Off the heat";
    this.onGo = () => {
      const notes = [];
      if (!pot.onionsIn) {
        pot.onionsIn = true;
        pot.onionsAt = pot.minutes;
        notes.push({ tone: "warn", text: "The onions were still waiting on the side. In they go now — but they will be crunchy in the middle." });
      }
      // The ring goes out on screen; the model keeps its last heat.
      this.stove.setScene({ ...this.simmerScene(), heat: null });
      notes.push({ tone: pot.collagen >= 0.85 ? "good" : "warn", text: forkTest(pot) });
      this.after(notes);
    };
    say("Lid on. The pot settles to a lazy bubble.");
    paintAll();
  }

  simmerScene() {
    const p = this.pot;
    return {
      heat: p.heat,
      lid: p.lid,
      spices: true,
      meat: { count: 14, brown: p.browning },
      onions: p.onionsIn ? { count: 16, brown: Math.max(0.6, p.onionBrown * 0.8), shape: p.onionShape } : null,
      sauce: { level: p.liquid, dark: Math.min(1, 0.3 + p.fond * 0.4 + p.minutes / 600) },
      scorched: p.scorched,
    };
  }

  /* ---------------------------------------------------------------- taste */

  do_taste(step) {
    const pot = this.pot;
    if (!pot.taste) pot.taste = tasteOf(pot);
    this.stove.setScene({ ...this.simmerScene(), heat: null, lid: "off" });

    const bars = el("div", "taste");
    const rows = {};
    for (const [key, band] of Object.entries(TASTE_BANDS)) {
      const row = el("div", "gauge");
      const lab = el("span", "label", band.label);
      const track = el("div", "track band");
      const zone = el("b");
      zone.style.left = `${band.lo * 10}%`;
      zone.style.width = `${(Math.min(band.hi, 10) - band.lo) * 10}%`;
      const mark = el("i", "dot");
      track.append(zone, mark);
      row.append(lab, track);
      bars.append(row);
      rows[key] = { row, mark, track };
    }
    const notes = el("div", "log");
    notes.setAttribute("aria-live", "polite");
    const tools = el("div", "tools");
    for (const adj of step.adjustments) {
      const b = el("button", "option", adj.label);
      b.type = "button";
      b.addEventListener("click", () => {
        const t = pot.taste;
        for (const [k, f] of Object.entries(adj.scale || {})) t[k] *= f;
        for (const [k, d] of Object.entries(adj.change || {})) t[k] += d;
        for (const k of Object.keys(t)) t[k] = Math.round(Math.min(10, Math.max(0, t[k])) * 10) / 10;
        if (adj.id === "reduce") pot.liquid = Math.max(0.3, pot.liquid - 0.06);
        paint();
      });
      tools.append(b);
    }
    this.bodyEl.append(bars, notes, el("p", "kicker", "Add, a little at a time"), tools);

    const paint = () => {
      const t = pot.taste;
      for (const [key, r] of Object.entries(rows)) {
        const v = t[key];
        r.mark.style.left = `${v * 10}%`;
        const b = TASTE_BANDS[key];
        r.row.classList.toggle("off", v < b.lo || v > b.hi);
        r.track.setAttribute("role", "img");
        r.track.setAttribute("aria-label", `${b.label}: ${v} of 10`);
      }
      notes.replaceChildren(...tasteNotes(t, pot).map((s) => el("p", "say", s)));
    };
    paint();

    this.goEl.textContent = "That is it";
    this.onGo = () => this.after([]);
  }
}
