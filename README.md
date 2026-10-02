# Kitchens

An immersive cookbook. Choose a kitchen, Greek or Vietnamese, browse its painted pantry, put what tempts you on
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

- **Light it up.** From any recipe, everything it uses glows on the shelves,
  and one button carries it all to the counter (anything the table cannot
  eat stays on the shelf, and says so).
- **Cook it step by step.** Each step puts its ingredients on a board. Tap
  one to prepare it (the onion becomes a chopped pile, the tomatoes a bowl
  of pulp), and watch them go into a pot that fills, changes colour and sits
  on a flame until it looks like the dish. *Do it* finishes any step for
  you, so nothing is ever a test.

Seventeen dishes from a pantry of 44 ingredients: soups (fasolada, fakes,
avgolemono and its Lenten twin tahinosoupa), ladera (revithada, fasolakia,
spanakorizo, soufico), oven dishes (gemista, gigantes plaki, briam, lemon
potatoes), stifado, and meze (horiatiki, fava, melitzanosalata, skordalia).

A second, smaller kitchen, Vietnamese, has five dishes: phở bò, nước chấm,
gỏi cuốn, cá kho tộ and rau muống xào tỏi. It shares every screen with the
Greek one and brings its own palette, border and lessons, among them that
soy sauce and most hoisin contain wheat. Kitchens are registered in
`js/kitchens.js`; the Vietnamese content is `js/vietnam.js`.

The whole cookbook reads in English or Norwegian bokmål, chosen with the two
flags in the corner, and defaulting to bokmål for a browser that prefers
Norwegian. Interface words are in `js/i18n.js`; the Norwegian content is
overlaid from `js/nb/`.

Text is selectable on purpose; see `CLAUDE.md`. Open ideas are in `TODO.md`.

## Files

| File | What it is |
|---|---|
| `js/pantry.js` | Content: every ingredient and what a player reads about it |
| `js/recipes.js` | Content: the dishes, their method and reasons, table notes, and the counter's matching |
| `js/art.js` | Every picture, as SVG: the ingredients and the finished bowls |
| `js/main.js` | Screens, shelves, counter, card, recipe page, corner and menu |
| `js/store.js` | localStorage, all under `kitchens.` |
| `js/cookalong.js` | The step-by-step cook-along: prepare on the board, watch the pot fill |
| `js/i18n.js`, `js/nb.js`, `js/nb/` | English and bokmål: interface words and the Norwegian content overlays |
| `js/screen.js`, `js/update.js` | Hub floors: fullscreen, opt-in updates |

Bump `VERSION` in `sw.js` with every change that deploys. Icons come from
`python3 tools/make-icons.py`.

