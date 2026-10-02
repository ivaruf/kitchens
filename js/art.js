/*
 * art.js — every picture in the pantry, drawn as SVG.
 *
 * ONE STYLE FOR EVERYTHING, so the shelves read as one painted kitchen and
 * not a clip-art collection: flat colour, one darker shape for the shadow
 * side, one soft highlight, and a warm dark-brown ink line (INK) of the same
 * weight on every object. Drawn on a 64×64 board, lit from the upper left.
 * No photographs, no gradients beyond the glass, no 3D — the brief.
 *
 * WHY SVG STRINGS AND NOT A CANVAS. The pantry is a page of buttons a player
 * browses, and each picture lives inside one: SVG stays sharp at any size, on
 * any screen density, and costs nothing to repeat on the shelf, the counter,
 * the card and the recipe page. Every function returns markup; nothing here
 * touches the DOM.
 *
 * Ids inside SVG are document-global, so the few clip paths here take a
 * fresh suffix from `uid()` every time they are drawn.
 *
 *   ingredient(id)   the 64×64 picture for a pantry id (js/pantry.js)
 *   dish(recipe)     a bowl of the finished dish, 120×90, composed from the
 *                    same pieces, placed by a generator seeded from the
 *                    recipe id so a dish always looks the same
 */

const INK = "#3b2a20";
const LINE = `stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
const THIN = `stroke="${INK}" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"`;

let n = 0;
const uid = () => `a${++n}`;

const svg = (body, box = "0 0 64 64") =>
  `<svg viewBox="${box}" aria-hidden="true" focusable="false">${body}</svg>`;

/* A soft white highlight, upper left, on whatever it is laid over. */
const shine = (cx, cy, rx, ry, rot = -30) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="#fff" opacity="0.35"/>`;

/* ------------------------------------------------------------- vessels */

/*
 * A glass storage jar with a terracotta lid. `fill` draws the contents and is
 * clipped to the glass, from `level` down. The glass itself is a pale wash so
 * the contents show and the shelf behind reads through.
 */
function jar(fill, level = 28, lid = "#b35a36") {
  const c = uid();
  const body = "M18 20 h28 q4 0 4 5 v28 q0 6 -6 6 h-24 q-6 0 -6 -6 v-28 q0 -5 4 -5 z";
  return svg(`
    <defs><clipPath id="${c}"><path d="${body}"/></clipPath></defs>
    <path d="${body}" fill="#eef2ee" opacity="0.55"/>
    <g clip-path="url(#${c})"><rect x="0" y="${level}" width="64" height="40" fill="#00000008"/>${fill}</g>
    <path d="${body}" fill="none" ${LINE}/>
    <rect x="19" y="12" width="26" height="8" rx="2" fill="${lid}" ${LINE}/>
    <rect x="21" y="14" width="22" height="2" rx="1" fill="#fff" opacity="0.25"/>
    <path d="M22 25 v24" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
  `);
}

/* Scatter `count` copies of a small shape across a jar's contents. */
function heap(count, top, draw, seed = 1) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = 17 + r() * 30;
    const y = top + 2 + r() * (58 - top);
    out += draw(x, y, r);
  }
  return out;
}

/* ------------------------------------------------------- the ingredients */

const DRAW = {
  /* ---------------------------------------------------------- spices */
  oregano: () =>
    jar(
      `<rect x="0" y="30" width="64" height="40" fill="#8f9c52"/>` +
        heap(26, 30, (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="2.2" ry="1.2" transform="rotate(${r() * 180} ${x} ${y})" fill="${r() > 0.5 ? "#6b7a3a" : "#a7b266"}"/>`, 3),
      30,
      "#6b7a3a",
    ),

  cinnamon: () =>
    jar(
      [20, 26, 32, 38, 43]
        .map((x, i) => {
          const top = 22 + (i % 2) * 4;
          return `<rect x="${x}" y="${top}" width="6" height="40" rx="3" fill="#a5633a" ${THIN}/>
            <path d="M${x + 1.5} ${top + 2} q1.5 2 3 0" fill="none" stroke="#6e3c20" stroke-width="1"/>
            <path d="M${x + 4.5} ${top + 4} v32" stroke="#7a4426" stroke-width="1" opacity="0.6"/>`;
        })
        .join(""),
      22,
    ),

  allspice: () =>
    jar(
      heap(30, 30, (x, y) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#5c3b27" ${THIN}/><circle cx="${x - 0.8}" cy="${y - 0.8}" r="0.8" fill="#fff" opacity="0.4"/>`, 7),
      30,
    ),

  cloves: () =>
    jar(
      heap(
        22,
        32,
        (x, y, r) => {
          const a = r() * 360;
          return `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 0.7}" y="${y}" width="1.4" height="6" rx="0.7" fill="#5a3422"/><circle cx="${x}" cy="${y}" r="1.8" fill="#4a2b1d"/></g>`;
        },
        5,
      ),
      30,
    ),

  bay: () =>
    svg(`
      <path d="M14 54 Q30 40 50 12" fill="none" stroke="#6e5a38" stroke-width="2.2" stroke-linecap="round"/>
      ${[
        [22, 46, -60, 1],
        [28, 36, -40, -1],
        [36, 30, -70, 1],
        [40, 21, -35, -1],
        [47, 15, -65, 1],
      ]
        .map(
          ([x, y, a, s]) => `<g transform="translate(${x} ${y}) rotate(${a + s * 35})">
            <path d="M0 0 Q6 -5 16 0 Q6 5 0 0 z" fill="${s > 0 ? "#8b9a52" : "#7a8946"}" ${THIN}/>
            <path d="M1 0 H14" stroke="#5e6b32" stroke-width="0.8"/></g>`,
        )
        .join("")}
    `),

  blackpepper: () =>
    svg(`
      <path d="M24 22 h16 l3 30 q0 6 -5 6 h-12 q-5 0 -5 -6 z" fill="#8a5a34" ${LINE}/>
      <path d="M36 24 l2 30" stroke="#6d4325" stroke-width="3" opacity="0.6"/>
      <rect x="22" y="16" width="20" height="7" rx="3" fill="#6d4325" ${LINE}/>
      <circle cx="32" cy="11" r="4" fill="#8a5a34" ${LINE}/>
      <path d="M27 28 v20" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      ${[[17, 56], [46, 57], [49, 54], [15, 59], [44, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#2b2622"/>`).join("")}
    `),

  parsley: () =>
    svg(`
      <path d="M22 30 h20 l-2 26 q0 3 -3 3 h-10 q-3 0 -3 -3 z" fill="#dbe9ef" opacity="0.7" ${LINE}/>
      <rect x="23" y="40" width="18" height="17" fill="#b8d6e3" opacity="0.6"/>
      ${[26, 30, 34, 38].map((x, i) => `<path d="M${x} 56 Q${x - 4 + i * 2.5} 34 ${x - 8 + i * 5.5} 18" fill="none" stroke="#4f7a35" stroke-width="1.6"/>`).join("")}
      ${[
        [18, 18], [24, 12], [32, 9], [40, 12], [46, 18], [22, 22], [30, 16], [38, 18], [44, 24], [16, 26], [34, 22],
      ]
        .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${4.4 - (i % 3) * 0.6}" fill="${i % 2 ? "#4f8a3a" : "#5f9c45"}" ${THIN}/>`)
        .join("")}
      ${shine(26, 12, 4, 2)}
    `),

  salt: () =>
    svg(`
      <path d="M14 36 Q32 30 50 36 Q32 42 14 36 z" fill="#fbfbf7" ${THIN}/>
      <path d="M20 35 Q32 18 44 35" fill="#fbfbf7" ${LINE}/>
      <path d="M12 36 h40 q-2 18 -20 18 q-18 0 -20 -18 z" fill="#2c6a96" ${LINE}/>
      <path d="M16 40 q16 6 32 0" fill="none" stroke="#f7f4ec" stroke-width="1.6"/>
      <path d="M44 38 q-2 12 -12 14" fill="none" stroke="#1f4f72" stroke-width="3" opacity="0.6"/>
      ${[[28, 28], [34, 26], [31, 31], [38, 31]].map(([x, y]) => `<rect x="${x}" y="${y}" width="1.8" height="1.8" fill="#d8dde2"/>`).join("")}
    `),

  /* ---------------------------------------------------------- market */
  onion: () =>
    svg(`
      <path d="M32 12 C22 24 12 32 14 44 C16 54 25 58 32 58 C39 58 48 54 50 44 C52 32 42 24 32 12 z" fill="#d9a35b" ${LINE}/>
      <path d="M44 28 C52 38 50 52 36 57 C46 50 48 38 40 26 z" fill="#b8803c" opacity="0.8"/>
      <path d="M32 14 C26 26 22 40 26 56 M32 14 C38 26 42 40 38 56 M32 14 V57" fill="none" stroke="#a46d33" stroke-width="1" opacity="0.8"/>
      <path d="M32 12 Q30 6 27 4 M32 12 Q34 6 37 3" fill="none" stroke="#8f6a3a" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M29 58 l-2 3 M32 58 v3.5 M35 58 l2 3" stroke="#8f6a3a" stroke-width="1"/>
      ${shine(23, 36, 4, 8, 15)}
    `),

  pearl: () =>
    svg(
      [
        [22, 40, 10],
        [42, 40, 10],
        [32, 26, 9],
        [32, 48, 10],
      ]
        .map(
          ([x, y, r]) => `
        <path d="M${x} ${y - r - 3} C${x - r} ${y - r + 3} ${x - r - 1} ${y} ${x - r + 1} ${y + r * 0.5} C${x - r + 3} ${y + r} ${x + r - 3} ${y + r} ${x + r - 1} ${y + r * 0.5} C${x + r + 1} ${y} ${x + r} ${y - r + 3} ${x} ${y - r - 3} z" fill="#d99a5e" ${LINE}/>
        <path d="M${x + r * 0.4} ${y - r + 3} C${x + r} ${y} ${x + r} ${y + r * 0.4} ${x + r * 0.2} ${y + r * 0.9}" fill="none" stroke="#a8643a" stroke-width="1.2"/>
        <path d="M${x - r * 0.3} ${y - r + 2} C${x - r * 0.6} ${y} ${x - r * 0.5} ${y + r * 0.5} ${x - r * 0.1} ${y + r * 0.9}" fill="none" stroke="#b8743f" stroke-width="1"/>
        <path d="M${x} ${y - r - 3} v-2.5" stroke="#9a7a4a" stroke-width="1.4" stroke-linecap="round"/>
        ${shine(x - r * 0.4, y - 1, 1.6, 3.2, 15)}`,
        )
        .join(""),
    ),

  garlic: () =>
    svg(`
      <path d="M32 14 C24 22 12 30 14 44 C16 54 24 58 32 58 C40 58 48 54 50 44 C52 30 40 22 32 14 z" fill="#f4ede0" ${LINE}/>
      <path d="M32 16 C26 28 24 44 28 57 M32 16 C38 28 40 44 36 57 M32 16 C20 30 18 46 22 55 M32 16 C44 30 46 46 42 55" fill="none" stroke="#c8b9a3" stroke-width="1.1"/>
      <path d="M26 30 q-4 10 -2 20" fill="none" stroke="#c9a3b8" stroke-width="2" opacity="0.7"/>
      <path d="M40 32 q3 10 0 18" fill="none" stroke="#c9a3b8" stroke-width="2" opacity="0.6"/>
      <path d="M32 14 Q31 8 33 4" fill="none" stroke="#b9a988" stroke-width="2.4" stroke-linecap="round"/>
      ${shine(22, 38, 3, 7, 15)}
    `),

  tomato: () =>
    svg(`
      <circle cx="40" cy="38" r="15" fill="#c73b28" ${LINE}/>
      <circle cx="26" cy="40" r="17" fill="#d8442f" ${LINE}/>
      <path d="M38 44 A15 15 0 0 1 14 50 A17 17 0 0 0 41 46 z" fill="#b13421" opacity="0.6"/>
      <path d="M26 24 l-6 -3 l4 6 l-7 1 l7 3 l-2 5 l4 -4 l4 4 l-1 -5 l7 -2 l-7 -2 l3 -5 z" fill="#5e8a3a" ${THIN}/>
      <path d="M26 24 q1 -5 3 -7" fill="none" stroke="#4a6e2c" stroke-width="1.8" stroke-linecap="round"/>
      ${shine(19, 33, 4, 6, -35)}
      ${shine(35, 31, 2.5, 4, -35)}
    `),

  lemon: () =>
    svg(`
      <path d="M44 14 Q54 8 58 16 Q50 18 44 14 z" fill="#5e8a3a" ${THIN}/>
      <path d="M10 34 Q12 18 30 17 Q44 16 50 26 Q54 34 50 42 Q42 54 26 52 Q12 50 10 40 Q6 37 10 34 z" fill="#f0cf3a" ${LINE}/>
      <path d="M50 26 l3 -2" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M46 40 Q40 50 26 50 Q40 46 44 34 z" fill="#d6ac1e" opacity="0.7"/>
      ${shine(22, 28, 7, 3, -10)}
      <g transform="translate(34 44)">
        <circle r="12" fill="#f6e7a0" ${LINE}/>
        <circle r="9.5" fill="#f3d84a"/>
        ${[0, 60, 120, 180, 240, 300].map((a) => `<path d="M0 0 L${(9 * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(9 * Math.sin((a * Math.PI) / 180)).toFixed(1)}" stroke="#fbf3c6" stroke-width="1.4"/>`).join("")}
        <circle r="1.6" fill="#fbf3c6"/>
      </g>
    `),

  carrot: () =>
    svg(
      [
        [0, "#e8772a"],
        [10, "#df6c22"],
      ]
        .map(
          ([dx, c]) => `<g transform="translate(${dx} ${dx * 0.6})">
        <path d="M44 14 q-6 -6 -4 -10 M44 14 q2 -8 6 -10 M44 14 q6 -4 10 -2" fill="none" stroke="#4f8a3a" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M38 14 Q48 12 48 20 L18 54 Q14 56 14 52 z" fill="${c}" ${LINE}/>
        <path d="M36 22 l4 2 M30 30 l3 2 M24 38 l3 2 M20 45 l2 1.5" stroke="#b9531a" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M46 20 L20 52" stroke="#c45a1c" stroke-width="2.5" opacity="0.5"/></g>`,
        )
        .join(""),
    ),

  celery: () =>
    svg(`
      ${[18, 26, 34, 42]
        .map(
          (x, i) => `<path d="M${x} 60 Q${x + 2} 40 ${x + 6 - i * 2} 22" fill="none" stroke="${INK}" stroke-width="7.6" stroke-linecap="round"/>
        <path d="M${x} 60 Q${x + 2} 40 ${x + 6 - i * 2} 22" fill="none" stroke="${i % 2 ? "#a9c46c" : "#b9d07e"}" stroke-width="5" stroke-linecap="round"/>
        <path d="M${x + 1} 58 Q${x + 2.5} 42 ${x + 5.5 - i * 2} 26" fill="none" stroke="#d7e6a8" stroke-width="1.2"/>`,
        )
        .join("")}
      ${[
        [20, 18], [27, 12], [33, 16], [40, 10], [46, 16], [30, 8], [16, 24], [44, 22],
      ]
        .map(([x, y], i) => `<path d="M${x} ${y} l3 -4 l3 4 l-3 4 z" transform="rotate(${i * 40} ${x + 3} ${y})" fill="${i % 2 ? "#5f9c45" : "#6faa4f"}" ${THIN}/>`)
        .join("")}
    `),

  potato: () =>
    svg(`
      <path d="M36 22 Q52 20 56 32 Q58 44 46 48 Q34 50 30 40 Q28 26 36 22 z" fill="#b98f57" ${LINE}/>
      <path d="M12 38 Q12 26 26 26 Q40 26 44 36 Q48 48 36 54 Q22 58 14 50 Q10 46 12 38 z" fill="#c9a26a" ${LINE}/>
      <path d="M40 44 Q36 54 22 54 Q34 50 38 40 z" fill="#a8824c" opacity="0.7"/>
      ${[[22, 34], [33, 38], [26, 46], [48, 30], [50, 40]].map(([x, y]) => `<path d="M${x - 1.5} ${y} q1.5 -1.5 3 0" fill="none" stroke="#7d5a32" stroke-width="1.2" stroke-linecap="round"/>`).join("")}
      ${shine(20, 33, 4, 2.5, -15)}
    `),

  aubergine: () =>
    svg(`
      <path d="M40 18 Q54 26 50 42 Q46 58 28 58 Q12 58 12 46 Q12 36 24 32 Q34 28 40 18 z" fill="#4b2a52" ${LINE}/>
      <path d="M48 36 Q46 56 28 56 Q44 50 46 34 z" fill="#341b3a" opacity="0.8"/>
      <path d="M36 18 Q40 12 46 14 Q50 18 48 24 Q44 20 40 22 Q38 20 36 18 z" fill="#6b8a3a" ${LINE}/>
      <path d="M44 14 Q46 8 50 6" fill="none" stroke="#5e7a32" stroke-width="2.4" stroke-linecap="round"/>
      ${shine(20, 44, 3, 7, 50)}
      ${shine(30, 34, 2, 4, 50)}
    `),

  courgette: () =>
    svg(
      [
        [0, "#4f7a35"],
        [10, "#5f8a40"],
      ]
        .map(
          ([dy, c], i) => `<g transform="translate(0 ${dy})" >
        <path d="M10 ${40 - i * 6} Q8 ${32 - i * 6} 16 ${30 - i * 6} L50 ${16 - i * 2} Q56 ${14 - i * 2} 56 ${20 - i * 2} Q56 ${24 - i * 2} 52 ${26 - i * 2} L18 ${42 - i * 6} Q12 ${44 - i * 6} 10 ${40 - i * 6} z" fill="${c}" ${LINE}/>
        <path d="M16 ${34 - i * 6} L50 ${20 - i * 2}" stroke="#8fb366" stroke-width="1.4" stroke-dasharray="4 3"/>
        <path d="M18 ${38 - i * 6} L50 ${23 - i * 2}" stroke="#3b5e27" stroke-width="1.6" opacity="0.6"/>
        <path d="M56 ${18 - i * 2} l4 -2" stroke="#6e8a40" stroke-width="2.4" stroke-linecap="round"/></g>`,
        )
        .join(""),
    ),

  pepper: () =>
    svg(
      [
        [0, "#6aa23a", 0],
        [8, "#5c9433", 10],
      ]
        .map(
          ([dx, c, rot]) => `<g transform="translate(${dx} 0) rotate(${rot} 32 32)">
        <path d="M24 14 Q20 10 22 6" fill="none" stroke="#4a6e2c" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M18 16 Q26 12 30 16 Q34 30 30 44 Q26 56 16 60 Q20 50 18 40 Q14 26 18 16 z" fill="${c}" ${LINE}/>
        <path d="M27 20 Q30 34 24 52" fill="none" stroke="#4a7e2a" stroke-width="2" opacity="0.6"/>
        ${shine(20, 28, 1.6, 6, 5)}</g>`,
        )
        .join(""),
    ),

  /* ---------------------------------------------------------- pulses */
  beans: () =>
    jar(
      `<rect x="0" y="26" width="64" height="40" fill="#e8e0cf"/>` +
        heap(34, 26, (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="3.3" ry="2.2" transform="rotate(${r() * 180} ${x} ${y})" fill="#f6f1e6" ${THIN}/>`, 11),
      26,
    ),

  chickpeas: () =>
    jar(
      `<rect x="0" y="26" width="64" height="40" fill="#d9b874"/>` +
        heap(30, 26, (x, y) => `<circle cx="${x}" cy="${y}" r="2.9" fill="#e6c88a" ${THIN}/><path d="M${x + 1.5} ${y - 2.4} l1.4 -1" stroke="${INK}" stroke-width="0.8"/>`, 13),
      26,
    ),

  lentils: () =>
    jar(
      `<rect x="0" y="28" width="64" height="40" fill="#7a5a36"/>` +
        heap(70, 28, (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="1.9" ry="1.3" fill="${r() > 0.5 ? "#8e6c3e" : "#6c5230"}"/>`, 17),
      28,
      "#6b7a3a",
    ),

  /* --------------------------------------------------------- bottles */
  oil: () =>
    svg(`
      <path d="M27 6 h10 v8 q0 3 3 6 q6 6 6 14 v20 q0 6 -6 6 h-16 q-6 0 -6 -6 v-20 q0 -8 6 -14 q3 -3 3 -6 z" fill="#d6cf86" opacity="0.5" ${LINE}/>
      <path d="M19 30 q0 -6 5 -10 h16 q5 4 5 10 v24 q0 5 -5 5 h-16 q-5 0 -5 -5 z" fill="#b5a531"/>
      <path d="M38 24 q6 4 6 10 v20 q0 4 -4 5" fill="none" stroke="#8c7f1e" stroke-width="3" opacity="0.6"/>
      <path d="M27 6 h10 v8 q0 3 3 6 q6 6 6 14 v20 q0 6 -6 6 h-16 q-6 0 -6 -6 v-20 q0 -8 6 -14 q3 -3 3 -6 z" fill="none" ${LINE}/>
      <rect x="26" y="2" width="12" height="6" rx="1.5" fill="#b07a4a" ${LINE}/>
      <rect x="21" y="38" width="22" height="12" rx="2" fill="#f6efdc" ${THIN}/>
      <path d="M26 46 q6 -8 12 -4" fill="none" stroke="#5e6b32" stroke-width="1.4"/>
      <ellipse cx="28" cy="44" rx="2" ry="1.2" fill="#5e6b32"/><ellipse cx="34" cy="41.5" rx="2" ry="1.2" fill="#5e6b32"/>
      <path d="M22 26 v10" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.5"/>
    `),

  wine: () =>
    svg(`
      <path d="M28 4 h8 v14 q0 4 4 7 q4 3 4 10 v22 q0 4 -4 4 h-16 q-4 0 -4 -4 v-22 q0 -7 4 -10 q4 -3 4 -7 z" fill="#3a1e2a" ${LINE}/>
      <path d="M38 26 q4 3 4 9 v20 q0 3 -3 3" fill="none" stroke="#24111a" stroke-width="3"/>
      <rect x="27" y="2" width="10" height="7" rx="1.5" fill="#8a2a2e" ${LINE}/>
      <rect x="22" y="36" width="20" height="15" rx="1.5" fill="#efe6d2" ${THIN}/>
      <path d="M26 41 h12 M27 45 h10" stroke="#8a2a2e" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M24 28 v6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity="0.35"/>
    `),

  vinegar: () =>
    svg(`
      <path d="M29 10 h6 v6 q0 3 4 6 q7 6 7 16 v14 q0 8 -8 8 h-12 q-8 0 -8 -8 v-14 q0 -10 7 -16 q4 -3 4 -6 z" fill="#f3e8e4" opacity="0.6" ${LINE}/>
      <path d="M18 40 q2 -8 8 -12 h12 q6 4 8 12 v12 q0 7 -7 7 h-14 q-7 0 -7 -7 z" fill="#a8423a"/>
      <path d="M29 10 h6 v6 q0 3 4 6 q7 6 7 16 v14 q0 8 -8 8 h-12 q-8 0 -8 -8 v-14 q0 -10 7 -16 q4 -3 4 -6 z" fill="none" ${LINE}/>
      <path d="M28 4 q4 -3 8 0 v7 h-8 z" fill="#2c6a96" ${LINE}/>
      <path d="M22 36 v12" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.45"/>
    `),

  paste: () =>
    svg(`
      <ellipse cx="32" cy="22" rx="16" ry="5" fill="#cfd3d6" ${LINE}/>
      <path d="M16 22 v28 q0 5 16 5 q16 0 16 -5 v-28" fill="#c73b28" ${LINE}/>
      <path d="M16 28 q16 5 32 0 M16 46 q16 5 32 0" fill="none" stroke="#f3e2c8" stroke-width="2"/>
      <circle cx="32" cy="37" r="6" fill="#d8442f" stroke="#f3e2c8" stroke-width="1.6"/>
      <path d="M32 31 l-2 -2 M32 31 l2 -2" stroke="#5e8a3a" stroke-width="1.4" stroke-linecap="round"/>
      <ellipse cx="32" cy="22" rx="12" ry="3" fill="#b8bdc1"/>
      <path d="M44 26 v22" stroke="#9e2e1e" stroke-width="3" opacity="0.6"/>
      <path d="M20 26 v20" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
    `),

  /* ------------------------------------------------------------ cold */
  beef: () =>
    svg(`
      <path d="M6 30 L34 12 L60 30 L32 50 z" fill="#efe6d2" ${LINE}/>
      <path d="M32 50 L60 30 L60 34 L32 54 L6 34 L6 30 z" fill="#d9ccb2" ${LINE}/>
      <path d="M16 31 Q20 20 34 20 Q48 20 50 30 Q50 40 34 42 Q18 42 16 31 z" fill="#b5403f" ${LINE}/>
      <path d="M50 30 Q50 40 34 42 Q46 38 48 30 z" fill="#8e2f2e" opacity="0.7"/>
      <path d="M22 28 Q28 25 32 30 Q36 34 44 30 M26 35 Q32 33 38 37 M30 23 Q34 26 40 24" fill="none" stroke="#f1d9cf" stroke-width="1.6" stroke-linecap="round"/>
      ${shine(25, 25, 4, 1.8, -10)}
    `),

  feta: () =>
    svg(`
      <ellipse cx="32" cy="44" rx="26" ry="10" fill="#2c6a96" ${LINE}/>
      <ellipse cx="32" cy="42" rx="22" ry="7" fill="#d9e6ea"/>
      <path d="M18 40 L22 24 L46 24 L46 38 Q32 46 18 40 z" fill="#f6f3ea" ${LINE}/>
      <path d="M22 24 L46 24 L42 20 L26 20 z" fill="#fbf9f3" ${LINE}/>
      <path d="M46 24 v14" stroke="#ddd6c6" stroke-width="3"/>
      ${[[27, 31], [35, 29], [40, 34], [30, 37]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#ddd6c6"/>`).join("")}
      <path d="M12 45 q20 8 40 0" fill="none" stroke="#f7f4ec" stroke-width="1.4"/>
    `),

  bread: () =>
    svg(`
      <path d="M8 42 Q8 22 32 20 Q56 22 56 42 Q56 52 32 52 Q8 52 8 42 z" fill="#c98a45" ${LINE}/>
      <path d="M54 40 Q54 50 32 50 Q50 46 52 36 z" fill="#a86d32" opacity="0.7"/>
      <path d="M20 30 q12 -4 24 0 M18 38 q14 -4 28 0" fill="none" stroke="#8a5424" stroke-width="2" stroke-linecap="round"/>
      ${[[22, 26], [30, 24], [38, 25], [26, 33], [35, 32], [42, 34], [20, 41], [30, 42], [40, 43], [46, 39]]
        .map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="1.2" ry="0.7" transform="rotate(${i * 37} ${x} ${y})" fill="#f6ead0"/>`)
        .join("")}
      ${shine(20, 28, 6, 2.5, -20)}
    `),

  /* ------------------------------------------------- herbs, more market */
  dill: () =>
    svg(`
      ${[[24, 58, 14, 10], [32, 58, 34, 6], [40, 58, 50, 12]]
        .map(([x0, y0, x1, y1]) => `<path d="M${x0} ${y0} Q${(x0 + x1) / 2} ${(y0 + y1) / 2 + 6} ${x1} ${y1}" fill="none" stroke="#5e8a3a" stroke-width="1.6"/>`)
        .join("")}
      ${Array.from({ length: 34 }, (_, i) => {
        const t = (i % 11) / 11;
        const stem = Math.floor(i / 11.4);
        const [x0, y0, x1, y1] = [[24, 58, 14, 10], [32, 58, 34, 6], [40, 58, 50, 12]][Math.min(stem, 2)];
        const x = x0 + (x1 - x0) * (0.25 + t * 0.75);
        const y = y0 + (y1 - y0) * (0.25 + t * 0.75);
        const side = i % 2 ? 1 : -1;
        return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l${side * 6} -4 M${x.toFixed(1)} ${y.toFixed(1)} l${side * 4} -6" stroke="${i % 3 ? "#6faa4f" : "#4f8a3a"}" stroke-width="1.1" stroke-linecap="round"/>`;
      }).join("")}
    `),

  mint: () =>
    svg(`
      <path d="M32 60 V8" stroke="#4a6e2c" stroke-width="2" stroke-linecap="round"/>
      ${[[14, 1], [22, -1], [30, 1], [38, -1], [46, 1]]
        .map(([y, s], i) => {
          const w = 13 - i * 1.5;
          return `<g transform="translate(32 ${60 - y}) scale(${s} 1)">
          <path d="M0 0 Q${w * 0.6} ${-w * 0.7} ${w * 1.4} ${-w * 0.4} Q${w * 0.9} ${w * 0.3} 0 0 z" fill="${i % 2 ? "#4f9a4a" : "#5aa852"}" ${THIN}/>
          <path d="M1 -0.5 L${w * 1.1} ${-w * 0.35}" stroke="#3d7a38" stroke-width="0.8"/></g>`;
        })
        .join("")}
    `),

  redonion: () =>
    svg(`
      <path d="M32 12 C22 24 12 32 14 44 C16 54 25 58 32 58 C39 58 48 54 50 44 C52 32 42 24 32 12 z" fill="#8e3a5e" ${LINE}/>
      <path d="M44 28 C52 38 50 52 36 57 C46 50 48 38 40 26 z" fill="#6e2848" opacity="0.8"/>
      <path d="M32 14 C26 26 22 40 26 56 M32 14 C38 26 42 40 38 56 M32 14 V57" fill="none" stroke="#b4628a" stroke-width="1" opacity="0.8"/>
      <path d="M32 12 Q30 6 27 4 M32 12 Q34 6 37 3" fill="none" stroke="#7a5a4a" stroke-width="1.6" stroke-linecap="round"/>
      ${shine(23, 36, 4, 8, 15)}
    `),

  springonion: () =>
    svg(
      [18, 26, 34, 42]
        .map(
          (x, i) => `<path d="M${x} 48 Q${x + 2} 26 ${x + 8 - i * 3} 4" fill="none" stroke="${INK}" stroke-width="5.2" stroke-linecap="round"/>
        <path d="M${x} 48 Q${x + 2} 26 ${x + 8 - i * 3} 4" fill="none" stroke="${i % 2 ? "#5f9c45" : "#6faa4f"}" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="${x}" cy="52" rx="4.2" ry="6" fill="#f4efe0" ${THIN}/>
        <path d="M${x - 2} 58 l-1 3 M${x} 58 v3.5 M${x + 2} 58 l1 3" stroke="#a89878" stroke-width="0.9"/>`,
        )
        .join(""),
    ),

  cucumber: () =>
    svg(`
      <path d="M8 46 Q6 38 14 34 L48 16 Q56 12 58 20 Q60 26 54 30 L20 50 Q12 54 8 46 z" fill="#3f6e2c" ${LINE}/>
      <path d="M14 42 L50 22" stroke="#6f9a4a" stroke-width="1.6" stroke-dasharray="2 4" stroke-linecap="round"/>
      <path d="M18 48 L54 28" stroke="#2c5220" stroke-width="2" opacity="0.6"/>
      <ellipse cx="54" cy="22" rx="4.5" ry="7" transform="rotate(-28 54 22)" fill="#e2ebc0" ${THIN}/>
      <ellipse cx="54" cy="22" rx="2.5" ry="4.6" transform="rotate(-28 54 22)" fill="#cbd99a"/>
    `),

  spinach: () =>
    svg(
      [
        [18, 34, -30, "#3f7a32"],
        [46, 34, 30, "#3f7a32"],
        [32, 26, 0, "#4f8a3a"],
        [24, 40, -15, "#468236"],
        [40, 40, 15, "#468236"],
      ]
        .map(
          ([x, y, a, c]) => `<g transform="translate(${x} ${y}) rotate(${a})">
        <path d="M0 22 V8" stroke="#8fb366" stroke-width="2"/>
        <path d="M0 10 C-12 4 -12 -14 0 -20 C12 -14 12 4 0 10 z" fill="${c}" ${LINE}/>
        <path d="M0 8 V-16 M0 -2 l-5 -4 M0 -8 l5 -4 M0 2 l5 -4" stroke="#7fae5a" stroke-width="1"/></g>`,
        )
        .join(""),
    ),

  greenbeans: () =>
    svg(`
      ${[-12, -6, 0, 6, 12]
        .map(
          (dx, i) => `<path d="M${30 + dx} 6 Q${26 + dx * 1.4} 32 ${32 + dx * 0.6} 58" fill="none" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/>
        <path d="M${30 + dx} 6 Q${26 + dx * 1.4} 32 ${32 + dx * 0.6} 58" fill="none" stroke="${i % 2 ? "#6aa23a" : "#7db44a"}" stroke-width="4.2" stroke-linecap="round"/>`,
        )
        .join("")}
      <path d="M16 32 Q32 38 48 32" fill="none" stroke="#c9a46a" stroke-width="3"/>
      <path d="M16 32 Q32 38 48 32" fill="none" stroke="${INK}" stroke-width="0.8" opacity="0.5"/>
    `),

  /* -------------------------------------------------- pulses and rice */
  gigantes: () =>
    jar(
      `<rect x="0" y="24" width="64" height="40" fill="#e9e1cf"/>` +
        heap(16, 24, (x, y, r) => `<g transform="rotate(${(r() * 180).toFixed(0)} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="5.2" ry="3.3" fill="#f7f2e6" ${THIN}/><path d="M${x - 1.5} ${y - 3} q1.5 1.6 3 0" fill="none" stroke="#c9bfa8" stroke-width="0.9"/></g>`, 19),
      24,
    ),

  splitpeas: () =>
    jar(
      `<rect x="0" y="28" width="64" height="40" fill="#e3b53a"/>` +
        heap(44, 28, (x, y, r) => `<path d="M${x - 2.4} ${y} A2.4 2.4 0 0 1 ${x + 2.4} ${y} z" transform="rotate(${r() * 360} ${x} ${y})" fill="#f0c94e"/>`, 23),
      28,
      "#6b7a3a",
    ),

  rice: () =>
    jar(
      `<rect x="0" y="27" width="64" height="40" fill="#efeadf"/>` +
        heap(70, 27, (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="1.8" ry="0.9" transform="rotate(${r() * 180} ${x} ${y})" fill="#fbf9f3" stroke="#d6cfbf" stroke-width="0.4"/>`, 29),
      27,
    ),

  /* --------------------------------------------------------- jars */
  olives: () =>
    svg(`
      <ellipse cx="32" cy="44" rx="24" ry="9" fill="#2c6a96" ${LINE}/>
      <path d="M8 44 q24 20 48 0" fill="#2c6a96" ${LINE}/>
      <path d="M12 46 q20 9 40 0" fill="none" stroke="#f7f4ec" stroke-width="1.4"/>
      ${[[20, 40], [28, 37], [36, 38], [44, 40], [24, 44], [32, 42], [40, 44], [30, 33], [38, 33]]
        .map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.4" transform="rotate(${i * 23 - 30} ${x} ${y})" fill="${i % 2 ? "#4a2a3a" : "#5a3346"}" ${THIN}/><ellipse cx="${x - 1.5}" cy="${y - 1.2}" rx="1.4" ry="0.7" fill="#fff" opacity="0.45"/>`)
        .join("")}
    `),

  capers: () =>
    svg(`
      <path d="M22 22 h20 q3 0 3 4 v26 q0 6 -6 6 h-14 q-6 0 -6 -6 v-26 q0 -4 3 -4 z" fill="#dfe6cf" opacity="0.7" ${LINE}/>
      <rect x="20" y="30" width="24" height="27" fill="#c8d3a2" opacity="0.6"/>
      ${heap(16, 31, (x, y) => `<circle cx="${(x * 0.68 + 10).toFixed(1)}" cy="${y}" r="2" fill="#6b7f3a" ${THIN}/>`, 31)}
      <rect x="21" y="15" width="22" height="8" rx="2" fill="#2c6a96" ${LINE}/>
      <path d="M25 26 v24" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    `),

  tahini: () =>
    jar(
      `<rect x="0" y="22" width="64" height="40" fill="#d8bf92"/>
       <path d="M18 30 q8 -4 14 0 t14 0" fill="none" stroke="#b89a68" stroke-width="2"/>
       <path d="M18 40 q8 -4 14 0 t14 0" fill="none" stroke="#c7aa7a" stroke-width="1.6"/>`,
      22,
      "#8a5a34",
    ),

  /* --------------------------------------------------------- cold */
  chicken: () =>
    svg(`
      <path d="M6 34 L32 18 L60 34 L32 52 z" fill="#efe6d2" ${LINE}/>
      <path d="M14 36 Q14 22 32 22 Q50 22 50 34 Q50 46 32 46 Q14 46 14 36 z" fill="#f0cfae" ${LINE}/>
      <path d="M48 32 Q50 44 34 46 Q46 40 46 30 z" fill="#ddb08a" opacity="0.8"/>
      <path d="M46 26 q8 -6 12 -2 q-2 6 -10 6 z" fill="#f0cfae" ${LINE}/>
      <path d="M18 28 q-8 -6 -12 -2 q2 6 10 6 z" fill="#f0cfae" ${LINE}/>
      <path d="M24 34 q8 4 16 0" fill="none" stroke="#d9a885" stroke-width="1.4"/>
      ${shine(24, 28, 6, 2.5, -10)}
    `),

  eggs: () =>
    svg(`
      <path d="M8 40 h48 q-2 18 -24 18 q-22 0 -24 -18 z" fill="#b35a36" ${LINE}/>
      ${[[20, 34, "#e9d2b0"], [32, 30, "#f4ece0"], [44, 34, "#d9b48a"], [26, 38, "#f2e6d4"], [38, 38, "#e4c49c"]]
        .map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="9" fill="${c}" ${LINE}/><ellipse cx="${x - 2.5}" cy="${y - 3}" rx="1.8" ry="3" fill="#fff" opacity="0.45"/>`)
        .join("")}
      <path d="M8 40 h48" stroke="${INK}" stroke-width="1.6"/>
      <path d="M14 46 q18 8 36 0" fill="none" stroke="#f1ddb8" stroke-width="1.6" stroke-dasharray="1 5" stroke-linecap="round"/>
    `),

  /* ------------------------------------------------- the Vietnamese pantry */
  thaibasil: () =>
    svg(`
      <path d="M32 60 V14" stroke="#6a2e5a" stroke-width="2.2" stroke-linecap="round"/>
      ${[[16, 1], [24, -1], [32, 1], [40, -1], [48, 1]]
        .map(([y, s], i) => {
          const w = 12 - i * 1.4;
          return `<g transform="translate(32 ${62 - y}) scale(${s} 1)"><path d="M0 0 Q${w * 0.5} ${-w * 0.9} ${w * 1.5} ${-w * 0.5} Q${w * 0.9} ${w * 0.35} 0 0 z" fill="${i % 2 ? "#3f7a3a" : "#4a8a42"}" ${THIN}/></g>`;
        })
        .join("")}
      <path d="M28 14 l4 -8 l4 8 z" fill="#8a4a8a" ${THIN}/>
    `),

  coriander: () =>
    svg(`
      ${[22, 28, 34, 40].map((x, i) => `<path d="M${x} 60 Q${x - 2 + i} 40 ${x - 10 + i * 6} 22" fill="none" stroke="#6f9a3a" stroke-width="1.4"/>`).join("")}
      ${[[12, 22], [20, 14], [30, 12], [40, 14], [48, 20], [16, 30], [26, 22], [36, 22], [46, 30], [30, 30]]
        .map(([x, y], i) => `<g transform="translate(${x} ${y}) rotate(${i * 36})"><path d="M0 -6 l3 2 l2 4 l-2 4 l-3 2 l-3 -2 l-2 -4 l2 -4 z" fill="${i % 2 ? "#4f8a3a" : "#5f9c45"}" ${THIN}/></g>`)
        .join("")}
    `),

  staranise: () =>
    svg(`
      ${[[30, 30, 0], [20, 46, 20], [42, 46, -15]]
        .map(
          ([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})">
          ${[0, 45, 90, 135, 180, 225, 270, 315].map((d) => `<path d="M0 0 L-3 -5 Q0 -13 3 -5 z" transform="rotate(${d})" fill="#7a3e22" ${THIN}/>`).join("")}
          <circle r="2.4" fill="#5a2c16"/>
          ${[0, 90, 180, 270].map((d) => `<ellipse cx="0" cy="-7" rx="1" ry="1.6" transform="rotate(${d + 22})" fill="#c98a4a"/>`).join("")}</g>`,
        )
        .join("")}
    `),

  ginger: () =>
    svg(`
      <path d="M10 40 Q8 30 18 30 Q20 20 30 22 Q36 14 44 20 Q54 20 54 30 Q60 36 54 42 Q50 50 40 46 Q32 54 22 48 Q12 50 10 40 z" fill="#d9b06a" ${LINE}/>
      <path d="M44 20 q4 -6 10 -6 M30 22 q-2 -6 2 -10" fill="none" stroke="#b98a4a" stroke-width="3" stroke-linecap="round"/>
      <path d="M16 38 q8 2 14 -2 M34 34 q8 2 14 -2 M24 44 q6 2 12 -1" fill="none" stroke="#b8904e" stroke-width="1.2"/>
      ${shine(22, 34, 5, 2.4, -10)}
    `),

  chilli: () =>
    svg(
      [
        [0, "#d42a1e", 0],
        [10, "#e0442a", 14],
      ]
        .map(
          ([dy, c, a]) => `<g transform="translate(0 ${dy}) rotate(${a} 32 32)">
        <path d="M44 14 q4 -6 10 -6" fill="none" stroke="#4a6e2c" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M40 14 Q48 14 46 22 Q36 42 12 52 Q22 40 30 24 Q34 14 40 14 z" fill="${c}" ${LINE}/>
        <path d="M40 14 q4 2 6 6" fill="none" stroke="#5e8a3a" stroke-width="3"/>
        ${shine(34, 24, 1.6, 6, 40)}</g>`,
        )
        .join(""),
    ),

  lime: () =>
    svg(`
      <path d="M10 34 Q10 18 28 18 Q46 18 48 32 Q48 48 30 50 Q12 50 10 34 z" fill="#5e9a2e" ${LINE}/>
      <path d="M44 38 Q40 50 26 48 Q40 44 42 32 z" fill="#4a7e22" opacity="0.7"/>
      ${shine(22, 28, 6, 3, -15)}
      <g transform="translate(40 44)">
        <circle r="12" fill="#cfe39a" ${LINE}/>
        <circle r="9.5" fill="#a8cf5a"/>
        ${[0, 60, 120, 180, 240, 300].map((a) => `<path d="M0 0 L${(9 * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(9 * Math.sin((a * Math.PI) / 180)).toFixed(1)}" stroke="#e4f1c4" stroke-width="1.4"/>`).join("")}
      </g>
    `),

  beansprouts: () =>
    svg(`
      <ellipse cx="32" cy="46" rx="24" ry="8" fill="#e9ddc6" ${LINE}/>
      <path d="M8 46 q24 18 48 0" fill="#c9a777" ${LINE}/>
      ${Array.from({ length: 16 }, (_, i) => {
        const x = 14 + (i * 37) % 36;
        const y = 40 - (i % 4) * 3;
        const a = (i * 47) % 120 - 60;
        return `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0 q4 -6 2 -14" fill="none" stroke="#f4efdc" stroke-width="2.6" stroke-linecap="round"/><path d="M0 0 q4 -6 2 -14" fill="none" stroke="#c8bf9a" stroke-width="0.6"/><ellipse cx="2" cy="-15" rx="2" ry="1.4" fill="#d8d07a"/></g>`;
      }).join("")}
    `),

  lettuce: () =>
    svg(`
      <path d="M8 44 Q4 26 20 20 Q28 8 40 16 Q56 16 56 32 Q60 46 46 52 Q32 60 18 54 Q8 52 8 44 z" fill="#9fca5a" ${LINE}/>
      <path d="M16 46 Q20 30 32 26 Q44 24 50 34 Q46 46 32 50 Q22 52 16 46 z" fill="#b9db78" ${THIN}/>
      <path d="M24 44 Q30 34 40 34" fill="none" stroke="#e6f2c6" stroke-width="2"/>
      <path d="M32 30 V50" stroke="#e6f2c6" stroke-width="1.6"/>
    `),

  waterspinach: () =>
    svg(`
      ${[16, 22, 28, 34, 40, 46].map((x, i) => `<path d="M${x} 60 Q${x + 2} 40 ${x - 6 + i * 3} 18" fill="none" stroke="#7fae5a" stroke-width="3" stroke-linecap="round"/>`).join("")}
      ${[[10, 20], [20, 12], [30, 10], [40, 12], [50, 18], [16, 28], [44, 28]]
        .map(([x, y], i) => `<g transform="translate(${x} ${y}) rotate(${i * 30 - 80})"><path d="M0 0 L5 -2 L14 0 L5 2 z" fill="${i % 2 ? "#3f7a32" : "#4f8a3a"}" ${THIN}/></g>`)
        .join("")}
      <path d="M14 46 Q30 52 48 46" fill="none" stroke="#c9a46a" stroke-width="3"/>
    `),

  ricenoodles: () =>
    svg(`
      <rect x="10" y="20" width="44" height="30" rx="4" fill="#f6efe0" ${LINE}/>
      ${[24, 29, 34, 39, 44].map((y) => `<path d="M14 ${y} q9 -3 18 0 t18 0" fill="none" stroke="#e3d8bf" stroke-width="2.4"/>`).join("")}
      <rect x="22" y="12" width="20" height="10" rx="2" fill="#b8322a" ${LINE}/>
      <path d="M26 17 h12" stroke="#f3d27a" stroke-width="1.6"/>
    `),

  vermicelli: () =>
    svg(`
      <ellipse cx="32" cy="36" rx="22" ry="14" fill="#f6f1e4" ${LINE}/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${14 + i * 2} ${28 + (i % 3) * 3} q${8 + i} -8 ${16 + i} 0 t${10} 6" fill="none" stroke="#ddd3bc" stroke-width="1"/>`).join("")}
      <path d="M22 34 h20" stroke="#2f6b4f" stroke-width="5"/>
      <path d="M22 34 h20" stroke="${INK}" stroke-width="5" opacity="0.15"/>
    `),

  ricepaper: () =>
    svg(`
      ${[[30, 38], [34, 34], [38, 30]]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="#f3ecdd" opacity="0.92" ${LINE}/>`)
        .join("")}
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${22 + (i % 4) * 9} ${18 + Math.floor(i / 4) * 9} l4 2" stroke="#d9cdb2" stroke-width="1"/>`).join("")}
    `),

  sugar: () =>
    jar(`<rect x="0" y="28" width="64" height="40" fill="#fbfaf5"/>` + heap(30, 28, (x, y) => `<rect x="${x}" y="${y}" width="1.6" height="1.6" fill="#e3e1d8"/>`, 41), 28, "#2f6b4f"),

  fishsauce: () =>
    svg(`
      <path d="M28 4 h8 v12 q0 4 5 7 q5 3 5 10 v22 q0 5 -5 5 h-18 q-5 0 -5 -5 v-22 q0 -7 5 -10 q5 -3 5 -7 z" fill="#f3e6c8" opacity="0.5" ${LINE}/>
      <path d="M18 34 q0 -6 5 -9 h18 q5 3 5 9 v21 q0 5 -5 5 h-18 q-5 0 -5 -5 z" fill="#b5651e"/>
      <path d="M28 4 h8 v12 q0 4 5 7 q5 3 5 10 v22 q0 5 -5 5 h-18 q-5 0 -5 -5 v-22 q0 -7 5 -10 q5 -3 5 -7 z" fill="none" ${LINE}/>
      <rect x="27" y="1" width="10" height="6" rx="1.5" fill="#b8322a" ${LINE}/>
      <rect x="21" y="38" width="22" height="13" rx="2" fill="#f7efd8" ${THIN}/>
      <path d="M25 44 q4 -4 8 0 q4 4 8 0" fill="none" stroke="#2c6a96" stroke-width="1.4"/>
      <path d="M23 28 v6" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    `),

  neutraloil: () =>
    svg(`
      <path d="M26 6 h12 v8 q0 3 4 6 q6 5 6 12 v22 q0 6 -6 6 h-20 q-6 0 -6 -6 v-22 q0 -7 6 -12 q4 -3 4 -6 z" fill="#f6e7a6" opacity="0.65" ${LINE}/>
      <path d="M18 32 q0 -6 6 -10 h16 q6 4 6 10 v22 q0 5 -5 5 h-18 q-5 0 -5 -5 z" fill="#ead27a"/>
      <path d="M26 6 h12 v8 q0 3 4 6 q6 5 6 12 v22 q0 6 -6 6 h-20 q-6 0 -6 -6 v-22 q0 -7 6 -12 q4 -3 4 -6 z" fill="none" ${LINE}/>
      <rect x="25" y="2" width="14" height="6" rx="1.5" fill="#2f6b4f" ${LINE}/>
      <path d="M22 28 v14" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.5"/>
    `),

  soysauce: () =>
    svg(`
      <path d="M28 6 h8 v10 q0 4 4 7 q4 3 4 9 v24 q0 4 -4 4 h-16 q-4 0 -4 -4 v-24 q0 -6 4 -9 q4 -3 4 -7 z" fill="#2a1a14" ${LINE}/>
      <rect x="27" y="3" width="10" height="6" rx="1.5" fill="#b8322a" ${LINE}/>
      <rect x="22" y="36" width="20" height="14" rx="2" fill="#f3e7c4" ${THIN}/>
      <circle cx="32" cy="43" r="4" fill="none" stroke="#b8322a" stroke-width="1.6"/>
      <path d="M24 26 v6" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
    `),

  hoisin: () =>
    jar(
      `<rect x="0" y="22" width="64" height="40" fill="#3a1e18"/>
       <path d="M18 30 q8 -4 14 0 t14 0" fill="none" stroke="#5a3226" stroke-width="2"/>`,
      22,
      "#b8322a",
    ),

  prawns: () =>
    svg(
      [
        [22, 30, -10],
        [40, 40, 20],
      ]
        .map(
          ([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})">
        <path d="M14 -6 A15 15 0 1 0 -6 16 L-2 10 A9 9 0 1 1 9 -2 z" fill="#f08a5a" ${LINE}/>
        ${[0, 1, 2, 3].map((k) => `<path d="M${(12 - k * 5).toFixed(0)} ${(-4 + k * 5).toFixed(0)} l-4 -4" stroke="#c9603a" stroke-width="1.2"/>`).join("")}
        <path d="M-6 16 l-6 2 l2 -6 z" fill="#e8704a" ${THIN}/>
        <path d="M14 -6 q6 -6 10 -14 M12 -8 q2 -8 0 -16" fill="none" stroke="#c9603a" stroke-width="0.9"/></g>`,
        )
        .join(""),
    ),

  fish: () =>
    svg(`
      <path d="M6 32 Q20 14 40 22 L54 12 L52 32 L54 52 L40 42 Q20 50 6 32 z" fill="#8a8a7a" ${LINE}/>
      <path d="M8 34 Q22 46 40 40 L52 48 L52 34 z" fill="#c9c7b2" opacity="0.8"/>
      <circle cx="16" cy="29" r="2.4" fill="#2b2622"/>
      <path d="M10 22 q-4 -4 -8 -4 M10 22 q-6 0 -8 2" fill="none" stroke="#5a5a4a" stroke-width="1"/>
      ${shine(26, 24, 7, 2.4, -10)}
    `),

  /* -------------------------------------------------- the everyday kitchen */
  gfpasta: () =>
    svg(`
      <path d="M14 18 h36 l-3 38 q0 4 -4 4 h-22 q-4 0 -4 -4 z" fill="#f2efe6" opacity="0.8" ${LINE}/>
      ${[[22, 30, 20], [34, 28, -25], [28, 40, 40], [40, 42, -10], [22, 50, -30], [36, 52, 15]]
        .map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 6}" y="${y - 2.6}" width="12" height="5.2" rx="1" fill="#efcf7a" ${THIN}/><path d="M${x - 4} ${y - 2.6} v5.2 M${x} ${y - 2.6} v5.2 M${x + 4} ${y - 2.6} v5.2" stroke="#c9a24f" stroke-width="0.8"/></g>`)
        .join("")}
      <rect x="12" y="12" width="40" height="8" rx="2" fill="#2f6b4f" ${LINE}/>
      <path d="M24 16 h16" stroke="#f3d27a" stroke-width="1.6"/>
    `),

  tamari: () =>
    svg(`
      <path d="M28 6 h8 v10 q0 4 4 7 q4 3 4 9 v24 q0 4 -4 4 h-16 q-4 0 -4 -4 v-24 q0 -6 4 -9 q4 -3 4 -7 z" fill="#3a2418" ${LINE}/>
      <rect x="27" y="3" width="10" height="6" rx="1.5" fill="#2f6b4f" ${LINE}/>
      <rect x="22" y="36" width="20" height="14" rx="2" fill="#f3e7c4" ${THIN}/>
      <path d="M26 43 h12" stroke="#2f6b4f" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M24 26 v6" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
    `),

  ketchup: () =>
    svg(`
      <path d="M22 18 h20 q4 0 4 4 l-2 32 q0 6 -6 6 h-12 q-6 0 -6 -6 l-2 -32 q0 -4 4 -4 z" fill="#c8241c" ${LINE}/>
      <path d="M40 22 l-2 32 q0 3 -3 4" fill="none" stroke="#9a1a14" stroke-width="3" opacity="0.7"/>
      <path d="M26 8 h12 l2 10 h-16 z" fill="#f3f0e8" ${LINE}/>
      <path d="M30 8 l2 -5 l2 5 z" fill="#f3f0e8" ${THIN}/>
      <rect x="24" y="32" width="16" height="12" rx="2" fill="#f7efd8" ${THIN}/>
      <circle cx="32" cy="38" r="3.4" fill="#d8442f"/>
      <path d="M26 24 v6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity="0.5"/>
    `),

  peas: () =>
    svg(`
      <path d="M12 14 h40 l-2 42 q0 4 -4 4 h-28 q-4 0 -4 -4 z" fill="#dbe9f2" ${LINE}/>
      <path d="M12 14 h40 l-1 8 h-38 z" fill="#2c6a96" ${LINE}/>
      ${Array.from({ length: 22 }, (_, i) => `<circle cx="${18 + (i % 5) * 7 + ((i / 5) | 0) % 2 * 3}" cy="${28 + ((i / 5) | 0) * 7}" r="3.2" fill="#6aa83a" ${THIN}/>`).join("")}
      <path d="M20 8 l3 6 M44 8 l-3 6" stroke="#9ab9cc" stroke-width="1.4"/>
    `),

  sweetcorn: () =>
    svg(`
      <ellipse cx="32" cy="20" rx="16" ry="5" fill="#cfd3d6" ${LINE}/>
      <path d="M16 20 v30 q0 5 16 5 q16 0 16 -5 v-30" fill="#e8b83a" ${LINE}/>
      <path d="M16 26 q16 5 32 0 M16 44 q16 5 32 0" fill="none" stroke="#2f6b4f" stroke-width="3"/>
      <ellipse cx="32" cy="20" rx="12" ry="3" fill="#f2d24a"/>
      ${[[26, 34], [32, 33], [38, 34], [29, 38], [35, 38]].map(([x, y]) => `<rect x="${x - 2}" y="${y - 2}" width="4" height="4" rx="1" fill="#f6dc5a" stroke="#c9961e" stroke-width="0.6"/>`).join("")}
    `),

  corncob: () =>
    svg(`
      <path d="M14 50 Q10 30 30 14 Q38 8 44 12 Q48 18 42 26 Q30 42 22 52 Q16 56 14 50 z" fill="#f2c94a" ${LINE}/>
      ${Array.from({ length: 18 }, (_, i) => {
        const t = (i % 6) / 6;
        const row = (i / 6) | 0;
        const x = 18 + t * 22 + row * 3;
        const y = 46 - t * 28 + row * 2;
        return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="4" height="4" rx="1.2" fill="#f7dc6a" stroke="#c9961e" stroke-width="0.6"/>`;
      }).join("")}
      <path d="M22 54 Q26 40 46 30 Q36 44 30 58 z" fill="#8fb366" ${THIN}/>
      <path d="M12 52 Q8 40 18 26 Q14 42 20 56 z" fill="#7fae5a" ${THIN}/>
    `),
};

/* Ingredients that share another's picture across kitchens. */
const ALIAS = { cassia: "cinnamon", shallots: "pearl" };

export function ingredient(id) {
  const draw = DRAW[ALIAS[id] || id];
  return draw ? draw() : svg(`<circle cx="32" cy="32" r="20" fill="#ddd4c2" ${LINE}/>`);
}

/* ------------------------------------------------------------ the bowls */

/* A small seeded generator, so a dish's pieces land in the same places every
   time it is drawn (hub §10: seed only where reproducibility matters). */
function rng(seed) {
  let s = (typeof seed === "string" ? [...seed].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) : seed) >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* The pieces of a dish, small, drawn at (x, y). */
const PIECE = {
  bean: (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="2.1" transform="rotate(${r() * 180} ${x} ${y})" fill="#f6f1e6" ${THIN}/>`,
  chickpea: (x, y) => `<circle cx="${x}" cy="${y}" r="2.8" fill="#e6c88a" ${THIN}/><circle cx="${x - 0.8}" cy="${y - 0.9}" r="0.8" fill="#fff" opacity="0.5"/>`,
  lentil: (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="1.8" ry="1.2" fill="${r() > 0.5 ? "#6c5230" : "#8e6c3e"}"/>`,
  carrot: (x, y) => `<circle cx="${x}" cy="${y}" r="2.8" fill="#e8772a" ${THIN}/><circle cx="${x}" cy="${y}" r="1.2" fill="#f4a35a"/>`,
  celery: (x, y, r) => `<path d="M${x - 3} ${y} q3 -3 6 0" transform="rotate(${r() * 180} ${x} ${y})" fill="none" stroke="#9cbf5c" stroke-width="2.4" stroke-linecap="round"/>`,
  parsley: (x, y) => `<circle cx="${x}" cy="${y}" r="1.3" fill="#3f7a32"/>`,
  oregano: (x, y) => `<circle cx="${x}" cy="${y}" r="0.9" fill="#5e6b32"/>`,
  onion: (x, y, r) => `<path d="M${x - 4} ${y} q4 -4 8 0" transform="rotate(${r() * 180} ${x} ${y})" fill="none" stroke="#f2e2b8" stroke-width="2" stroke-linecap="round"/>`,
  pearl: (x, y) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#d9a85a" ${THIN}/><ellipse cx="${x - 1.2}" cy="${y - 1.3}" rx="1.2" ry="0.8" fill="#fff" opacity="0.55"/>`,
  beef: (x, y, r) => `<rect x="${x - 4.5}" y="${y - 3.2}" width="9" height="6.4" rx="2.2" transform="rotate(${r() * 60 - 30} ${x} ${y})" fill="#6b3a22" ${THIN}/>`,
  potato: (x, y, r) => `<rect x="${x - 3.5}" y="${y - 3}" width="7" height="6" rx="1.8" transform="rotate(${r() * 90} ${x} ${y})" fill="#ecc66a" stroke="#c98d36" stroke-width="1"/>`,
  wedge: (x, y, r) => `<g transform="rotate(${r() * 140 - 70} ${x} ${y})"><path d="M${x - 11} ${y + 3} Q${x} ${y - 10} ${x + 11} ${y + 3} z" fill="#efc867" ${THIN}/><path d="M${x - 11} ${y + 3} Q${x} ${y - 10} ${x + 11} ${y + 3}" fill="none" stroke="#b8792c" stroke-width="2.2"/></g>`,
  aubergine: (x, y, r) => `<rect x="${x - 3.5}" y="${y - 3}" width="7" height="6" rx="1.4" transform="rotate(${r() * 90} ${x} ${y})" fill="#d9c49a" stroke="#4b2a52" stroke-width="1.6"/>`,
  courgette: (x, y) => `<circle cx="${x}" cy="${y}" r="3.3" fill="#e6e2b0" stroke="#4f7a35" stroke-width="1.4"/>`,
  pepper: (x, y, r) => `<path d="M${x - 4} ${y} h8" transform="rotate(${r() * 180} ${x} ${y})" stroke="#5c9433" stroke-width="2.6" stroke-linecap="round"/>`,
  tomato: (x, y, r) => `<path d="M${x - 3} ${y - 2} l5 -1 l2 4 l-4 2 z" transform="rotate(${r() * 180} ${x} ${y})" fill="#d8442f"/>`,
  bay: (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r() * 180})"><path d="M-6 0 Q0 -3.5 6 0 Q0 3.5 -6 0 z" fill="#7a8946" ${THIN}/></g>`,

  rice: (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="1.7" ry="0.8" transform="rotate(${r() * 180} ${x} ${y})" fill="#fbf9f3"/>`,
  gigante: (x, y, r) => `<g transform="rotate(${(r() * 180).toFixed(0)} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="5" ry="3.2" fill="#f7efe0" ${THIN}/><path d="M${x - 1.4} ${y - 2.9} q1.4 1.5 2.8 0" fill="none" stroke="#c9bfa8" stroke-width="0.8"/></g>`,
  pea: (x, y, r) => `<path d="M${x - 2.4} ${y} A2.4 2.4 0 0 1 ${x + 2.4} ${y} z" transform="rotate(${r() * 360} ${x} ${y})" fill="#f0c94e"/>`,
  cucumber: (x, y) => `<circle cx="${x}" cy="${y}" r="4.4" fill="#e2ebc0" stroke="#3f6e2c" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="1.8" fill="#cbd99a"/>`,
  ring: (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="4.5" ry="3.4" transform="rotate(${r() * 180} ${x} ${y})" fill="none" stroke="#9a4a70" stroke-width="1.6"/>`,
  greenring: (x, y) => `<circle cx="${x}" cy="${y}" r="2" fill="none" stroke="#5f9c45" stroke-width="1.4"/>`,
  olive: (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="3.6" ry="2.5" transform="rotate(${r() * 180} ${x} ${y})" fill="#4a2a3a" ${THIN}/><ellipse cx="${x - 1}" cy="${y - 0.8}" rx="1" ry="0.5" fill="#fff" opacity="0.4"/>`,
  caper: (x, y) => `<circle cx="${x}" cy="${y}" r="1.5" fill="#6b7f3a"/>`,
  spinach: (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r() * 360})"><path d="M-5 0 Q0 -4 5 0 Q0 4 -5 0 z" fill="#2f6428"/></g>`,
  greenbean: (x, y, r) => `<path d="M${x - 6} ${y} q6 -2 12 0" transform="rotate(${r() * 180} ${x} ${y})" fill="none" stroke="#5c8f30" stroke-width="3.2" stroke-linecap="round"/>`,
  chicken: (x, y, r) => `<path d="M${x - 4} ${y} q4 -3 8 0" transform="rotate(${r() * 180} ${x} ${y})" fill="none" stroke="#efd8bc" stroke-width="2.6" stroke-linecap="round"/>`,
  dill: (x, y, r) => `<path d="M${x - 2} ${y} l4 -2 M${x} ${y} l2 2" transform="rotate(${r() * 180} ${x} ${y})" stroke="#4f8a3a" stroke-width="0.9" stroke-linecap="round"/>`,
  mint: (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="1.2" transform="rotate(${r() * 180} ${x} ${y})" fill="#4f9a4a"/>`,
  garlic: (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="1.8" ry="1.2" transform="rotate(${r() * 180} ${x} ${y})" fill="#f6eed8" stroke="#d8c8a0" stroke-width="0.5"/>`,
  berry: (x, y) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#4a2b1d"/>`,
  speck: (x, y) => `<circle cx="${x}" cy="${y}" r="0.7" fill="#2b2622"/>`,
  stuffedTomato: (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="#c73b28" ${THIN}/><ellipse cx="${x}" cy="${y - 2}" rx="6" ry="4" fill="#9e2e1e"/><path d="M${x - 2} ${y - 4} l2 -3 l2 3" fill="#5e8a3a"/><ellipse cx="${x - 3}" cy="${y + 2}" rx="2" ry="3" fill="#fff" opacity="0.3"/>`,
  stuffedPepper: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="9" fill="#5c9433" ${THIN}/><ellipse cx="${x}" cy="${y - 5}" rx="4" ry="2.4" fill="#4a7e2a"/><path d="M${x} ${y - 7} v-3" stroke="#4a6e2c" stroke-width="1.6"/>`,

  noodle: (x, y, r) => `<path d="M${x - 8} ${y} q4 -3 8 0 t8 0" transform="rotate(${r() * 40 - 20} ${x} ${y})" fill="none" stroke="#f6efe0" stroke-width="2.6" stroke-linecap="round"/>`,
  vermicelli: (x, y, r) => `<path d="M${x - 6} ${y} q3 -2 6 0 t6 0" transform="rotate(${r() * 180} ${x} ${y})" fill="none" stroke="#f6f1e4" stroke-width="1" stroke-linecap="round"/>`,
  sprout: (x, y, r) => `<path d="M${x} ${y} q3 -4 1 -9" transform="rotate(${r() * 360} ${x} ${y})" fill="none" stroke="#f4efdc" stroke-width="1.8" stroke-linecap="round"/>`,
  basil: (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r() * 360})"><path d="M-4 0 Q0 -3.5 5 0 Q0 3 -4 0 z" fill="#3f7a3a"/></g>`,
  coriander: (x, y, r) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#5f9c45"/><circle cx="${+x + 2}" cy="${+y - 1.4}" r="1.6" fill="#4f8a3a"/>`,
  chilliring: (x, y) => `<circle cx="${x}" cy="${y}" r="2" fill="none" stroke="#d42a1e" stroke-width="1.6"/>`,
  prawn: (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r() * 360}) scale(0.4)"><path d="M14 -6 A15 15 0 1 0 -6 16 L-2 10 A9 9 0 1 1 9 -2 z" fill="#f08a5a" ${THIN}/></g>`,
  fishsteak: (x, y, r) => `<g transform="rotate(${r() * 60 - 30} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#9a5a2a" ${THIN}/><ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#b8763a"/><circle cx="${x}" cy="${y}" r="1" fill="#f1e6c6"/></g>`,
  roll: (x, y, r) => `<g transform="rotate(${r() * 30 - 15} ${x} ${y})"><rect x="${x - 12}" y="${y - 4.5}" width="24" height="9" rx="4.5" fill="#f3ecdd" opacity="0.95" ${THIN}/><path d="M${x - 8} ${y} q3 -2 5 0 M${+x + 2} ${y} q3 -2 5 0" fill="none" stroke="#f08a5a" stroke-width="2"/><path d="M${x - 10} ${+y + 2} h20" stroke="#7fae5a" stroke-width="1.2" opacity="0.7"/></g>`,
  ginger: (x, y) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#e6c98a" stroke="#b8904e" stroke-width="0.8"/>`,
  staranise: (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r() * 90}) scale(0.5)">${[0, 45, 90, 135, 180, 225, 270, 315].map((d) => `<path d="M0 0 L-3 -5 Q0 -13 3 -5 z" transform="rotate(${d})" fill="#7a3e22"/>`).join("")}</g>`,
  beefslice: (x, y, r) => `<path d="M${x - 6} ${y - 2} q6 -3 12 0 q-2 5 -12 2 z" transform="rotate(${r() * 180} ${x} ${y})" fill="#9a5040" stroke="#6a3020" stroke-width="0.7"/>`,
  shallot: (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.8" transform="rotate(${r() * 180} ${x} ${y})" fill="none" stroke="#b46a8a" stroke-width="1.2"/>`,
  waterspinach: (x, y, r) => `<g transform="rotate(${r() * 180} ${x} ${y})"><path d="M${x - 7} ${y} h14" stroke="#7fae5a" stroke-width="2.2" stroke-linecap="round"/><path d="M${x - 2} ${y} l5 -3 l6 1 z" fill="#2f6428"/></g>`,
  lettuce: (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r() * 360})"><path d="M-6 0 Q0 -5 6 0 Q0 4 -6 0 z" fill="#9fca5a"/></g>`,

  penne: (x, y, r) => `<g transform="rotate(${(r() * 180).toFixed(0)} ${x} ${y})"><rect x="${x - 5}" y="${y - 2}" width="10" height="4" rx="1" fill="#efcf7a" stroke="#c9a24f" stroke-width="0.7"/></g>`,
  greenpea: (x, y) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#6aa83a" stroke="#4a7e22" stroke-width="0.6"/>`,
  corn: (x, y) => `<rect x="${x - 1.6}" y="${y - 1.6}" width="3.2" height="3.2" rx="1" fill="#f6d84a" stroke="#c9961e" stroke-width="0.5"/>`,
  chip: (x, y, r) => `<rect x="${x - 7}" y="${y - 1.8}" width="14" height="3.6" rx="1.2" transform="rotate(${(r() * 180).toFixed(0)} ${x} ${y})" fill="#efc867" stroke="#b8792c" stroke-width="0.9"/>`,
  stick: (x, y, r) => {
    const c = ["#e8772a", "#7fae5a", "#d8442f"][Math.floor(r() * 3)];
    return `<rect x="${x - 8}" y="${y - 1.6}" width="16" height="3.2" rx="1.4" transform="rotate(${(r() * 50 - 25).toFixed(0)} ${x} ${y})" fill="${c}" stroke="${INK}" stroke-width="0.6"/>`;
  },
  cob: (x, y, r) => `<g transform="rotate(${(r() * 40 - 20).toFixed(0)} ${x} ${y})"><rect x="${x - 13}" y="${y - 4.5}" width="26" height="9" rx="4.5" fill="#f2c94a" ${THIN}/><path d="M${x - 9} ${y} h18" stroke="#f7dc6a" stroke-width="1.6" stroke-dasharray="2 1.5"/></g>`,
  boiled: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4.6" fill="#f0d98a" ${THIN}/><ellipse cx="${x - 2}" cy="${y - 1.5}" rx="1.8" ry="1" fill="#fff" opacity="0.5"/>`,
  ketchup: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4" fill="#c8241c" ${THIN}/><ellipse cx="${x - 2}" cy="${y - 1}" rx="2" ry="1" fill="#fff" opacity="0.35"/>`,
  cinnamon: (x, y) => `<rect x="${x - 7}" y="${y - 1.8}" width="14" height="3.6" rx="1.8" transform="rotate(-15 ${x} ${y})" fill="#a5633a" ${THIN}/>`,
};

/* What each finished dish looks like: its vessel, its sauce, what is in it. */
const BOWLS = {
  fasolada: { sauce: "#d9763a", sheen: true, pieces: [["bean", 24], ["carrot", 6], ["celery", 6], ["parsley", 10]] },
  fakes: { sauce: "#7a5634", sheen: true, pieces: [["lentil", 70], ["carrot", 4], ["bay", 2]] },
  avgolemono: { sauce: "#f2e0a0", sheen: true, pieces: [["rice", 40], ["chicken", 9], ["speck", 8]] },
  tahinosoupa: { sauce: "#e8d5aa", sheen: true, pieces: [["rice", 40], ["speck", 10]], lemon: true },
  revithada: { sauce: "#e2b45a", sheen: true, pieces: [["chickpea", 26], ["onion", 8], ["bay", 1]], lemon: true },
  fasolakia: { sauce: "#c8502e", sheen: true, pieces: [["greenbean", 16], ["potato", 5], ["parsley", 6]] },
  spanakorizo: { sauce: "#7d9a45", sheen: true, pieces: [["rice", 34], ["spinach", 9], ["dill", 10]], lemon: true },
  soufico: { sauce: "#c8502e", sheen: true, pieces: [["aubergine", 6], ["potato", 5], ["courgette", 6], ["pepper", 6], ["tomato", 4], ["oregano", 10]] },
  gemista: { vessel: "tin", sauce: "#c24a2a", pieces: [["wedge", 6], ["stuffedPepper", 3], ["stuffedTomato", 4]] },
  gigantes: { vessel: "tin", sauce: "#b33a22", sheen: true, pieces: [["gigante", 18], ["dill", 8], ["carrot", 3]] },
  briam: { vessel: "tin", sauce: "#b84a26", sheen: true, pieces: [["potato", 6], ["courgette", 6], ["aubergine", 5], ["pepper", 5], ["onion", 4]] },
  lemonates: { vessel: "tin", sauce: "#e7c46a", pieces: [["wedge", 8], ["oregano", 22]], lemon: true },
  stifado: { sauce: "#7a2a1e", sheen: true, pieces: [["beef", 7], ["pearl", 10], ["bay", 1], ["cinnamon", 1]] },
  horiatiki: { glaze: "#2c6a96", sauce: "#f3ead2", pieces: [["cucumber", 8], ["tomato", 12], ["ring", 6], ["olive", 7], ["pepper", 3], ["oregano", 12]] },
  fava: { sauce: "#f0cc58", sheen: true, pieces: [["ring", 6], ["caper", 10]] },
  melitzanosalata: { sauce: "#c9b494", sheen: true, pieces: [["parsley", 12], ["olive", 2]] },
  skordalia: { sauce: "#f3eacb", sheen: true, pieces: [["olive", 2], ["parsley", 4]] },

  pho: { glaze: "#f2eee4", sauce: "#b98a4a", sheen: true, pieces: [["noodle", 14], ["beefslice", 8], ["greenring", 10], ["coriander", 6], ["basil", 3], ["sprout", 6], ["chilliring", 3]], lime: true },
  nuoccham: { glaze: "#f2eee4", sauce: "#e8c88a", pieces: [["garlic", 10], ["chilliring", 8]] },
  goicuon: { vessel: "plate", pieces: [["roll", 5]] },
  cakho: { vessel: "pot", sauce: "#6a3418", sheen: true, pieces: [["fishsteak", 4], ["speck", 30], ["chilliring", 4], ["greenring", 8]] },
  raumuong: { vessel: "plate", sauce: "#f2eee4", pieces: [["waterspinach", 26], ["garlic", 10]] },

  plainrice: { glaze: "#2c6a96", sauce: "#e6dcc4", pieces: [["rice", 80]] },
  friedrice: { glaze: "#f2eee4", sauce: "#ead6a0", sheen: true, pieces: [["rice", 50], ["greenpea", 12], ["carrot", 6], ["greenring", 8]] },
  boiledpotatoes: { glaze: "#2c6a96", sauce: "#f2ead6", pieces: [["boiled", 7], ["parsley", 0]] },
  mash: { glaze: "#2c6a96", sauce: "#f1e2a8", sheen: true, pieces: [["speck", 2]] },
  ovenchips: { vessel: "plate", pieces: [["chip", 20], ["ketchup", 1]] },
  pasta: { glaze: "#2c6a96", sauce: "#f6ecd0", sheen: true, pieces: [["penne", 24]] },
  plainnoodles: { glaze: "#2c6a96", sauce: "#e6dcc4", sheen: true, pieces: [["noodle", 18]] },
  vegsticks: { vessel: "plate", pieces: [["stick", 16]] },
  peascorn: { glaze: "#2c6a96", sauce: "#f2eee4", pieces: [["greenpea", 34], ["corn", 34]] },
  corncobs: { vessel: "plate", pieces: [["cob", 3]] },
};

/*
 * One vessel seen from a little above: a glazed bowl, a terracotta casserole
 * with handles, or a round metal tapsi for the oven. `pieces` are [kind,
 * count] pairs from PIECE, scattered inside by a generator seeded from `seed`
 * so the same contents always land in the same places.
 */
function vessel({ kind = "bowl", sauce = null, pieces = [], seed = "x", sheen = false, lemon = false, lime = false, glaze = "#b35a36", heat = null }) {
  const r = rng(seed);
  const clip = uid();
  const cx = 60;
  const cy = 36;
  const rx = 46;
  const ry = 17;

  let body;
  if (kind === "tin") {
    body = `<path d="M8 36 Q8 58 60 60 Q112 58 112 36 z" fill="#a9adb1" ${LINE}/>
      <path d="M100 42 Q98 56 60 58 Q96 52 106 38 z" fill="#8a8e93" opacity="0.7"/>`;
  } else if (kind === "wok") {
    body = `<path d="M8 36 Q14 66 60 68 Q106 66 112 36 z" fill="#2b2a2a" ${LINE}/>
      <path d="M100 42 Q96 62 62 66 Q94 58 106 38 z" fill="#111" opacity="0.6"/>
      <rect x="110" y="32" width="10" height="5" rx="2" fill="#5a3a22" ${LINE}/>
      <rect x="118" y="31" width="2" height="7" fill="#3b2a20"/>`;
  } else if (kind === "plate") {
    body = `<ellipse cx="60" cy="40" rx="56" ry="24" fill="#f7f4ec" ${LINE}/>
      <ellipse cx="60" cy="40" rx="50" ry="20" fill="none" stroke="#2c6a96" stroke-width="2"/>`;
  } else if (kind === "pot") {
    body = `<path d="M8 36 Q8 72 60 74 Q112 72 112 36 z" fill="#8f4428" ${LINE}/>
      <path d="M100 42 Q98 68 62 72 Q96 64 106 38 z" fill="#6e321d" opacity="0.7"/>
      <rect x="-2" y="34" width="12" height="7" rx="3.5" fill="#7a3a22" ${LINE}/>
      <rect x="110" y="34" width="12" height="7" rx="3.5" fill="#7a3a22" ${LINE}/>`;
  } else {
    body = `<path d="M8 36 Q10 74 46 80 L46 84 Q60 88 74 84 L74 80 Q110 74 112 36 z" fill="${glaze}" ${LINE}/>
      <path d="M100 44 Q98 72 62 80 Q96 68 104 40 z" fill="#000" opacity="0.18"/>
      <path d="M18 52 Q60 66 102 52" fill="none" stroke="#f1ddb8" stroke-width="2.4" stroke-dasharray="1 6" stroke-linecap="round"/>`;
  }
  const rim =
    kind === "tin" ? "#c3c6c9" : kind === "pot" ? "#a3502f" : kind === "wok" ? "#3d3b3a" : kind === "plate" ? "#f7f4ec" : glaze === "#b35a36" ? "#c46a43" : glaze;

  // Flames under a pot on the hob: as many tongues as the heat is high.
  let fire = "";
  if (typeof heat === "number" && heat > 0) {
    const tall = [0, 6, 10, 15][heat];
    for (let i = 0; i < 7; i++) {
      const x = 30 + i * 10;
      fire += `<path d="M${x - 3} 86 Q${x} ${86 - tall * (0.8 + (i % 3) * 0.15)} ${x + 3} 86 z" fill="#4a7ae0" opacity="0.85"/>`;
    }
  }

  const placed = [];
  for (const [k, count] of pieces) {
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * 0.86;
      placed.push([cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d, k]);
    }
  }
  placed.sort((p, q) => p[1] - q[1]);
  let bits = "";
  for (const [x, y, k] of placed) if (PIECE[k]) bits += PIECE[k](x.toFixed(1), y.toFixed(1), r);

  const slice = lemon
    ? `<g transform="translate(98 26) rotate(-20)"><path d="M-10 0 A10 10 0 0 1 10 0 z" fill="#f3d84a" ${LINE}/>
       <path d="M-7 0 A7 7 0 0 1 7 0" fill="none" stroke="#fbf3c6" stroke-width="1.2"/>
       <path d="M0 0 L-5 -5 M0 0 L0 -7 M0 0 L5 -5" stroke="#fbf3c6" stroke-width="1"/></g>`
    : "";

  return svg(
    `${fire}<ellipse cx="60" cy="82" rx="40" ry="5" fill="#000" opacity="0.08"/>
     ${body}
     <ellipse cx="${cx}" cy="${cy}" rx="${rx + 6}" ry="${ry + 5}" fill="${rim}" ${LINE}/>
     <defs><clipPath id="${clip}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath></defs>
     <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${sauce || (kind === "tin" ? "#8a8e93" : kind === "plate" ? "#f7f4ec" : kind === "wok" ? "#1f1e1e" : "#4a2e22")}" ${kind === "plate" ? "" : THIN}/>
     <g clip-path="url(#${clip})">
       ${bits}
       ${sheen ? `<ellipse cx="${cx - 14}" cy="${cy - 6}" rx="16" ry="3.5" fill="#ffe8a8" opacity="0.28"/>` : ""}
     </g>
     ${slice}
     ${lime ? `<g transform="translate(98 26) rotate(-20)"><path d="M-10 0 A10 10 0 0 1 10 0 z" fill="#a8cf5a" ${LINE}/><path d="M0 0 L-5 -5 M0 0 L0 -7 M0 0 L5 -5" stroke="#e4f1c4" stroke-width="1"/></g>` : ""}`,
    "0 0 120 90",
  );
}

/* The finished dish, as it comes to the table. */
export function dish(recipe) {
  const b = BOWLS[recipe.id] || { sauce: "#c9954a", pieces: [] };
  return vessel({ kind: b.vessel || "bowl", seed: recipe.id, ...b });
}

/* What one ingredient adds to a pot in the cook-along: [piece kind, count]. */
const IN_POT = {
  onion: ["onion", 10], redonion: ["ring", 6], springonion: ["greenring", 10], pearl: ["pearl", 10], garlic: ["garlic", 6],
  tomato: ["tomato", 8], carrot: ["carrot", 7], celery: ["celery", 6], potato: ["potato", 7], aubergine: ["aubergine", 7],
  courgette: ["courgette", 7], pepper: ["pepper", 6], cucumber: ["cucumber", 8], spinach: ["spinach", 12], greenbeans: ["greenbean", 16],
  beans: ["bean", 24], chickpeas: ["chickpea", 24], lentils: ["lentil", 60], gigantes: ["gigante", 16], splitpeas: ["pea", 40], rice: ["rice", 36],
  beef: ["beef", 7], chicken: ["chicken", 9], olives: ["olive", 7], capers: ["caper", 10],
  bay: ["bay", 1], cinnamon: ["cinnamon", 1], allspice: ["berry", 5], cloves: ["berry", 3], oregano: ["oregano", 12],
  blackpepper: ["speck", 8], parsley: ["parsley", 10], dill: ["dill", 10], mint: ["mint", 8],
  ginger: ["ginger", 4], staranise: ["staranise", 3], cassia: ["cinnamon", 1], shallots: ["shallot", 8], chilli: ["chilliring", 5],
  thaibasil: ["basil", 5], coriander: ["coriander", 8], beansprouts: ["sprout", 10], lettuce: ["lettuce", 6], waterspinach: ["waterspinach", 24],
  ricenoodles: ["noodle", 14], vermicelli: ["vermicelli", 20], prawns: ["prawn", 8], fish: ["fishsteak", 4],
  gfpasta: ["penne", 22], peas: ["greenpea", 26], sweetcorn: ["corn", 26], corncob: ["cob", 3], ketchup: ["ketchup", 1],
};

/*
 * The vessel partway through a cook: what has gone in so far (pantry ids, in
 * order), the sauce colour now, and the heat under it. Gemista's stuffed
 * vegetables are the one case where what goes in is not what shows.
 */
export function cooking({ recipe, added, sauce, heat }) {
  const kind = ["tin", "bowl", "wok", "plate"].includes(recipe.vessel) ? recipe.vessel : "pot";
  let pieces = [...new Set(added)].map((id) => IN_POT[id]).filter(Boolean);
  if (recipe.id === "gemista" && added.includes("rice")) {
    pieces = [["wedge", 6], ["stuffedPepper", 3], ["stuffedTomato", 4], ["parsley", 6]];
  }
  const sheen = added.includes("oil") || added.includes("neutraloil");
  if (recipe.id === "goicuon" && added.includes("prawns")) pieces = [["roll", 5]];
  const glaze = recipe.glaze || (kind === "bowl" ? "#2c6a96" : "#b35a36");
  return vessel({ kind, seed: recipe.id + added.length, sauce, pieces, sheen: sheen && kind !== "plate", heat, glaze });
}

/*
 * An ingredient once it is prepared: a chopped pile on an olive-wood board,
 * or, for whatever has become liquid or pulp (grated, juiced, beaten,
 * whisked, charred), a small bowl of it. Anything a cook does not prepare —
 * spices, oil — keeps its pantry picture.
 */
const PREPARED = {
  onion: ["onion", 14], redonion: ["ring", 9], springonion: ["greenring", 14], pearl: ["pearl", 7], garlic: ["garlic", 9],
  tomato: ["tomato", 10], carrot: ["carrot", 9], celery: ["celery", 9], potato: ["potato", 9], aubergine: ["aubergine", 8],
  courgette: ["courgette", 8], pepper: ["pepper", 8], cucumber: ["cucumber", 7], spinach: ["spinach", 14], greenbeans: ["greenbean", 12],
  beans: ["bean", 22], chickpeas: ["chickpea", 20], lentils: ["lentil", 50], gigantes: ["gigante", 12], splitpeas: ["pea", 34],
  beef: ["beef", 6], parsley: ["parsley", 22], dill: ["dill", 18], mint: ["mint", 14], capers: ["caper", 12],
  ginger: ["ginger", 8], shallots: ["shallot", 12], chilli: ["chilliring", 10], thaibasil: ["basil", 12], coriander: ["coriander", 12],
  beansprouts: ["sprout", 16], lettuce: ["lettuce", 8], waterspinach: ["waterspinach", 12], ricenoodles: ["noodle", 10],
  vermicelli: ["vermicelli", 18], prawns: ["prawn", 6], fish: ["fishsteak", 2],
  gfpasta: ["penne", 14], peas: ["greenpea", 22], sweetcorn: ["corn", 22], corncob: ["cob", 2],
};
const PULP = [
  [/grated/, { tomato: "#d8442f", onion: "#efe2c0", redonion: "#c9a0b8" }],
  [/juiced/, { lemon: "#f3dc6a", lime: "#d6e8a0" }],
  [/beaten/, { eggs: "#f2c84a" }],
  [/whisked/, { tahini: "#e2cfa6" }],
  [/charred/, { aubergine: "#a8906e" }],
  [/crushed|pounded|minced/, { garlic: "#efe6cc" }],
  [/charred/, { onion: "#4a3428", ginger: "#6a4a2a" }],
];

export function prepared(id, how = "") {
  for (const [re, fills] of PULP) {
    if (re.test(how) && fills[id]) return pulpBowl(fills[id], id === "lemon");
  }
  if (/hollowed/.test(how) && (id === "tomato" || id === "pepper")) {
    const k = id === "tomato" ? "stuffedTomato" : "stuffedPepper";
    return board([[k, 3]], id);
  }
  if (/soaked|drained|rinsed|boiled|simmered/.test(how) && ["beans", "chickpeas", "lentils", "gigantes", "splitpeas"].includes(id)) {
    return pulpBowl("#dfe9ec", false, PREPARED[id]);
  }
  const p = PREPARED[id];
  return p ? board([p], id) : ingredient(id);
}

function board(pieces, seed) {
  const r = rng(seed + "board");
  let bits = "";
  for (const [k, n] of pieces) {
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * 0.8;
      bits += PIECE[k]((32 + Math.cos(a) * 17 * d).toFixed(1), (36 + Math.sin(a) * 9 * d).toFixed(1), r);
    }
  }
  return svg(`
    <rect x="4" y="22" width="56" height="30" rx="8" fill="#c9a777" ${LINE}/>
    <path d="M8 30 q24 -2 48 0 M8 40 q24 2 48 0" fill="none" stroke="#a8865a" stroke-width="1" opacity="0.7"/>
    <rect x="4" y="48" width="56" height="5" rx="2.5" fill="#a8865a" opacity="0.6"/>
    ${bits}`);
}

function pulpBowl(fill, lemon = false, pieces = null) {
  const c = uid();
  let bits = "";
  if (pieces) {
    const r = rng(fill + pieces[0]);
    for (let i = 0; i < Math.min(pieces[1], 18); i++) bits += PIECE[pieces[0]]((18 + r() * 28).toFixed(1), (30 + r() * 9).toFixed(1), r);
  }
  return svg(`
    <ellipse cx="32" cy="34" rx="25" ry="9" fill="#e9ddc6" ${LINE}/>
    <defs><clipPath id="${c}"><ellipse cx="32" cy="34" rx="21" ry="6.5"/></clipPath></defs>
    <ellipse cx="32" cy="34" rx="21" ry="6.5" fill="${fill}"/>
    <g clip-path="url(#${c})">${bits}</g>
    <path d="M7 34 q25 26 50 0" fill="#2c6a96" ${LINE}/>
    <path d="M12 38 q20 12 40 0" fill="none" stroke="#f7f4ec" stroke-width="1.4"/>
    ${lemon ? `<g transform="translate(48 22) rotate(25)"><path d="M-8 0 A8 8 0 0 1 8 0 z" fill="#f0cf3a" ${LINE}/><path d="M-5 0 A5 5 0 0 1 5 0" fill="none" stroke="#fbf3c6"/></g>` : ""}
  `);
}
