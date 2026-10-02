/*
 * dishes.js — the Greek kitchen's menu board, and the notebook's lessons.
 *
 * CONTENT, NOT CODE. Everything a player reads about a dish lives here so it
 * can be checked by someone who cooks rather than someone who programs. Accuracy
 * is the real cost of this game (food safety, allergens, honest technique), so
 * two rules hold for every entry:
 *
 *   DIET CLAIMS ARE ABOUT THE DISH, NEVER ABOUT A PRODUCT. "Stock cubes often
 *   contain wheat or milk — read the label" is something we can stand behind;
 *   "this brand is safe" is not, because recipes change and we cannot see them.
 *
 *   `contains` lists what the dish TYPICALLY brings to the table, sides
 *   included, and `freeBy` says what it takes to cook it without. A dish whose
 *   pot is clean but whose bread is not is still a dish with gluten at the
 *   table, and saying otherwise is how somebody gets ill.
 *
 * Only stifado is cookable in this first slice. The other three are on the
 * board so the "who can eat this" idea can be judged across a real menu.
 */

/* ---------------------------------------------------------------- lessons */

/*
 * The notebook. Ids are stored in localStorage (js/store.js), so an id is
 * forever once shipped; the words beside it can be rewritten freely.
 */
export const LESSONS = {
  "tough-cuts": {
    title: "Tough cuts make tender stews",
    body: "Chuck, shin and shoulder are full of collagen, the connective tissue that makes them chewy when grilled. Hours of gentle heat melt it into gelatin, which is what lets the meat fall apart and makes the sauce glossy. A lean cut like sirloin has almost none, so a long braise only dries it out. The cheap cut is the right cut.",
  },
  "no-flour": {
    title: "You do not need flour to brown",
    body: "Browning is the Maillard reaction, and it needs a dry surface and a hot pan, not a coating. Many recipes dust meat in flour to thicken the sauce later; stifado thickens itself through reduction and its onions. Leaving the flour out makes it gluten-free and costs nothing.",
  },
  "stock-cubes": {
    title: "Stock cubes hide things",
    body: "Many stock cubes and bouillon powders contain wheat, barley-derived ingredients or milk powder, and recipes change without notice — read the label every time, not once. Stifado does not need stock at all: the browned meat, the wine and the tomato make their own sauce in the pot.",
  },
  blanch: {
    title: "Blanch small onions to peel them",
    body: "A minute in boiling water, then cold water, loosens the skins so they slip off between finger and thumb. Trim the root end but do not cut it away — it is what holds a whole onion together through two hours of simmering.",
  },
  crowding: {
    title: "Do not crowd the pan",
    body: "Raw meat releases water. With space around each piece it evaporates at once and the surface browns; packed tight, the water pools faster than it can boil off and the meat stews grey in its own juice. Brown in batches and let the pot get hot again in between.",
  },
  fond: {
    title: "The brown film is the flavour",
    body: "What sticks to the bottom of the pot after browning is called fond: concentrated, caramelised meat juice. Wine or vinegar dissolves it back into the sauce — that is deglazing. Brown fond is gold; black fond is bitter and no liquid can save it. If it burns, wipe the pot and carry on.",
  },
  bloom: {
    title: "Fry the paste, wake the spices",
    body: "Tomato paste cooked in oil until it turns from bright red to brick red loses its raw, tinny edge and gains sweetness. Whole spices warmed in fat release aromas that water alone cannot carry — cooks call this blooming. Both happen fast, and both turn bitter if they scorch, so the heat comes down first.",
  },
  "cook-off": {
    title: "Let the wine bubble first",
    body: "A couple of minutes of hard bubbling drives off the sharpest of the alcohol and the raw edge of the vinegar before the pot is covered. A long simmer removes most of the rest, though not quite all of it — worth knowing when cooking for someone who avoids alcohol entirely.",
  },
  simmer: {
    title: "Simmer, never boil",
    body: "At a rolling boil the muscle fibres clench and squeeze out their juice, so the meat can be falling apart and still dry and stringy in the mouth. A lazy bubble — a few slow blips breaking the surface — melts the collagen just as surely and keeps the meat moist. Most stews are spoiled by heat, not by time.",
  },
  "late-onions": {
    title: "The onions go in late",
    body: "Stifado's onions are meant to arrive whole and glossy. In the pot from the start they collapse into the sauce — delicious, but a different dish. Browned first and returned for the last hour, they soften through and keep their shape.",
  },
  "season-late": {
    title: "Season lightly, then taste at the end",
    body: "As a stew reduces, its salt concentrates, so a pot salted perfectly at the start ends up salty. Vinegar's sharpness softens with time. Salt a little early, then adjust at the end: salt for flatness, a little sweetness for sharpness, a splash of water if it has gone too far. What you cannot add at the end is depth — that was built at the browning.",
  },
  "plate-not-pot": {
    title: "Feta at the plate, not in the pot",
    body: "When not everyone at the table eats the same, cook the shared pot for the strictest diet and add the extras at the plate. One pot, two kinds of plate, nobody singled out.",
  },
  "next-day": {
    title: "Stew is better tomorrow",
    body: "Overnight the flavours settle into each other and the fat sets on top where it lifts off cleanly. Cool it within two hours, keep it in the fridge, and reheat until it is bubbling hot all the way through.",
  },
  fasting: {
    title: "The fasting kitchen",
    body: "On Orthodox fasting days — more than half of the year for the devout — the traditional Greek table goes without meat, dairy and eggs. That is why so much of the cuisine is dairy-free and egg-free by design: fasolada, revithada and soufico were built that way centuries before anyone called them vegan. Gluten is the restriction tradition does not help with: wheat is on every Greek table.",
  },
};

/* ------------------------------------------------------------------ dishes */

/*
 * contains: what the dish usually brings, as NEEDS ids from js/store.js.
 * freeBy:   one line per need, saying how to cook without it — or "" when
 *           the dish never had it.
 */
export const DISHES = [
  {
    id: "stifado",
    name: "Stifado",
    greek: "Στιφάδο",
    line: "Beef braised slowly with a pile of whole small onions, red wine, vinegar, tomato, cinnamon and allspice.",
    teaches: "Browning, deglazing, the gentle simmer, tasting at the end.",
    contains: ["gluten"],
    freeBy: {
      dairy: "",
      egg: "",
      gluten: "Skip the flour some recipes dust the meat with, use water rather than a stock cube, use wine vinegar rather than malt, and serve it with rice or potatoes — not bread or orzo.",
    },
    playable: true,
  },
  {
    id: "fasolada",
    name: "Fasolada",
    greek: "Φασολάδα",
    line: "White beans simmered with celery, carrot, onion and tomato in a generous amount of olive oil. Often called the national dish.",
    teaches: "Soaking and cooking dried beans, and olive oil as an ingredient rather than a cooking fat.",
    contains: ["gluten", "dairy"],
    freeBy: {
      dairy: "The pot is dairy-free; the feta served beside it is not. Leave it off or put it on the table separately.",
      egg: "",
      gluten: "The pot is gluten-free; the bread it is usually eaten with is not. Serve it with gluten-free bread, or as it is.",
    },
    playable: false,
  },
  {
    id: "revithada",
    name: "Revithada",
    greek: "Ρεβιθάδα",
    line: "Chickpeas baked slowly with onion, olive oil and lemon — on Sifnos, overnight in a clay pot in the baker's oven.",
    teaches: "Low and slow in the oven, and thickening with the chickpeas themselves.",
    contains: ["gluten"],
    freeBy: {
      dairy: "",
      egg: "",
      gluten: "Some recipes thicken it with a spoon of flour. It does not need one: crush a ladle of the chickpeas back in.",
    },
    playable: false,
  },
  {
    id: "soufico",
    name: "Soufico",
    greek: "Σουφικό",
    line: "Ikaria's summer vegetables — aubergine, courgette, peppers, potato — layered and cooked down in olive oil and tomato.",
    teaches: "Layering by cooking time, and letting vegetables cook in their own water.",
    contains: ["dairy"],
    freeBy: {
      dairy: "Sometimes finished with crumbled feta. Leave it off; good oil and a little salt do the same job.",
      egg: "",
      gluten: "",
    },
    playable: false,
  },
];

export const NEED_LABEL = { dairy: "dairy", egg: "egg", gluten: "gluten" };

/*
 * The full recipe for the real kitchen. Quantities are for four to six. Kept
 * as plain data so the recipe screen and the end of a cook render the same
 * words, and so a dietary note can sit beside exactly the line it is about.
 */
export const STIFADO_RECIPE = {
  serves: "4 to 6",
  time: "About 3 hours, most of it hands-off",
  ingredients: [
    { text: "1 kg beef chuck or shin, in 5 cm pieces" },
    { text: "1 kg small pearl onions or shallots" },
    { text: "100 ml olive oil" },
    { text: "3 garlic cloves, sliced" },
    { text: "2 tbsp tomato paste" },
    { text: "400 g tinned chopped tomatoes, or 3 ripe tomatoes, grated" },
    { text: "200 ml dry red wine" },
    { text: "50 ml red wine vinegar", note: { gluten: "Wine vinegar, not malt vinegar — malt is made from barley." } },
    { text: "1 cinnamon stick, 6 allspice berries, 3 cloves, 2 bay leaves", note: { gluten: "Whole spices. Ground blends sometimes carry flour as an anti-caking agent." } },
    { text: "1 tsp sugar or petimezi (grape molasses), if needed" },
    { text: "Salt, black pepper, and about 500 ml water", note: { gluten: "Water, not a stock cube — cubes often contain wheat." } },
  ],
  method: [
    "Blanch the onions in boiling water for one minute, cool them in cold water, trim the root end without cutting it off, and slip off the skins.",
    "Pat the meat dry. Heat half the oil in a heavy pot and brown the meat in batches, a few minutes per side, until deep brown. Lift it out.",
    "Add the rest of the oil and brown the onions whole over medium heat, about ten minutes, until golden in patches. Lift them out.",
    "Turn the heat down. Stir in the garlic, the whole spices and the tomato paste for a minute or two, until the paste turns brick red.",
    "Pour in the wine and vinegar and scrape up everything stuck to the bottom. Let it bubble hard for two minutes.",
    "Return the meat and its juices, add the tomatoes and enough water to just cover. Salt lightly.",
    "Cover and keep at the gentlest simmer for about an hour and a half. Nestle the onions in and simmer another hour, until the beef yields to a fork and the sauce is thick. Leave the lid ajar near the end if it is thin.",
    "Taste: salt if it is flat, a little sugar or petimezi if it is sharp. Fish out the cinnamon and bay. Let it rest a quarter of an hour — or better, until tomorrow.",
  ],
  serve: "With rice or potatoes. Bread and orzo are traditional too, and carry gluten. Feta goes on the table, not in the pot.",
};
