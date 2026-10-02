/*
 * recipes.js — the dishes the pantry can turn into.
 *
 * Each recipe names its ingredients by pantry id (js/pantry.js), which is how
 * the counter knows what a dish still needs and how an ingredient's card knows
 * which dishes it goes into. Quantities and method are for a real kitchen.
 *
 *   key       the ingredients that make it THIS dish — what a cook would reach
 *             for first. The counter suggests a dish by how many of these are
 *             on it. Salt, pepper and oil are in nearly everything and are
 *             left out of `key` unless they are the point (olive oil is, in
 *             the ladera).
 *   method    each step with a `why`: the reason behind it, which is the part
 *             of a recipe that teaches.
 *   table     what the dish means for a table that cooks without dairy, egg or
 *             gluten. Every dish here is free of all three in the pot; what it
 *             is usually SERVED with is not, and saying so is the point.
 *   fasting   a nistisimo — a dish for Orthodox fasting days, cooked without
 *             meat, dairy or eggs by tradition.
 */

export const RECIPES = [
  {
    id: "fasolada",
    name: "Fasolada",
    greek: "Φασολάδα",
    line: "White bean soup with carrot, celery and tomato in plenty of olive oil.",
    story: "Often called the national dish of Greece, and the most ordinary food there is: a pot of beans for a winter weekday, made rich by nothing more than olive oil and patience.",
    serves: "4",
    time: "About 2 hours, once the beans have soaked",
    fasting: true,
    key: ["beans", "carrot", "celery", "onion", "tomato", "oil"],
    ingredients: [
      { id: "beans", amount: "500 g dried, soaked overnight" },
      { id: "onion", amount: "1 large, chopped" },
      { id: "carrot", amount: "2, in rounds" },
      { id: "celery", amount: "2 stalks with leaves, sliced" },
      { id: "garlic", amount: "2 cloves, sliced" },
      { id: "tomato", amount: "2 ripe, grated — or 1 tbsp paste" },
      { id: "bay", amount: "1 leaf" },
      { id: "oil", amount: "120 ml, and more to finish" },
      { id: "salt", amount: "to taste" },
      { id: "blackpepper", amount: "to taste" },
      { id: "parsley", amount: "a handful, to finish" },
    ],
    method: [
      {
        text: "Drain the soaked beans, cover with fresh water, bring to the boil for five minutes and drain again.",
        why: "Many cooks throw away the first water. It takes the foam with it and gives a cleaner-tasting soup.",
      },
      {
        text: "Warm half the oil in a heavy pot and soften the onion, carrot, celery and garlic gently for about ten minutes. They should soften, not brown.",
        why: "This is the sweet, quiet base. Browning would give a roast flavour that fasolada does not want.",
      },
      {
        text: "Add the beans, tomato and bay, and water to cover by a couple of fingers. Bring to a simmer.",
        why: "Enough water to cook the beans and become broth — but every extra cup is flavour diluted.",
      },
      {
        text: "Simmer gently, lid ajar, for an hour to an hour and a half, until the beans are creamy right through. Salt along the way.",
        why: "A lazy bubble, not a boil: boiled hard, bean skins split and the soup turns to mush before the middles are soft.",
      },
      {
        text: "Off the heat, pour in the rest of the oil, grind over pepper and scatter the parsley.",
        why: "Raw olive oil at the end is what makes it fasolada — it tastes green and peppery in a way cooked oil does not.",
      },
    ],
    serve: "With bread, olives and a pickle or two — and very often feta.",
    table: {
      dairy: "The pot is dairy-free. The feta served beside it is not: leave it off, or put it on its own plate.",
      gluten: "The pot is gluten-free. The bread it is eaten with is not: serve it with gluten-free bread, or just a spoon.",
    },
  },
  {
    id: "revithada",
    name: "Revithada",
    greek: "Ρεβιθάδα",
    line: "Chickpeas baked slowly with a great many onions, olive oil and lemon.",
    story: "From Sifnos, where on Saturday night every household carried its clay pot to the baker's oven, still hot from the bread, and collected it after church on Sunday, silky and golden.",
    serves: "4",
    time: "3 to 4 hours in the oven, almost all of it hands-off",
    fasting: true,
    key: ["chickpeas", "onion", "lemon", "oil"],
    ingredients: [
      { id: "chickpeas", amount: "500 g dried, soaked overnight" },
      { id: "onion", amount: "2 large, thinly sliced" },
      { id: "oil", amount: "150 ml" },
      { id: "bay", amount: "2 leaves" },
      { id: "lemon", amount: "1, juiced" },
      { id: "salt", amount: "to taste" },
      { id: "blackpepper", amount: "to taste" },
    ],
    method: [
      {
        text: "Drain the chickpeas and put them in a clay pot or heavy casserole with the onions, oil, bay and a good pinch of salt.",
        why: "The onions are not a garnish. Over hours they melt completely and become the sauce.",
      },
      {
        text: "Add water to cover by two or three centimetres, put the lid on, and bake at 160 °C for three to four hours.",
        why: "Low, even oven heat all round the pot cooks the chickpeas to silk without ever boiling them hard. On the hob, the gentlest simmer for two hours does nearly as well.",
      },
      {
        text: "Look in once or twice and add a splash of hot water if it is drying out. It should end thick, not soupy.",
        why: "A sealed clay pot loses little water; a metal one with a loose lid loses more. Every pot is different, which is why the recipe says look.",
      },
      {
        text: "Stir in the lemon juice just before serving, and taste for salt.",
        why: "Lemon cooked for hours loses its brightness. Added at the end it lifts all that sweet onion.",
      },
    ],
    serve: "Warm, not hot, with bread and olives.",
    table: {
      gluten: "Some recipes thicken it with a spoon of flour. It does not need one — crush a ladle of the chickpeas back in. Mind the bread on the table.",
    },
  },
  {
    id: "soufico",
    name: "Soufico",
    greek: "Σουφικό",
    line: "Ikaria's summer vegetables layered in one pot and cooked down in olive oil and tomato.",
    story: "From Ikaria, the island known for its long-lived people. Whatever the garden gave in August went into one pot, without a drop of water, and came out as something much more than vegetables.",
    serves: "4",
    time: "About 1½ hours",
    fasting: true,
    key: ["aubergine", "courgette", "pepper", "potato", "tomato", "oil"],
    ingredients: [
      { id: "aubergine", amount: "2, in thick slices" },
      { id: "courgette", amount: "3, in thick slices" },
      { id: "pepper", amount: "2, in strips" },
      { id: "potato", amount: "2, in thick slices" },
      { id: "onion", amount: "2, sliced" },
      { id: "garlic", amount: "3 cloves, sliced" },
      { id: "tomato", amount: "4 ripe, grated" },
      { id: "oil", amount: "150 ml" },
      { id: "oregano", amount: "a pinch" },
      { id: "salt", amount: "to taste" },
      { id: "blackpepper", amount: "to taste" },
    ],
    method: [
      {
        text: "Traditionally each vegetable is fried in turn in olive oil until golden. For a lighter version, skip this and layer them raw.",
        why: "Frying first gives deeper flavour and silkier aubergine; layering raw is quicker and uses less oil. Both are made on Ikaria.",
      },
      {
        text: "Layer in a wide pot: potatoes on the bottom, then onions and peppers, then aubergine, then courgettes, with garlic and salt between the layers.",
        why: "The slowest-cooking vegetables go nearest the heat, the quickest on top, so everything is done at the same moment.",
      },
      {
        text: "Spread the grated tomato over the top, pour over the oil, and add oregano and pepper. Do not add water.",
        why: "The courgettes and tomatoes give up their own water as they cook. Added water would make it a soup.",
      },
      {
        text: "Cover and cook on a low heat for 45 minutes to an hour. Do not stir — shake the pot now and then instead.",
        why: "Stirring breaks the layers into mush. A shake keeps the bottom from catching while everything stays whole.",
      },
      {
        text: "Uncover for the last ten minutes if there is too much liquid, then let it rest before serving.",
        why: "Like most ladera, it tastes better warm than hot, and better still the next day.",
      },
    ],
    serve: "With bread, and sometimes crumbled feta on top.",
    table: {
      dairy: "Leave off the feta, or serve it on the side. Good oil and a little salt do the same job.",
      gluten: "Gluten-free in the pot; mind the bread.",
    },
  },
  {
    id: "stifado",
    name: "Stifado",
    greek: "Στιφάδο",
    line: "Beef braised for hours with whole small onions, red wine, vinegar and cinnamon.",
    story: "A Sunday dish, though not an expensive one: cheap meat, a mountain of onions and a long, slow afternoon. It is just as often made with rabbit, and by the sea with octopus.",
    serves: "4 to 6",
    time: "About 3 hours, most of it hands-off",
    fasting: false,
    key: ["beef", "pearl", "wine", "vinegar", "cinnamon", "allspice"],
    ingredients: [
      { id: "beef", amount: "1 kg chuck or shin, in large pieces" },
      { id: "pearl", amount: "1 kg, peeled" },
      { id: "oil", amount: "100 ml" },
      { id: "garlic", amount: "3 cloves, sliced" },
      { id: "paste", amount: "2 tbsp" },
      { id: "tomato", amount: "3 ripe, grated — or a 400 g tin" },
      { id: "wine", amount: "200 ml dry red" },
      { id: "vinegar", amount: "50 ml" },
      { id: "cinnamon", amount: "1 stick" },
      { id: "allspice", amount: "6 berries" },
      { id: "cloves", amount: "3" },
      { id: "bay", amount: "2 leaves" },
      { id: "salt", amount: "to taste" },
      { id: "blackpepper", amount: "to taste" },
    ],
    method: [
      {
        text: "Blanch the small onions for a minute, cool them, trim the root end without cutting it off, and slip off the skins.",
        why: "The root end holds each onion together through two hours of simmering.",
      },
      {
        text: "Pat the meat dry and brown it in half the oil, in batches, until deep brown on every side. Lift it out.",
        why: "Browning is where the flavour of the sauce comes from. Crowd the pot and the meat steams grey in its own juice instead.",
      },
      {
        text: "Brown the onions whole in the rest of the oil until golden in patches. Lift them out too.",
        why: "Browning brings out their sweetness, which the vinegar will need.",
      },
      {
        text: "Lower the heat. Stir in the garlic, spices and tomato paste for a minute or two, until the paste darkens.",
        why: "Spices warmed in fat release aromas water cannot carry, and fried paste loses its raw edge. Both burn quickly, which is why the heat comes down first.",
      },
      {
        text: "Pour in the wine and vinegar and scrape the bottom. Let it bubble for two minutes.",
        why: "The brown film on the bottom is concentrated flavour; the wine dissolves it into the sauce. The bubbling drives off the sharpest of the alcohol.",
      },
      {
        text: "Return the meat with the tomatoes and enough water to just cover. Salt lightly, cover, and keep at the gentlest simmer for an hour and a half.",
        why: "A lazy bubble melts the meat's collagen and keeps it juicy; a hard boil squeezes the fibres dry. Salt lightly because the sauce will reduce.",
      },
      {
        text: "Nestle in the onions and simmer another hour, until the beef yields to a fork and the sauce is thick. Taste, then fish out the cinnamon and bay.",
        why: "Added for the last hour the onions soften but stay whole. At the end, salt for flatness and a pinch of sugar if it is sharp.",
      },
    ],
    serve: "With rice, potatoes, bread or orzo.",
    table: {
      gluten: "Gluten-free in the pot, as long as nobody dusts the meat in flour (it does not need it) or reaches for a stock cube (it does not need one either, and cubes often hide wheat). Serve it with rice or potatoes rather than bread or orzo.",
    },
  },
  {
    id: "fakes",
    name: "Fakes",
    greek: "Φακές",
    line: "Brown lentil soup with bay and tomato, finished with a splash of vinegar.",
    story: "The cheapest, quickest pot in the Greek kitchen and, for many people, the taste of a school-day lunch. Ready in under an hour, with no soaking.",
    serves: "4",
    time: "About 1 hour",
    fasting: true,
    key: ["lentils", "onion", "bay", "vinegar"],
    ingredients: [
      { id: "lentils", amount: "250 g brown or green, rinsed" },
      { id: "onion", amount: "1, chopped" },
      { id: "garlic", amount: "2 cloves, sliced" },
      { id: "carrot", amount: "1, diced (optional)" },
      { id: "paste", amount: "1 tbsp" },
      { id: "bay", amount: "2 leaves" },
      { id: "oil", amount: "80 ml, and more to finish" },
      { id: "vinegar", amount: "1 tbsp, or to taste" },
      { id: "oregano", amount: "a pinch" },
      { id: "salt", amount: "to taste" },
      { id: "blackpepper", amount: "to taste" },
    ],
    method: [
      {
        text: "Rinse the lentils. Some cooks boil them for five minutes and drain before starting.",
        why: "Lentils need no soaking — they are small enough to cook through in forty minutes. The quick boil, like with beans, takes the foam away.",
      },
      {
        text: "Soften the onion, garlic and carrot in the oil, then stir in the paste for a minute.",
        why: "A short fry of the paste turns it from tinny to sweet.",
      },
      {
        text: "Add the lentils, bay and about 1.2 litres of water. Simmer for 40 to 50 minutes until soft and the soup has thickened.",
        why: "Lentils thicken their own soup as they soften — no flour needed.",
      },
      {
        text: "Salt, then add the vinegar and oregano off the heat. Taste and add more vinegar if it needs lifting.",
        why: "Vinegar at the end is the whole trick: it cuts the earthiness and makes the soup taste of more than lentils.",
      },
    ],
    serve: "With bread, olives, and very often a piece of salty fish or feta.",
    table: {
      dairy: "Dairy-free in the bowl; feta on the side for whoever eats it.",
      gluten: "Gluten-free in the bowl; mind the bread.",
    },
  },
  {
    id: "lemonates",
    name: "Lemon potatoes",
    greek: "Πατάτες λεμονάτες",
    line: "Potatoes roasted in lemon, olive oil, garlic and oregano until soft inside and golden at the edges.",
    story: "Usually the side dish to a Sunday roast chicken, and frequently the part everyone actually fights over.",
    serves: "4",
    time: "About 1¼ hours",
    fasting: true,
    key: ["potato", "lemon", "oregano", "oil", "garlic"],
    ingredients: [
      { id: "potato", amount: "1 kg, in thick wedges" },
      { id: "lemon", amount: "2, juiced" },
      { id: "oil", amount: "100 ml" },
      { id: "garlic", amount: "3 cloves, crushed" },
      { id: "oregano", amount: "2 tsp" },
      { id: "salt", amount: "1 tsp" },
      { id: "blackpepper", amount: "to taste" },
    ],
    method: [
      {
        text: "Toss the potatoes in a roasting tin with the lemon juice, oil, garlic, oregano, salt and pepper.",
        why: "Everything coats the potatoes before they go in, so every wedge carries the lemon and herb.",
      },
      {
        text: "Pour in about 250 ml of water, so the liquid comes a little way up the potatoes.",
        why: "The potatoes drink the lemony liquid as they cook, which is what makes them creamy inside rather than just roasted.",
      },
      {
        text: "Roast at 200 °C for about an hour and a quarter, turning once, until the liquid is gone and the edges are golden.",
        why: "First they braise, then once the liquid has gone they fry in the oil left behind. Add a splash of water if the tin dries out too early.",
      },
    ],
    serve: "Beside roast chicken or lamb — or on their own with a salad.",
    table: {},
  },
];

export const RECIPE_BY_ID = Object.fromEntries(RECIPES.map((r) => [r.id, r]));

/** The dishes an ingredient goes into, for its card. */
export function dishesWith(id) {
  return RECIPES.filter((r) => r.ingredients.some((i) => i.id === id));
}

/**
 * What the counter could become: every dish with at least one of its key
 * ingredients on the counter, best first. `have` and `missing` are key ids.
 */
export function suggest(counter) {
  const out = [];
  for (const r of RECIPES) {
    const have = r.key.filter((id) => counter.has(id));
    if (!have.length) continue;
    out.push({ recipe: r, have, missing: r.key.filter((id) => !counter.has(id)) });
  }
  return out.sort((a, b) => b.have.length / b.recipe.key.length - a.have.length / a.recipe.key.length || a.missing.length - b.missing.length);
}

export const FASTING_NOTE =
  "A fasting dish. On Orthodox fasting days — more than half the year for the devout — the traditional table goes without meat, dairy and eggs, which is why so much of Greek cooking is dairy-free and egg-free by design.";
