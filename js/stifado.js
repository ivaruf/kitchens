/*
 * stifado.js — the cook, step by step: what yiayia says, what you choose, and
 * what each choice does to the pot.
 *
 * THE SHAPE OF A DISH. A dish is an ordered list of steps, and every step is
 * one of five kinds that js/cook.js knows how to put on screen:
 *
 *   choose   one or more groups of options; each option may `apply` to the
 *            pot and may `contain` a need (dairy, egg, gluten), which is how
 *            the table check works without any step knowing about it
 *   meter    a colour that deepens while you watch, and one button to stop
 *            it — browning, frying the paste. `runs` of them for batches
 *   simmer   the braise: heat, lid, half-hours, the fork, the onions
 *   taste    the spoon and the six readings, with adjustments to make
 *   serve    a choose step that ends the cook
 *
 * Each step names the notebook lessons it teaches (js/dishes.js) and may say
 * something afterwards about how it went (`after`). Nothing here touches the
 * DOM, so a second dish is a second file of this shape and nothing else.
 *
 * WHY THESE MISTAKES ARE AVAILABLE. Every wrong option is a mistake real cooks
 * make — crowding the pan, the lean cut, the hard boil, salting early — and
 * each one is allowed to run its course rather than being blocked, because
 * a consequence arriving at the spoon two hours later teaches what a warning
 * label never does.
 */

import { tasteOf, inBand } from "./pot.js";

const MEAT_ZONES = [
  { to: 0.3, name: "grey" },
  { to: 0.6, name: "golden" },
  { to: 0.88, name: "deep brown" },
  { to: 1, name: "scorched" },
];
const ONION_ZONES = [
  { to: 0.3, name: "raw" },
  { to: 0.55, name: "translucent" },
  { to: 0.85, name: "golden" },
  { to: 1, name: "burnt" },
];
const PASTE_ZONES = [
  { to: 0.45, name: "bright red" },
  { to: 0.82, name: "brick red" },
  { to: 1, name: "burnt" },
];

/* How good a stop on a meter was: 1 in the middle of the sweet zone. */
function quality(v, lo, hi) {
  if (v > hi) return 0.5;
  if (v < lo) return (v / lo) * 0.65;
  const mid = (lo + hi) / 2;
  return 1 - (Math.abs(v - mid) / (hi - lo)) * 0.5;
}

export const STIFADO = {
  id: "stifado",
  name: "Stifado",
  steps: [
    {
      id: "market",
      kind: "choose",
      title: "The butcher and the market",
      note: "Stifado is a Sunday dish, but it is not an expensive one. Ask the butcher for the cheap cut — the one with the threads of white running through it.",
      lessons: ["tough-cuts", "no-flour", "stock-cubes"],
      scene: () => ({ lid: "off" }),
      groups: [
        {
          id: "cut",
          label: "The beef",
          options: [
            { id: "chuck", label: "Chuck or shin", detail: "Marbled, sinewy, cheap.", apply: (p) => (p.cut = "chuck") },
            { id: "lean", label: "Sirloin", detail: "Lean, tender, dear.", apply: (p) => (p.cut = "lean") },
          ],
        },
        {
          id: "flour",
          label: "Dust in flour?",
          options: [
            { id: "no", label: "No flour", detail: "Pat dry and brown it bare.", apply: (p) => (p.floured = false) },
            {
              id: "yes",
              label: "Dust it",
              detail: "Like many recipes say.",
              contains: ["gluten"],
              why: "the flour on the meat",
              apply: (p) => (p.floured = true),
            },
          ],
        },
        {
          id: "liquid",
          label: "The liquid",
          options: [
            { id: "water", label: "Water", detail: "The pot makes its own sauce.", apply: (p) => (p.liquidKind = "water") },
            {
              id: "cube",
              label: "A stock cube",
              detail: "Check the label.",
              contains: ["gluten", "dairy"],
              maybe: true,
              why: "the stock cube, unless its label says otherwise",
              apply: (p) => (p.liquidKind = "cube"),
            },
            { id: "homemade", label: "Your own stock", detail: "Bones, water, time.", apply: (p) => (p.liquidKind = "homemade") },
          ],
        },
      ],
      after: (p) => {
        const out = [];
        if (p.cut === "lean")
          out.push({ tone: "warn", text: "Sirloin is a grilling cut. Let us see what two hours does to it." });
        if (p.floured)
          out.push({ tone: "warn", text: "The flour will brown, but stifado never needed it — and now the pot has gluten in it." });
        return out;
      },
    },

    {
      id: "onions",
      kind: "choose",
      title: "A kilo of small onions",
      note: "As much onion as meat — that is what makes it stifado. Peeling them is the only tedious part, unless you know the trick.",
      lessons: ["blanch"],
      scene: () => ({ lid: "off" }),
      groups: [
        {
          id: "peel",
          label: "Peel them",
          options: [
            { id: "blanch", label: "Blanch first", detail: "One minute in boiling water.", apply: (p) => (p.peel = "blanch") },
            { id: "raw", label: "Peel them raw", detail: "With a small knife.", apply: (p) => (p.peel = "raw") },
          ],
        },
      ],
      after: (p) =>
        p.peel === "raw"
          ? [{ tone: "warn", text: "Forty minutes and a lot of tears later, they are peeled. Next time, the pot of boiling water." }]
          : [{ tone: "good", text: "The skins slip off between finger and thumb. Ten minutes for the whole kilo." }],
    },

    {
      id: "batches",
      kind: "choose",
      title: "Into the hot pot",
      note: "The oil is shimmering. A kilo of beef is a lot of meat for one pot.",
      lessons: [],
      scene: () => ({ heat: 2, oil: true, lid: "off" }),
      groups: [
        {
          id: "batches",
          label: "How much at once?",
          options: [
            { id: "1", label: "All of it", detail: "One go, done.", apply: (p) => (p.batchCount = 1) },
            { id: "2", label: "Two batches", detail: "Half at a time.", apply: (p) => (p.batchCount = 2) },
            { id: "3", label: "Three batches", detail: "Space around each piece.", apply: (p) => (p.batchCount = 3) },
          ],
        },
      ],
    },

    {
      id: "brown",
      kind: "meter",
      title: "Brown the meat",
      note: "Do not move it. Let it sit until it lets go of the pot by itself, then lift it out when it is deep brown.",
      lessons: ["crowding"],
      action: "Lift it out",
      zones: MEAT_ZONES,
      sweet: [0.6, 0.88],
      runs: (p) => p.batchCount || 1,
      runLabel: (i, n) => (n > 1 ? `Batch ${i + 1} of ${n}` : "All of the meat"),
      // Crowded meat steams: slower, and it never gets past grey.
      speed: (p) => (p.batchCount === 1 ? 0.08 : p.batchCount === 2 ? 0.17 : 0.21) * (p.floured ? 1.12 : 1),
      cap: (p) => (p.batchCount === 1 ? 0.36 : 1),
      capName: "steaming in its own juice",
      scene: (p, v) => ({
        heat: 2,
        oil: true,
        lid: "off",
        meat: { count: p.batchCount === 1 ? 14 : p.batchCount === 2 ? 8 : 5, brown: v || 0 },
        sauce: p.batchCount === 1 && v > 0.15 ? { level: 0.12, dark: 0.2 } : null,
      }),
      commit: (p, values) => {
        p.batches = values;
        p.browning = values.reduce((a, b) => a + b, 0) / values.length;
        p.fond = Math.min(1, values.reduce((a, v) => a + Math.min(v, 0.88), 0) / values.length);
        p.fondBurnt = values.some((v) => v > 0.88);
      },
      after: (p) => {
        if (p.batchCount === 1)
          return [{ tone: "bad", text: "The meat let out its water and boiled in it. Grey, not brown — and grey has no flavour to give the sauce." }];
        if (p.fondBurnt)
          return [{ tone: "bad", text: "That went past brown. The bottom of the pot is black in places." }];
        if (p.browning < 0.6)
          return [{ tone: "warn", text: "Golden, but pale for a stew. Deep brown is where the flavour is." }];
        return [{ tone: "good", text: "Deep brown on every face, and a brown film on the bottom of the pot. That film is worth more than anything else in it." }];
      },
    },

    {
      id: "onions-brown",
      kind: "meter",
      title: "Brown the onions whole",
      note: "Same pot, more oil, medium heat. Roll them now and then until they are golden in patches. They come out again — they go back in later.",
      lessons: [],
      action: "Lift them out",
      zones: ONION_ZONES,
      sweet: [0.55, 0.85],
      runs: () => 1,
      runLabel: () => "The onions",
      speed: () => 0.16,
      cap: () => 1,
      scene: (p, v) => ({ heat: 1, oil: true, lid: "off", onions: { count: 16, brown: v || 0, shape: 1 } }),
      commit: (p, [v]) => {
        p.onionBrown = quality(v, 0.55, 0.85);
        p.onionBurnt = v > 0.85;
      },
      after: (p) =>
        p.onionBurnt
          ? [{ tone: "bad", text: "Burnt in places. They will carry a bitter note into the sauce." }]
          : p.onionBrown < 0.65
            ? [{ tone: "warn", text: "Soft but pale. Browning them is where their sweetness comes from." }]
            : [{ tone: "good", text: "Golden and sweet-smelling. Set them aside." }],
    },

    {
      id: "paste",
      kind: "meter",
      title: "Garlic, spices, tomato paste",
      note: "Turn the heat right down first. Cinnamon, allspice, cloves, bay and garlic into the oil, then the paste. Stir until it goes from bright red to brick. This is quick.",
      lessons: ["bloom"],
      action: "Stop it there",
      zones: PASTE_ZONES,
      sweet: [0.45, 0.82],
      runs: () => 1,
      runLabel: () => "The paste and spices",
      speed: () => 0.28,
      cap: () => 1,
      scene: (p, v) => ({ heat: 0, oil: true, lid: "off", paste: v || 0.05, spices: true }),
      commit: (p, [v]) => {
        p.paste = quality(v, 0.45, 0.82);
        p.pasteBurnt = v > 0.82;
      },
      after: (p) =>
        p.pasteBurnt
          ? [{ tone: "bad", text: "Acrid smoke — the paste caught and the cinnamon scorched. That bitterness will stay." }]
          : p.paste < 0.65
            ? [{ tone: "warn", text: "Still bright red and a little raw. The spices have barely woken." }]
            : [{ tone: "good", text: "Brick red, and the kitchen smells of cinnamon." }],
    },

    {
      id: "deglaze",
      kind: "choose",
      title: "Wine and vinegar",
      note: "Pour in the wine and the vinegar and scrape the bottom with a wooden spoon. Everything stuck there comes up into the sauce.",
      lessons: ["fond", "cook-off"],
      scene: (p) => ({ heat: 2, lid: "off", spices: true, sauce: { level: 0.25, dark: 0.3 + p.fond * 0.4 } }),
      groups: [
        {
          id: "bubble",
          label: "Then",
          options: [
            { id: "bubble", label: "Let it bubble", detail: "Two minutes, hard.", apply: (p) => (p.wineCooked = true) },
            { id: "straight", label: "Straight on", detail: "Everything else in now.", apply: (p) => (p.wineCooked = false) },
          ],
        },
      ],
      after: (p) => {
        const out = [];
        if (p.fondBurnt)
          out.push({ tone: "bad", text: "The black bits came up too. You can taste them already." });
        else if (p.fond > 0.6)
          out.push({ tone: "good", text: "The wine turns dark as the fond lifts off the bottom. That is the colour of the finished sauce." });
        else
          out.push({ tone: "warn", text: "There was little on the bottom to lift. The sauce stays pale." });
        if (!p.wineCooked)
          out.push({ tone: "warn", text: "The sharp smell of raw wine and vinegar is still in the steam." });
        return out;
      },
    },

    {
      id: "braise",
      kind: "choose",
      title: "Back into the pot",
      note: "The meat goes back in with all its juices, then the tomatoes, then water. A little salt — only a little.",
      lessons: [],
      scene: (p) => ({
        heat: 1,
        lid: "off",
        spices: true,
        meat: { count: 14, brown: p.browning },
        sauce: { level: 0.6, dark: 0.3 + p.fond * 0.4 },
      }),
      groups: [
        {
          id: "level",
          label: "How much water?",
          options: [
            { id: "half", label: "Halfway up", detail: "The meat sticks out.", apply: (p) => (p.liquid = p.startLiquid = 0.62) },
            { id: "cover", label: "Just covers", detail: "Tops of the meat awash.", apply: (p) => (p.liquid = p.startLiquid = 1) },
            { id: "drown", label: "Plenty", detail: "Better too much than too little.", apply: (p) => (p.liquid = p.startLiquid = 1.5) },
          ],
        },
        {
          id: "salt",
          label: "Salt",
          options: [
            { id: "0", label: "None yet", detail: "All at the end.", apply: (p) => (p.salted = 0) },
            { id: "1", label: "A little", detail: "One good pinch.", apply: (p) => (p.salted = 1) },
            { id: "2", label: "Season it fully", detail: "Salted to taste now.", apply: (p) => (p.salted = 2) },
          ],
        },
      ],
    },

    {
      id: "simmer",
      kind: "simmer",
      title: "The long simmer",
      note: "Now the patience. Keep it at the barest bubble with the lid on. The onions go back in for the last hour, and the fork tells you when it is done.",
      lessons: ["simmer", "late-onions"],
    },

    {
      id: "taste",
      kind: "taste",
      title: "The spoon",
      note: "Off the heat. Taste it — properly, from the middle, with a bit of sauce and a bit of meat. Then decide what it needs.",
      lessons: ["season-late"],
      adjustments: [
        { id: "salt", label: "A pinch of salt", change: { salt: 0.8 } },
        { id: "sweet", label: "A teaspoon of petimezi", change: { sweet: 0.7, sour: -0.2 } },
        { id: "sour", label: "A drop of vinegar", change: { sour: 0.7 } },
        { id: "water", label: "A splash of hot water", scale: { salt: 0.88, sour: 0.92, sweet: 0.95 }, change: { depth: -0.3 } },
        { id: "reduce", label: "Ten minutes, lid off", scale: { salt: 1.08, sour: 1.03, sweet: 1.03 }, change: { depth: 0.25 } },
        { id: "spice", label: "A pinch of cinnamon", change: { warmth: 0.7 } },
      ],
    },

    {
      id: "serve",
      kind: "serve",
      title: "To the table",
      note: "Fish out the cinnamon stick and the bay. Let it rest a quarter of an hour. What goes beside it?",
      lessons: ["plate-not-pot", "next-day"],
      scene: (p) => ({
        lid: "on",
        spices: false,
        meat: { count: 14, brown: p.browning },
        onions: { count: 16, brown: Math.max(0.6, p.onionBrown * 0.8), shape: p.onionShape },
        sauce: { level: Math.max(0.3, p.liquid), dark: 0.35 + p.fond * 0.45 },
        scorched: p.scorched,
      }),
      groups: [
        {
          id: "side",
          label: "Beside it",
          options: [
            { id: "rice", label: "Rice", detail: "Plain, to soak up the sauce." },
            { id: "potatoes", label: "Potatoes", detail: "Fried, or mashed with olive oil." },
            { id: "bread", label: "Crusty bread", detail: "The village way.", contains: ["gluten"], why: "the bread" },
            { id: "gfbread", label: "Gluten-free bread", detail: "Check the label for milk and egg too." },
            { id: "orzo", label: "Orzo", detail: "Little pasta, like rice.", contains: ["gluten"], why: "the orzo" },
          ],
        },
        {
          id: "feta",
          label: "Feta",
          options: [
            { id: "none", label: "No feta", detail: "The stew stands alone." },
            { id: "table", label: "On the table", detail: "For whoever wants it.", side: true, contains: ["dairy"], why: "the feta on the table" },
            { id: "pot", label: "Crumbled on top", detail: "Over the whole dish.", contains: ["dairy"], why: "the feta crumbled over the pot" },
          ],
        },
      ],
    },
  ],
};

/* The simmer's own words, for the line under the pot each half-hour. */
export function simmerLine(p) {
  if (p.heat === 2) return "A rolling boil. The pieces tumble against each other.";
  if (p.heat === 0) return "Barely trembling. A bubble breaks the surface now and then.";
  return "A lazy bubble, the lid ticking softly.";
}

/* What the pot tastes like, put the way a cook would say it. */
export function tasteNotes(t, p) {
  const out = [];
  if (t.bitter > 1.5) {
    const why = [
      p.fondBurnt && "the black fond",
      p.pasteBurnt && "the scorched paste",
      p.onionBurnt && "the burnt onions",
      p.scorched && "the bottom catching",
    ].filter(Boolean);
    out.push(`A bitter edge from ${why.join(" and ")}. Nothing you add now will take it away — remember it for next time.`);
  }
  if (t.salt < 4.5) out.push("Flat. It needs salt to wake it up.");
  if (t.salt > 6.5)
    out.push("Too salty. Only water really fixes that — the potato trick is a myth, a potato only soaks up salty liquid.");
  if (t.sour > 5.5) out.push("Sharp at the back of the throat. A little sweetness rounds vinegar off.");
  if (t.sour < 3.5) out.push("Heavy and dull. A drop of vinegar would lift it.");
  if (t.sweet < 3.5) out.push("It wants a touch of sweetness against the vinegar.");
  if (t.sweet > 5.5) out.push("Sweet and a little cloying. A drop of vinegar brings it back.");
  if (t.depth < 5.5)
    out.push(
      p.startLiquid > 1.2
        ? "Thin-tasting — too much water. Reducing helps, slowly."
        : "Thin-tasting, like tomato soup with meat in it. Depth is built at the browning; reducing helps only a little.",
    );
  if (t.warmth < 3) out.push("Hardly any spice comes through. A pinch of cinnamon.");
  if (t.warmth > 6) out.push("The spice is shouting over everything else.");
  if (!out.length) out.push("Round, deep, a little sharp, a little sweet, warm with cinnamon. That is stifado.");
  return out;
}

export { tasteOf };

/*
 * The end of the cook, as yiayia would sum it up. Rows are judged on what a
 * cook would actually notice at the table, not on a score.
 */
export function verdict(p) {
  const rows = [];
  const tender = p.cut === "chuck" && p.collagen >= 0.85 && p.dryness < 0.3;
  rows.push({
    label: "The meat",
    good: tender,
    text:
      p.cut === "lean"
        ? "Dry and tight — a lean cut has nothing to melt."
        : p.collagen < 0.85
          ? "Still chewy. It needed longer."
          : p.dryness >= 0.3
            ? "It falls apart, but it is stringy. The boil squeezed it."
            : "Falls apart at the touch of a fork, and juicy with it.",
  });
  const onionTime = p.onionsAt == null ? 0 : p.minutes - p.onionsAt;
  rows.push({
    label: "The onions",
    good: p.onionShape >= 0.6 && onionTime >= 40,
    text:
      onionTime < 40
        ? "Crunchy in the middle. They went in too late to soften."
        : p.onionShape >= 0.6
        ? "Whole, glossy, soft right through."
        : p.onionShape >= 0.35
          ? "Soft and slumping, some falling apart."
          : "Melted into the sauce. Tasty — but it is not stifado's look.",
  });
  const t = p.taste;
  const balanced = t && ["salt", "sour", "sweet", "warmth"].every((k) => inBand(k, t[k]));
  rows.push({
    label: "The sauce",
    good: !!(t && balanced && t.depth >= 5.5 && t.bitter <= 1.5),
    text: !t
      ? "—"
      : t.bitter > 1.5
        ? "A bitter note runs underneath everything."
        : t.depth < 5.5
          ? p.startLiquid > 1.2
            ? "Balanced, but thin. Too much water went in."
            : "Balanced, but thin. The depth was lost at the browning."
          : balanced
            ? "Deep, glossy, and in balance."
            : "Deep, but not quite in balance.",
  });
  return rows;
}

