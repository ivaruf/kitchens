# Kitchens

An immersive cookbook. Real dishes from traditional kitchens, cooked one step
at a time: what each choice does to the pot, why it does it, and how to cook
the dish for a table where not everyone eats the same.

Working name; the slug is `kitchens` until it is not.

## What is in this first slice

- **One kitchen, Greek**, with four dishes on the board. **Stifado** is
  cookable start to finish; fasolada, revithada and soufico are on the board
  with their dietary notes so the "who can eat this" idea can be judged across
  a real menu.
- **Who is eating?** Mark what the table cooks without (dairy, eggs, gluten).
  Every option that would break that is tagged as you choose it, and the meal
  ends with a plain table check. Stored on this device only.
- **The pot.** A flat cutaway on a gas ring. Eleven steps, five kinds:
  choices, browning meters, the simmer (heat, lid, half-hours, the fork test),
  the spoon (six readings and adjustments), and serving.
- **The notebook.** Fourteen lessons, filed as you meet them, kept across
  cooks.
- **The real recipe**, with each dietary note beside the line it is about.

Every mistake on offer is a real one (crowding the pan, the lean cut, the
rolling boil, salting early, drowning it), and none of them is blocked:
the consequence arrives at the spoon two hours later instead.

## Files

| File | What it is |
|---|---|
| `js/dishes.js` | Content: the board, the lessons, the recipe. Check this, not the code, for accuracy. |
| `js/stifado.js` | The cook, step by step, and what each choice does |
| `js/pot.js` | The teaching model: a handful of numbers with one cookbook rule each |
| `js/cook.js` | Puts a step on the card and runs it |
| `js/draw.js` | The stove, painted on a canvas |
| `js/main.js` | Screens, corner, menu, table, board, notebook, the meal |
| `js/store.js` | localStorage, all under `kitchens.` |
| `js/screen.js`, `js/update.js`, `js/touch-guard.js` | Hub floors: fullscreen, opt-in updates, no text selection |

Bump `VERSION` in `sw.js` with every change that deploys. Icons come from
`python3 tools/make-icons.py`.

No sound yet: the panel's two levels are real and persist, and say plainly
that the kitchen is silent.
