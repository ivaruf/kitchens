# CLAUDE.md — kitchens

Sits under the hub's `../CLAUDE.md` and wins where the two disagree.

## Deliberate departures from the hub

- **Text is selectable.** The hub's "a game is not a document" floor
  (`user-select: none`, `touch-guard.js`) does not apply here. This is a
  cookbook, and the owner wants to copy recipes and notes out of it: *"I might
  actually want to copy text from this 'game' — it must override the
  default."* Do not add `user-select: none` or a touch guard back. Only the
  tap-highlight flash and double-tap zoom are suppressed.

## What this is

A browsable Greek pantry (painted shelves of SVG ingredients), a counter
that suggests dishes from what is on it, and illustrated recipe pages with a
step-by-step cook-along. Not a form: choosing should feel like picking things
up, never like answering questions. A step-by-step "simulated cook" with
choices and timing bars was built first and rejected for exactly that reason.

## Content rules

- Every dish must be cookable dairy-free, egg-free and gluten-free together
  (a family member needs all three), and each recipe says plainly what it is
  usually *served* with that is not.
- Diet claims are about the dish, never about a product or a brand.
- Content lives in `js/pantry.js`, `js/recipes.js` and `js/vietnam.js`;
  check facts there.
- **Two languages, English and bokmål** (owner's choice, 2026-10-02: the
  whole cookbook, bokmål only, not nynorsk). English is the source; the
  bokmål overlays are in `js/nb/`, matched by id and recipe steps by
  position, and `js/i18n.js` holds every interface string. Any content change
  is made in both, in the same commit. A missing Norwegian line falls back to
  English and is named once in the console. Native names (Greek, Vietnamese)
  are never translated. Recipe `prep` words stay English in the source:
  `js/art.js` reads them to pick a picture.
