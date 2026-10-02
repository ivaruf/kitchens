# Kitchens

An immersive cookbook. Browse a painted Greek pantry, put what tempts you on
the counter, and see which traditional dishes it could become, with recipes
that explain why each step matters, and notes for a table with different
needs.

Working name; the slug is `kitchens` until it is not.

## How it plays

- **The pantry** is five shelves of hand-drawn ingredients: herbs and spices,
  the market, beans and lentils, oil, wine and vinegar, and the butcher and
  cheese counter. Tap anything to read what it is, how a Greek kitchen uses
  it, what it contains, and which dishes it goes into.
- **The counter** holds whatever you pick. It answers with the dishes those
  things could become, best match first, showing what is still missing as
  pictures, and the shelf items the best idea still wants glow softly.
- **A recipe** is an illustrated page: the dish, its story, its ingredients
  as pictures (ticked if on your counter), and a method where every step
  has a *Why?* behind it.
- **Who is eating?** Mark what the table cooks without (dairy, eggs, gluten).
  Shelf tags, the counter and every recipe then say what that means.
  Stored on this device only.

Six dishes: fasolada, revithada, soufico, stifado, fakes and lemon potatoes.

## Files

| File | What it is |
|---|---|
| `js/pantry.js` | Content: every ingredient and what a player reads about it |
| `js/recipes.js` | Content: the dishes, their method and reasons, table notes, and the counter's matching |
| `js/art.js` | Every picture, as SVG: the ingredients and the finished bowls |
| `js/main.js` | Screens, shelves, counter, card, recipe page, corner and menu |
| `js/store.js` | localStorage, all under `kitchens.` |
| `js/screen.js`, `js/update.js`, `js/touch-guard.js` | Hub floors: fullscreen, opt-in updates, no text selection |

Bump `VERSION` in `sw.js` with every change that deploys. Icons come from
`python3 tools/make-icons.py`.

No sound yet: the menu's two levels are real and persist, and say plainly
that the kitchen is silent.
