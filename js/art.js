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
};

export function ingredient(id) {
  const draw = DRAW[id];
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
  cinnamon: (x, y) => `<rect x="${x - 7}" y="${y - 1.8}" width="14" height="3.6" rx="1.8" transform="rotate(-15 ${x} ${y})" fill="#a5633a" ${THIN}/>`,
};

/* What each dish looks like in the bowl: its sauce and what floats in it. */
const BOWLS = {
  fasolada: { sauce: "#d9763a", sheen: true, pieces: [["bean", 24], ["carrot", 6], ["celery", 6], ["parsley", 10]] },
  revithada: { sauce: "#e2b45a", sheen: true, pieces: [["chickpea", 26], ["onion", 8], ["bay", 1]], lemon: true },
  soufico: { sauce: "#c8502e", sheen: true, pieces: [["aubergine", 6], ["potato", 5], ["courgette", 6], ["pepper", 6], ["tomato", 4], ["oregano", 10]] },
  stifado: { sauce: "#7a2a1e", sheen: true, pieces: [["beef", 7], ["pearl", 10], ["bay", 1], ["cinnamon", 1]] },
  fakes: { sauce: "#7a5634", sheen: true, pieces: [["lentil", 70], ["carrot", 4], ["bay", 2]] },
  lemonates: { sauce: "#e7c46a", dish: true, pieces: [["wedge", 8], ["oregano", 22]], lemon: true },
};

export function dish(recipe) {
  const b = BOWLS[recipe.id] || { sauce: "#c9954a", pieces: [] };
  const r = rng(recipe.id);
  const clip = uid();
  const cx = 60;
  const cy = 36;
  const rx = 46;
  const ry = 17;

  // The vessel: a glazed terracotta bowl, or a shallow roasting dish.
  const vessel = b.dish
    ? `<path d="M6 36 Q8 66 60 66 Q112 66 114 36 z" fill="#b35a36" ${LINE}/>
       <path d="M100 44 Q96 62 60 64 Q94 58 104 40 z" fill="#8f4428" opacity="0.7"/>`
    : `<path d="M8 36 Q10 74 46 80 L46 84 Q60 88 74 84 L74 80 Q110 74 112 36 z" fill="#b35a36" ${LINE}/>
       <path d="M100 44 Q98 72 62 80 Q96 68 104 40 z" fill="#8f4428" opacity="0.7"/>
       <path d="M18 52 Q60 66 102 52" fill="none" stroke="#f1ddb8" stroke-width="2.4" stroke-dasharray="1 6" stroke-linecap="round"/>`;

  let pieces = "";
  const placed = [];
  for (const [kind, count] of b.pieces) {
    for (let i = 0; i < count; i++) {
      // Uniform inside the ellipse, kept off the rim.
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * 0.86;
      placed.push([cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d, kind]);
    }
  }
  placed.sort((p, q) => p[1] - q[1]);
  for (const [x, y, kind] of placed) pieces += PIECE[kind](x.toFixed(1), y.toFixed(1), r);

  const lemon = b.lemon
    ? `<g transform="translate(98 26) rotate(-20)"><path d="M-10 0 A10 10 0 0 1 10 0 z" fill="#f3d84a" ${LINE}/>
       <path d="M-7 0 A7 7 0 0 1 7 0" fill="none" stroke="#fbf3c6" stroke-width="1.2"/>
       <path d="M0 0 L-5 -5 M0 0 L0 -7 M0 0 L5 -5" stroke="#fbf3c6" stroke-width="1"/></g>`
    : "";

  return svg(
    `<ellipse cx="60" cy="82" rx="40" ry="5" fill="#000" opacity="0.08"/>
     ${vessel}
     <ellipse cx="${cx}" cy="${cy}" rx="${rx + 6}" ry="${ry + 5}" fill="#c46a43" ${LINE}/>
     <defs><clipPath id="${clip}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath></defs>
     <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${b.sauce}" ${THIN}/>
     <g clip-path="url(#${clip})">
       ${pieces}
       ${b.sheen ? `<ellipse cx="${cx - 14}" cy="${cy - 6}" rx="16" ry="3.5" fill="#ffe8a8" opacity="0.28"/>` : ""}
     </g>
     ${lemon}`,
    "0 0 120 90",
  );
}
