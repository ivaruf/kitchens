/*
 * draw.js — the stove: a flat, side-on cutaway of one pot on one gas ring.
 *
 * FLAT ON PURPOSE. The brief is "not 3D, not too fancy", and a cutaway is also
 * the most honest picture of what the game teaches: you can see the meat sit
 * in the sauce, the level drop as it reduces, the onions slump as they soften.
 * The model behind it is js/pot.js; this file only paints what it is handed.
 *
 * THE LOOK: a whitewashed Greek kitchen — a band of blue-and-white tiles
 * behind the stove, an olive-wood counter, a terracotta pot. The wall and
 * counter never change during a cook, so they are baked once per resize into
 * an offscreen canvas (hub §10), and each frame only paints the pot, its
 * contents, the flame, bubbles and steam.
 *
 * What it is handed (setScene), every field optional:
 *   heat      0..2 or null for an unlit ring
 *   oil       a sheen on the bottom of an empty pot
 *   meat      { count, brown 0..1 }
 *   onions    { count, brown 0..1, shape 0..1 }
 *   sauce     { level 0..1.6, dark 0..1 } — 1 means "just covers"
 *   paste     0..1, a red film on the bottom
 *   spices    true to float a cinnamon stick and bay leaves
 *   lid       "on" | "ajar" | "off"
 *   scorched  a dark crust along the bottom
 */

const TAU = Math.PI * 2;

/* Colour stops, light to dark, for browning meat and onions. */
const MEAT = [
  [0, [194, 91, 99]],
  [0.3, [154, 127, 114]],
  [0.6, [138, 83, 48]],
  [0.85, [92, 52, 26]],
  [1, [36, 22, 16]],
];
const ONION = [
  [0, [240, 232, 214]],
  [0.5, [232, 205, 140]],
  [0.8, [205, 148, 62]],
  [1, [70, 46, 30]],
];

function ramp(stops, t) {
  t = Math.min(1, Math.max(0, t));
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [a, ca] = stops[i - 1];
      const [b, cb] = stops[i];
      const k = (t - a) / (b - a || 1);
      return ca.map((v, j) => Math.round(v + (cb[j] - v) * k));
    }
  }
  return stops[stops.length - 1][1];
}
const rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/*
 * Where each piece sits, in pot coordinates (0..1 across, 0..1 up from the
 * bottom). Drawn once with Math.random — cosmetic jitter, nothing to replay
 * (hub §10) — and kept, so the pieces do not dance between frames.
 */
function scatter(n, spread) {
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push({
      x: 0.12 + Math.random() * 0.76,
      y: Math.random() * spread,
      r: 0.85 + Math.random() * 0.3,
      tilt: (Math.random() - 0.5) * 0.8,
    });
  }
  return out;
}

export class Stove {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.backdrop = document.createElement("canvas");
    this.scene = {};
    this.meatSpots = scatter(14, 0.5);
    this.onionSpots = scatter(16, 0.75);
    this.bubbles = Array.from({ length: 18 }, () => ({ x: Math.random(), t: Math.random() }));
    this.running = false;
    this.last = 0;
    this.time = 0;
    this.frame = this.frame.bind(this);
    this.resize = this.resize.bind(this);
    new ResizeObserver(this.resize).observe(canvas);
  }

  setScene(scene) {
    this.scene = scene;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    requestAnimationFrame(this.frame);
  }

  stop() {
    this.running = false;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, rect.width);
    this.h = Math.max(1, rect.height);
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.dpr = dpr;
    this.bakeBackdrop();
  }

  /* The wall, the tiles and the counter: everything that never moves. */
  bakeBackdrop() {
    const { w, h, dpr } = this;
    const b = this.backdrop;
    b.width = this.canvas.width;
    b.height = this.canvas.height;
    const g = b.getContext("2d");
    g.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Whitewash, a touch warm, so it reads as lime and not as a blank page.
    g.fillStyle = "#f4efe4";
    g.fillRect(0, 0, w, h);

    const counterY = h * 0.78;
    // The tile band: blue and white squares with a simple painted cross.
    const tile = Math.max(22, Math.min(44, w / 14));
    const tileTop = counterY - tile * 4;
    for (let y = tileTop; y < counterY; y += tile) {
      for (let x = 0; x < w; x += tile) {
        const odd = (Math.round(x / tile) + Math.round((y - tileTop) / tile)) % 2;
        g.fillStyle = odd ? "#2c6a96" : "#f7f4ec";
        g.fillRect(x, y, tile - 1, tile - 1);
        g.strokeStyle = odd ? "#f7f4ec" : "#2c6a96";
        g.lineWidth = 1.5;
        g.beginPath();
        const cx = x + tile / 2;
        const cy = y + tile / 2;
        const r = tile * 0.22;
        g.moveTo(cx - r, cy);
        g.lineTo(cx + r, cy);
        g.moveTo(cx, cy - r);
        g.lineTo(cx, cy + r);
        g.stroke();
      }
    }
    // Grout line under the tiles.
    g.fillStyle = "#d9d1c0";
    g.fillRect(0, counterY - 3, w, 3);

    // The counter: olive wood, with a few grain lines.
    g.fillStyle = "#9c7a4f";
    g.fillRect(0, counterY, w, h - counterY);
    g.strokeStyle = "rgba(60,40,20,0.25)";
    g.lineWidth = 1;
    for (let i = 1; i < 6; i++) {
      const y = counterY + ((h - counterY) * i) / 6;
      g.beginPath();
      g.moveTo(0, y);
      g.bezierCurveTo(w * 0.3, y - 3, w * 0.6, y + 3, w, y - 1);
      g.stroke();
    }

    // A shelf above the tiles, with the spices this kitchen cooks with:
    // cinnamon, allspice, oregano, in glass jars. Painted once, never moves.
    // High and to the right, clear of the pot's steam.
    const jar = Math.min(26, w * 0.04);
    const shelfY = Math.max(jar * 1.5 + 12, h * 0.14);
    g.fillStyle = "#8a6a43";
    g.fillRect(w * 0.64, shelfY, w * 0.33, 6);
    const spices = ["#8b4a2b", "#3d2a22", "#6b7a3a", "#c9954a"];
    spices.forEach((c, i) => {
      const x = w * 0.67 + i * jar * 1.7;
      g.fillStyle = "rgba(255,255,255,0.55)";
      g.fillRect(x, shelfY - jar * 1.5, jar, jar * 1.5);
      g.fillStyle = c;
      g.fillRect(x + 2, shelfY - jar * 1.0, jar - 4, jar * 1.0 - 1);
      g.fillStyle = "#b35a36";
      g.fillRect(x - 1, shelfY - jar * 1.5 - 4, jar + 2, 5);
    });

    // A bowl of lemons on the counter, to the left of the stove.
    const bowlX = w * 0.1;
    const bowlW = Math.min(90, w * 0.14);
    g.fillStyle = "#e8c547";
    for (const [dx, dy] of [[0.2, 0], [0.5, -0.12], [0.78, 0]]) {
      g.beginPath();
      g.ellipse(bowlX + bowlW * dx, counterY - bowlW * 0.18 + bowlW * dy, bowlW * 0.17, bowlW * 0.13, 0, 0, TAU);
      g.fill();
    }
    g.fillStyle = "#2c6a96";
    g.beginPath();
    g.moveTo(bowlX - 4, counterY - bowlW * 0.16);
    g.lineTo(bowlX + bowlW + 4, counterY - bowlW * 0.16);
    g.quadraticCurveTo(bowlX + bowlW * 0.5, counterY + 6, bowlX - 4, counterY - bowlW * 0.16);
    g.fill();

    // The gas ring: a dark iron trivet under where the pot will sit.
    const cx = w / 2;
    g.fillStyle = "#2b2622";
    g.fillRect(cx - w * 0.22, counterY - 4, w * 0.44, 8);

    this.geom = {
      counterY,
      cx,
      potW: Math.min(w * 0.52, h * 0.85),
      potH: Math.min(h * 0.36, w * 0.3),
    };
  }

  frame(now) {
    if (!this.running) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.time += dt;
    // Ask for the next frame first: one bad frame must not stop the stove.
    requestAnimationFrame(this.frame);
    this.paint(dt);
  }

  paint(dt) {
    const { ctx, dpr, geom } = this;
    // Measured while hidden, the canvas is 1px; wait for a real size.
    if (!geom || geom.potW < 80) return;
    const s = this.scene;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(this.backdrop, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { counterY, cx, potW, potH } = geom;
    const base = counterY - 8; // the pot sits on the trivet
    const left = cx - potW / 2;
    const wall = Math.max(6, potW * 0.035);

    this.paintFlame(cx, counterY, potW, s.heat);

    // Pot body: terracotta, the near wall cut away to show what is inside.
    ctx.fillStyle = "#b35a36";
    roundRect(ctx, left, base - potH, potW, potH, potW * 0.08);
    ctx.fill();
    // The inside, in shadow.
    const inL = left + wall;
    const inW = potW - wall * 2;
    const inTop = base - potH + wall * 0.5;
    const inBot = base - wall;
    const inH = inBot - inTop;
    ctx.fillStyle = "#4a362b";
    roundRect(ctx, inL, inTop, inW, inH, potW * 0.05);
    ctx.fill();

    ctx.save();
    roundRect(ctx, inL, inTop, inW, inH, potW * 0.05);
    ctx.clip();

    // Oil, paste and scorch sit on the bottom.
    if (s.oil) {
      ctx.fillStyle = "rgba(214,178,74,0.75)";
      ctx.fillRect(inL, inBot - inH * 0.05, inW, inH * 0.05);
    }
    if (s.paste) {
      ctx.fillStyle = rgb(ramp([[0, [214, 52, 38]], [0.7, [150, 48, 30]], [1, [50, 20, 14]]], s.paste));
      ctx.fillRect(inL, inBot - inH * 0.07, inW, inH * 0.07);
    }

    // The sauce. 1.0 covers the meat, which sits in the lower half of the pot.
    const meatTop = inH * 0.5;
    let sauceY = inBot;
    if (s.sauce && s.sauce.level > 0) {
      sauceY = inBot - Math.min(inH * 0.95, meatTop * 1.05 * s.sauce.level);
      const dark = s.sauce.dark || 0;
      const c = ramp([[0, [168, 62, 40]], [0.5, [122, 40, 28]], [1, [70, 26, 20]]], dark);
      ctx.fillStyle = rgb(c);
      ctx.fillRect(inL, sauceY, inW, inBot - sauceY);
      // A gloss line along the surface.
      ctx.fillStyle = "rgba(255,210,160,0.25)";
      ctx.fillRect(inL, sauceY, inW, 2);
    }

    // Meat chunks: rounded blocks, browned on their faces.
    if (s.meat && s.meat.count) {
      const n = Math.min(s.meat.count, this.meatSpots.length);
      const size = inW * 0.13;
      const c = ramp(MEAT, s.meat.brown || 0);
      for (let i = 0; i < n; i++) {
        const p = this.meatSpots[i];
        const x = inL + p.x * inW;
        const y = inBot - size * 0.6 - p.y * meatTop * 0.8;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.tilt * 0.4);
        ctx.fillStyle = rgb(c);
        roundRect(ctx, -size * 0.55 * p.r, -size * 0.4 * p.r, size * 1.1 * p.r, size * 0.8 * p.r, size * 0.2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        roundRect(ctx, -size * 0.4 * p.r, -size * 0.32 * p.r, size * 0.5 * p.r, size * 0.14 * p.r, size * 0.07);
        ctx.fill();
        ctx.restore();
      }
    }

    // Onions: small spheres that slump as they soften.
    if (s.onions && s.onions.count) {
      const n = Math.min(s.onions.count, this.onionSpots.length);
      const shape = s.onions.shape == null ? 1 : s.onions.shape;
      const size = inW * 0.065;
      const c = ramp(ONION, s.onions.brown || 0);
      for (let i = 0; i < n; i++) {
        const p = this.onionSpots[i];
        const x = inL + p.x * inW;
        const y = inBot - size - p.y * meatTop * 0.9;
        ctx.fillStyle = rgb(c, 0.55 + 0.45 * shape);
        ctx.beginPath();
        ctx.ellipse(x, y + size * (1 - shape) * 0.5, size * p.r * (1 + (1 - shape) * 0.5), size * p.r * (0.4 + 0.6 * shape), 0, 0, TAU);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(x, y + size * (1 - shape) * 0.5, size * p.r * 0.55, size * p.r * (0.25 + 0.35 * shape), 0, 0, TAU);
        ctx.stroke();
      }
    }

    // Cinnamon and bay float at the surface once the liquid is in.
    if (s.spices) {
      const y = s.sauce && s.sauce.level > 0 ? sauceY : inBot - inH * 0.08;
      ctx.fillStyle = "#7a4a2a";
      ctx.save();
      ctx.translate(inL + inW * 0.3, y - 3);
      ctx.rotate(-0.12);
      roundRect(ctx, 0, 0, inW * 0.2, 7, 3);
      ctx.fill();
      ctx.restore();
      ctx.fillStyle = "#5e6b32";
      for (const fx of [0.62, 0.72]) {
        ctx.beginPath();
        ctx.ellipse(inL + inW * fx, y - 2, inW * 0.05, 4, fx * 3, 0, TAU);
        ctx.fill();
      }
    }

    if (s.scorched) {
      ctx.fillStyle = "rgba(20,12,8,0.85)";
      ctx.fillRect(inL, inBot - 5, inW, 5);
    }

    // Bubbles: how many and how fast is the whole lesson of the simmer.
    if (s.sauce && s.sauce.level > 0 && s.heat != null) {
      const rate = [0.25, 0.7, 1.8][s.heat];
      const active = [4, 9, 18][s.heat];
      ctx.fillStyle = "rgba(255,225,190,0.55)";
      for (let i = 0; i < active; i++) {
        const b = this.bubbles[i];
        b.t += dt * rate * (0.6 + (i % 3) * 0.2);
        if (b.t > 1) {
          b.t = 0;
          b.x = Math.random();
        }
        const r = (1.5 + b.t * 3) * (s.heat === 2 ? 1.5 : 1);
        ctx.beginPath();
        ctx.arc(inL + b.x * inW, sauceY - 1 + (1 - b.t) * 4, r * (1 - b.t * 0.3), 0, TAU);
        ctx.fill();
      }
    } else if (s.heat != null && (s.meat?.count || s.onions?.count || s.paste)) {
      // A sizzle: small bright specks jumping along the bottom.
      ctx.fillStyle = "rgba(255,240,200,0.7)";
      for (let i = 0; i < 10; i++) {
        const b = this.bubbles[i];
        b.t += dt * 2.5;
        if (b.t > 1) {
          b.t = 0;
          b.x = Math.random();
        }
        ctx.fillRect(inL + b.x * inW, inBot - 6 - b.t * 14, 2, 2);
      }
    }
    ctx.restore();

    // The rim, drawn over the cut edge so the pot reads as a solid thing.
    ctx.fillStyle = "#c46a43";
    ctx.fillRect(left - wall * 0.4, base - potH, potW + wall * 0.8, wall * 0.9);
    // Handles.
    ctx.fillStyle = "#9e4b2c";
    roundRect(ctx, left - wall * 2.2, base - potH + wall * 1.6, wall * 2.2, wall * 1.4, wall * 0.6);
    ctx.fill();
    roundRect(ctx, left + potW, base - potH + wall * 1.6, wall * 2.2, wall * 1.4, wall * 0.6);
    ctx.fill();

    this.paintLid(left, base - potH, potW, wall, s.lid);
    this.paintSteam(cx, base - potH, potW, s);
  }

  paintFlame(cx, y, potW, heat) {
    if (heat == null) return;
    const ctx = this.ctx;
    const tall = [5, 9, 15][heat];
    const n = 9;
    for (let i = 0; i < n; i++) {
      const x = cx - potW * 0.3 + (potW * 0.6 * i) / (n - 1);
      const flick = Math.sin(this.time * 14 + i * 1.7) * 0.25 + 1;
      const h = tall * flick;
      ctx.fillStyle = "rgba(70,120,230,0.85)";
      ctx.beginPath();
      ctx.moveTo(x - 3, y - 2);
      ctx.quadraticCurveTo(x, y - 2 - h * 1.6, x + 3, y - 2);
      ctx.fill();
    }
  }

  paintLid(left, top, potW, wall, lid) {
    if (!lid || lid === "off") return;
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(left + potW / 2, top - 2);
    if (lid === "ajar") {
      ctx.translate(potW * 0.06, -wall * 0.6);
      ctx.rotate(-0.08);
    }
    ctx.fillStyle = "#a3502f";
    ctx.beginPath();
    ctx.ellipse(0, 0, potW * 0.53, wall * 1.4, 0, Math.PI, TAU);
    ctx.fill();
    ctx.fillStyle = "#7d3a21";
    roundRect(ctx, -wall * 1.4, -wall * 2.6, wall * 2.8, wall * 1.4, wall * 0.6);
    ctx.fill();
    ctx.restore();
  }

  paintSteam(cx, top, potW, s) {
    if (!s.sauce || !s.sauce.level || s.heat == null) return;
    const ctx = this.ctx;
    const amount = [0.35, 0.6, 1][s.heat] * (s.lid === "on" ? 0.4 : 1);
    ctx.strokeStyle = `rgba(255,255,255,${0.45 * amount})`;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    for (let i = 0; i < 3; i++) {
      const x = cx - potW * 0.2 + i * potW * 0.2;
      const phase = (this.time * 0.5 + i * 0.33) % 1;
      const y0 = top - 10 - phase * 40;
      ctx.globalAlpha = 1 - phase;
      ctx.beginPath();
      ctx.moveTo(x, y0);
      ctx.bezierCurveTo(x - 8, y0 - 10, x + 8, y0 - 20, x, y0 - 30);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}

function roundRect(ctx, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
