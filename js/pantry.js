/*
 * pantry.js — everything on the shelves, and what a player reads about it.
 *
 * CONTENT FIRST. Each entry is the words a player meets when they tap a jar
 * or a vegetable: what it is, how a Greek kitchen uses it, and what it
 * contains. Accuracy matters more than anything else in this file — the info
 * lines are things a cook could stand behind, and `contains` names only what
 * the ingredient itself brings (dairy, egg, gluten), never a brand claim.
 *
 * `shelf` says where it sits in the pantry (SHELVES below, in display order).
 * The art for each id is in js/art.js; the dishes it goes into are worked out
 * from js/recipes.js, so that list can never drift from the recipes.
 */

export const SHELVES = [
  { id: "spices", name: "Herbs and spices", note: "Dried on the hillside, warmed in the oil" },
  { id: "market", name: "From the market", note: "Whatever the season brings" },
  { id: "pulses", name: "Beans and lentils", note: "Cheap, filling, and half the year's fasting food" },
  { id: "bottles", name: "Oil, wine and vinegar", note: "The olive oil goes in by the glassful" },
  { id: "cold", name: "Butcher and cheese counter", note: "For feast days, and for the table" },
];

export const INGREDIENTS = [
  /* ------------------------------------------------------------ spices */
  {
    id: "oregano",
    name: "Oregano",
    greek: "ρίγανη",
    shelf: "spices",
    info: "Greek oregano is used dried, gathered from the hillsides in summer and rubbed between the palms over the pot. Dried, it is stronger than fresh.",
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    greek: "κανέλα",
    shelf: "spices",
    info: "In meat, not just in cake: stifado and moussaka carry it, a trace of the eastern Mediterranean kitchen. A whole stick warmed in the oil, fished out before serving.",
  },
  {
    id: "allspice",
    name: "Allspice",
    greek: "μπαχάρι",
    shelf: "spices",
    info: "Greek cooks call it simply 'bahari' — spice. A few whole berries smell of cinnamon, clove and pepper at once.",
  },
  {
    id: "cloves",
    name: "Cloves",
    greek: "γαρύφαλλο",
    shelf: "spices",
    info: "Strong enough that three are plenty for a whole pot. More than that and they take over.",
  },
  {
    id: "bay",
    name: "Bay leaves",
    greek: "δάφνη",
    shelf: "spices",
    info: "Laurel, which grows wild across Greece. It works quietly through a long simmer; take the leaves out before serving.",
  },
  {
    id: "blackpepper",
    name: "Black pepper",
    greek: "πιπέρι",
    shelf: "spices",
    info: "Ground fresh, near the end, where its heat is brightest.",
  },
  {
    id: "parsley",
    name: "Parsley",
    greek: "μαϊντανός",
    shelf: "spices",
    info: "Flat-leaf, used by the handful rather than the sprig, chopped and stirred in at the end so it stays green.",
  },
  {
    id: "salt",
    name: "Sea salt",
    greek: "αλάτι",
    shelf: "spices",
    info: "A little early, the rest at the end: as a pot reduces, its salt concentrates. Beans can be salted from the start — the old warning that it toughens them is a myth.",
  },

  /* ------------------------------------------------------------ market */
  {
    id: "onion",
    name: "Onion",
    greek: "κρεμμύδι",
    shelf: "market",
    info: "The start of almost everything. Softened slowly in olive oil it turns sweet; hurried over high heat it scorches at the edges before the middle is soft.",
  },
  {
    id: "pearl",
    name: "Small onions",
    greek: "κοκκάρια",
    shelf: "market",
    info: "Little whole onions, the heart of stifado — there should be nearly as much onion as meat. Blanch them for a minute and the skins slip off.",
  },
  {
    id: "garlic",
    name: "Garlic",
    greek: "σκόρδο",
    shelf: "market",
    info: "Goes in after the onion, never before: sliced garlic browns in seconds, and burnt garlic is bitter all the way through.",
  },
  {
    id: "tomato",
    name: "Tomatoes",
    greek: "ντομάτα",
    shelf: "market",
    info: "Greek cooks often grate ripe tomatoes on a box grater and throw the skin away. Out of season, a tin of good chopped tomatoes is the honest choice.",
  },
  {
    id: "lemon",
    name: "Lemons",
    greek: "λεμόνι",
    shelf: "market",
    info: "Added near the end, not the start: lemon's brightness fades the longer it boils. A squeeze over a bowl of beans changes the whole dish.",
  },
  {
    id: "carrot",
    name: "Carrots",
    greek: "καρότο",
    shelf: "market",
    info: "With onion and celery it builds the sweet, quiet base of fasolada. Cut in rounds, it holds its shape through a long simmer.",
  },
  {
    id: "celery",
    name: "Celery",
    greek: "σέλινο",
    shelf: "market",
    info: "Greek celery is leafier and stronger than the fat stalks sold elsewhere, and the leaves go in too. It gives a soup its savoury backbone.",
  },
  {
    id: "potato",
    name: "Potatoes",
    greek: "πατάτα",
    shelf: "market",
    info: "Waxy potatoes hold together through a long cook; floury ones soak up lemon and oil and melt at the edges — which is exactly what lemon potatoes want.",
  },
  {
    id: "aubergine",
    name: "Aubergine",
    greek: "μελιτζάνα",
    shelf: "market",
    info: "A sponge for olive oil. Cooked until it collapses it turns silky; undercooked it squeaks and tastes of very little.",
  },
  {
    id: "courgette",
    name: "Courgettes",
    greek: "κολοκυθάκι",
    shelf: "market",
    info: "Mostly water, so it softens fast and gives that water to the pot — which is how soufico cooks without any added.",
  },
  {
    id: "pepper",
    name: "Green peppers",
    greek: "πιπεριά",
    shelf: "market",
    info: "The long, thin-skinned Greek pepper is sweeter and gentler than a bell pepper, and goes into almost every summer pot.",
  },

  /* ------------------------------------------------------------ pulses */
  {
    id: "beans",
    name: "White beans",
    greek: "φασόλια",
    shelf: "pulses",
    info: "Dried beans need eight to twelve hours in cold water before cooking. Simmered gently they turn creamy; boiled hard their skins split.",
  },
  {
    id: "chickpeas",
    name: "Chickpeas",
    greek: "ρεβίθια",
    shelf: "pulses",
    info: "Soaked overnight, then cooked for hours. On Sifnos they bake all night in a clay pot in the village oven, which is where revithada's silkiness comes from.",
  },
  {
    id: "lentils",
    name: "Brown lentils",
    greek: "φακές",
    shelf: "pulses",
    info: "The pulse that needs no soaking: forty minutes in the pot and they are done. Fakes, lentil soup, is finished with a splash of vinegar.",
  },

  /* ----------------------------------------------------------- bottles */
  {
    id: "oil",
    name: "Olive oil",
    greek: "ελαιόλαδο",
    shelf: "bottles",
    info: "Not just a cooking fat but an ingredient: the 'ladera' dishes use a glassful or more, and fasolada is finished with raw oil poured over the top.",
  },
  {
    id: "wine",
    name: "Red wine",
    greek: "κρασί",
    shelf: "bottles",
    info: "Poured into a hot pot after browning, it lifts the brown film off the bottom into the sauce. A long simmer cooks off most of the alcohol — not all of it.",
  },
  {
    id: "vinegar",
    name: "Red wine vinegar",
    greek: "ξύδι",
    shelf: "bottles",
    info: "Stifado's sharpness, and the splash that wakes up a bowl of lentils. Wine vinegar, not malt: malt vinegar is made from barley.",
  },
  {
    id: "paste",
    name: "Tomato paste",
    greek: "πελτές",
    shelf: "bottles",
    info: "Fried in the oil for a minute until it darkens from bright red to brick, it loses its tinny edge. Stirred straight into water, it never does.",
  },

  /* -------------------------------------------------------------- cold */
  {
    id: "beef",
    name: "Beef chuck",
    greek: "μοσχάρι",
    shelf: "cold",
    info: "The cheap, sinewy cut on purpose. Its collagen melts into gelatin over hours, so the meat falls apart and the sauce turns glossy. A lean cut would only dry out.",
  },
  {
    id: "feta",
    name: "Feta",
    greek: "φέτα",
    shelf: "cold",
    contains: ["dairy"],
    info: "Sheep's milk cheese kept in brine, on the table beside almost any bean dish. For a table with different needs, it belongs on its own plate rather than crumbled over the pot.",
  },
  {
    id: "bread",
    name: "Village bread",
    greek: "ψωμί",
    shelf: "cold",
    contains: ["gluten"],
    info: "On every Greek table, for wiping the plate. It is wheat, so not for a gluten-free plate — and a source of crumbs on a shared board.",
  },
];

export const BY_ID = Object.fromEntries(INGREDIENTS.map((i) => [i.id, i]));
