/*
 * pot.js — what is happening inside the pot, as a handful of numbers.
 *
 * NOT A PHYSICS ENGINE, on purpose (hub §1, "don't over-engineer"). It is a
 * teaching model: each number stands for one thing a cook can learn to read —
 * how brown the meat got, how much fond is on the bottom, how much collagen has
 * melted, how far the liquid has reduced — and each rule below is one sentence
 * a cookbook would say, turned into arithmetic. When a rule and real cooking
 * disagree, real cooking wins and the rule is what changes.
 *
 * The step script (js/stifado.js) writes choices into the state; the simmer
 * and the tasting read it back through the two functions exported here, so
 * the consequences of a choice made at the browning arrive, honestly, two
 * hours later at the spoon.
 */

export function freshPot() {
  return {
    // The choices, recorded as made.
    cut: null, //           "chuck" | "lean"
    floured: false,
    liquidKind: null, //    "water" | "cube" | "homemade"
    peel: null, //          "blanch" | "raw"

    // Browning. One value per batch, 0..1 (see the zones in js/cook.js).
    batches: [],
    browning: 0, //         mean surface browning, capped where it stops helping
    fond: 0, //             how much brown film is on the bottom, 0..1
    fondBurnt: false,
    onionBrown: 0,
    onionBurnt: false,
    paste: 0, //            how well the tomato paste and spices bloomed, 0..1
    pasteBurnt: false,
    wineCooked: false,

    // The braise.
    liquid: 0, //           1.0 = just covers the meat
    startLiquid: 0,
    salted: 0, //           0 none, 1 lightly, 2 heavily
    heat: 1, //             0 barely trembling, 1 lazy bubble, 2 rolling boil
    lid: "on", //           "on" | "ajar" | "off"
    minutes: 0,
    collagen: 0, //         0..1 melted to gelatin
    dryness: 0, //          0..1 fibres squeezed dry
    onionsIn: false,
    onionsAt: null, //      the minute they went in
    onionShape: 1, //       1 whole .. 0 melted into the sauce
    scorched: false,

    // Set at the spoon (see tasteOf) and then nudged by the adjustments.
    taste: null,

    // What the table has to know: [{ need, why }].
    conflicts: [],
  };
}

/* How far each heat setting moves the two clocks that matter. */
const HEAT = [
  { name: "barely trembling", melt: 0.65, dry: 0, evap: 0.6, onion: 0.06 },
  { name: "a lazy bubble", melt: 1, dry: 0, evap: 1, onion: 0.09 },
  { name: "a rolling boil", melt: 1.25, dry: 0.13, evap: 1.9, onion: 0.2 },
];
const LID_EVAP = { on: 0.025, ajar: 0.07, off: 0.12 };

/*
 * Half an hour on the stove. Returns the things worth saying about it.
 *
 * Chuck melts in roughly two and a half hours at a lazy bubble; a lean cut
 * has little collagen to melt and dries out whatever the heat. Evaporation
 * depends on the lid and the heat; a pot left to run low catches on the
 * bottom, and that bitterness stays.
 */
export function simmer(pot) {
  const h = HEAT[pot.heat];
  const notes = [];
  pot.minutes += 30;

  if (pot.cut === "chuck") {
    pot.collagen = Math.min(1, pot.collagen + (30 / 150) * h.melt);
  } else {
    pot.collagen = Math.min(0.35, pot.collagen + 0.08 * h.melt);
    pot.dryness = Math.min(1, pot.dryness + 0.08);
  }
  pot.dryness = Math.min(1, pot.dryness + h.dry);

  pot.liquid = Math.max(0, pot.liquid - LID_EVAP[pot.lid] * h.evap);

  if (pot.onionsIn) pot.onionShape = Math.max(0, pot.onionShape - h.onion);

  if (pot.liquid < 0.25 && !pot.scorched) {
    pot.scorched = true;
    notes.push({ tone: "bad", text: "A smell of catching from the bottom — the pot ran too low and the sauce scorched." });
  } else if (pot.liquid < 0.45) {
    notes.push({ tone: "warn", text: "The sauce is getting thick. Lid on, or the bottom will catch." });
  }
  if (pot.heat === 2) {
    notes.push({ tone: "warn", text: "It is boiling hard, the meat jostling in the pot." });
  }
  return notes;
}

/* What a fork says when you push it into the biggest piece. */
export function forkTest(pot) {
  if (pot.cut === "lean") {
    return pot.minutes < 60
      ? "It is cooked through, and getting firmer the longer it goes."
      : "Dry and tight. There is nothing in this cut left to melt.";
  }
  if (pot.collagen < 0.45) return "It fights back. The fork goes in and the meat holds on to it.";
  if (pot.collagen < 0.85) return "Getting there — it gives, but the middle still resists.";
  if (pot.dryness > 0.3) return "It falls apart, but the strands feel dry. The boil squeezed it.";
  return "It yields. The fork slides in and the piece comes apart under it.";
}

export function heatName(heat) {
  return HEAT[heat].name;
}

/*
 * The spoon. Turns the whole history of the pot into six readings on a 0–10
 * scale, each with the band a balanced stifado sits in. Called once, when the
 * pot comes off the heat; after that the adjustments in js/stifado.js nudge
 * pot.taste directly, the way a cook would.
 */
export const TASTE_BANDS = {
  salt: { label: "Salt", lo: 4.5, hi: 6.5 },
  sour: { label: "Sharp", lo: 3.5, hi: 5.5 },
  sweet: { label: "Sweet", lo: 3.5, hi: 5.5 },
  depth: { label: "Depth", lo: 5.5, hi: 10 },
  warmth: { label: "Warm spice", lo: 3, hi: 6 },
  bitter: { label: "Bitter", lo: 0, hi: 1.5 },
};

export function tasteOf(pot) {
  // How concentrated the sauce has become. A drowned pot is diluted; a pot
  // reduced to a glaze has every flavour, salt included, turned up.
  const conc = Math.min(1.9, Math.max(0.65, 1 / Math.max(pot.liquid, 0.3)));
  const time = Math.min(pot.minutes / 150, 1);

  // Brown, not black: browning helps up to deep brown and stops there.
  const brown = Math.min(pot.browning, 0.85) / 0.85;

  const salt = [1.4, 3.4, 6.4][pot.salted] * conc;
  const sour = (5.4 + (pot.wineCooked ? 0 : 1.8)) * (1 - 0.25 * time) * Math.sqrt(conc);
  const sweet =
    (1.6 + pot.onionBrown * 2 + pot.paste * 0.8 + (1 - pot.onionShape) * 0.8) * Math.sqrt(conc);
  const depth =
    (1 + brown * 3.6 + pot.fond * 1.4 + pot.paste * 1.1 + pot.collagen * 0.5) *
    Math.min(conc, 1.25);
  const warmth = pot.pasteBurnt ? 5.5 : 2.2 + pot.paste * 2.4;
  const bitter =
    (pot.fondBurnt ? 2 : 0) + (pot.pasteBurnt ? 1.8 : 0) + (pot.onionBurnt ? 1.2 : 0) + (pot.scorched ? 2.4 : 0);

  return {
    salt: round(salt),
    sour: round(sour),
    sweet: round(sweet),
    depth: round(depth),
    warmth: round(warmth),
    bitter: round(bitter),
  };
}

function round(v) {
  return Math.round(Math.min(10, Math.max(0, v)) * 10) / 10;
}

export function inBand(key, value) {
  const b = TASTE_BANDS[key];
  return value >= b.lo && value <= b.hi;
}
