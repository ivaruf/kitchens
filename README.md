# Kitchens

An immersive cookbook. Choose a kitchen, browse its painted pantry, tick what
you already have at home, and see which traditional dishes it could become, with recipes
that explain why each step matters, and notes for a table with different
needs.

Working name; the slug is `kitchens` until it is not.

## How it plays

- **The pantry** is five shelves of hand-drawn ingredients: herbs and spices,
  the market, beans and lentils, oil, wine and vinegar, and the butcher and
  cheese counter. Tap anything to read what it is, how a Greek kitchen uses
  it, what it contains, and which dishes it goes into.
- **At home.** Tick what you already have, right on the shelf: one list for
  the whole house. The panel beside the shelves offers what you could cook
  with it, and a week planned from it; every shopping list sets it apart
  as "already at home".
- **A recipe** is an illustrated page: the dish, its story, its ingredients
  as pictures (ticked if at home), and a method where every step
  has a *Why?* behind it.
- **Don't have it?** Every ingredient's card offers stand-ins from any
  shop, each saying what to use, how much, and honestly what it changes —
  flagged when a stand-in brings something the table cannot eat.
- **Plan the week**, from the front door, without choosing a kitchen first:
  a Greek week, a Vietnamese week or a mix, three to seven dinners, each a
  main with a plain side and a veg from the everyday kitchen (rice,
  potatoes, pasta, carrots — what the children will eat). Swap any part,
  open any dish, copy one shopping list. Rough: nothing is saved yet.
- **Who is eating?** How many adults and children, no names, and what each
  of them cooks without (dairy, eggs, gluten). Recipes say who a note is
  for; the planner fits every main to everyone, and steers the children's
  plain sides only around what a child cannot eat.
  Shelf tags, the planner and every recipe then say what that means.
  Stored on this device only.

- **Light it up.** From any recipe or set, everything it uses glows on the
  shelves.
- **Cook it step by step.** Each step puts its ingredients on a board. Tap
  one to prepare it (the onion becomes a chopped pile, the tomatoes a bowl
  of pulp), and watch them go into a pot that fills, changes colour and sits
  on a flame until it looks like the dish. *Do it* finishes any step for
  you, so nothing is ever a test.

- **Make more of one shop.** Every recipe offers a set of
  dishes that share their shopping: *a meal* (a main, a side and a starter,
  course by course) or *this week* (three dishes that use up what spoils,
  saying honestly what was bought for one dish only). A set shows what the
  dishes share and gives one shopping list with each dish's amount.

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

**Our favourites** is the family's own kitchen: dishes made, changed and
liked, or found and meant to be cooked. It lives in one hand-editable file,
`js/favourites.js`, which explains its own format: a whole recipe of our own,
or a tweak of an existing dish that lists only what we changed. Added through
git, like all content here.

Every recipe names its sources at the foot of its page. Every Greek recipe is a consensus of 14–20 recipes found online, weighted
towards native cooks who actually make the dish, with outliers dropped. The
sources and comparison for each dish are in `research/greek/`.

Text is selectable on purpose; see `CLAUDE.md`. Open ideas are in `TODO.md`.

## Files

| File | What it is |
|---|---|
| `js/pantry.js` | Content: every ingredient and what a player reads about it |
| `js/recipes.js` | Content: the dishes, their method and reasons, table notes, and the "you could cook" matching |
| `js/art.js` | Every picture, as SVG: the ingredients and the finished bowls |
| `js/main.js` | Screens, shelves, what is at home, card, recipe page, planner, language flags |
| `js/store.js` | localStorage, all under `kitchens.` |
| `js/swaps/` | Stand-ins per kitchen, English and bokmål side by side |
| `js/planner.js`, `js/everyday.js` | The week planner, and the everyday kitchen of plain sides |
| `js/favourites.js` | Our favourites: the family's own dishes, edited by hand |
| `js/sources.js`, `tools/build-sources.mjs` | Every researched recipe's sources, generated from `research/` |
| `js/sets.js` | Dish sets: the meal and week search over a kitchen's dishes |
| `js/cookalong.js` | The step-by-step cook-along: prepare on the board, watch the pot fill |
| `js/i18n.js`, `js/nb.js`, `js/nb/` | English and bokmål: interface words and the Norwegian content overlays |
| `js/screen.js`, `js/update.js` | Hub floors: fullscreen, opt-in updates |

Bump `VERSION` in `sw.js` with every change that deploys. Icons come from
`python3 tools/make-icons.py`.

